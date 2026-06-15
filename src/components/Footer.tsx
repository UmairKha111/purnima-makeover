import { motion } from "motion/react";
import { Instagram, Facebook, Mail, Phone, MapPin, Sparkles, MessageCircleCode } from "lucide-react";
import { BrandConfig } from "../types";
import { themePresetClasses } from "../data";

interface FooterProps {
  config: BrandConfig;
  themeClasses: typeof themePresetClasses[keyof typeof themePresetClasses];
  onOpenCustomizer: () => void;
  onOpenDashboard: () => void;
  isDemoMode: boolean;
}

export default function Footer({ config, themeClasses, onOpenCustomizer, onOpenDashboard, isDemoMode }: FooterProps) {
  
  const getWhatsAppLocationLink = () => {
    const text = `Hi ${config.name}! I saw your studio location at "${config.address}" online and would love to check if I can stop by for a makeup consultation!`;
    return `https://api.whatsapp.com/send?phone=${config.phone}&text=${encodeURIComponent(text)}`;
  };

  return (
    <footer className={`transition-colors duration-400 border-t border-stone-800 bg-[#1A1A1A] text-stone-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Main profile brand summary */}
          <div className="md:col-span-5 space-y-5 text-left">
            <div className="flex flex-col text-left">
              <span className="font-serif font-light text-xl tracking-[0.18em] text-white uppercase block">
                {config.name}
              </span>
              <span className="text-[9px] font-sans tracking-[0.25em] text-stone-500 uppercase mt-1">
                {config.location} • Est. 2018
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              &ldquo;{config.tagline}&rdquo; — An elite beauty workspace designed to lift and refine natural profiles for life's most editorial milestones.
            </p>
            <div className="flex space-x-5 pt-2">
              {config.instagram && (
                <a
                  href={`https://instagram.com/${config.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition"
                  aria-label="Instagram Page Link"
                >
                  <Instagram className="w-4 h-4 text-stone-400" />
                </a>
              )}
              {config.facebook && (
                <a
                  href={`https://facebook.com/${config.facebook}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition"
                  aria-label="Facebook Profile Link"
                >
                  <Facebook className="w-4 h-4 text-stone-400" />
                </a>
              )}
              <a
                href={getWhatsAppLocationLink()}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
                aria-label="WhatsApp Active Link"
              >
                <Phone className="w-4 h-4 text-stone-400" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#BCB5A9]">
              EXPLORE SECTIONS
            </h4>
            <ul className="text-xs text-stone-400 space-y-3 font-sans uppercase tracking-widest text-[9px]">
              <li>
                <a href="#portfolio" className="hover:text-white transition block">
                  Design Lookbooks
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition block">
                  Services & Pricing
                </a>
              </li>
              <li>
                <a href="#booking-form" className="hover:text-white transition block">
                  Reserve Placement
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition block">
                  Common Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Address Column */}
          <div className="md:col-span-4 space-y-4 text-left font-sans">
            <h4 className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#BCB5A9]">
              STUDIO INFO
            </h4>
            <div className="space-y-3.5 text-xs text-stone-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#BCB5A9] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{config.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#BCB5A9] shrink-0" />
                <span>PH: +{config.phone}</span>
              </p>
              {config.email && (
                <p className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[#BCB5A9] shrink-0" />
                  <span className="truncate">{config.email}</span>
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Separator block */}
        <div className="h-[1px] bg-stone-800 w-full my-12" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-wider text-stone-500 gap-4">
          <p className="font-sans uppercase">
            &copy; {new Date().getFullYear()} {config.name}. All Rights Reserved.
          </p>
          {isDemoMode && (
            <div className="flex space-x-4 font-sans uppercase">
              <button
                onClick={onOpenCustomizer}
                className="hover:text-white cursor-pointer"
              >
                Re-Brand Presets
              </button>
              <span>•</span>
              <button
                onClick={onOpenDashboard}
                className="hover:text-white cursor-pointer"
              >
                Ledger CRM Admin
              </button>
            </div>
          )}
        </div>

      </div>
    </footer>
  );
}
