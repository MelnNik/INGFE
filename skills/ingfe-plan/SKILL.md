---
name: ingfe-plan
description: Plan INGFE projects from an idea, PRD, or architecture brief into canonical project docs and an executable PLAN.md. Use when creating or updating planning docs, brainstorming product scope or architecture before implementation, converting requirements into milestones, or preparing work for ingfe-execute. Ensures CLAUDE.md, GEMINI.md, AGENTS.md, docs/PRD.md, docs/ARCHITECTURE.md, and PLAN.md exist and are internally consistent.
---

# INGFE Plan

## Overview

Turn rough project intent into a concrete, reviewable implementation plan. This skill combines strict skill-use discipline, collaborative brainstorming, and bite-sized implementation planning for the INGFE workflow.

Announce at start: "I'm using the ingfe-plan skill to create the project docs and milestone plan."

## Instruction Priority

Follow instructions in this order:

1. Direct user requests and repository instruction files: `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`
2. This skill
3. Default agent behavior

If these conflict, the user and repository instructions win. Keep this skill as the process for planning, not a reason to override explicit project direction.

## Checklist

Create and maintain a task checklist for these items:

1. Explore the current project context.
2. Read existing instructions and docs.
3. Research current external context and technology-specific best practices when implementation choices are involved.
4. Ensure the required planning files exist.
5. Brainstorm scope, constraints, and success criteria.
6. Propose 2-3 approaches when meaningful.
7. Write or update the required docs.
8. Write or update `PLAN.md` with executable milestones.
9. Self-review the docs and plan.
10. Hand off to `ingfe-execute`.

## Step 1: Explore Context

Inspect the repository before planning:

- List top-level files and relevant subdirectories.
- Read existing `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md`, and `PLAN.md` if present.
- If this is a git repo, check status and recent commits for current direction.
- Follow existing project conventions instead of inventing a new structure.

If the project is too large for one plan, decompose it into independently shippable milestones or sub-projects before writing tasks.

## Step 2: Research Current Context

Use web research by default when planning involves specific technologies, frameworks, libraries, cloud services, agent hosts, APIs, security-sensitive flows, or operational practices. Do not rely only on memory for modern tooling decisions.

Research goals:

- Confirm current versions, support status, installation paths, configuration formats, API signatures, security recommendations, deprecations, migration notes, and official best practices.
- Prefer primary sources: official docs, release notes, standards, package registries, and vendor examples.
- For implementation patterns, check at least one current official source before committing to architecture or milestone tasks.
- Encode the researched decisions in `docs/ARCHITECTURE.md` and `PLAN.md` so the executor can implement without repeating the research.
- Capture relevant source URLs in `docs/ARCHITECTURE.md`, `PLAN.md`, or a short "Research Notes" section when the plan depends on them.
- When a milestone relies on a specific technology behavior, include the exact constraints the executor must follow, such as package versions, config file paths, command syntax, API choices, security requirements, and validation commands.
- If web access is unavailable, state that limitation in the assumptions and avoid over-specific claims about current best practices.

Keep research focused. Use it to make the plan correct, not to produce a literature review.

## Step 3: Ensure Required Files

Create missing files at these canonical paths:

- `CLAUDE.md`
- `GEMINI.md`
- `AGENTS.md`
- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `PLAN.md`

If lower-case variants exist, read them and preserve useful content, but normalize the canonical files above unless the user explicitly asks for different casing.

Each file must contain useful project-specific content. Do not create empty placeholders. If details are unknown but not blocking, state an explicit assumption. If a missing answer would change the architecture, data model, or acceptance criteria, ask one concise clarifying question before proceeding.

Minimum responsibilities:

- `AGENTS.md`: shared agent instructions, validation commands, coding conventions, and plan/execution workflow.
- `CLAUDE.md`: Claude-specific notes only where needed; otherwise point to `AGENTS.md`.
- `GEMINI.md`: Gemini-specific notes only where needed; otherwise point to `AGENTS.md`.
- `docs/PRD.md`: product goal, target users, scope, non-goals, user stories, success metrics, and acceptance criteria.
- `docs/ARCHITECTURE.md`: tech stack, major modules, data flow, external services, risks, operational constraints, and testing strategy.
- `PLAN.md`: ordered milestones with status, files, tasks, acceptance criteria, and validations.

## Step 4: Brainstorm Before Planning

Before finalizing the plan, understand what is being built:

- Ask questions one at a time when clarification is required.
- Prefer multiple-choice questions when they reduce ambiguity.
- Focus on purpose, constraints, acceptance criteria, risks, and what should not be built.
- When multiple approaches are plausible, present 2-3 options with trade-offs and a recommendation.
- For UI-heavy work, offer visual mockups or diagrams only if seeing the options would clarify a decision.

For autonomous planning requests, proceed with clearly labeled assumptions instead of blocking on minor unknowns. Do not proceed past major product or architecture ambiguity.

## Step 5: Write The Plan

`PLAN.md` must be executable by an agent that has not seen the prior conversation. Use exact paths, concrete steps, and measurable criteria.

Use this structure:

```markdown
# INGFE Implementation Plan

> Required execution skill: Use ingfe-execute to implement this plan milestone by milestone.
> Steps use checkbox syntax for tracking.

**Goal:** [One sentence describing the project outcome]
**Architecture:** [2-3 sentences describing the approach]
**Tech Stack:** [Key technologies and libraries]
**Required Context:** Read CLAUDE.md, GEMINI.md, AGENTS.md, docs/PRD.md, docs/ARCHITECTURE.md, and PLAN.md before coding.
**Global Validations:** [Commands that should pass before a milestone is marked complete]

---

## Milestone 1: [Name]

**Status:** NOT STARTED
**Goal:** [Specific outcome]

**Expected Files:**
- Create: `path/to/new-file`
- Modify: `path/to/existing-file`
- Test: `path/to/test-file`

**Acceptance Criteria:**
- [ ] [Observable behavior or quality bar]
- [ ] [Another measurable condition]

**Tasks:**
- [ ] Step 1: [One concrete action]
- [ ] Step 2: [One concrete action]

**Required Validations:**
- `command to run`
  - Expected: [specific expected result]

**Remaining Risks:**
- [Concrete risk or "None identified"]
```

Milestone rules:

- Order milestones so the earliest incomplete one is always the next work item.
- Use statuses exactly: `NOT STARTED`, `IN PROGRESS`, `COMPLETE`.
- Keep each milestone independently testable.
- Include exact file paths for every task.
- Include actual commands and expected results for validations.
- If a task changes code, include enough implementation detail that the executor does not need to invent the design.
- Prefer TDD for behavior changes: failing test, verify failure, minimal implementation, verify pass.
- Keep tasks small enough to complete and verify incrementally.

## No Placeholders

Never leave these in docs or plans:

- `TODO`, `TBD`, `later`, `fill in`
- "Add appropriate error handling" without naming the exact errors and behavior
- "Write tests" without naming the test file, behavior, and expected assertion
- "Similar to previous task"
- References to functions, types, services, or files that are not defined or created in the plan

When information is unknown, use `Assumption:` with a concrete decision, or `Decision needed:` and stop if the decision blocks a correct plan.

## Self-Review

Before finishing, review the written files:

1. Coverage: every PRD requirement maps to one or more milestones.
2. Architecture fit: planned files and data flow match `docs/ARCHITECTURE.md`.
3. Placeholder scan: no vague placeholders or unbounded instructions remain.
4. Status sanity: incomplete work is not marked `COMPLETE`.
5. Validation integrity: every milestone has executable validations with expected outcomes.
6. Handoff clarity: `ingfe-execute` can start from `PLAN.md` without the conversation history.

Fix issues inline before reporting completion.

## Handoff

End with a concise summary:

- Docs created or updated
- Milestones planned
- Assumptions or decisions still pending
- The next command/request to execute: `Use ingfe-execute to work on the earliest incomplete milestone.`
