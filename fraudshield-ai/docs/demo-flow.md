# Judge Demo Flow

1. Login with `analyst@fraudshield.ai` / `demo123`.
2. Dashboard shows INR-style fraud prevented metric, high-risk alerts, agent activity, trend chart, and heatmap.
3. Open Live Transactions and submit normal transaction `TX-NORMAL-001`.
4. Submit fraud transaction `TX-FRAUD-001` with amount `185000`, country `NG`, device `DEV-993`, IP `45.14.88.1`.
5. Show multi-agent result: transaction, behavior, and network agents all agree.
6. Open Fraud Network Graph for `ACC-1044`; show shared device, risky IP, mule chain.
7. Open Investigator Workbench; create case from alert.
8. Ask AI Copilot: "Why was TX-FRAUD-001 blocked?"
9. Generate SAR draft in Compliance Reports.
10. Return to dashboard and show business impact: fraud prevented and alerts.

Judge script:

"FraudShield AI does not just say fraud or not fraud. It coordinates specialist agents. One agent checks transaction risk, one compares behavior, one searches networks, one explains the decision, and one escalates the right workflow. The demo shows a normal approval, then a high-risk fraud ring transaction, then an analyst-ready case and SAR draft."

