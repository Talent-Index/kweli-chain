#  Kwelichain – Decentralized KYC for Africa

Kwelichain is a **blockchain-based KYC and document verification system**
It solves the problem of **fake IDs, degrees, and certificates** in Africa by offering a **trustless, affordable, and secure verification layer** for institutions, employers, and individuals.

---

##  Why Kwelichain?
- Fake certificates & IDs are rising with powerful AI tools.  
- Western solutions (Persona, Veriff) are expensive & not tailored for Africa.  
- Kwelichain provides a **local-first alternative**: fast, transparent.

---

##  Features
- Upload and hash documents (ID, certificates, licenses).  
- Store hashes on Avalanche → tamper-proof verification.  
- Verify authenticity in seconds.  
- Responsive UI (Next.js + Tailwind).  
- Backend powered by Go + MongoDB/Postgres.  
- Dockerized for easy deployment.

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
## Folder structure

## Project Structure

```bash
kwelichain/
├─ apps/
│  └─ frontend/                     # Next.js + Tailwind (your frontend)
├─ backend/
│  ├─ cmd/
│  │  └─ server/                    # main.go entry for the HTTP server
│  ├─ internal/
│  │  ├─ config/                    # DB, env, app config
│  │  ├─ db/                        # migrations, sql (postgres)
│  │  ├─ models/                    # GORM models / DTOs
│  │  ├─ repository/                # DB access (one per model)
│  │  ├─ service/                   # business logic + chain client
│  │  ├─ handlers/                  # HTTP handlers (versioned)
│  │  ├─ middleware/                # auth, rate-limit, logging
│  │  ├─ contracts/                 # abigen-generated bindings
│  │  └─ utils/                     # hashing, storage helpers
│  ├─ Dockerfile
│  └─ go.mod
├─ smart-contract/
│  ├─ contracts/
│  │  └─ DocumentRegistry.sol
│  ├─ scripts/
│  │  └─ deploy.js
│  ├─ hardhat.config.js
│  └─ package.json
├─ infra/
│  └─ docker-compose.yml            # Postgres, minio (S3), optionally redis
├─ .github/
│  └─ workflows/ci.yml
├─ docs/
│  └─ openapi.yaml (generated)
├─ README.md
└─ .env.example

---


Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request
