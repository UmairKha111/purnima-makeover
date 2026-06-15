import { motion } from "motion/react";
import { Sparkles, Instagram, MapPin, Award, CheckCircle } from "lucide-react";
import { BrandConfig } from "../types";
import { purnimaDefaultPreset, themePresetClasses } from "../data";

interface HeroProps {
  config: BrandConfig;
  themeClasses: typeof themePresetClasses[keyof typeof themePresetClasses];
}

export default function Hero({ config, themeClasses }: HeroProps) {
  const scrollToContact = () => {
    const el = document.getElementById("booking-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={`relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 transition-colors duration-300 ${themeClasses.primaryBg}`}>
      {/* Decorative background glow circles */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-10 right-1/10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Intro Section */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-stone-900/5 px-3 py-1.5 rounded-full border border-stone-90 \/10 text-stone-800"
            >
              <span className={`h-2 w-2 rounded-full ${config.theme === 'rose' ? 'bg-rose-600' : 'bg-amber-500'} animate-ping`}></span>
              <span className="text-xs font-mono font-medium tracking-wide uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {config.location} • Available Globally
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`text-5xl sm:text-6xl lg:text-7xl font-serif font-extralight tracking-normal leading-tight ${themeClasses.headingColor}`}
              >
                {config.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xs sm:text-sm font-sans uppercase tracking-[0.25em] text-[#7A756D]"
              >
                {config.tagline}
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xs sm:text-sm leading-relaxed max-w-xl text-[#7A756D] font-sans"
            >
              {config.bio}
            </motion.p>

            {/* Micro Badges */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-6 max-w-md pt-4 border-t border-[#E5E1DA]"
            >
              <div className="flex items-start space-x-3">
                <span className="font-sans text-[10px] text-[#BCB5A9] font-medium">01</span>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#2D2D2D] font-sans font-medium">Certified Expert</h4>
                  <p className="text-[11px] text-[#7A756D] font-sans">Royal Indian Bridal Masterclass</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-sans text-[10px] text-[#BCB5A9] font-medium">02</span>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#2D2D2D] font-sans font-medium">Premium Preps</h4>
                  <p className="text-[11px] text-[#7A756D] font-sans">HD & Airbrush Luxury Finish</p>
                </div>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              <button
                onClick={scrollToContact}
                type="button"
                className={`px-8 py-3.5 rounded-none text-xs font-medium tracking-[0.2em] font-sans transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-2 ${themeClasses.buttonBg}`}
              >
                <span>BOOK APPOINTMENT</span>
                <Sparkles className="w-4 h-4" />
              </button>
              
              <button
                onClick={scrollToServices}
                type="button"
                className="px-8 py-3.5 rounded-none text-xs font-semibold tracking-[0.2em] font-sans bg-white border border-[#E5E1DA] text-[#2D2D2D] hover:bg-[#FAF9F6] transition cursor-pointer"
              >
                EXPLORE PACKAGES
              </button>
            </motion.div>
          </div>

          {/* Right Main character portrait display */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative px-4 sm:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[340px] sm:max-w-[360px] p-4"
            >
              {/* Arched Photo Container matching the Elara Noir design */}
              <div className="relative rounded-t-full overflow-hidden bg-[#E5E1DA] border border-[#DED9D0] aspect-[4/5] w-full">
                <img
                  src={config.imageUrl || purnimaDefaultPreset.imageUrl}
                  alt={config.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-102"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== purnimaDefaultPreset.imageUrl) {
                      target.src = purnimaDefaultPreset.imageUrl;
                    }
                  }}
                />
                
                {/* Minimal card details */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2D2D2D]/80 via-[#2D2D2D]/20 to-transparent p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-sans tracking-[0.2em] opacity-80 text-white">
                        MASTER MAKEUP ARTIST
                      </span>
                      <h3 className="text-sm tracking-wider font-serif text-white">
                        {config.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative floating editorial quote */}
              <div className="absolute -bottom-6 right-2 bg-white p-5 max-w-[210px] border border-[#E5E1DA] shadow-xs text-left">
                <p className="text-xs italic text-[#2D2D2D] leading-relaxed">
                  "Enhancing your natural grace for life's most editorial moments."
                </p>
                {config.instagram && (
                  <a
                    href={`https://instagram.com/${config.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3.5 flex items-center space-x-1.5 text-[10px] font-sans tracking-widest text-[#7A756D] uppercase hover:text-[#2D2D2D] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#BCB5A9]" />
                    <span>@{config.instagram}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
