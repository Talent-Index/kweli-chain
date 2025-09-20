#  Kwelichain – Decentralized KYC for Africa

Kwelichain is a **blockchain-based KYC and document verification system** built on **Avalanche**.  
It solves the problem of **fake IDs, degrees, and certificates** in Africa by offering a **trustless, affordable, and secure verification layer** for institutions, employers, and individuals.

---

##  Why Kwelichain?
- Fake certificates & IDs are rising with powerful AI tools.  
- Western solutions (Persona, Veriff) are expensive & not tailored for Africa.  
- Kwelichain provides a **local-first alternative**: fast, transparent, and built on Avalanche.

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


Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request
