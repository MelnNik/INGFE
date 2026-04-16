# Installing INGFE Skills

Repository URL: `https://github.com/MelnNik/INGFE`

## One-command install

After the package is published to npm, install for Codex, Claude Code, and Gemini CLI with:

```bash
npx ingfe-skills
```

This copies skills and commands into stable user directories:

- Codex: `~/.codex/skills/` and `~/.agents/skills/`
- Claude Code: `~/.claude/skills/` and `~/.claude/commands/`
- Gemini CLI: `~/.gemini/extensions/ingfe-skills/` and `~/.gemini/commands/ingfe/`

Target only one host with:

```bash
npx ingfe-skills install --target=claude
npx ingfe-skills install --target=codex,gemini
```

From a local clone, run:

```bash
./scripts/install.sh
```

## Codex

Codex native skill discovery uses copied skill folders:

```bash
npx ingfe-skills install --target=codex
```

Then restart Codex.

## Claude Code

The `npx` installer copies skills into `~/.claude/skills/` and personal slash commands into `~/.claude/commands/`.

Use:

```text
/ingfe-plan
/ingfe-execute
```

This repo also includes Claude plugin metadata in `.claude-plugin/` for plugin-based distribution.

For direct use without installation, open this repo in Claude Code and ask it to use the native Skill tool with:

```text
ingfe-plan
ingfe-execute
```

## Cursor

This repo includes Cursor plugin metadata in `.cursor-plugin/plugin.json`, with `skills` pointed at `./skills/`.

After publishing, install through Cursor's plugin flow for GitHub-hosted plugins, then verify that `ingfe-plan` and `ingfe-execute` are listed as available skills.

## Gemini CLI

The `npx` installer copies the extension into `~/.gemini/extensions/ingfe-skills/` and namespaced custom commands into `~/.gemini/commands/ingfe/`.

Use:

```text
/ingfe:plan
/ingfe:execute
```

This repo also includes `gemini-extension.json` and `GEMINI.md` for GitHub extension installation.

Install from GitHub:

```bash
gemini extensions install https://github.com/MelnNik/INGFE
```

Update later with:

```bash
gemini extensions update ingfe-skills
```

## OpenCode

This repo includes an OpenCode plugin entry point at `.opencode/plugins/ingfe-skills.js`.

Add the plugin to global or project `opencode.json`:

```json
{
  "plugin": ["ingfe-skills@git+https://github.com/MelnNik/INGFE.git"]
}
```

Restart OpenCode and use its native skill tool to load `ingfe-plan` or `ingfe-execute`.

## Generic Agents

For agents without native skill loading:

1. Clone this repo.
2. Point the agent at `adapters/generic/INGFE_WORKFLOW.md`.
3. Tell it to read `skills/ingfe-plan/SKILL.md` before planning and `skills/ingfe-execute/SKILL.md` before execution.

Example:

```text
Fetch https://raw.githubusercontent.com/MelnNik/INGFE/main/adapters/generic/INGFE_WORKFLOW.md and follow it.
```

## Verify

Ask the agent:

```text
Use ingfe-plan to create project docs and a milestone plan.
```

Then:

```text
Use ingfe-execute to work on the earliest incomplete milestone.
```
