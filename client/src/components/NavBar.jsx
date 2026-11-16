import React from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="w-full px-5 md:px-8 pt-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />

          <div className="leading-tight">
            <p className="text-gray-700 font-semibold tracking-[0.15em] text-sm">
              Vu Devi / Evolve Vue
            </p>
          </div>
        </div>

        {/* Exit Website */}
        <a
          href="https://evolvevue.com.np/"
          className="group inline-flex items-center gap-2.5 px-4 py-2.5
          rounded-lg border border-white/10 bg-white/[0.03]
          text-gray-700 text-sm font-medium
          hover:border-[#d6b25e]/50 hover:bg-[#d6b25e]/10
          hover:text-[#d6b25e] transition-all duration-300"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          <span>Back to Website</span>

          <ExternalLink
            size={13}
            className="text-gray-500 group-hover:text-[#d6b25e] transition-colors"
          />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
