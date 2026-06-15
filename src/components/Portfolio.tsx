import React, { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, ExternalLink, X, Heart, Eye } from "lucide-react";
import { BrandConfig, PortfolioItem } from "../types";
import { purnimaDefaultPreset, themePresetClasses } from "../data";

interface PortfolioProps {
  config: BrandConfig;
  themeClasses: typeof themePresetClasses[keyof typeof themePresetClasses];
}

export default function Portfolio({ config, themeClasses }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Bridal" | "Fashion" | "Engagement" | "Party">("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [likedItems, setLikedItems] = useState<string[]>([]);

  const categories: Array<"All" | "Bridal" | "Fashion" | "Engagement" | "Party"> = [
    "All", "Bridal", "Engagement", "Fashion", "Party"
  ];

  const filteredPortfolio = selectedCategory === "All"
    ? config.portfolio
    : config.portfolio.filter(item => item.category === selectedCategory);

  const toggleLike = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter(item => item !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  };

  const getWhatsAppLink = (item: PortfolioItem) => {
    const text = `Hi ${config.name}! I just saw your beautiful look "${item.title}" (${item.category} Look) in the portfolio of your website. I am absolutely in love with this style! Could you please share more details about pricing and availability for a similar look? Clean and royal is what I am seeking!`;
    return `https://api.whatsapp.com/send?phone=${config.phone}&text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="portfolio" className={`py-24 border-t border-[#E5E1DA] transition-colors duration-350 ${themeClasses.primaryBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-[#7A756D]">
            THE LOOKBOOK SHOWCASE
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-light tracking-wide ${themeClasses.headingColor}`}>
            Bespoke Portfolios
          </h2>
          <div className="h-[1px] w-24 bg-[#E5E1DA] mx-auto"></div>
          <p className="text-xs sm:text-sm text-[#7A756D] font-sans max-w-lg mx-auto leading-relaxed">
            Every look is an exquisite editorial canvas, customized to capture timeless grace under high-definition cameras and soft studio lighting.
          </p>
        </div>

        {/* Filter Navigation Category list */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-none text-[10px] font-medium tracking-[0.2em] uppercase transition-all cursor-pointer ${
                  isActive 
                    ? "bg-[#2D2D2D] text-white" 
                    : "bg-white border border-[#E5E1DA] text-[#7A756D] hover:bg-[#FAF9F6]"
                }`}
              >
                {category === "All" ? "ALL LOOKBOOKS" : category.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item) => {
              const isLiked = likedItems.includes(item.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group rounded-none overflow-hidden border border-[#E5E1DA] bg-white cursor-pointer transition-colors duration-300"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF9F6]">
                    <img
                      src={item.imageUrl || purnimaDefaultPreset.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const fallback = config.imageUrl || purnimaDefaultPreset.imageUrl;
                        if (target.src !== fallback) {
                          target.src = fallback;
                        }
                      }}
                    />
                    
                    {/* Hover controls info bar overlay */}
                    <div className="absolute inset-0 bg-[#2D2D2D]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 z-10">
                      <div className="flex justify-between items-start">
                        <span className="bg-[#2D2D2D] text-white text-[9px] font-sans tracking-wider py-1 px-2.5 rounded-none uppercase">
                          {item.category}
                        </span>
                        
                        <button
                          onClick={(e) => toggleLike(item.id, e)}
                          className="p-2 bg-white/10 hover:bg-white/30 text-white backdrop-blur-xs transition"
                          aria-label="Favorite Look"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                        </button>
                      </div>

                      <div className="flex justify-center items-center">
                        <div className="h-10 w-10 bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                          <Eye className="w-4 h-4" />
                        </div>
                      </div>

                      <span className="text-white text-[9px] font-sans uppercase tracking-[0.2em] text-center block bg-[#2D2D2D]/90 py-2.5 rounded-none">
                        View Editorial Look
                      </span>
                    </div>
                  </div>

                  <div className="p-6 text-left">
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="text-sm tracking-wider font-serif text-[#2D2D2D] uppercase font-light">
                        {item.title}
                      </h3>
                      {item.priceEstimate && (
                        <span className="text-[10px] font-sans tracking-wider text-[#BCB5A9]">
                          {item.priceEstimate}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#7A756D] font-sans leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state conditional */}
        {filteredPortfolio.length === 0 && (
          <div className="text-center py-16 text-[#7A756D] font-sans text-xs tracking-widest uppercase">
            No looks have been loaded for this category yet.
          </div>
        )}

        {/* Image lens/detail Modal */}
        <AnimatePresence>
          {selectedItem && (
            <>
              {/* Back backdrop wrapper */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="fixed inset-0 bg-[#2D2D2D] z-50 cursor-pointer"
              />

              {/* Central frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 15 }}
                className="fixed inset-x-4 bottom-4 top-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-white rounded-none border border-[#E5E1DA] shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row focus:outline-none"
              >
                {/* Close Button top-right */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute right-4 top-4 p-2 bg-white border border-[#E5E1DA] text-[#2D2D2D] hover:bg-[#FAF9F6] transition z-50 focus:outline-none cursor-pointer"
                  aria-label="Close Look modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left image column */}
                <div className="w-full md:w-1/2 bg-[#FAF9F6] flex items-center justify-center relative md:h-full overflow-hidden border-r border-[#E5E1DA]">
                  <img
                    src={selectedItem.imageUrl || purnimaDefaultPreset.imageUrl}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[40vh] md:max-h-full md:h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const fallback = config.imageUrl || purnimaDefaultPreset.imageUrl;
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-[#2D2D2D] text-white text-[9px] font-sans uppercase tracking-[0.25em] py-1 px-3">
                    {selectedItem.category} LOOK
                  </div>
                </div>

                {/* Right descriptions column */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto text-left">
                  <div className="space-y-4">
                    <span className="text-[9px] font-sans tracking-[0.25em] text-[#BCB5A9] uppercase block font-medium">
                      BESPOKE PORTRAIT LOOK
                    </span>
                    <h3 className="text-2xl font-serif font-light text-[#2D2D2D] tracking-wide uppercase leading-tight">
                      {selectedItem.title}
                    </h3>
                    
                    <div className="h-[1px] w-full bg-[#E5E1DA]" />

                    <div className="space-y-4 text-[#7A756D] font-sans text-xs sm:text-sm leading-relaxed">
                      <p>{selectedItem.description}</p>
                      
                      <div className="p-4 rounded-none bg-[#FAF9F6] border border-[#E5E1DA] text-xs text-[#7A756D] font-sans space-y-2">
                        <p>▪️ <strong className="text-[#2D2D2D]">Skin Prepping</strong>: Custom moisture-lock prime hydration & cashmere finish.</p>
                        <p>▪️ <strong className="text-[#2D2D2D]">Lighting Optimization</strong>: Verified for studio flashtubes & direct natural sunbeams.</p>
                        {selectedItem.priceEstimate && (
                          <p>▪️ <strong className="text-[#2D2D2D]">Base Investment</strong>: Estimated around <strong className="text-[#2D2D2D]">{selectedItem.priceEstimate}</strong>.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3 mt-6">
                    <a
                      href={getWhatsAppLink(selectedItem)}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full py-4 rounded-none text-[10px] uppercase font-sans tracking-[0.3em] font-medium text-center transition-all flex items-center justify-center space-x-2 cursor-pointer ${themeClasses.buttonBg}`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>INQUIRE VIA WHATSAPP</span>
                    </a>
                    
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="w-full py-2 text-[10px] font-sans tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 transition"
                    >
                      Back to Lookbooks
                    </button>
                  </div>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
