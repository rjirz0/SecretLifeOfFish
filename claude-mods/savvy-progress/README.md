# Savvy Progress — a Claude Code mod

Tracks long-running, multi-step work inside a Claude Code session.

- **Progress bar band** above the prompt: `● <project>  Tasks 3/6 ████████░░░░░░░░ 50% · agents 2 running`.
- **End-of-stage updates**: when a stage completes (a TodoWrite item or a TaskUpdate goes to `completed`), a toast and the status line show the new percentage bar. At the end of that turn, `Savvy Progress — finished: <stage>` and the bar appear under Claude's answer.
- **Side panel** (`/savvy`): the stage list (○ pending, ◐ in progress, ● done) and a table of sub-agents with their state (**Waiting**, **In Progress**, **Completed** or **Failed**), their tool-call count and elapsed time.

Commands:

- `/savvy [project name]` opens the panel and optionally names the project.
- `/savvy-reset` clears the stages and agent rows.

Stages come from Claude's own todo/task tools. Agents come from the Agent tool and any `agent.spawn`. Nothing needs configuring.

Install locally: `claude --plugin-dir ./claude-mods/savvy-progress`.

## Install

In a terminal session, at the prompt:

```
/plugin install savvy-progress --marketplace rjirz0/SecretLifeOfFish
```

From a shell:

```
claude plugin install savvy-progress --marketplace rjirz0/SecretLifeOfFish
```

In the desktop app: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `rjirz0/SecretLifeOfFish`, then **Add plugin** and pick savvy-progress.

The marketplace reads the `main` branch, so merge this folder and `.claude-plugin/marketplace.json` into `main` first.
