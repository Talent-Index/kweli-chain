
# 🚀 Kwelichain – Blockchain-Powered KYC and Certificate Verification

Kwelichain is a decentralized certificate verification system built for Africa.
It solves the problem of fake IDs, degrees, and certificates by offering a trustless, affordable, and secure verification layer for institutions, employers, and individuals.

---

##  Why Kwelichain?
- Fake certificates & IDs are rising with powerful AI tools.  
- Western solutions (Persona, Veriff) are expensive & not tailored for Africa.  
- Kwelichain provides a **local-first alternative**: fast, transparent, and built on Avalanche.

---

##  Features
- Upload and hash certificates (degrees, IDs, licenses).

- Store proofs on blockchain (Curvegrid MultiBaas + Avalanche).

- Verify authenticity instantly via blockchain.

- Responsive, modern UI (React + Tailwind).

- Smart contract deployment handled via Hardhat + OpenZeppelin.

- Full-stack: Frontend (Vite + React) + Backend (Node.js/Express) + Blockchain (Solidity).

---

##  Architecture
```mermaid```
graph TD
  A[User Uploads Doc] --> B[Go Backend]
  B --> C[Hash Generated]
  C --> D[Avalanche Smart Contract]
  D --> E[Stored Hash On-Chain]
  F[Verifier] --> B
  B --> G[Check Hash Match]
  G --> H[Verified / Fake]

---

## Project Structure

```bash
kwelichain/
├─ frontend/                     # Vite + React + Tailwind
│  ├─ src/
│  │  ├─ pages/                  # LandingPage, StudentPage, VerifierPage, etc.
│  │  ├─ components/             # Navbar, UI components
│  │  ├─ api/                    # Axios instance + contract API helpers
│  │  └─ App.jsx
│  ├─ index.html
│  ├─ package.json
│  └─ vite.config.js
│
├─ backend/                      # Node.js + Express
│  ├─ routes/                    # API routes (certificates.js)
│  ├─ server.js                  # Main entrypoint
│  ├─ package.json
│  └─ .env.example
│
├─ contracts/                    # Solidity smart contracts
│  ├─ KwelichainCert.sol         # Certificate registry contract
│  ├─ scripts/                   # Deployment scripts
│  ├─ hardhat.config.cjs
│  └─ package.json
│
├─ infra/
│  └─ docker-compose.yml         
├─ docs/
│  └─ openapi.yaml (backend API spec)
│
└─ README.md

---


Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request
