export type StageStatus = 'pending' | 'in_progress' | 'completed'
export type Stage = {
  id: string
  title: string
  status: StageStatus
  source: 'todo' | 'task'
}

export type AgentState = 'Waiting' | 'In Progress' | 'Completed' | 'Failed'
export type AgentRow = {
  // The Agent tool call's id until the spawn names the agent
  key: string
  agentId?: string
  description: string
  type: string
  state: AgentState
  tools: number
  startedAt: number
  endedAt?: number
}

declare module 'claude-code' {
  interface PluginState {
    'savvy-progress': {
      title: string
      stages: Shaped<Stage[]>
      agents: Shaped<AgentRow[]>
      bandHidden: boolean
    }
  }
}
