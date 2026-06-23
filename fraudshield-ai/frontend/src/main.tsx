import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileText,
  Fingerprint,
  Gauge,
  GitBranch,
  Globe2,
  Layers3,
  LogIn,
  Network,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import "./styles.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

type Page = "login" | "dashboard" | "live" | "alerts" | "workbench" | "network" | "reports" | "copilot";

const nav = [
  ["dashboard", Gauge, "Command Center"],
  ["live", Activity, "Live Stream"],
  ["alerts", AlertTriangle, "Alert Queue"],
  ["workbench", ShieldCheck, "Workbench"],
  ["network", GitBranch, "Ring Graph"],
  ["reports", FileText, "Compliance"],
  ["copilot", Bot, "AI Copilot"],
] as const;

function App() {
  const [page, setPage] = useState<Page>("login");
  const [token, setToken] = useState("");

  if (!token) return <Login onLogin={(t) => { setToken(t); setPage("dashboard"); }} />;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark"><Radar size={22} /></span>
          <div>
            <strong>FraudShield AI</strong>
            <small>Autonomous fraud ops</small>
          </div>
        </div>
        <nav>
          {nav.map(([key, Icon, label]) => (
            <button className={page === key ? "active" : ""} onClick={() => setPage(key)} key={key}>
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-card">
          <div className="pulse-dot" />
          <span>Agent mesh online</span>
          <strong>5 specialist agents</strong>
        </div>
      </aside>
      <main className="workspace">
        <Topbar />
        {page === "dashboard" && <Dashboard />}
        {page === "live" && <LiveTransactions />}
        {page === "alerts" && <Alerts />}
        {page === "workbench" && <Workbench />}
        {page === "network" && <NetworkGraph />}
        {page === "reports" && <Reports />}
        {page === "copilot" && <Copilot />}
      </main>
    </div>
  );
}

function Topbar() {
  return (
    <div className="topbar">
      <div className="search"><Sparkles size={16} /> Ask, trace, explain, escalate...</div>
      <div className="topbar-status">
        <span><Clock3 size={15} /> 42ms median decision</span>
        <span><ShieldCheck size={15} /> SOC2 audit mode</span>
      </div>
    </div>
  );
}

function Login({ onLogin }: { onLogin: (token: string) => void }) {
  async function submit() {
    const data = await api("/auth/login", { email: "analyst@fraudshield.ai", password: "demo123" });
    onLogin(data.access_token);
  }
  return (
    <div className="login">
      <section className="login-copy">
        <div className="eyebrow"><Zap size={15} /> Multi-agent fraud intelligence</div>
        <h1>FraudShield AI</h1>
        <p>Real-time fraud detection, behavioral anomaly analysis, ring discovery, explainability, and SAR drafting in one analyst-grade command center.</p>
        <button onClick={submit}><LogIn size={18} /> Enter Demo Workbench</button>
      </section>
      <section className="login-visual" aria-hidden="true">
        <div className="radar-sweep">
          <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
          <span className="blip b1" /><span className="blip b2" /><span className="blip b3" />
        </div>
        <div className="login-stat s1"><strong>94</strong><span>critical risk</span></div>
        <div className="login-stat s2"><strong>5</strong><span>agents agree</span></div>
      </section>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState<any>();
  useEffect(() => { api("/dashboard/stats").then(setStats); }, []);
  if (!stats) return <Loading />;
  return (
    <>
      <Header title="Fraud Command Center" subtitle="Real-time decisioning, explainability, network intelligence, and compliance readiness." />
      <div className="metrics">
        <Metric icon={<ShieldAlert />} label="Fraud Prevented" value={`INR ${(stats.fraud_prevented / 100000).toFixed(1)}L`} trend="+18.4%" />
        <Metric icon={<Activity />} label="Transactions Analyzed" value={stats.transactions_analyzed.toLocaleString()} trend="live" />
        <Metric icon={<AlertTriangle />} label="High Risk Alerts" value={stats.high_risk_alerts} trend="-7 false positives" danger />
        <Metric icon={<Fingerprint />} label="Active Cases" value={stats.active_cases} trend="4 critical" />
      </div>
      <div className="hero-grid">
        <Panel title="Autonomous Agent Pipeline" wide>
          <div className="agent-flow">
            {stats.agent_activity.map((a: any, i: number) => (
              <React.Fragment key={a.name}>
                <div className="agent-node">
                  <BrainCircuit size={18} />
                  <strong>{a.name}</strong>
                  <span>{a.events.toLocaleString()} events</span>
                </div>
                {i < stats.agent_activity.length - 1 && <ArrowRight className="flow-arrow" size={18} />}
              </React.Fragment>
            ))}
          </div>
        </Panel>
        <Panel title="Threat Heat">
          <div className="heat-list">{stats.heatmap.map((h: any) => <RiskPill key={h.country} label={h.country} value={h.risk} />)}</div>
        </Panel>
      </div>
      <div className="grid three">
        <Panel title="Risk Trend">
          <div className="chart">{stats.risk_trends.map((v: number, i: number) => <span className="bar" style={{ height: `${Math.max(24, v * 2.2)}px` }} key={i} />)}</div>
        </Panel>
        <Panel title="Live Intelligence Feed">
          <Timeline items={["ACC-1044 joined mule-ring cluster", "DEV-993 reused across 8 accounts", "SAR draft recommended for CASE-1001"]} />
        </Panel>
        <Panel title="Decision Mix">
          <Donut score={74} label="auto-contained" />
        </Panel>
      </div>
    </>
  );
}

function LiveTransactions() {
  const [result, setResult] = useState<any>();
  const fraud = {
    transaction_id: "TX-FRAUD-001", account_id: "ACC-1044", customer_id: "CUST-1044",
    amount: 185000, merchant: "Crypto Rapid Exchange", merchant_category: "crypto",
    country: "NG", channel: "card_not_present", device_id: "DEV-993",
    ip_address: "45.14.88.1", timestamp: new Date().toISOString()
  };
  const normal = { ...fraud, transaction_id: "TX-NORMAL-001", account_id: "ACC-1001", customer_id: "CUST-1001", amount: 2199, merchant: "Urban Grocery", merchant_category: "grocery", country: "IN", channel: "upi", device_id: "DEV-111", ip_address: "103.21.1.10" };
  async function analyze(tx: any) {
    setResult(await api("/transaction/analyze", tx));
  }
  return (
    <>
      <Header title="Live Transaction Stream" subtitle="Inject realistic events and watch the agent mesh produce a decision trace." />
      <div className="transaction-console">
        <Panel title="Demo Transaction Controls">
          <div className="actions">
            <button onClick={() => analyze(normal)}><CheckCircle2 size={17} /> Analyze Normal</button>
            <button className="danger" onClick={() => analyze(fraud)}><ShieldAlert size={17} /> Analyze Fraud Ring Event</button>
          </div>
          <TransactionTable />
        </Panel>
        {result ? <Result result={result} /> : <Panel title="Decision Trace"><p className="muted">Select a transaction to activate the agent trace.</p></Panel>}
      </div>
    </>
  );
}

function Result({ result }: { result: any }) {
  return (
    <Panel title={`Decision: ${result.decision}`}>
      <div className="result-head">
        <Donut score={result.risk_score} label={result.risk_level} danger={result.risk_score > 70} />
        <p>{result.explanation}</p>
      </div>
      {result.agent_signals.map((s: any) => <AgentSignal signal={s} key={s.agent} />)}
      <div className="action-strip">{result.recommended_actions.map((a: string) => <span key={a}>{a}</span>)}</div>
    </Panel>
  );
}

function Alerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  useEffect(() => { api("/alerts").then(setAlerts); }, []);
  return (
    <>
      <Header title="Fraud Alert Queue" subtitle="Prioritized, explainable alerts with investigation readiness scoring." />
      <div className="alert-board">
        {alerts.map(a => (
          <section className="alert-card" key={a.id}>
            <div className="severity">{a.severity}</div>
            <h3>{a.title}</h3>
            <p>{a.transaction_id} | {a.account_id} | {a.status}</p>
            <div className="score-line"><span style={{ width: `${a.risk_score}%` }} /></div>
            <strong>{a.risk_score}/100 risk</strong>
          </section>
        ))}
      </div>
    </>
  );
}

function Workbench() {
  const [caseData, setCaseData] = useState<any>();
  async function createCase() {
    setCaseData(await api("/case/create", { alert_id: "ALT-9001", assigned_to: "Aarav Mehta", notes: "Critical demo investigation" }));
  }
  return (
    <>
      <Header title="Investigator Workbench" subtitle="Evidence, actions, timeline, and recommended next steps for analyst triage." />
      <div className="workbench">
        <Panel title="Case Intake">
          <button onClick={createCase}><Layers3 size={17} /> Create Case From Critical Alert</button>
          {caseData && <div className="case-banner"><strong>{caseData.id}</strong><span>{caseData.status} | Assigned to {caseData.assigned_to}</span></div>}
        </Panel>
        <Panel title="Evidence Pack">
          <Evidence label="Transaction" value="TX-FRAUD-001 | INR 185,000 | Crypto Rapid Exchange" />
          <Evidence label="Behavior" value="New device, unusual amount, unusual active hour" />
          <Evidence label="Network" value="Shared device DEV-993 and mule chain ACC-6621 to ACC-7782" />
        </Panel>
        <Panel title="Investigation Timeline">
          <Timeline items={["Alert generated by Transaction Sentinel", "Behavioral Profiler confirmed anomaly", "Network Analyst found mule-ring links", "SAR draft queued for compliance"]} />
        </Panel>
      </div>
    </>
  );
}

function NetworkGraph() {
  const [graph, setGraph] = useState<any>();
  useEffect(() => { api("/network/ACC-1044").then(setGraph); }, []);
  return (
    <>
      <Header title="Fraud Ring Graph" subtitle="Shared identifiers reveal account clusters, mule chains, device reuse, and risky infrastructure." />
      <div className="graph-layout">
        <section className="graph-stage">
          {graph?.nodes.map((n: any, i: number) => <div className={`graph-node n${i}`} key={n.id}><strong>{n.id}</strong><span>{n.label}</span><small>{n.risk} risk</small></div>)}
          <svg className="graph-lines" viewBox="0 0 900 430" preserveAspectRatio="none">
            <path d="M455 210 C330 120 230 110 145 145" />
            <path d="M455 210 C610 95 725 118 790 175" />
            <path d="M455 210 C285 300 240 330 160 345" />
            <path d="M455 210 C610 325 690 330 780 315" />
          </svg>
        </section>
        <Panel title="Relationship Evidence">
          {graph?.edges.map((e: any) => <p key={e.source + e.target}><b>{e.source}</b> to <b>{e.target}</b>: {e.reason}</p>)}
        </Panel>
      </div>
    </>
  );
}

function Reports() {
  const [sar, setSar] = useState<any>();
  async function generate() {
    setSar(await api("/reports/sar", { case_id: "CASE-1001", analyst: "Aarav Mehta", narrative: "High-value crypto transfer linked to shared device and mule-ring cluster." }));
  }
  return (
    <>
      <Header title="Compliance Report Studio" subtitle="Convert investigation evidence into regulator-ready SAR drafts." />
      <div className="report-layout">
        <Panel title="SAR Generator">
          <button onClick={generate}><FileText size={17} /> Generate SAR Draft</button>
          <Timeline items={["Identity and account context attached", "Agent explanations summarized", "Network evidence included", "Compliance narrative drafted"]} />
        </Panel>
        {sar && <Panel title={sar.report_id} wide><pre>{JSON.stringify(sar.sections, null, 2)}</pre></Panel>}
      </div>
    </>
  );
}

function Copilot() {
  const prompts = ["Why was TX-FRAUD-001 blocked?", "Which evidence supports SAR filing?", "What should the analyst do next?"];
  return (
    <>
      <Header title="AI Copilot" subtitle="Explain decisions, summarize evidence, and guide investigator action." />
      <div className="copilot">
        <Panel title="Suggested Questions">
          {prompts.map(p => <button className="ghost" key={p}>{p}</button>)}
        </Panel>
        <Panel title="Copilot Answer" wide>
          <div className="chat-answer">
            <Bot />
            <p><b>TX-FRAUD-001 was blocked because three independent agents converged.</b> Transaction Sentinel flagged a high-value remote crypto transaction, Behavioral Profiler found a new shared device and abnormal amount, and Network Analyst linked the account to a mule-ring cluster. Recommended actions: hold funds, contact the customer through a verified channel, open a case, and generate a SAR draft.</p>
          </div>
        </Panel>
      </div>
    </>
  );
}

function TransactionTable() {
  return (
    <div className="tx-table">
      {[
        ["TX-NORMAL-001", "ACC-1001", "INR 2,199", "low", "approve"],
        ["TX-FRAUD-001", "ACC-1044", "INR 185,000", "critical", "block"],
        ["TX-FRAUD-017", "ACC-2210", "INR 92,400", "high", "review"],
      ].map(row => <div className="tx-row" key={row[0]}>{row.map(cell => <span key={cell}>{cell}</span>)}</div>)}
    </div>
  );
}

function AgentSignal({ signal }: { signal: any }) {
  return (
    <div className="signal">
      <div><BrainCircuit size={16} /><b>{signal.agent}</b></div>
      <strong>{signal.score}</strong>
      <p>{signal.reasons.join("; ")}</p>
    </div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return <header className="page-header"><div><h1>{title}</h1><p>{subtitle}</p></div><span className="mode-badge"><Globe2 size={15} /> Demo SOC live</span></header>;
}

function Metric({ icon, label, value, trend, danger }: { icon: React.ReactNode; label: string; value: any; trend: string; danger?: boolean }) {
  return <div className={`metric ${danger ? "danger-metric" : ""}`}><div className="metric-icon">{icon}</div><span>{label}</span><b>{value}</b><small>{trend}</small></div>;
}

function Panel({ title, children, wide }: { title: string; children: React.ReactNode; wide?: boolean }) {
  return <section className={`panel ${wide ? "wide" : ""}`}><h3>{title}</h3>{children}</section>;
}

function Donut({ score, label, danger }: { score: number; label: string; danger?: boolean }) {
  return <div className={`donut ${danger ? "danger-donut" : ""}`} style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}><strong>{score}</strong><span>{label}</span></div>;
}

function RiskPill({ label, value }: { label: string; value: number }) {
  return <div className="risk-pill"><span>{label}</span><div><i style={{ width: `${value}%` }} /></div><b>{value}</b></div>;
}

function Timeline({ items }: { items: string[] }) {
  return <div className="timeline">{items.map(item => <div key={item}><span /><p>{item}</p></div>)}</div>;
}

function Evidence({ label, value }: { label: string; value: string }) {
  return <div className="evidence"><small>{label}</small><strong>{value}</strong></div>;
}

function Loading() {
  return <div className="loading"><Radar className="spin" /> Loading intelligence layer...</div>;
}

async function api(path: string, body?: any) {
  try {
    const res = await fetch(`${API}${path}`, {
      method: body ? "POST" : "GET",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.ok) return res.json();
  } catch {
    return mockApi(path, body);
  }
  return mockApi(path, body);
}

function mockApi(path: string, body?: any) {
  if (path === "/auth/login") return { access_token: "demo.jwt.token" };
  if (path === "/alerts") return [
    { id: "ALT-9001", transaction_id: "TX-FRAUD-001", account_id: "ACC-1044", risk_score: 94, severity: "critical", status: "open", title: "Unusual high-value transfer to mule-linked account" },
    { id: "ALT-9002", transaction_id: "TX-FRAUD-017", account_id: "ACC-2210", risk_score: 87, severity: "high", status: "triage", title: "Velocity spike across new device and foreign IP" },
    { id: "ALT-9003", transaction_id: "TX-RING-044", account_id: "ACC-6621", risk_score: 82, severity: "high", status: "evidence ready", title: "Shared-device mule ring propagation detected" },
  ];
  if (path === "/dashboard/stats") return {
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
  };
  if (path === "/transaction/analyze") {
    const fraud = body?.account_id === "ACC-1044";
    const risk_score = fraud ? 88 : 11;
    return {
      transaction_id: body.transaction_id,
      risk_score,
      risk_level: fraud ? "critical" : "low",
      decision: fraud ? "block_and_escalate" : "approve",
      agent_signals: [
        { agent: "Transaction Sentinel", score: fraud ? 98 : 14, label: "transaction_risk", reasons: fraud ? ["Amount is materially above normal threshold", "Remote crypto-style payment risk"] : ["Transaction is within baseline rules"] },
        { agent: "Behavioral Profiler", score: fraud ? 74 : 12, label: "behavior_anomaly", reasons: fraud ? ["Device is new or shared by suspicious accounts", "Amount deviates from normal range"] : ["Behavior matches customer profile"] },
        { agent: "Network Analyst", score: fraud ? 93 : 8, label: "network_risk", reasons: fraud ? ["Account appears in mule-ring cluster", "IP subnet linked to suspicious activity"] : ["No risky network links detected"] },
      ],
      recommended_actions: fraud ? ["Create critical alert", "Open case", "Generate SAR draft"] : ["Log decision"],
      explanation: fraud ? "Risk score 88/100. Key drivers: high amount, risky channel, shared device, mule-ring account." : "Risk score 11/100. Transaction matches normal customer behavior.",
    };
  }
  if (path === "/case/create") return { id: "CASE-1001", status: "open", created_at: new Date().toISOString(), ...body };
  if (path.startsWith("/network/")) return {
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
  };
  if (path === "/reports/sar") return {
    report_id: `SAR-${body.case_id}`,
    status: "draft",
    sections: { summary: "Suspicious activity detected by multi-agent analysis.", narrative: body.narrative, recommended_filing: "File SAR within internal compliance SLA.", analyst: body.analyst },
  };
}

createRoot(document.getElementById("root")!).render(<App />);
