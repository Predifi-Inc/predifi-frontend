<div align="center">
  <img src="https://predifi.org/logo.png" alt="PrediFi Logo" width="160"/>
  <h1>PrediFi Frontend</h1>
  <p>Decentralized Options Trading Interface – Predict and Earn.</p>
</div>

---

## ✨ About PrediFi

**PrediFi** is a decentralized prediction market interface for binary options on assets like ETH, BTC, and more.  
This repo hosts the **React-based frontend dApp**, designed to interact with the PrediFi smart contracts deployed on Ethereum.

🧠 Stake insights → 💸 Predict outcomes → 🏆 Earn PRD token rewards  
All trustless. All on-chain. No KYC.

---

## 🖥️ Tech Stack

- **Framework**: React (Vite or CRA)
- **Web3 Layer**: Ethers.js + Wagmi + RainbowKit
- **Styling**: TailwindCSS + Glassmorphism UI
- **Icons**: React Icons
- **Wallets**: MetaMask, WalletConnect, Coinbase Wallet
- **Preview**: [app.predifi.org](https://app.predifi.org) _(planned)_

---

## ⚙️ Getting Started

### 🔗 Prerequisites
- Node.js ≥ 16
- Yarn (recommended)
- Wallet (MetaMask)

### 📦 Install & Run Locally

```bash
git clone https://github.com/predifi/frontend.git
cd frontend
yarn install
yarn dev
```

- App runs at: `http://localhost:3000`
- Make sure your wallet is connected to **Sepolia Testnet**

---

## 🧩 Project Structure

```bash
src/
├── components/        # Reusable UI Components (Navbar, Footer, Cards)
├── context/           # React Context (Wallet, Tx Manager)
├── pages/             # Page Components (Landing, Predict, Profile)
├── utils/             # Helper functions (address shorten, API hooks)
├── assets/            # Logos, Icons, Styles
├── hooks/             # Custom React Hooks
└── App.jsx            # Main Layout Entry
```

---

## 🔐 Environment Setup

Create a `.env` file:

```env
VITE_CONTRACT_ADDRESS=0xYourContractHere
VITE_INFURA_ID=YourInfuraOrAlchemyKey
```

---

## 🧠 Features

- ✅ Web3 wallet login (MetaMask / WalletConnect)
- 📈 Prediction form (amount, asset, direction)
- 🎯 Results feed (success/fail with GIFs)
- 🏅 Leaderboard (based on on-chain reputation, coming soon)
- 🌐 TWAP Oracle-integrated price resolution
- ⚡ Instant UX with animations and glassmorphic UI

---

## 🎯 Roadmap (Frontend)

- [x] Wallet Connect + TX Submit
- [x] Prediction Form + State
- [x] Transaction History Cards
- [ ] Asset Selector Dropdown
- [ ] Leaderboard Page
- [ ] PRD Rewards Modal

---

## 🤝 Contributing

We ❤️ contributions!

```bash
# 1. Fork this repo
# 2. Create a branch `feature/your-feature`
# 3. Commit and push your changes
# 4. Submit a Pull Request 🚀
```

See `CONTRIBUTING.md` for full guidelines.

---

## 🧑‍💻 Team & Links

- Protocol: [PrediFi Contracts](https://github.com/predifi/contracts)
- Docs: [GitBook Documentation](https://predifi-docs.gitbook.io)
- Twitter: [@predifi_xyz](https://twitter.com/predifi_xyz)

---

## 📄 License

MIT © 2025 PrediFi Team  
Feel free to fork & build 🌍

---

<p align="center">
🧠 Predict smarter. 📊 Earn better. <br />
– Powered by reputation, secured by code.
</p>