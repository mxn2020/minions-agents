"""
Minions Agents Python SDK

Agent definitions, runs, traces, and approval requests for the agent fleet
"""

__version__ = "0.1.0"


def create_client(**kwargs):
    """Create a client for Minions Agents.

    Args:
        **kwargs: Configuration options.

    Returns:
        dict: Client configuration.
    """
    return {
        "version": __version__,
        **kwargs,
    }

from .schemas import *
