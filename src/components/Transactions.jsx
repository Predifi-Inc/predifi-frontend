import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url, success, reward }) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-4 rounded-lg border-[1px] border-gray-600 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-full mb-4">
          <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-sm">🔹 From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-sm">🔸 To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-sm">💰 Stake: {amount} USDC</p>
          {message && (
            <p className="text-white text-sm">📈 Prediction: {message}</p>
          )}
          <p className="text-sm mt-2">
            {success ? (
              <span className="text-green-400 font-semibold">✅ Correct Prediction — Reward: {reward ?? '—'} PRD</span>
            ) : (
              <span className="text-red-400 font-semibold">❌ Incorrect Prediction</span>
            )}
          </p>
        </div>
        <img
          src={gifUrl || url}
          alt="prediction"
          className="w-full h-64 2xl:h-80 rounded-md object-cover mb-2"
        />
        <div className="bg-black p-2 px-5 w-max rounded-2xl shadow-sm">
          <p className="text-[#37c7da] font-semibold text-xs">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4 w-full">
        <h3 className="text-white text-3xl text-center my-2">
          {currentAccount
            ? "📊 Latest Predictions"
            : "🔌 Connect your wallet to view your prediction history"}
        </h3>

        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...dummyData, ...transactions].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
