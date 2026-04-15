---
name: ingfe-execute
description: Execute INGFE project work from PLAN.md. Use when implementing the earliest incomplete milestone, continuing an IN PROGRESS milestone, validating completed work, or updating PLAN.md after implementation. Requires reading CLAUDE.md, GEMINI.md, AGENTS.md, docs/PRD.md, docs/ARCHITECTURE.md, and PLAN.md before coding, then marking milestones COMPLETE only when every acceptance criterion is satisfied.
---

# INGFE Execute

## Overview

Load the project plan, review it critically, implement the earliest incomplete milestone, run validations, and update `PLAN.md` with evidence. This is the INGFE-scoped equivalent of an execution-plan workflow.

Announce at start: "I'm using the ingfe-execute skill to implement the earliest incomplete milestone."

## Required Context

Before coding, read:

- `CLAUDE.md`
- `GEMINI.md`
- `AGENTS.md`
- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `PLAN.md`

If any required file is missing, stop and say that `$ingfe-plan` should be used first unless the user explicitly tells you to proceed without it.

Follow instruction priority:

1. Direct user requests and repository instruction files
2. This skill
3. Default agent behavior

## Step 1: Load And Review The Plan

Find the earliest incomplete milestone in `PLAN.md`:

- A milestone is incomplete if its status is `NOT STARTED` or `IN PROGRESS`.
- A milestone marked `COMPLETE` is still incomplete if any acceptance criterion is unchecked or contradicted by the code.
- If multiple milestones are incomplete, choose the first one in file order.

Review the milestone before implementation:

- Confirm the goal is clear.
- Confirm expected files are listed.
- Confirm acceptance criteria are measurable.
- Confirm validation commands are present and runnable.
- Confirm tasks are small enough to execute safely.
- Compare the milestone against the PRD and architecture docs.

If the plan has critical gaps, raise them before coding. If the gap can be resolved from existing docs, update `PLAN.md` and continue. If it requires a product or architecture decision, ask one concise question and stop.

Before coding, summarize:

- The milestone goal
- The files you expect to touch
- The acceptance criteria

## Step 2: Prepare Execution

If this is a git repo:

- Check the current branch and working tree.
- Do not overwrite unrelated user changes.
- If on `main` or `master`, ask before starting implementation unless the user explicitly instructed you to work there.

Create a task checklist from the milestone tasks and validations. Mark the milestone `IN PROGRESS` in `PLAN.md` before changing implementation files.

## Step 3: Execute The Milestone

For each task:

1. Mark the task in progress in your checklist.
2. Follow the plan step exactly when it is correct.
3. Keep edits scoped to the milestone.
4. Use existing project patterns and helper APIs.
5. Prefer failing test -> implementation -> passing test for behavior changes.
6. Run the validation named in the task or the closest focused validation.
7. Update `PLAN.md` task checkboxes only after the task is actually complete.

If the plan is wrong but the intended milestone is clear, make the smallest plan correction in `PLAN.md`, then continue. Do not silently drift away from the plan.

## Step 4: Validate Completion

Run every validation required by the milestone. Also run any repository-required checks from `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` that apply to touched code.

A milestone may be marked `COMPLETE` only when all are true:

- Every acceptance criterion is satisfied.
- Every required validation passed, or a skipped validation has a documented, non-optional blocker.
- `PLAN.md` task boxes for the milestone accurately reflect reality.
- No known regression or unresolved blocker remains.

If these are true, update `PLAN.md`:

- Set `**Status:** COMPLETE`.
- Check completed acceptance criteria and tasks.
- Add validation evidence: command, result, and date if the plan has a place for notes.

If not complete, leave the milestone `IN PROGRESS` and add a short remaining-work list under the milestone. Do not mark partial work complete.

## Stop Conditions

Stop and ask for help when:

- A required dependency or file is missing.
- A test or validation fails repeatedly after a reasonable fix attempt.
- The plan contradicts the PRD or architecture.
- The milestone lacks enough detail to implement safely.
- You would need to overwrite unrelated user changes.
- You need permission for a destructive command, network install, or main/master implementation.

Do not guess through these blockers.

## Final Report

End with:

- Milestone worked
- Files changed
- Validations run and results
- Whether `PLAN.md` now says `COMPLETE` or `IN PROGRESS`
- Remaining work, if any

Keep the report short and evidence-based.
