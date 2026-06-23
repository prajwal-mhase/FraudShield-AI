CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('analyst', 'manager', 'admin', 'auditor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id TEXT UNIQUE NOT NULL,
  account_id TEXT NOT NULL,
  customer_id TEXT NOT NULL,
  amount NUMERIC(14,2) NOT NULL,
  merchant TEXT NOT NULL,
  merchant_category TEXT NOT NULL,
  country TEXT NOT NULL,
  channel TEXT NOT NULL,
  device_id TEXT NOT NULL,
  ip_address INET NOT NULL,
  risk_score NUMERIC(5,2),
  decision TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id TEXT NOT NULL REFERENCES transactions(transaction_id),
  account_id TEXT NOT NULL,
  risk_score NUMERIC(5,2) NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'open',
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE fraud_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_number TEXT UNIQUE NOT NULL,
  alert_id UUID REFERENCES alerts(id),
  assigned_to UUID REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT NOT NULL DEFAULT 'high',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE behavior_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id TEXT UNIQUE NOT NULL,
  avg_amount NUMERIC(14,2) NOT NULL,
  usual_countries TEXT[] NOT NULL,
  usual_channels TEXT[] NOT NULL,
  active_hours INT[] NOT NULL,
  trusted_devices TEXT[] NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE fraud_networks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  network_id TEXT NOT NULL,
  node_id TEXT NOT NULL,
  node_type TEXT NOT NULL,
  linked_node_id TEXT,
  relationship TEXT,
  risk_score NUMERIC(5,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE agent_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id TEXT,
  agent_name TEXT NOT NULL,
  input_json JSONB NOT NULL,
  output_json JSONB NOT NULL,
  latency_ms INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_transactions_account_created ON transactions(account_id, created_at DESC);
CREATE INDEX idx_transactions_customer_created ON transactions(customer_id, created_at DESC);
CREATE INDEX idx_alerts_status_severity ON alerts(status, severity);
CREATE INDEX idx_cases_status_priority ON fraud_cases(status, priority);
CREATE INDEX idx_network_node ON fraud_networks(node_id);
CREATE INDEX idx_agent_logs_transaction ON agent_logs(transaction_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

