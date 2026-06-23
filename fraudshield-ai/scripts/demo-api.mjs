import http from "node:http";

const PORT = process.env.PORT || 8000;

const alerts = [
  {
    id: "ALT-9001",
    transaction_id: "TX-FRAUD-001",
    account_id: "ACC-1044",
    risk_score: 94,
    severity: "critical",
    status: "open",
    title: "Unusual high-value transfer to mule-linked account",
    created_at: new Date().toISOString(),
  },
  {
    id: "ALT-9002",
    transaction_id: "TX-FRAUD-017",
    account_id: "ACC-2210",
    risk_score: 87,
    severity: "high",
    status: "triage",
    title: "Velocity spike across new device and foreign IP",
    created_at: new Date().toISOString(),
  },
];

function json(res, status, body) {
  res.writeHead(status, {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type,authorization",
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => body += chunk);
    req.on("end", () => resolve(body ? JSON.parse(body) : {}));
  });
}

function analyze(tx) {
  const signals = [
    signal("Transaction Sentinel", tx.amount > 100000 ? 98 : 14, tx.amount > 100000 ? ["Amount is materially above normal threshold", "Remote crypto-style payment risk"] : ["Transaction is within baseline rules"]),
    signal("Behavioral Profiler", tx.device_id === "DEV-993" ? 74 : 12, tx.device_id === "DEV-993" ? ["Device is new or shared by suspicious accounts", "Amount deviates from normal range"] : ["Behavior matches customer profile"]),
    signal("Network Analyst", tx.account_id === "ACC-1044" ? 93 : 8, tx.account_id === "ACC-1044" ? ["Account appears in mule-ring cluster", "IP subnet linked to suspicious activity"] : ["No risky network links detected"]),
  ];
  const risk_score = Math.round(signals.reduce((sum, item) => sum + item.score, 0) / signals.length);
  const decision = risk_score >= 85 ? "block_and_escalate" : risk_score >= 65 ? "hold_for_review" : risk_score >= 40 ? "step_up_auth" : "approve";
  return {
    transaction_id: tx.transaction_id,
    risk_score,
    risk_level: risk_score >= 85 ? "critical" : risk_score >= 65 ? "high" : risk_score >= 40 ? "medium" : "low",
    decision,
    agent_signals: signals,
    recommended_actions: decision === "block_and_escalate" ? ["Create critical alert", "Open case", "Generate SAR draft"] : ["Log decision"],
    explanation: `Risk score ${risk_score}/100. Key drivers: ${signals.flatMap((s) => s.reasons).slice(0, 4).join("; ")}`,
  };
}

function signal(agent, score, reasons) {
  return { agent, score, label: agent.toLowerCase().replaceAll(" ", "_"), reasons };
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return json(res, 200, {});
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);
  if (req.method === "POST" && url.pathname === "/auth/login") {
    return json(res, 200, { access_token: "demo.jwt.token", token_type: "bearer", user: { id: "USR-1", name: "Aarav Mehta", role: "Senior Fraud Analyst" } });
  }
  if (req.method === "POST" && url.pathname === "/transaction/analyze") {
    return json(res, 200, analyze(await readBody(req)));
  }
  if (req.method === "GET" && url.pathname === "/alerts") return json(res, 200, alerts);
  if (req.method === "GET" && url.pathname === "/dashboard/stats") {
    return json(res, 200, {
      fraud_prevented: 1845000,
      transactions_analyzed: 10000,
      high_risk_alerts: 37,
      active_cases: 12,
      agent_activity: [
        { name: "Transaction Sentinel", events: 10000 },
        { name: "Behavioral Profiler", events: 8420 },
        { name: "Network Analyst", events: 534 },
        { name: "Explainability Agent", events: 228 },
        { name: "Escalation Orchestrator", events: 91 },
      ],
      risk_trends: [18, 22, 19, 28, 35, 31, 44, 39, 52, 48, 61, 57],
      heatmap: [{ country: "IN", risk: 31 }, { country: "US", risk: 24 }, { country: "NG", risk: 72 }, { country: "SG", risk: 41 }, { country: "AE", risk: 63 }],
    });
  }
  if (req.method === "POST" && url.pathname === "/case/create") {
    const body = await readBody(req);
    return json(res, 200, { id: "CASE-1001", status: "open", created_at: new Date().toISOString(), ...body });
  }
  if (req.method === "GET" && url.pathname.startsWith("/network/")) {
    return json(res, 200, {
      account_id: url.pathname.split("/").pop(),
      nodes: [
        { id: "ACC-1044", label: "Origin", risk: 94 },
        { id: "ACC-6621", label: "Mule A", risk: 91 },
        { id: "ACC-7782", label: "Mule B", risk: 88 },
        { id: "DEV-993", label: "Shared Device", risk: 82 },
        { id: "IP-45.14.88.1", label: "Risk IP", risk: 76 },
      ],
      edges: [
        { source: "ACC-1044", target: "ACC-6621", reason: "rapid transfer" },
        { source: "ACC-6621", target: "ACC-7782", reason: "layering" },
        { source: "ACC-1044", target: "DEV-993", reason: "device match" },
        { source: "ACC-7782", target: "IP-45.14.88.1", reason: "ip reuse" },
      ],
    });
  }
  if (req.method === "POST" && url.pathname === "/reports/sar") {
    const body = await readBody(req);
    return json(res, 200, {
      report_id: `SAR-${body.case_id}`,
      generated_at: new Date().toISOString(),
      status: "draft",
      sections: {
        summary: "Suspicious activity detected by multi-agent analysis.",
        narrative: body.narrative,
        recommended_filing: "File SAR within internal compliance SLA.",
        analyst: body.analyst,
      },
    });
  }
  json(res, 404, { detail: "Not found" });
});

server.listen(PORT, () => console.log(`FraudShield demo API running on http://127.0.0.1:${PORT}`));

