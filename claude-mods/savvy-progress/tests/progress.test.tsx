import { expect, test } from 'claude-code/testing'

const PANE = {
  plugin: 'savvy-progress',
  component: 'Pane',
  requestId: 'savvy-progress',
  props: {
    title: 'Savvy Progress',
    isFocused: false,
    bodyColumns: 70,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 30 },
    view: {},
  },
} as const

test('stages drive the percentage bar, on every surface', async ($, on) => {
  on('command.register', () => ({ value: { command: 'savvy' } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('ui.toast', () => ({ value: undefined }))
  on('ui.status', () => ({ value: undefined }))
  on('agent.list', () => ({ value: [] }))
  on('clock.now', () => ({ value: 0 }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('tool.call', () => ({ result: {} }))

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  await $.tool.call({
    tool: 'TodoWrite',
    todos: [
      { content: 'Draft emails', status: 'completed', activeForm: 'Drafting' },
      { content: 'Ad sets', status: 'in_progress', activeForm: 'Building' },
      { content: 'Social posts', status: 'pending', activeForm: 'Writing' },
      { content: 'Review', status: 'completed', activeForm: 'Reviewing' },
    ],
  })

  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    const line = await ui.find({ type: 'Text', text: /50% \(2\/4\)/ })
    expect(line?.text).toContain('50%')
    expect((await ui.find({ type: 'Text', text: /Ad sets/ }))?.text).toContain('Ad sets')
    await ui.unmount()
  }
})

test('a spawned agent shows as a Running card', async ($, on) => {
  on('agent.list', () => ({ value: [] }))
  on('clock.now', () => ({ value: 0 }))
  on('agent.spawn', () => ({ model: 'sonnet', agentId: 'a1' }))

  await $.agent.spawn({ prompt: 'Write the launch emails', description: 'Launch emails' })

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  expect((await ui.find({ type: 'Text', text: /Launch emails/ }))?.text).toBe('Launch emails')
  expect((await ui.find({ type: 'Text', text: /Running · 1/ }))?.text).toContain('Running')
  await ui.unmount()
})
