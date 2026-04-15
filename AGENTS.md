# Agent Instructions

This repository packages portable INGFE skills for multiple coding-agent hosts.

## Canonical Source

- Edit skill behavior only in `skills/ingfe-plan/SKILL.md` and `skills/ingfe-execute/SKILL.md`.
- Keep adapter files thin. They should point to canonical skills instead of duplicating full skill bodies.
- Keep `agents/openai.yaml` aligned with each skill's purpose.

## Validation

Run:

```bash
./scripts/validate.sh
```

If Codex skill tooling is available, also run:

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/ingfe-plan
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/ingfe-execute
```

## Packaging

- Codex uses `skills/*/SKILL.md` directly through native skill discovery.
- Claude Code and Cursor use plugin metadata in `.claude-plugin/` and `.cursor-plugin/`.
- Gemini CLI loads `GEMINI.md` through `gemini-extension.json`.
- OpenCode loads `.opencode/plugins/ingfe-skills.js` through `package.json`.
- Generic agents can use `adapters/generic/INGFE_WORKFLOW.md`.

Do not mark this repo ready for publication until `docs/INSTALL.md` matches the actual GitHub repository URL.
