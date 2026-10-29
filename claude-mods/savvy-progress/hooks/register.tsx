import { atom, read, update } from 'claude-code'
import type { AgentStatus, EngineInterface, Register } from 'claude-code'

import type { AgentRow, AgentState, Stage, StageStatus } from '../types'

const PANE = 'savvy-progress'

const title = atom({ plugin: 'savvy-progress', key: 'title' } as const, 'Current task')
// Change a shape tag when its fields change: it declines what an earlier
// version stored, which outlives a reload.
const stages = atom({ plugin: 'savvy-progress', key: 'stages' } as const, [], { shape: 'stages-1' })
const agents = atom({ plugin: 'savvy-progress', key: 'agents' } as const, [], { shape: 'agents-1' })

// ---------- pure helpers ----------

export function percent(list: Stage[]): number {
  if (list.length === 0) return 0
  const done = list.filter(s => s.status === 'completed').length
  return Math.round((done / list.length) * 100)
}

export function bar(pct: number, width = 20): string {
  const full = Math.round((pct / 100) * width)
  return '█'.repeat(full) + '░'.repeat(width - full)
}

function progressLine(name: string, list: Stage[]): string {
  const done = list.filter(s => s.status === 'completed').length
  const pct = percent(list)
  return `${name} · Stage ${done}/${list.length} [${bar(pct)}] ${pct}%`
}

function liveState(status: AgentStatus): AgentState {
  if (status === 'running') return 'In Progress'
  if (status === 'completed') return 'Completed'
  if (status === 'failed' || status === 'killed') return 'Failed'
  return 'Waiting' // pending, waiting, idle
}

function elapsed(from: number, to: number): string {
  const s = Math.max(0, Math.round((to - from) / 1000))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function cell(text: string, width: number): string {
  return text.length > width ? text.slice(0, width - 1) + '…' : text.padEnd(width)
}

const STATE_COLOR: Record<AgentState, string> = {
  Waiting: 'warning',
  'In Progress': 'suggestion',
  Completed: 'success',
  Failed: 'error',
}

const STAGE_MARK: Record<StageStatus, string> = {
  pending: '○',
  in_progress: '◐',
  completed: '●',
}

async function setStages($: EngineInterface, fn: (list: Stage[]) => Stage[]): Promise<string[]> {
  const before = await read($, stages)
  const after = fn(before)
  await update($, stages, () => after)

  const wasDone = new Set(before.filter(s => s.status === 'completed').map(s => s.id))
  const newlyDone = after.filter(s => s.status === 'completed' && !wasDone.has(s.id)).map(s => s.title)
  if (newlyDone.length === 0) return []

  const name = await read($, title)
  const pct = percent(after)
  $.ui.toast(`✓ ${newlyDone.join(', ')} — [${bar(pct, 12)}] ${pct}%`)
  $.ui.status(progressLine(name, after))

  return newlyDone
}

export const register: Register = on => {
  // Stages finished during the current main-loop turn, reported at its end
  let finishedThisTurn: string[] = []

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'savvy',
      description: 'Open the Savvy Progress panel; "/savvy <name>" also names the project',
    })
    await $.command.register({
      name: 'savvy-reset',
      description: 'Clear Savvy Progress stages and agent rows',
    })
    const list = await read($, stages)
    if (list.length > 0) $.ui.status(progressLine(await read($, title), list))

    return next(e)
  })

  on('command.run', { command: 'savvy' }, async ($, e) => {
    const name = e.args.trim()
    if (name) await update($, title, () => name)
    await $.ui.open({ id: PANE, title: 'Savvy Progress' })

    return { text: name ? `Savvy Progress tracking "${name}".` : 'Savvy Progress panel opened.' }
  })

  on('command.run', { command: 'savvy-reset' }, async $ => {
    await update($, stages, () => [])
    await update($, agents, () => [])
    $.ui.status(undefined)

    return { text: 'Savvy Progress cleared.' }
  })

  // ---------- stages: TodoWrite and the Task tools ----------

  on('tool.call', { tool: 'TodoWrite' }, async ($, e, next) => {
    const ran = await next(e)
    if (ran.deny !== undefined || ran.isError || e.agentId) return ran

    finishedThisTurn.push(...(await setStages($, list => [
      ...list.filter(s => s.source !== 'todo'),
      ...e.todos.map((t, i) => ({
        id: `todo-${i}-${t.content}`,
        title: t.content,
        status: t.status,
        source: 'todo' as const,
      })),
    ])))

    return ran
  })

  on('tool.call', { tool: 'TaskCreate' }, async ($, e, next) => {
    const ran = await next(e)
    if (ran.deny !== undefined || ran.isError || e.agentId) return ran

    const task = (ran.result as { task?: { id: string; subject: string } } | undefined)?.task
    if (task) {
      finishedThisTurn.push(...(await setStages($, list => [
        ...list,
        { id: `task-${task.id}`, title: task.subject || e.subject, status: 'pending', source: 'task' },
      ])))
    }

    return ran
  })

  on('tool.call', { tool: 'TaskUpdate' }, async ($, e, next) => {
    const ran = await next(e)
    if (ran.deny !== undefined || ran.isError || e.agentId) return ran

    const id = `task-${e.taskId}`
    const status = e.status
    finishedThisTurn.push(...(await setStages($, list =>
      status === 'deleted'
        ? list.filter(s => s.id !== id)
        : list.map(s =>
            s.id === id ? { ...s, title: e.subject ?? s.title, status: status ?? s.status } : s,
          ),
    )))

    return ran
  })

  // ---------- sub-agents ----------

  // The model asks for an agent: it waits until the engine starts it
  on('tool.call', { tool: 'Agent' }, async ($, e, next) => {
    const row: AgentRow = {
      key: e.tool_use_id,
      description: e.description,
      type: e.subagent_type ?? 'general-purpose',
      state: 'Waiting',
      tools: 0,
      startedAt: await $.clock.now(),
    }
    await update($, agents, list => [...list.filter(a => a.key !== row.key), row].slice(-50))

    const ran = await next(e)
    if (ran.deny !== undefined || ran.isError) {
      const endedAt = await $.clock.now()
      await update($, agents, list =>
        list.map(a => (a.key === row.key && a.state === 'Waiting' ? { ...a, state: 'Failed', endedAt } : a)),
      )
    }

    return ran
  })

  on('agent.spawn', async ($, e, next) => {
    const ran = await next(e)
    if (!('agentId' in ran) || !ran.agentId) return ran

    const agentId = ran.agentId
    const now = await $.clock.now()
    await update($, agents, list => {
      const known = list.some(a => a.key === e.tool_use_id && !a.agentId)
      if (known) {
        return list.map(a =>
          a.key === e.tool_use_id && !a.agentId
            ? { ...a, agentId, state: 'In Progress' as const, startedAt: now }
            : a,
        )
      }
      // Spawned by a plugin or a workflow: no Agent call to match
      return [
        ...list,
        {
          key: agentId,
          agentId,
          description: e.description ?? e.subagentType,
          type: e.subagentType,
          state: 'In Progress' as const,
          tools: 0,
          startedAt: now,
        },
      ].slice(-50)
    })

    return ran
  })

  // Every tool call inside a sub-agent counts as activity
  on('tool.call', async ($, e, next) => {
    if (e.agentId) {
      const agentId = e.agentId
      await update($, agents, list =>
        list.map(a =>
          a.agentId === agentId
            ? { ...a, tools: a.tools + 1, state: a.state === 'Waiting' ? 'In Progress' : a.state }
            : a,
        ),
      )
    }

    return next(e)
  })

  on('prompt.submit', ($, e, next) => {
    finishedThisTurn = []

    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    const ran = await next(e)

    if (e.agentId) {
      const agentId = e.agentId
      const state: AgentState = e.reason === 'answer' ? 'Completed' : 'Failed'
      const endedAt = await $.clock.now()
      await update($, agents, list =>
        list.map(a => (a.agentId === agentId ? { ...a, state, endedAt } : a)),
      )

      return ran
    }

    // End of a main-loop turn: show the bar beneath the answer if a stage ended
    if (finishedThisTurn.length === 0) return ran
    const list = await read($, stages)
    const name = await read($, title)
    const done = finishedThisTurn.join(', ')
    finishedThisTurn = []

    return { ...ran, text: `Savvy Progress — finished: ${done}\n${progressLine(name, list)}` }
  })

  // ---------- band above the prompt ----------

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const list = await read($, stages)
    const rows = await read($, agents)
    if (e.props.hasSurvey || (list.length === 0 && rows.length === 0)) return next(e)

    const { Box, Text, Button } = $.ui.resolve(e)
    const name = await read($, title)
    const done = list.filter(s => s.status === 'completed').length
    const pct = percent(list)
    const running = rows.filter(a => a.state === 'In Progress').length
    const waiting = rows.filter(a => a.state === 'Waiting').length

    return (
      <Box flexDirection="row" gap={1}>
        <Text color="suggestion">●</Text>
        <Text weight="bold">{name}</Text>
        {list.length > 0 && (
          <Text>
            Tasks {done}/{list.length} <Text color="suggestion">{bar(pct, 16)}</Text> {pct}%
          </Text>
        )}
        {rows.length > 0 && (
          <Text dimColor>
            · agents {running} running{waiting > 0 ? `, ${waiting} waiting` : ''}
          </Text>
        )}
        <Button key="open" label="Panel" onPress={() => $.ui.open({ id: PANE, title: 'Savvy Progress' })} />
      </Box>
    )
  })

  // ---------- side panel ----------

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e)
    const name = await read($, title)
    const list = await read($, stages)
    const rows = await read($, agents)
    const now = await $.clock.now()
    const cols = Math.max(40, e.viewport?.columns ?? 60)
    const pct = percent(list)
    const done = list.filter(s => s.status === 'completed').length

    // Fold in the engine's live view of each agent that has not ended
    const live = new Map((await $.agent.list()).map(a => [a.id, a.status]))
    const merged = rows.map(a => {
      const status = a.agentId ? live.get(a.agentId) : undefined
      const isEnded = a.state === 'Completed' || a.state === 'Failed'
      return status && !isEnded ? { ...a, state: liveState(status) } : a
    })

    const descW = Math.max(12, cols - 34)
    const header = `${cell('Agent', descW)} ${cell('State', 12)} ${cell('Tools', 6)} ${cell('Time', 6)}`

    return (
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="column">
          <Text weight="bold">{name}</Text>
          <Text>
            <Text color="suggestion">{bar(pct, Math.min(30, cols - 18))}</Text> {pct}% ({done}/{list.length})
          </Text>
        </Box>

        <Box flexDirection="column">
          <Text weight="bold">Stages</Text>
          {list.length === 0 && <Text dimColor>No stages yet — they appear when a todo or task list is made.</Text>}
          {list.map(s => (
            <Text key={s.id} dimColor={s.status === 'completed'} color={s.status === 'in_progress' ? 'suggestion' : undefined}>
              {STAGE_MARK[s.status]} {s.title}
            </Text>
          ))}
        </Box>

        <Box flexDirection="column">
          <Text weight="bold">Agents</Text>
          {merged.length === 0 ? (
            <Text dimColor>No sub-agents in this session yet.</Text>
          ) : (
            <Box flexDirection="column">
              <Text dimColor>{header}</Text>
              {merged.map(a => (
                <Text key={a.key}>
                  {cell(a.description, descW)}{' '}
                  <Text color={STATE_COLOR[a.state]}>{cell(a.state, 12)}</Text>{' '}
                  {cell(String(a.tools), 6)} {cell(elapsed(a.startedAt, a.endedAt ?? now), 6)}
                </Text>
              ))}
              <Text dimColor>
                {merged.filter(a => a.state === 'In Progress').length} in progress ·{' '}
                {merged.filter(a => a.state === 'Waiting').length} waiting ·{' '}
                {merged.filter(a => a.state === 'Completed').length} completed
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    )
  })
}
