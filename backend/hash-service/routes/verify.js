// routes/verify.js
const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const db = new Database(path.join(__dirname, '..', 'db.sqlite'));
const router = express.Router();

router.get('/hash/:hash', (req, res) => {
  const hash = req.params.hash;
  const cert = db.prepare('SELECT * FROM certificates WHERE sha256 = ? OR keccak256 = ?').get(hash, hash);
  if (!cert) return res.status(404).json({ ok: false, error: 'not_found' });

  db.prepare('INSERT INTO verifications (cert_id, verifier, result) VALUES (?, ?, ?)').run(cert.id, req.ip || 'unknown', 'checked');

  res.json({ ok: true, cert });
});

module.exports = router;
