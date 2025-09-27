// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const uploadRouter = require('./routes/upload');
const verifyRouter = require('./routes/verify');
const revokeRouter = require('./routes/revoke');

const app = express();
const PORT = process.env.PORT || 4000;
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve(UPLOAD_DIR)));

app.use('/api/upload', uploadRouter);
app.use('/api/verify', verifyRouter);
app.use('/api/revoke', revokeRouter);

app.get('/', (req, res) => {
  res.send('Hashing & Upload Service is running.');
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
