// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { keccak256 } = require('js-sha3');
const QRCode = require('qrcode');
const Database = require('better-sqlite3');

const router = express.Router();
const db = new Database(path.join(__dirname, '..', 'db.sqlite'));
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
const MAX_SIZE = parseInt(process.env.MAX_FILE_SIZE_BYTES || '5242880', 10);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

function fileFilter(req, file, cb) {
  const allowed = ['.pdf', '.png', '.jpg', '.jpeg'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowed.includes(ext)) {
    return cb(new Error('Only PDF and image files are allowed'), false);
  }
  cb(null, true);
}

const upload = multer({ storage, limits: { fileSize: MAX_SIZE }, fileFilter });

router.post('/', upload.single('certificate'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'file_required' });

    const fileBuffer = fs.readFileSync(req.file.path);
    const sha256 = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const keccak256hex = keccak256(fileBuffer);

    const { issuer = null, holder_name = null, cert_type = null, issued_date = null } = req.body;
    const meta = { issuer, holder_name, cert_type, issued_date };

    const insert = db.prepare(`
      INSERT INTO certificates (original_filename, storage_path, sha256, keccak256, issuer, holder_name, cert_type, issued_date, meta_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    try {
      const info = insert.run(req.file.originalname, req.file.path, sha256, keccak256hex, issuer, holder_name, cert_type, issued_date, JSON.stringify(meta));
      const certId = info.lastInsertRowid;

      const verificationUrl = `${req.protocol}://${req.get('host')}/api/verify/hash/${sha256}`;
      const qrPayload = { type: 'certificate', id: certId, sha256, keccak256: keccak256hex, verify: verificationUrl };
      const qrDataUrl = await QRCode.toDataURL(JSON.stringify(qrPayload));

      res.json({ ok: true, id: certId, sha256, keccak256: keccak256hex, verify_url: verificationUrl, qr: qrDataUrl, meta });
    } catch (dbErr) {
      if (dbErr.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(409).json({ error: 'already_exists' });
      }
      throw dbErr;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'internal_error' });
  }
});

module.exports = router;
