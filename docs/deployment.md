# Deployment Guide

## Local Development
```bash
git clone https://github.com/BarakaCaleb/kwelichain.git
cd kwelichain
npm install


## Start Blockchain Node

npx hardhat node

## Deploy Contracts
npx hardhat run scripts/deploy.js --network localhost

## Start Backend
cd backend
npm run dev

## Start Frontend
cd frontend
npm run dev

## Cloud Deployment

Frontend: Vercel

Backend: Render / Railway / AWS

Contracts: Curvegrid MultiBaas

