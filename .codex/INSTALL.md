# Installing INGFE Skills for Codex

Clone and symlink the canonical skills directory:

```bash
git clone https://github.com/MelnNik/INGFE.git ~/.codex/ingfe-skills
mkdir -p ~/.agents/skills
ln -s ~/.codex/ingfe-skills/skills ~/.agents/skills/ingfe
```

Restart Codex so native skill discovery reloads.

From a local clone, run:

```bash
./scripts/install.sh codex
```

If your Codex install still reads `~/.codex/skills`, run:

```bash
./scripts/install.sh codex-legacy
```

Verify by starting a new Codex session and asking:

```text
Use $ingfe-plan to create project docs and a milestone plan.
```
