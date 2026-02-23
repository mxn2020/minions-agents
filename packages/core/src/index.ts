/**
 * Minions Agents SDK
 *
 * Agent definitions, runs, traces, and approval requests for the agent fleet
 *
 * @module @minions-agents/sdk
 */

export const VERSION = '0.1.0';

/**
 * Example: Create a client instance for Minions Agents.
 * Replace this with your actual SDK entry point.
 */
export function createClient(options = {}) {
    return {
        version: VERSION,
        ...options,
    };
}

export * from './schemas/index.js';
