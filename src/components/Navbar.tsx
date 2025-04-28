import React, { FC, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";

interface NavBarItemProps {
  title: string;
  classprops?: string;
}

const NavBarItem: FC<NavBarItemProps> = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar: FC = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const menuItems: string[] = ["About", "How It Works", "No KYC", "Docs"];

  return (
    <nav className="w-full flex justify-between items-center max-w-7xl mx-auto">
      <div className="md:flex-[0.5] px-8 flex-initial justify-start items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {menuItems.map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Join DAO
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {menuItems.map((item, index) => (
              <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />
            ))}
            <li className="bg-[#2952e3] py-2 px-7 my-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
              Join DAO
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 