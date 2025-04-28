import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiTrendingUp } from "react-icons/bi";
import { RiBarChartBoxFill } from "react-icons/ri";
import { HiOutlineIdentification } from "react-icons/hi";

interface ServiceCardProps {
  color: string;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const Services: React.FC = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          Financial freedom,
          <br />
          powered by foresight.
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          PrediFi is the world's first truly decentralized prediction protocol.
          No KYC, no middlemen — just you, your insights, and a trustless way to
          earn.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="On-Chain & Trustless"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Every prediction, payout, and reputation update is governed by verifiable smart contracts. No one controls the outcomes but the code."
        />
        <ServiceCard
          color="bg-[#00C896]"
          title="Zero-KYC Participation"
          icon={
            <HiOutlineIdentification fontSize={21} className="text-white" />
          }
          subtitle="Global access for anyone, anywhere. You only need a wallet and the skill to predict. Your data stays yours — forever."
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Reputation-Based Rewards"
          icon={<RiBarChartBoxFill fontSize={21} className="text-white" />}
          subtitle="Consistent foresight boosts your PRD rewards and ranking. Your reputation becomes your asset."
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Ultra-Low Fees"
          icon={<BiTrendingUp fontSize={21} className="text-white" />}
          subtitle="Liquidity pools fund payouts, not traders. Maximize your gains without gas-guzzling or heavy platform fees."
        />
        <ServiceCard
          color="bg-[#FFA500]"
          title="Instant Deposits & Withdrawals"
          icon={<BiTrendingUp fontSize={21} className="text-white" />}
          subtitle="Your funds are always in your control. Provide liquidity or withdraw predictions instantly — no waiting, no approvals."
        />
      </div>
    </div>
  </div>
);

export default Services; 