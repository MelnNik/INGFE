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

echo "Validation passed."
