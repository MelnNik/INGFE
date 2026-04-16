# INGFE Skills

Portable planning and execution skills for coding agents.

This repository contains two canonical skills:

- `ingfe-plan`: creates or updates `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md`, and `PLAN.md`, then writes an executable milestone plan.
- `ingfe-execute`: reads the required project docs, implements the earliest incomplete `PLAN.md` milestone, runs validations, and updates milestone status only when acceptance criteria are satisfied.

The canonical skill content lives in `skills/*/SKILL.md`. Agent-specific files in this repo only expose those skills to different coding-agent hosts.

## Repository Layout

```text
skills/
  ingfe-plan/
    SKILL.md
    agents/openai.yaml
  ingfe-execute/
    SKILL.md
    agents/openai.yaml
adapters/generic/
  INGFE_WORKFLOW.md
docs/
  INSTALL.md
scripts/
  install.sh
  validate.sh
bin/
  ingfe-skills.mjs
commands/
  ingfe-plan.md
  ingfe-execute.md
gemini-commands/
  plan.toml
  execute.toml
.claude-plugin/
  plugin.json
  marketplace.json
.cursor-plugin/
  plugin.json
.opencode/
  plugins/ingfe-skills.js
gemini-extension.json
package.json
```

## Install

See `docs/INSTALL.md` for Codex, Claude Code, Cursor, Gemini CLI, OpenCode, and generic-agent setup.

Install Codex, Claude Code, and Gemini CLI with one command after npm publication:

```bash
npx ingfe-skills
```

From a local clone, run the same installer through the wrapper:

```bash
./scripts/install.sh
```

Quick validation:

```bash
./scripts/validate.sh
```

## Usage

Planning request:

```text
Use ingfe-plan to create the project docs and PLAN.md.
```

Execution request:

```text
Use ingfe-execute to work on the earliest incomplete milestone.
```

Claude Code also gets personal slash commands:

```text
/ingfe-plan
/ingfe-execute
```

Gemini CLI also gets namespaced slash commands:

```text
/ingfe:plan
/ingfe:execute
```

For agents without native skill loading, point the agent at `adapters/generic/INGFE_WORKFLOW.md` and the two files under `skills/`.

## Attribution

This workflow was adapted from the Superpowers skill process, especially the `using-superpowers`, `brainstorming`, `writing-plans`, and `executing-plans` skills.

Sources:

- https://github.com/obra/superpowers/blob/main/skills/using-superpowers/SKILL.md
- https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md
- https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md
- https://github.com/obra/superpowers/blob/main/skills/executing-plans/SKILL.md

Superpowers is MIT licensed. This repository is also released under the MIT license.
