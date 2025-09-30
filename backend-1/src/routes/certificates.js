const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const { sendTx, callContract } = require("../services/multibaas");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload + issue
router.post("/issue", upload.single("certificate"), async (req, res) => {
  const file = req.file;
  const buffer = require("fs").readFileSync(file.path);
  const hashHex = crypto.createHash("sha256").update(buffer).digest("hex");
  const hashBytes32 = "0x" + hashHex;

  const uri = "ipfs://todo"; // integrate pinning service later
  const result = await sendTx("issueCertificate", [hashBytes32, 0, uri], req.body.from);
  res.json({ tx: result, hash: hashBytes32 });
});

// Verify
router.get("/verify/:hash", async (req, res) => {
  const hashBytes32 = "0x" + req.params.hash;
  const result = await callContract("isValid", [hashBytes32], req.query.from || null);
  res.json(result);
});

module.exports = router;
