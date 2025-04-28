import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(() => localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const checkEthereum = () => {
    if (!ethereum) throw new Error("Ethereum object doesn't exist. Please install MetaMask.");
  };

  const fetchAllTransactions = async () => {
    try {
      checkEthereum();
      const contract = getEthereumContract();
      const availableTransactions = await contract.getAllTransactions();

      const structured = availableTransactions.map((tx) => ({
        addressTo: tx.receiver,
        addressFrom: tx.sender,
        timestamp: new Date(tx.timestamp.toNumber() * 1000).toLocaleString(),
        message: tx.message,
        keyword: tx.keyword,
        amount: parseFloat(ethers.utils.formatEther(tx.amount)),
      }));

      setTransactions(structured);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const checkWalletConnection = async () => {
    try {
      checkEthereum();
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        await fetchAllTransactions();
      } else {
        console.log("No authorized accounts found.");
      }
    } catch (error) {
      console.error("Wallet connection check failed:", error);
    }
  };

  const checkTransactionExistence = async () => {
    try {
      checkEthereum();
      const contract = getEthereumContract();
      const count = await contract.getTransactionCount();

      setTransactionCount(count.toNumber());
      localStorage.setItem("transactionCount", count.toNumber());
    } catch (error) {
      console.error("Transaction existence check failed:", error);
    }
  };

  const connectWallet = async () => {
    try {
      checkEthereum();
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const sendTransaction = async () => {
    try {
      checkEthereum();
      const { addressTo, amount, keyword, message } = formData;
      const contract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: "0x5208", // 21000 Gwei
          value: parsedAmount._hex,
        }],
      });

      const tx = await contract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log(`Transaction confirmed: ${tx.hash}`);
      setIsLoading(false);

      const updatedCount = await contract.getTransactionCount();
      setTransactionCount(updatedCount.toNumber());
      localStorage.setItem("transactionCount", updatedCount.toNumber());

      await fetchAllTransactions();
    } catch (error) {
      console.error("Transaction failed:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkWalletConnection();
    checkTransactionExistence();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
