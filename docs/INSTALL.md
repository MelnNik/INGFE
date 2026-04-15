# Installing INGFE Skills

Replace `https://github.com/nikolaimelnikov/ingfe-skills.git` with your actual repository URL after publishing.

## Codex

Codex native skill discovery can use a symlink to this repo's `skills/` directory:

```bash
git clone https://github.com/nikolaimelnikov/ingfe-skills.git ~/.codex/ingfe-skills
mkdir -p ~/.agents/skills
ln -s ~/.codex/ingfe-skills/skills ~/.agents/skills/ingfe
```

Then restart Codex.

From a local clone, run:

```bash
./scripts/install.sh codex
```

If your Codex install still reads `~/.codex/skills`, use:

```bash
./scripts/install.sh codex-legacy
```

## Claude Code

This repo includes Claude plugin metadata in `.claude-plugin/`.

After publishing to GitHub, register the plugin or marketplace using the plugin flow supported by your Claude Code version, then install `ingfe-skills`.

For direct use without plugin installation, open this repo in Claude Code and ask it to use the native Skill tool with:

```text
ingfe-plan
ingfe-execute
```

## Cursor

This repo includes Cursor plugin metadata in `.cursor-plugin/plugin.json`, with `skills` pointed at `./skills/`.

After publishing, install through Cursor's plugin flow for GitHub-hosted plugins, then verify that `ingfe-plan` and `ingfe-execute` are listed as available skills.

## Gemini CLI

This repo includes `gemini-extension.json` and `GEMINI.md`.

Install from GitHub:

```bash
gemini extensions install https://github.com/nikolaimelnikov/ingfe-skills
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
  "plugin": ["ingfe-skills@git+https://github.com/nikolaimelnikov/ingfe-skills.git"]
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
Fetch https://raw.githubusercontent.com/nikolaimelnikov/ingfe-skills/main/adapters/generic/INGFE_WORKFLOW.md and follow it.
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
