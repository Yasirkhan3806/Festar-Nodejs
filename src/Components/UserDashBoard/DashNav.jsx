import React, { useEffect, useState } from "react";
import logo from "../../assets/Pictures/logo_primary_V17oRtSd.png";
import logoWhite from "../../assets/Pictures/logo-inverted-color.png"
import DashSide from "./DashSide";
import { useUserData } from "../../userContext";
import { useTheme } from "../../ThemeContext";
import UserName from "./settings/UserName";
import DarkmodeToggler from "../DarkmodeToggler";
import useWindowSize from "./WindowSize";


export default function DashNav() {
  const {userData}  = useUserData()
  const {darkMode} = useTheme();
  const [width] = useWindowSize();

  return (
    <nav className="w-[100%]">
      <ul className="flex justify-end md:justify-between lg:justify-between border-b-2 border-b-blue-500 pl-14 pr-6 sm:px-6 lg:px-6 ">
        <li>
          <img className="h-20" src={darkMode?logoWhite:logo} alt="" />
        </li>
        <li className="flex mt-6 gap-8">
          
          {width >= 768 && <DarkmodeToggler/>}
          {width >= 768 && <UserName/>}
        </li>
      </ul>
    </nav>
  );
}
