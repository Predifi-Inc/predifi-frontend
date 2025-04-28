import React, { useEffect, useState, createContext, ReactNode } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

interface Transaction {
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  message: string;
  keyword: string;
  amount: number;
}

interface FormData {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

interface TransactionContextType {
  transactionCount: number | null;
  connectWallet: () => Promise<void>;
  transactions: Transaction[];
  currentAccount: string;
  isLoading: boolean;
  sendTransaction: () => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  formData: FormData;
}

export const TransactionContext = createContext<TransactionContextType>({} as TransactionContextType);

declare global {
  interface Window {
    ethereum: any;
  }
}

const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionCount, setTransactionCount] = useState<number | null>(() => {
    const count = localStorage.getItem("transactionCount");
    return count ? parseInt(count) : null;
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const checkEthereum = () => {
    if (!ethereum) throw new Error("Ethereum object doesn't exist. Please install MetaMask.");
  };

  const fetchAllTransactions = async () => {
    try {
      checkEthereum();
      const contract = await getEthereumContract();
      const availableTransactions = await contract.getAllTransactions();

      const structured = availableTransactions.map((tx: any) => ({
        addressTo: tx.receiver,
        addressFrom: tx.sender,
        timestamp: new Date(tx.timestamp.toNumber() * 1000).toLocaleString(),
        message: tx.message,
        keyword: tx.keyword,
        amount: parseFloat(ethers.formatEther(tx.amount)),
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
      const contract = await getEthereumContract();
      const count = await contract.getTransactionCount();

      setTransactionCount(count.toNumber());
      localStorage.setItem("transactionCount", count.toNumber().toString());
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
      const contract = await getEthereumContract();
      const parsedAmount = ethers.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: "0x5208", // 21000 Gwei
          value: parsedAmount.toString(),
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
      localStorage.setItem("transactionCount", updatedCount.toNumber().toString());

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