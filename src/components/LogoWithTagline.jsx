import React from "react";
import { Logo } from "@/assets/assets";

const LogoWithTagline = () => {
  return (
    <div className="flex items-center gap-4 p-4">
      {/* Logo */}
      <img
        src={Logo}// <-- replace with your logo path
        alt="Logo"
        className="h-24 w-auto object-contain"
      />

      {/* Tagline */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Legal Metrology Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Your tagline goes here
        </p>
      </div>
    </div>
  );
};

export default LogoWithTagline;
