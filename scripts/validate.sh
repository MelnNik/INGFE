#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

for skill_dir in skills/*; do
  [[ -d "$skill_dir" ]] || continue

  skill_name="$(basename "$skill_dir")"
  skill_file="$skill_dir/SKILL.md"
  openai_yaml="$skill_dir/agents/openai.yaml"

  [[ -f "$skill_file" ]] || { echo "Missing $skill_file"; exit 1; }
  [[ -f "$openai_yaml" ]] || { echo "Missing $openai_yaml"; exit 1; }

  grep -q "^---$" "$skill_file" || { echo "$skill_file missing YAML frontmatter"; exit 1; }
  grep -q "^name: $skill_name$" "$skill_file" || { echo "$skill_file name does not match folder"; exit 1; }
  grep -q "^description: " "$skill_file" || { echo "$skill_file missing description"; exit 1; }
  grep -q "interface:" "$openai_yaml" || { echo "$openai_yaml missing interface"; exit 1; }
done

node --check .opencode/plugins/ingfe-skills.js
node --check bin/ingfe-skills.mjs

node bin/ingfe-skills.mjs --dry-run >/dev/null

grep -q '"bin"' package.json || { echo "package.json missing bin entry"; exit 1; }
[[ -f commands/ingfe-plan.md ]] || { echo "Missing Claude /ingfe-plan command"; exit 1; }
[[ -f commands/ingfe-execute.md ]] || { echo "Missing Claude /ingfe-execute command"; exit 1; }
[[ -f gemini-commands/plan.toml ]] || { echo "Missing Gemini /ingfe:plan command"; exit 1; }
[[ -f gemini-commands/execute.toml ]] || { echo "Missing Gemini /ingfe:execute command"; exit 1; }

echo "Validation passed."
