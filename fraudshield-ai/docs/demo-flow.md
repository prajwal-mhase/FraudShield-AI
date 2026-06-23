# Demo Flow

This document describes the recommended live demo sequence for FraudShield AI.

The goal is to show not only that the product detects fraud, but that it explains the decision, reveals the fraud network, supports an investigator, and accelerates compliance reporting.

## Demo Narrative

FraudShield AI is positioned as an enterprise fraud intelligence platform where multiple specialist agents collaborate to produce a decision that an analyst can actually trust and act on.

## Suggested Live Walkthrough

1. Start on the login screen and enter the demo workspace using `analyst@fraudshield.ai`.
2. Open the Fraud Command Center and highlight the command-center layout, impact metrics, live threat signals, and agent pipeline.
3. Move to Live Transaction Stream and analyze the normal transaction scenario.
4. Show that the normal transaction receives a low-risk decision and minimal intervention.
5. Trigger the fraud scenario using `TX-FRAUD-001`.
6. Walk through the decision trace and explain that multiple independent agents converged on the same conclusion.
7. Open the Fraud Ring Graph and show linked accounts, shared device reuse, and suspicious IP infrastructure.
8. Open the Investigator Workbench and create a case from the critical alert.
9. Review the evidence pack and investigation timeline.
10. Open Compliance Report Studio and generate the SAR draft.
11. Finish in AI Copilot and ask why `TX-FRAUD-001` was blocked.

## What To Emphasize

- this is not a single fraud score
- the system separates transaction risk, behavior risk, and network risk
- explainability is part of the product, not an afterthought
- the workflow continues from detection to investigation to reporting

## Key Demo Scenario

Use the following fraud example during the presentation:

- transaction ID: `TX-FRAUD-001`
- account ID: `ACC-1044`
- amount: `185000`
- country: `NG`
- device ID: `DEV-993`
- IP address: `45.14.88.1`

This scenario is intentionally designed to trigger:

- high transaction risk
- behavior anomaly
- network-link detection
- escalation and SAR recommendation

## Presenter Script

Use this short framing if you want a tight narrative:

> FraudShield AI does not stop at flagging a payment. It coordinates specialist agents. One agent looks at transaction risk, another checks behavioral deviation, another traces networked fraud signals, another explains the decision, and the orchestrator turns that into an action an investigator can use immediately.

## Demo Tips

- keep the normal transaction brief
- spend most of the time on the fraud-ring flow
- use the graph and workbench as the visual payoff
- close with SAR generation and copilot explanation

