import React, { useState, MouseEvent } from "react";
import { motion } from "motion/react";
import { Sparkles, Menu, X, Settings2, HelpCircle, PhoneCall, HeartHandshake, FolderHeart } from "lucide-react";
import { BrandConfig } from "../types";
import { themePresetClasses } from "../data";

interface NavbarProps {
  config: BrandConfig;
  themeClasses: typeof themePresetClasses[keyof typeof themePresetClasses];
  onOpenCustomizer: () => void;
  onOpenDashboard: () => void;
  inquiryCount: number;
  isDemoMode: boolean;
  onToggleDemoMode?: () => void;
}

export default function Navbar({
  config,
  themeClasses,
  onOpenCustomizer,
  onOpenDashboard,
  inquiryCount,
  isDemoMode,
  onToggleDemoMode,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Portfolio", href: "#portfolio", icon: FolderHeart },
    { name: "Services", href: "#services", icon: HeartHandshake },
    { name: "FAQs", href: "#faq", icon: HelpCircle },
  ];

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 border-b border-[#E5E1DA] ${themeClasses.headerBg} ${themeClasses.headerText}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo / Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col cursor-pointer text-left select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onDoubleClick={() => {
              if (onToggleDemoMode) {
                onToggleDemoMode();
              }
            }}
          >
            <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] font-light uppercase text-[#2D2D2D] block">
              {config.name}
            </span>
            <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#7A756D] mt-1 block">
              {config.location} • Est. 2018
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href.slice(1))}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="text-[11px] uppercase tracking-[0.25em] font-sans font-medium text-[#7A756D] hover:text-[#2D2D2D] transition duration-200 py-1 border-b border-transparent hover:border-[#2D2D2D]"
              >
                <span>{item.name}</span>
              </motion.a>
            ))}
          </nav>

          {/* Utilities Panel */}
          <div className="hidden md:flex items-center space-x-4">
            {isDemoMode && (
              <>
                {/* Local Dashboard Toggle */}
                <button
                  onClick={onOpenDashboard}
                  type="button"
                  id="btn-navbar-dashboard"
                  className="relative flex items-center space-x-2 px-3 py-2 text-[10px] font-sans tracking-[0.2em] uppercase border border-[#E5E1DA] text-[#7A756D] hover:bg-[#FAF9F6] hover:text-[#2D2D2D] transition cursor-pointer"
                >
                  <span>INQUIRIES</span>
                  {inquiryCount > 0 ? (
                    <span className="flex h-4 w-4 items-center justify-center bg-[#2D2D2D] text-[9px] font-bold text-white leading-none">
                      {inquiryCount}
                    </span>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  )}
                </button>

                {/* Customizer Magic Button */}
                <button
                  onClick={onOpenCustomizer}
                  type="button"
                  id="btn-navbar-customizer"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-none font-sans text-[10px] font-medium tracking-[0.2em] uppercase transition-all duration-200 active:scale-98 cursor-pointer ${themeClasses.buttonBg}`}
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>CUSTOMIZE</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden flex items-center space-x-3">
            {isDemoMode && (
              <button
                onClick={onOpenCustomizer}
                aria-label="Customize widget"
                className="p-1.5 rounded-none border border-[#E5E1DA] text-[#7A756D]"
              >
                <Settings2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-none border border-[#E5E1DA] text-[#2D2D2D]"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-[#E5E1DA] bg-white px-6 pt-4 pb-8 space-y-4"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href.slice(1))}
              className="flex items-center justify-between py-3 border-b border-[#FAF9F6] text-[11px] uppercase tracking-[0.25em] font-sans font-medium text-[#7A756D] hover:text-[#2D2D2D]"
            >
              <span>{item.name}</span>
            </a>
          ))}
          {isDemoMode && (
            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenDashboard();
                }}
                className="flex items-center justify-center py-3 bg-[#FAF9F6] border border-[#E5E1DA] text-[10px] font-sans tracking-widest text-[#7A756D] uppercase"
              >
                <span>Dashboard ({inquiryCount})</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenCustomizer();
                }}
                className={`flex items-center justify-center py-3 text-[10px] font-sans tracking-widest uppercase text-center ${themeClasses.buttonBg}`}
              >
                <span>Customizer</span>
              </button>
            </div>
          )}
        </motion.div>
      )}
    </header>
  );
}
