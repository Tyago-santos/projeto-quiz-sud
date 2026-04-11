"use client";
import Link from "next/link";

import Image from "next/image";

import Logo from "../../public/logo.png";

import { useContext } from "react";
import { ProviderContext } from "@/app/layout";

const Header = () => {
  const [state] = useContext(ProviderContext);
  return (
    <header
      className="
      sticky top-0 z-50
      bg-white/70 backdrop-blur-xl
      border-b border-white/40
    "
    >
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="
            text-xl font-bold 
            bg-gradient-to-r from-accent to-secondary 
            bg-clip-text text-transparent
          "
        >
          <Image
            src={Logo}
            alt="logomarca de imagem"
            width={170}
            height={170}
            priority
          />
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <div
              className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              bg-gradient-to-r from-accent to-secondary
              text-white font-semibold
              shadow-md
              hover:scale-[1.03] active:scale-[0.97]
              transition-all duration-200
              cursor-pointer
            "
            >
              {state.user.name}
              {/* Ícone check */}
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
