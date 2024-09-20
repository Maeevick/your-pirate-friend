"use client";

import React, { useState } from "react";
import Image from "next/image";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <div className="flex items-center">
        <Image
          src="/your-pirate-friend-512x512.png"
          alt="Your Pirate Friend"
          width={50}
          height={50}
        />
        <span className="ml-2 text-xl font-bold">your pirate friend</span>
      </div>
      <button
        onClick={() => setIsAuthModalOpen(true)}
        className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
      >
        Start Here
      </button>
      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;
