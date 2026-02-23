# minions-agents

**Agent definitions, runs, traces, and approval requests for the agent fleet**

Built on the [Minions SDK](https://github.com/mxn2020/minions).

---

## Quick Start

```bash
# TypeScript / Node.js
npm install @minions-agents/sdk minions-sdk

# Python
pip install minions-agents

# CLI (global)
npm install -g @minions-agents/cli
```

---

## CLI

```bash
# Show help
agents --help
```

---

## Python SDK

```python
from minions_agents import create_client

client = create_client()
```

---

## Project Structure

```
minions-agents/
  packages/
    core/           # TypeScript core library (@minions-agents/sdk on npm)
    python/         # Python SDK (minions-agents on PyPI)
    cli/            # CLI tool (@minions-agents/cli on npm)
  apps/
    web/            # Playground web app
    docs/           # Astro Starlight documentation site
    blog/           # Blog
  examples/
    typescript/     # TypeScript usage examples
    python/         # Python usage examples
```

---

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run tests
pnpm run test

# Type check
pnpm run lint
```

---

## Documentation

- Docs: [agents.minions.help](https://agents.minions.help)
- Blog: [agents.minions.blog](https://agents.minions.blog)
- App: [agents.minions.wtf](https://agents.minions.wtf)

---

## License

[MIT](LICENSE)
