INSERT INTO users (email, password_hash, full_name, role)
VALUES ('analyst@fraudshield.ai', 'demo-hash', 'Aarav Mehta', 'analyst');

INSERT INTO behavior_profiles (customer_id, avg_amount, usual_countries, usual_channels, active_hours, trusted_devices)
VALUES
('CUST-1001', 2450.00, ARRAY['IN'], ARRAY['upi','card_present'], ARRAY[9,10,11,12,13,18,19], ARRAY['DEV-111']),
('CUST-1044', 3100.00, ARRAY['IN','SG'], ARRAY['netbanking'], ARRAY[10,11,12,20], ARRAY['DEV-431']);

INSERT INTO transactions (transaction_id, account_id, customer_id, amount, merchant, merchant_category, country, channel, device_id, ip_address, risk_score, decision)
VALUES
('TX-NORMAL-001', 'ACC-1001', 'CUST-1001', 2199.00, 'Urban Grocery', 'grocery', 'IN', 'upi', 'DEV-111', '103.21.1.10', 12, 'approve'),
('TX-FRAUD-001', 'ACC-1044', 'CUST-1044', 185000.00, 'Crypto Rapid Exchange', 'crypto', 'NG', 'card_not_present', 'DEV-993', '45.14.88.1', 94, 'block_and_escalate');

