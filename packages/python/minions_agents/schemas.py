"""
Minions Agents SDK — Type Schemas
Custom MinionType schemas for Minions Agents.
"""

from minions.types import FieldDefinition, FieldValidation, MinionType

agent_definition_type = MinionType(
    id="agents-agent-definition",
    name="Agent definition",
    slug="agent-definition",
    description="A structured definition of an AI agent including its role, model, and policies.",
    icon="🤖",
    schema=[
        FieldDefinition(name="name", type="string", label="name"),
        FieldDefinition(name="role", type="select", label="role"),
        FieldDefinition(name="model", type="string", label="model"),
        FieldDefinition(name="soulRef", type="string", label="soulRef"),
        FieldDefinition(name="skillsRef", type="string", label="skillsRef"),
        FieldDefinition(name="toolPolicy", type="string", label="toolPolicy"),
        FieldDefinition(name="maxTokensPerRun", type="number", label="maxTokensPerRun"),
        FieldDefinition(name="maxCostPerDay", type="number", label="maxCostPerDay"),
        FieldDefinition(name="status", type="select", label="status"),
        FieldDefinition(name="ownerId", type="string", label="ownerId"),
        FieldDefinition(name="createdAt", type="string", label="createdAt"),
    ],
)

agent_run_type = MinionType(
    id="agents-agent-run",
    name="Agent run",
    slug="agent-run",
    description="A single execution instance of an agent with full trace and cost.",
    icon="▶️",
    schema=[
        FieldDefinition(name="agentId", type="string", label="agentId"),
        FieldDefinition(name="triggeredAt", type="string", label="triggeredAt"),
        FieldDefinition(name="completedAt", type="string", label="completedAt"),
        FieldDefinition(name="inputs", type="string", label="inputs"),
        FieldDefinition(name="outputs", type="string", label="outputs"),
        FieldDefinition(name="toolCallsLog", type="string", label="toolCallsLog"),
        FieldDefinition(name="tokensUsed", type="number", label="tokensUsed"),
        FieldDefinition(name="cost", type="number", label="cost"),
        FieldDefinition(name="status", type="select", label="status"),
        FieldDefinition(name="errorMessage", type="string", label="errorMessage"),
    ],
)

agent_message_type = MinionType(
    id="agents-agent-message",
    name="Agent message",
    slug="agent-message",
    description="A message passed between agents on the internal message bus.",
    icon="📨",
    schema=[
        FieldDefinition(name="fromAgentId", type="string", label="fromAgentId"),
        FieldDefinition(name="toAgentId", type="string", label="toAgentId"),
        FieldDefinition(name="type", type="string", label="type"),
        FieldDefinition(name="payload", type="string", label="payload"),
        FieldDefinition(name="sentAt", type="string", label="sentAt"),
        FieldDefinition(name="status", type="select", label="status"),
    ],
)

platform_rule_type = MinionType(
    id="agents-platform-rule",
    name="Platform rule",
    slug="platform-rule",
    description="A platform-specific rule governing what automation is permitted.",
    icon="📜",
    schema=[
        FieldDefinition(name="platform", type="select", label="platform"),
        FieldDefinition(name="ruleType", type="select", label="ruleType"),
        FieldDefinition(name="description", type="string", label="description"),
        FieldDefinition(name="maxActionsPerDay", type="number", label="maxActionsPerDay"),
        FieldDefinition(name="forbiddenActions", type="string", label="forbiddenActions"),
        FieldDefinition(name="isActive", type="boolean", label="isActive"),
    ],
)

custom_types: list[MinionType] = [
    agent_definition_type,
    agent_run_type,
    agent_message_type,
    platform_rule_type,
]

