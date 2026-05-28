---
name: ingfe-execute
description: Execute INGFE project work from PLAN.md following May 2026 agentic best practices. Use when implementing the earliest incomplete milestone, continuing an IN PROGRESS milestone, validating completed work, or updating PLAN.md after implementation. Requires reading CLAUDE.md, GEMINI.md, AGENTS.md, docs/PRD.md, docs/ARCHITECTURE.md, and PLAN.md before coding, then marking milestones COMPLETE only when every acceptance criterion is satisfied.
---

# INGFE Execute

## Overview

Execute project work autonomously but securely, employing the "Plan-Act-Reflect" pattern. Load the project plan (DAG), review it critically, implement the earliest incomplete milestone within isolated execution bounds, run strict validations, and update `PLAN.md` with evidence. 

Announce at start: "I'm using the ingfe-execute skill to implement the earliest incomplete milestone."

## Required Context

Before coding, read:

- `CLAUDE.md`
- `GEMINI.md`
- `AGENTS.md`
- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `PLAN.md`

If any required file is missing, stop and request `ingfe-plan` to run first.

Follow instruction priority:

1. Direct user requests and repository instruction files
2. This skill
3. Default agent behavior

## Step 1: Load And Review The Plan (Plan Phase)

Find the earliest incomplete milestone in `PLAN.md`:

- A milestone is incomplete if its status is `NOT STARTED` or `IN PROGRESS`.
- Check dependencies explicitly: Ensure prior milestones in the DAG are `COMPLETE`.
- If a milestone is marked `COMPLETE` but acceptance criteria are unchecked or tests fail, it is incomplete.

Review the milestone before implementation:

- Confirm the goal is clear.
- Confirm expected files are listed.
- Confirm acceptance criteria are measurable.
- Confirm validation commands (tests, linters) are present.
- Compare against PRD and architecture docs.

If the plan has critical gaps or hallucinates tools/capabilities, raise them before coding. If it requires an architectural decision, pause for Human-in-the-Loop (HITL) review.

Summarize before coding:

- Milestone goal
- Expected files to touch
- Acceptance criteria

## Step 2: Prepare Execution (Isolation & Security)

If this is a git repo:

- Check the current branch and working tree. 
- Create isolated branches or workspaces for tasks to prevent state pollution.
- Zero-Trust Security: Ensure you are not violating `CODEOWNERS` or performing destructive actions outside the sandbox.
- If on `main` or `master`, DO NOT start implementation without explicit HITL approval.

Mark the milestone `IN PROGRESS` in `PLAN.md`.

## Step 3: Execute The Milestone (Act Phase)

For each task:

1. Mark task in progress.
2. Follow the plan exactly. Use explicit MCP (Model Context Protocol) tool calls over hallucinating unstructured shell commands when available.
3. Keep edits scoped to the milestone.
4. Prefer failing test -> implementation -> passing test (Immutable Tests validation).
5. Run the specific validation named in the task.
6. Update `PLAN.md` task checkboxes ONLY after verifiable completion.

If a task relies on an unavailable external dependency, pause for HITL approval. Do not silently drift away from the plan.

## Step 4: Validate & Reflect (Reflect Phase)

Run every validation required by the milestone. Agents must critique their own output before finalization to reduce hallucinations and silent errors.

A milestone may be marked `COMPLETE` only when all are true:

- Every acceptance criterion is verifiably satisfied via testing.
- Automated tests/linters pass. Agents must NOT rewrite immutable tests simply to make them pass.
- `PLAN.md` accurately reflects reality.
- Trajectory logs (reasoning steps, tool calls) show successful, efficient task execution without regressions.

If these are true, update `PLAN.md`:

- Set `**Status:** COMPLETE`.
- Check completed acceptance criteria and tasks.
- Add evidence: commands run, actual stdout results, and date.

If not complete, leave the milestone `IN PROGRESS` and add a "Remaining Work / Reflection" list under the milestone.

## Stop Conditions (HITL Triggers)

Stop and ask for help when:

- A required dependency or file is missing.
- A test or validation fails repeatedly after 3 reasonable fix attempts.
- The plan contradicts the PRD or architecture.
- You need permission for a destructive command, network install, modifying secrets, or a main/master commit.

Do not guess through these blockers. Treat them as essential safety boundaries.

## Final Report

End with:

- Milestone worked
- Files changed
- Validations run and results
- `PLAN.md` status (`COMPLETE` or `IN PROGRESS`)
- Remaining work or necessary human reviews
