// routes/revoke.js
const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const db = new Database(path.join(__dirname, '..', 'db.sqlite'));
const router = express.Router();

const ADMIN_KEY = process.env.ADMIN_API_KEY || 'change-me';

router.post('/', (req, res) => {
  const key = req.header('x-api-key');
  if (!key || key !== ADMIN_KEY) return res.status(401).json({ ok: false, error: 'unauthorized' });

  const { hash, reason } = req.body;
  if (!hash) return res.status(400).json({ ok: false, error: 'hash_required' });

  const cert = db.prepare('SELECT * FROM certificates WHERE sha256 = ? OR keccak256 = ?').get(hash, hash);
  if (!cert) return res.status(404).json({ ok: false, error: 'not_found' });

  db.prepare('UPDATE certificates SET revoked = 1 WHERE id = ?').run(cert.id);
  db.prepare('INSERT INTO verifications (cert_id, verifier, result) VALUES (?, ?, ?)').run(cert.id, 'admin', `revoked: ${reason || 'no_reason'}`);

  res.json({ ok: true, message: 'revoked', cert_id: cert.id });
});

module.exports = router;
