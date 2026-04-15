# INGFE Generic Agent Adapter

Use this adapter when an agent does not have native skill loading.

## Planning

When the user asks to plan a project, create project docs, write a PRD, write architecture notes, or create `PLAN.md`:

1. Read `skills/ingfe-plan/SKILL.md`.
2. Follow it as the active workflow.
3. Ensure these files exist in the target project:
   - `CLAUDE.md`
   - `GEMINI.md`
   - `AGENTS.md`
   - `docs/PRD.md`
   - `docs/ARCHITECTURE.md`
   - `PLAN.md`

## Execution

When the user asks to implement, continue, or complete work from `PLAN.md`:

1. Read `skills/ingfe-execute/SKILL.md`.
2. Follow it as the active workflow.
3. Work on the earliest incomplete milestone.
4. Mark a milestone `COMPLETE` only when every acceptance criterion and required validation passes.

## Instruction Priority

1. Direct user instructions and repository files
2. The active INGFE skill
3. Default agent behavior
