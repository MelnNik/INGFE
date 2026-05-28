---
name: ingfe-plan
description: Plan INGFE projects from an idea, PRD, or architecture brief into canonical project docs and an executable PLAN.md. Use when creating or updating planning docs, brainstorming product scope or architecture before implementation, converting requirements into milestones, or preparing work for ingfe-execute. Ensures CLAUDE.md, GEMINI.md, AGENTS.md, docs/PRD.md, docs/ARCHITECTURE.md, and PLAN.md exist and are internally consistent.
---

# INGFE Plan

## Overview

Turn rough project intent into a concrete, reviewable implementation plan following May 2026 Agentic Engineering Best Practices. This skill shifts from "vibe coding" to structured, observable engineering. It combines strict skill-use discipline, collaborative brainstorming, and DAG-based (Directed Acyclic Graph) milestone planning for the INGFE workflow.

Announce at start: "I'm using the ingfe-plan skill to architect the project docs and milestone plan."

## Instruction Priority

Follow instructions in this order:

1. Direct user requests and repository instruction files: `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`
2. This skill
3. Default agent behavior

If these conflict, the user and repository instructions win.

## Checklist

Create and maintain a task checklist for these items:

1. Explore the current project context.
2. Read existing instructions and docs (Code as Rules).
3. Research current external context (May 2026+ tooling) and MCP (Model Context Protocol) capabilities.
4. Ensure the required planning files exist.
5. Brainstorm scope, constraints, and success criteria.
6. Propose 2-3 approaches when meaningful, highlighting architectural trade-offs.
7. Write or update the required docs.
8. Write or update `PLAN.md` with executable, DAG-structured milestones.
9. Reflect and Self-review the docs and plan (Plan-Act-Reflect).
10. Hand off to `ingfe-execute` with explicit HITL (Human-in-the-Loop) review requests for critical decisions.

## Step 1: Explore Context

Inspect the repository before planning:

- List top-level files and relevant subdirectories.
- Read existing `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md`, and `PLAN.md` if present.
- If this is a git repo, check status and recent commits for current direction.
- Follow existing project conventions instead of inventing a new structure.

If the project is too large for one plan, decompose it into independently shippable sub-projects before writing tasks.

## Step 2: Research Current Context & Capabilities

Use web research by default when planning involves specific technologies, frameworks, APIs, or operational practices. 

Research goals:

- Confirm current versions, security recommendations, and official best practices as of 2026.
- Prioritize MCP (Model Context Protocol) tools if the platform supports them for standardized integrations.
- Encode the researched decisions in `docs/ARCHITECTURE.md` and `PLAN.md` so the executor can implement without repeating the research.
- Capture relevant source URLs in `docs/ARCHITECTURE.md` or `PLAN.md`.
- When a milestone relies on a specific technology behavior, include the exact constraints the executor must follow.
- If web access is unavailable, state that limitation explicitly.

## Step 3: Ensure Required Files (Code as Rules)

Create missing files at these canonical paths:

- `CLAUDE.md`
- `GEMINI.md`
- `AGENTS.md`
- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `PLAN.md`

Each file must contain useful project-specific content. Do not create empty placeholders. If details are unknown, state an explicit assumption or ask the user.

Minimum responsibilities:

- `AGENTS.md`: shared agent instructions, validation commands, coding conventions, and plan/execution workflow.
- `CLAUDE.md` / `GEMINI.md`: Platform-specific notes; otherwise point to `AGENTS.md`.
- `docs/PRD.md`: product goal, target users, scope, user stories, success metrics, and acceptance criteria.
- `docs/ARCHITECTURE.md`: tech stack, major modules, data flow, MCP usage, risks, and testing strategy.
- `PLAN.md`: DAG-structured milestones with status, files, tasks, validations, and dependencies.

## Step 4: Brainstorm Before Planning

Before finalizing the plan, understand what is being built:

- Focus on system design and architectural judgments over basic syntax.
- Ask questions one at a time when clarification is required.
- Present 2-3 options with trade-offs and a recommendation when multiple approaches are plausible.
- For autonomous planning requests, proceed with clearly labeled assumptions. Do not proceed past major product or architecture ambiguity without Human-in-the-Loop (HITL) approval.

## Step 5: Write The Plan (DAG Milestones)

`PLAN.md` must be executable by an agent operating autonomously. Use explicit sub-tasks, concrete steps, and measurable criteria. Treat the plan as a state-machine orchestrator.

Use this structure:

```markdown
# INGFE Implementation Plan

> Required execution skill: Use ingfe-execute to implement this plan.
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
**Dependencies:** [e.g., None, or 'Milestone X']

**Expected Files:**
- Create: `path/to/new-file`
- Modify: `path/to/existing-file`

**Acceptance Criteria:**
- [ ] [Observable behavior or quality bar]

**Tasks (Plan-Act-Reflect):**
- [ ] Step 1: [Concrete action using explicit tools/MCP]
- [ ] Step 2: [Another concrete action]

**Required Validations:**
- `command to run`
  - Expected: [specific expected result]

**Remaining Risks & HITL Triggers:**
- [Concrete risk, or required human review point]
```

Milestone rules:

- Use statuses exactly: `NOT STARTED`, `IN PROGRESS`, `COMPLETE`.
- Acknowledge dependencies explicitly (DAG structure).
- Include actual commands and expected results for validations.
- Keep tasks small enough to complete and verify incrementally.

## No Placeholders

Never leave these in docs or plans:

- `TODO`, `TBD`, `later`, `fill in`
- "Add appropriate error handling" without naming the exact errors
- References to functions or tools that do not exist

## Step 6: Reflect and Self-Review

Before finishing, review the written files (Plan-Act-Reflect):

1. Coverage: every PRD requirement maps to one or more milestones.
2. Architecture fit: planned files and data flow match `docs/ARCHITECTURE.md`.
3. Placeholder scan: no vague placeholders or unbounded instructions remain.
4. Validation integrity: every milestone has executable validations with expected outcomes.
5. Observability: Ensure trajectory logging or checkpoints are mentioned for execution.
6. Handoff clarity: `ingfe-execute` can start securely.

Fix issues inline before reporting completion.

## Handoff

End with a concise summary:

- Docs created or updated
- DAG Milestones planned
- HITL checkpoints identified
- The next command/request to execute: `Use ingfe-execute to work on the earliest incomplete milestone.`
