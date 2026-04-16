# Installing INGFE Skills for Codex

After the package is published to npm:

```bash
npx ingfe-skills install --target=codex
```

From a local clone, run:

```bash
./scripts/install.sh --target=codex
```

Restart Codex so native skill discovery reloads.

Verify by starting a new Codex session and asking:

```text
Use ingfe-plan to create project docs and a milestone plan.
```
