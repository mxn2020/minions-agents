/**
 * @module @minions-agents/sdk/schemas
 * Custom MinionType schemas for Minions Agents.
 */

import type { MinionType } from 'minions-sdk';

export const agentdefinitionType: MinionType = {
  id: 'agents-agent-definition',
  name: 'Agent definition',
  slug: 'agent-definition',
  description: 'A structured definition of an AI agent including its role, model, and policies.',
  icon: '🤖',
  schema: [
    { name: 'name', type: 'string', label: 'name' },
    { name: 'role', type: 'select', label: 'role' },
    { name: 'model', type: 'string', label: 'model' },
    { name: 'soulRef', type: 'string', label: 'soulRef' },
    { name: 'skillsRef', type: 'string', label: 'skillsRef' },
    { name: 'toolPolicy', type: 'string', label: 'toolPolicy' },
    { name: 'maxTokensPerRun', type: 'number', label: 'maxTokensPerRun' },
    { name: 'maxCostPerDay', type: 'number', label: 'maxCostPerDay' },
    { name: 'status', type: 'select', label: 'status' },
    { name: 'ownerId', type: 'string', label: 'ownerId' },
    { name: 'createdAt', type: 'string', label: 'createdAt' },
  ],
};

export const agentrunType: MinionType = {
  id: 'agents-agent-run',
  name: 'Agent run',
  slug: 'agent-run',
  description: 'A single execution instance of an agent with full trace and cost.',
  icon: '▶️',
  schema: [
    { name: 'agentId', type: 'string', label: 'agentId' },
    { name: 'triggeredAt', type: 'string', label: 'triggeredAt' },
    { name: 'completedAt', type: 'string', label: 'completedAt' },
    { name: 'inputs', type: 'string', label: 'inputs' },
    { name: 'outputs', type: 'string', label: 'outputs' },
    { name: 'toolCallsLog', type: 'string', label: 'toolCallsLog' },
    { name: 'tokensUsed', type: 'number', label: 'tokensUsed' },
    { name: 'cost', type: 'number', label: 'cost' },
    { name: 'status', type: 'select', label: 'status' },
    { name: 'errorMessage', type: 'string', label: 'errorMessage' },
  ],
};

export const agentmessageType: MinionType = {
  id: 'agents-agent-message',
  name: 'Agent message',
  slug: 'agent-message',
  description: 'A message passed between agents on the internal message bus.',
  icon: '📨',
  schema: [
    { name: 'fromAgentId', type: 'string', label: 'fromAgentId' },
    { name: 'toAgentId', type: 'string', label: 'toAgentId' },
    { name: 'type', type: 'string', label: 'type' },
    { name: 'payload', type: 'string', label: 'payload' },
    { name: 'sentAt', type: 'string', label: 'sentAt' },
    { name: 'status', type: 'select', label: 'status' },
  ],
};

export const platformruleType: MinionType = {
  id: 'agents-platform-rule',
  name: 'Platform rule',
  slug: 'platform-rule',
  description: 'A platform-specific rule governing what automation is permitted.',
  icon: '📜',
  schema: [
    { name: 'platform', type: 'select', label: 'platform' },
    { name: 'ruleType', type: 'select', label: 'ruleType' },
    { name: 'description', type: 'string', label: 'description' },
    { name: 'maxActionsPerDay', type: 'number', label: 'maxActionsPerDay' },
    { name: 'forbiddenActions', type: 'string', label: 'forbiddenActions' },
    { name: 'isActive', type: 'boolean', label: 'isActive' },
  ],
};

export const customTypes: MinionType[] = [
  agentdefinitionType,
  agentrunType,
  agentmessageType,
  platformruleType,
];

