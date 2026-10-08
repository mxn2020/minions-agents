**MINIONS AGENTS — AGENT STUDIO**

You are tasked with creating the complete initial foundation for **Agent Studio** — a comprehensive agent design, testing, memory management, orchestration, and benchmarking system built on the Minions SDK.

---

**PROJECT OVERVIEW**

`minions-agents` is the centerpiece of the Minions ecosystem's Agent Infrastructure tier. It provides everything you need to define, build, test, orchestrate, and evaluate AI agents using structured minions.

This project is the natural evolution of the base Minions SDK: instead of generic minions, you're working with agent-specific types like `agent`, `skill`, `tool`, `memory-entry`, `benchmark`, and `orchestration`. An agent is a structured minion with typed fields defining its identity, capabilities, memory, and behavior.

The core value proposition: agents can introspect themselves, spawn sub-agents, prune their own memory, run self-evaluations, and coordinate with other agents — all using the same structured minion system they're built on. This is self-referential infrastructure.

---

**CORE PRIMITIVES**

The system is built around nine core minion types:

1. **`agent`** — An AI agent definition with role, model, system prompt, capabilities, and configuration
2. **`skill`** — A reusable capability that agents can have (e.g., web search, code analysis)
3. **`tool`** — A concrete tool an agent can invoke (API, function, command)
4. **`memory-entry`** — A single episodic memory record (thought, observation, decision)
5. **`agent-run`** — An execution trace recording what an agent did during a run
6. **`benchmark`** — A test suite for evaluating agent performance
7. **`benchmark-result`** — The outcome of running a benchmark against an agent
8. **`orchestration`** — A workflow definition coordinating multiple agents
9. **`agent-team`** — A collection of agents working together with shared context

All of these are standard minions with typed schemas. They can relate to each other via the standard relation types (`parent_of`, `depends_on`, `references`, etc.). An agent can have child `skill` minions linked via `parent_of`, a timeline of `memory-entry` minions linked via `follows`, and a history of `agent-run` minions linked via `references`.

---

**CORE PRINCIPLES**

- **Progressive complexity** — Start with a simple flat agent definition, grow into nested multi-agent systems
- **Self-referential** — Agents can read and write their own definition, memory, and evaluation results
- **Agent-native testing** — Benchmarks are first-class minions, results are queryable
- **Memory as data** — Agent memory is structured, timestamped, and prunable
- **Orchestration as code** — Multi-agent workflows are declarative graphs
- **Template-driven** — Start from pre-built agent templates (researcher, writer, coder)
- **Cross-SDK support** — Full TypeScript and Python SDKs with interop

---

**MINIONS SDK REFERENCE — REQUIRED DEPENDENCY**

This project depends on `minions-sdk`, a published package that provides the foundational primitives. The GH Agent building this project MUST install it from the public registries and use the APIs documented below — do NOT reimplement minions primitives from scratch.

**Installation:**
```bash
# TypeScript (npm) — install both base SDK and this project's SDK
npm install minions-sdk
# or: pnpm add minions-sdk

# Python (PyPI) — the Python package name on PyPI is minions-sdk, but you import as "minions"
pip install minions-sdk
```

**TypeScript SDK — Core Imports:**
```typescript
import {
  // Core types
  type Minion, type MinionType, type Relation,
  type FieldDefinition, type FieldValidation, type FieldType,
  type CreateMinionInput, type UpdateMinionInput, type CreateRelationInput,
  type MinionStatus, type MinionPriority, type RelationType,
  type ExecutionResult, type Executable,
  type ValidationError, type ValidationResult,

  // Validation
  validateField, validateFields,

  // Built-in Schemas (these are MinionType instances you can reuse)
  noteType, linkType, fileType, contactType,
  agentType, teamType, thoughtType, promptTemplateType, testCaseType, taskType,
  builtinTypes,

  // Registry — stores and retrieves MinionTypes by id or slug
  TypeRegistry,

  // Relations — in-memory graph with traversal utilities
  RelationGraph,

  // Lifecycle — create, update, soft-delete, hard-delete, restore
  createMinion, updateMinion, softDelete, hardDelete, restoreMinion,

  // Evolution — migrate minions when schemas change
  migrateMinion,

  // Utilities
  generateId, now, SPEC_VERSION,
} from 'minions-sdk';
```

**Python SDK — Core Imports:**
```python
from minions import (
    # Types
    Minion, MinionType, Relation, FieldDefinition, FieldValidation,
    CreateMinionInput, UpdateMinionInput, CreateRelationInput,
    ExecutionResult, Executable, ValidationError, ValidationResult,
    # Validation
    validate_field, validate_fields,
    # Built-in Schemas (10 types)
    note_type, link_type, file_type, contact_type,
    agent_type, team_type, thought_type, prompt_template_type,
    test_case_type, task_type, builtin_types,
    # Registry
    TypeRegistry,
    # Relations
    RelationGraph,
    # Lifecycle
    create_minion, update_minion, soft_delete, hard_delete, restore_minion,
    # Evolution
    migrate_minion,
    # Utilities
    generate_id, now, SPEC_VERSION,
)
```

**Key Concepts:**
- A `MinionType` defines a schema (list of `FieldDefinition`s) — each field has `name`, `type`, `label`, `required`, `defaultValue`, `options`, `validation`
- A `Minion` is an instance with `id`, `title`, `minionTypeId`, `fields` (dict), `status`, `tags`, timestamps
- A `Relation` is a typed directional link (12 types: `parent_of`, `depends_on`, `implements`, `relates_to`, `inspired_by`, `triggers`, `references`, `blocks`, `alternative_to`, `part_of`, `follows`, `integration_link`)
- Field types: `string`, `number`, `boolean`, `date`, `select`, `multi-select`, `url`, `email`, `textarea`, `tags`, `json`, `array`
- `TypeRegistry` auto-loads 10 built-in types (note, link, file, contact, agent, team, thought, prompt-template, test-case, task)
- `createMinion(input, type)` validates fields against the schema and returns `(minion, validationResult)`
- Both SDKs serialize to identical camelCase JSON — Python provides `to_dict()` / `from_dict()` for conversion

**Creating Custom MinionTypes:**
```typescript
// TypeScript — define new types for this project, register them alongside built-ins
const registry = new TypeRegistry(); // auto-loads 10 built-in types
registry.register({
  id: 'custom-agent-run', name: 'Agent Run', slug: 'agent-run',
  schema: [
    { name: 'input', type: 'json', label: 'Input', required: true },
    { name: 'output', type: 'json', label: 'Output' },
    { name: 'duration', type: 'number', label: 'Duration (ms)' },
    { name: 'success', type: 'boolean', label: 'Success' },
  ],
  isSystem: false,
});
```
```python
# Python — same pattern
from minions import MinionType, FieldDefinition, TypeRegistry, create_minion

registry = TypeRegistry()  # auto-loads 10 built-in types
registry.register(MinionType(
    id="custom-agent-run", name="Agent Run", slug="agent-run",
    schema=[
        FieldDefinition(name="input", type="json", label="Input", required=True),
        FieldDefinition(name="output", type="json", label="Output"),
        FieldDefinition(name="duration", type="number", label="Duration (ms)"),
        FieldDefinition(name="success", type="boolean", label="Success"),
    ],
))
```

**IMPORTANT:** Do NOT recreate these primitives. Import them from `minions-sdk` (npm) / `minions` (PyPI). Build domain-specific types and utilities ON TOP of the SDK.

---

**WHAT YOU NEED TO CREATE**

**1. THE SPECIFICATION** (`/spec`)

Write a complete markdown specification document covering:

- Motivation — why structured agents matter, the problem with unstructured agent definitions
- Core minion type schemas with all required and optional fields:
  - `agent` — `role`, `model`, `systemPrompt`, `temperature`, `maxTokens`, `tools`, `skills`, `memoryConfig`
  - `skill` — `name`, `description`, `inputSchema`, `outputSchema`, `implementation`, `dependencies`
  - `tool` — `name`, `type` (api|function|command), `config`, `schema`
  - `memory-entry` — `agentId`, `content`, `type` (thought|observation|decision), `timestamp`, `embedding`, `importance`
  - `agent-run` — `agentId`, `input`, `output`, `duration`, `tokensUsed`, `success`, `error`, `trace`
  - `benchmark` — `name`, `testCases`, `passingCriteria`, `targetAgentType`
  - `benchmark-result` — `benchmarkId`, `agentId`, `score`, `passed`, `failures`, `runAt`
  - `orchestration` — `strategy` (sequential|parallel|dag), `agents`, `flowDefinition`, `sharedContext`
  - `agent-team` — `name`, `members` (agent IDs), `sharedMemory`, `coordinationRules`
- Relation patterns — how agents link to skills (`implements`), tools (`depends_on`), memory (`references`), runs (`parent_of`)
- Memory lifecycle — creation, retrieval, pruning, forgetting
- Execution contract — what it means to run an agent
- Benchmark evaluation rules — how scores are calculated, what constitutes a pass
- Orchestration strategies — sequential, parallel, DAG, event-driven
- Template library structure — how templates are defined and instantiated

**2. THE CORE LIBRARY** (`/packages/core`)

A framework-agnostic TypeScript library implementing both TypeScript and Python SDKs. Must include:

**TypeScript SDK:**
- Full type definitions for all nine core minion types
- `AgentBuilder` fluent API:
  ```typescript
  new AgentBuilder()
    .withRole('researcher')
    .withModel('gpt-4')
    .withSkill(skillMinion)
    .withMemory(thoughtMinion)
    .withPrompt(promptMinion)
    .build()
  ```
- `AgentExporter` serializing full agent tree to JSON, YAML, or portable format
- `MemoryExplorer` class with:
  - `timeline(agentId)` — chronological memory sequence
  - `cluster(agentId)` — semantic grouping of memories
  - `forget(agentId, before)` — prune memories before a date
  - `search(agentId, query)` — semantic search over memory
- `OrchestrationGraph` extending base `RelationGraph` with:
  - `topologicalSort()` — execution order for DAG workflows
  - `parallelBatches()` — groups of agents that can run concurrently
  - `criticalPath()` — longest dependency chain
- `BenchmarkRunner` executing test suites and writing results as `benchmark-result` minions
- Agent template library in `templates/` directory with pre-built agents:
  - `researcher` — web search, summarization, citation skills
  - `writer` — content creation, editing, tone adjustment
  - `coder` — code generation, review, refactoring
  - `analyst` — data analysis, chart generation, insight extraction
- Validation utilities for all schemas
- Full JSDoc documentation

**Python SDK:**
- Complete Python equivalents of all TypeScript classes
- `AgentBuilder` using Python builder pattern
- `MemoryExplorer` with identical API surface
- `OrchestrationGraph` inheriting from base graph utilities
- `BenchmarkRunner` with async execution support
- Template loading and instantiation
- Cross-language interop — Python agents can load TypeScript-defined templates and vice versa

**3. THE CLI** (`/packages/cli`)

A command-line tool called `agents` with visual tree output using box-drawing characters. Must support:

- `agents scaffold --template researcher` — create new agent from template
- `agents validate <agent-file>` — validate agent definition against schema
- `agents export <id> --format yaml` — export agent tree to portable format
- `agents memory show <agent-id>` — display memory timeline with visual formatting
- `agents memory prune <agent-id> --before 2025-01-01` — delete old memories
- `agents run <agent-id> --input "research quantum computing"` — execute agent and record run
- `agents benchmark <agent-id> --suite <benchmark-id>` — run benchmark suite
- `agents orchestrate build --agents a,b,c --strategy sequential` — create orchestration
- `agents orchestrate run <orchestration-id>` — execute multi-agent workflow
- `agents team create --members a,b,c` — create agent team
- `agents tree <agent-id>` — visualize full agent structure as ASCII tree

Visual output should use box-drawing characters (├──, └──, │, ─) for tree visualization and colored output for status indicators.

**4. THE DOCUMENTATION SITE** (`/apps/docs`)

Built with Astro Starlight. Must include:

- Landing page positioning Agent Studio as the foundation for agent development
- Getting started guide:
  - Install SDK
  - Create first agent
  - Add skills and tools
  - Run agent
  - View results
- Core concepts section:
  - What is an agent (vs generic minion)?
  - Skills vs tools
  - Memory architecture
  - Benchmarking philosophy
  - Orchestration strategies
- Dual-language code examples throughout — every code block should show both TypeScript and Python with tabs
- API reference for both SDKs auto-generated from source
- Template library showcase with full examples
- Memory management guide:
  - When to prune
  - Semantic clustering
  - Importance scoring
- Orchestration patterns guide:
  - Sequential workflows
  - Parallel execution
  - DAG dependencies
  - Event-driven coordination
- Benchmark writing guide with examples
- Agent design best practices
- Cross-SDK interop guide explaining how TypeScript and Python can share agent definitions

**5. THE WEB PLAYGROUND** (`/apps/web`)

Optional but recommended — a visual agent builder and tester:

- Agent tree visualization
- Interactive agent builder UI
- Memory timeline viewer
- Benchmark results dashboard
- Orchestration flow diagram
- Live agent execution with streaming output

**6. THE PROJECT STRUCTURE**

Standard monorepo following the canonical Minions pattern:

```
minions-agents/
├── packages/
│   ├── core/              # Dual TypeScript + Python SDK
│   │   ├── src/
│   │   │   ├── typescript/
│   │   │   │   ├── agent-builder.ts
│   │   │   │   ├── memory-explorer.ts
│   │   │   │   ├── orchestration-graph.ts
│   │   │   │   ├── benchmark-runner.ts
│   │   │   │   └── index.ts
│   │   │   └── python/
│   │   │       ├── minions_agents/
│   │   │       │   ├── agent_builder.py
│   │   │       │   ├── memory_explorer.py
│   │   │       │   ├── orchestration_graph.py
│   │   │       │   ├── benchmark_runner.py
│   │   │       │   └── __init__.py
│   │   │       └── setup.py
│   │   └── templates/
│   │       ├── researcher.json
│   │       ├── writer.json
│   │       ├── coder.json
│   │       └── analyst.json
│   └── cli/               # CLI tool (supports both SDKs)
│       ├── src/
│       │   ├── commands/
│       │   ├── utils/
│       │   └── index.ts
│       └── package.json
├── apps/
│   ├── docs/              # Astro Starlight with dual-language tabs
│   └── web/               # Optional playground
├── spec/
│   └── v0.1.md
├── examples/
│   ├── simple-agent/
│   ├── nested-agent/
│   ├── agent-team/
│   ├── memory-timeline/
│   ├── orchestration-sequential/
│   └── benchmark-suite/
├── README.md
├── LICENSE                # AGPL-3.0
└── package.json           # workspace root
```

---

**BEYOND THE STANDARD PATTERN**

This project includes specialized classes not in the base SDK:

**AgentBuilder (TypeScript & Python)**
Fluent API for constructing complex agent definitions without manually building nested minion structures. Should support method chaining, validation at each step, and final `.build()` that returns a complete agent minion.

**AgentExporter (TypeScript & Python)**
Serializes an entire agent tree (agent + all related skills, tools, memory, runs) to portable formats. Must support JSON, YAML, and a compressed archive format for full agent snapshots.

**MemoryExplorer (TypeScript & Python)**
Advanced memory querying and management. Beyond basic CRUD, this class provides timeline reconstruction, semantic clustering, importance-based filtering, and pruning strategies. Critical for long-running agents.

**OrchestrationGraph (TypeScript & Python)**
Extends the base `RelationGraph` with agent-specific workflow algorithms: topological sort for execution ordering, parallel batch detection, critical path analysis. This is how multi-agent systems coordinate.

**BenchmarkRunner (TypeScript & Python)**
Automated testing infrastructure for agents. Loads benchmark minions, executes test cases against agents, scores results, and writes structured `benchmark-result` minions. Supports async execution and result aggregation.

**Visual Tree Output**
The CLI must include beautiful tree visualization using box-drawing characters. This is not just aesthetic — it's functional. Agents can be complex nested structures, and visual inspection is critical for debugging.

**Template Library**
Pre-built agent templates in `templates/` directory. Each template is a complete agent definition (minion JSON) ready to instantiate. Templates can include placeholder variables that are filled at instantiation time.

---

**CLI COMMANDS REFERENCE**

```bash
# Agent Creation & Management
agents scaffold --template researcher
agents validate research-agent.json
agents export agt_abc123 --format yaml
agents tree agt_abc123

# Memory Operations
agents memory show agt_abc123
agents memory prune agt_abc123 --before 2025-01-01
agents memory cluster agt_abc123
agents memory search agt_abc123 "quantum computing"

# Execution
agents run agt_abc123 --input "research quantum computing"
agents run agt_abc123 --input-file input.txt --output-file result.json

# Benchmarking
agents benchmark agt_abc123 --suite bench_xyz789
agents benchmark agt_abc123 --suite bench_xyz789 --report-file report.json

# Orchestration
agents orchestrate build --agents a,b,c --strategy sequential
agents orchestrate build --agents a,b,c --strategy parallel
agents orchestrate build --agents a,b,c --strategy dag --flow flow.json
agents orchestrate run orch_def456

# Teams
agents team create --members a,b,c --name "Research Team"
agents team show team_ghi789
```

---

**TECHNICAL REQUIREMENTS**

**Dual SDK Implementation:**
- TypeScript SDK in `packages/core/src/typescript/`
- Python SDK in `packages/core/src/python/minions_agents/`
- Both SDKs must have feature parity
- Cross-SDK interop via JSON serialization
- Shared type schemas as JSON files in `packages/core/schemas/`

**Cross-SDK Interop:**
- Agent definitions created in TypeScript can be loaded in Python
- Memory entries written in Python are readable in TypeScript
- Benchmark results are SDK-agnostic
- Template library is shared across both SDKs

**Documentation:**
- Every code example in dual-language tabs (TypeScript | Python)
- API reference generated from both TypeScript JSDoc and Python docstrings
- Installation instructions for both npm and pip
- Migration guides between SDKs

**Testing:**
- TypeScript: Jest + unit tests for all classes
- Python: pytest + unit tests for all classes
- Cross-SDK integration tests ensuring interop works
- CLI tests for all commands
- Example validation tests

---

**DELIVERABLES**

Produce all files necessary to bootstrap this project completely. Every file should be production quality — not stubs, not placeholders.

1. **Complete specification** in `/spec/v0.1.md` — detailed enough to implement from
2. **Dual SDK implementation** — TypeScript and Python with full feature parity
3. **Fully functional CLI** with all commands implemented and visual tree output
4. **Complete documentation site** with dual-language examples throughout
5. **Template library** with four production-ready agent templates
6. **Example projects** demonstrating all core features
7. **Comprehensive README** positioning Agent Studio clearly
8. **Full test suite** for both SDKs and CLI
9. **CI/CD configuration** for dual-language builds and releases

---

**TONE AND POSITIONING**

This is serious infrastructure for serious agent builders. The target audience is AI engineers building production agent systems. The value proposition is clear: structured, introspectable, evolvable agent definitions with built-in memory management, testing, and orchestration.

Avoid toy examples. Show real agents doing real work. The researcher template should demonstrate actual web search and citation. The coder template should show real code generation and review. The benchmarks should test real capabilities.

The documentation should speak directly to developers who have built agents before and felt the pain of unstructured definitions, opaque memory, and manual orchestration. Agent Studio solves those problems.

---

**RELATIONSHIP TO MINIONS-SDK**

`minions-agents` is built on top of `minions-sdk`. It imports the core SDK for minion primitives, type registry, relation graph, and field validation. It extends those primitives with agent-specific types and utilities.

Users should install both:
```bash
npm install minions-sdk minions-agents
pip install minions-sdk minions-agents
```

The core SDK provides the foundation. `minions-agents` provides the agent-specific layer.

---

**START HERE**

Begin with the specification. Define the nine core minion types with complete schemas. Then implement the TypeScript SDK classes (`AgentBuilder`, `MemoryExplorer`, `OrchestrationGraph`, `BenchmarkRunner`). Mirror those in Python. Build the CLI on top of both SDKs. Create the templates. Write the docs with dual-language examples. Build the examples. Work systematically.

This is the centerpiece of the Minions ecosystem. Make it excellent.
