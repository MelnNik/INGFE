#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_DIR="$ROOT_DIR/skills"
AGENT="${1:-codex}"

copy_skill_dirs() {
  local dest="$1"
  mkdir -p "$dest"

  for skill in ingfe-plan ingfe-execute; do
    if [[ -e "$dest/$skill" || -L "$dest/$skill" ]]; then
      echo "Refusing to overwrite existing $dest/$skill"
      echo "Remove it manually or choose another destination."
      exit 1
    fi
    cp -R "$SKILLS_DIR/$skill" "$dest/$skill"
  done
}

case "$AGENT" in
  codex)
    dest="${CODEX_NATIVE_SKILLS_DIR:-$HOME/.agents/skills/ingfe}"
    mkdir -p "$(dirname "$dest")"

    if [[ -e "$dest" || -L "$dest" ]]; then
      echo "Refusing to overwrite existing $dest"
      echo "Remove it manually or set CODEX_NATIVE_SKILLS_DIR to another path."
      exit 1
    fi

    ln -s "$SKILLS_DIR" "$dest"
    echo "Installed Codex skills symlink: $dest -> $SKILLS_DIR"
    echo "Restart Codex to discover ingfe-plan and ingfe-execute."
    ;;
  codex-legacy)
    dest="${CODEX_HOME:-$HOME/.codex}/skills"
    copy_skill_dirs "$dest"
    echo "Copied skills to $dest"
    echo "Restart Codex to discover ingfe-plan and ingfe-execute."
    ;;
  generic)
    dest="${2:-}"
    if [[ -z "$dest" ]]; then
      echo "Usage: $0 generic /path/to/agent/skills"
      exit 1
    fi
    copy_skill_dirs "$dest"
    echo "Copied skills to $dest"
    ;;
  *)
    echo "Unknown install target: $AGENT"
    echo "Supported targets: codex, codex-legacy, generic"
    exit 1
    ;;
esac
