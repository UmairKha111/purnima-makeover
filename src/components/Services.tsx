import { motion } from "motion/react";
import { Check, Flame, HelpCircle, MessageCircle, ArrowRight, HeartHandshake } from "lucide-react";
import { BrandConfig, ServiceDetail } from "../types";
import { themePresetClasses } from "../data";

interface ServicesProps {
  config: BrandConfig;
  themeClasses: typeof themePresetClasses[keyof typeof themePresetClasses];
  onSelectServiceForm: (serviceName: string) => void;
}

export default function Services({ config, themeClasses, onSelectServiceForm }: ServicesProps) {
  
  const getWhatsAppServiceLink = (service: ServiceDetail) => {
    const text = `Hi ${config.name}! I am browsing your services and would love to book your "${service.name}" package (${service.price}). Please let me know what dates are currently available for this luxury experience!`;
    return `https://api.whatsapp.com/send?phone=${config.phone}&text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="services" className={`py-24 border-t border-[#E5E1DA] transition-colors duration-300 ${themeClasses.primaryBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-[#7A756D]">
            LUXURY BRIDAL & STYLING PACKAGES
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-light tracking-wide ${themeClasses.headingColor}`}>
            Services & Transparent Pricing
          </h2>
          <div className="h-[1px] w-24 bg-[#E5E1DA] mx-auto"></div>
          <p className="text-xs sm:text-sm text-[#7A756D] font-sans max-w-lg mx-auto leading-relaxed">
            All services include customized skin preps, heavy-duty lashes, and dupatta draping to secure a flawless experience. Select a template or build tailored requests.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {config.services.map((service, index) => {
            const isFeatured = index === 0; // Highlight the first service (Royal Bridal)
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={service.id}
                className={`relative rounded-none p-8 flex flex-col justify-between transition-all duration-300 bg-white border border-[#E5E1DA] ${
                  isFeatured 
                    ? "ring-1 ring-[#D4AF37] scale-100 z-10" 
                    : ""
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#2D2D2D] text-white text-[9px] font-sans uppercase tracking-[0.2em] flex items-center space-x-1">
                    <span>POPULAR SELECTION</span>
                  </span>
                )}

                <div>
                  <h3 className="text-sm font-semibold tracking-wider text-[#2D2D2D] font-serif uppercase mb-2">
                    {service.name}
                  </h3>
                  
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-serif font-light text-[#2D2D2D] tracking-wide">
                      {service.price}
                    </span>
                    <span className="text-[#BCB5A9] text-[10px] ml-1 uppercase font-sans tracking-widest">/ SESSION</span>
                  </div>

                  <p className="text-xs text-[#7A756D] font-sans mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="h-[1px] w-full bg-[#FAF9F6] border-t border-[#E5E1DA] mb-6" />

                  <ul className="space-y-3 mb-8 text-left">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs text-[#7A756D] leading-relaxed font-sans">
                        <span className="text-[#BCB5A9] mr-2 text-[10px]">▪️</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#E5E1DA] mt-auto">
                  {/* Select for Booking Form */}
                  <button
                    onClick={() => onSelectServiceForm(service.name)}
                    type="button"
                    className="w-full py-2.5 rounded-none border border-[#E5E1DA] text-[#2D2D2D] hover:bg-[#FAF9F6] font-sans text-[10px] tracking-[0.2em] uppercase transition flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>INSTANT BOOK</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Direct WhatsApp booking */}
                  <a
                    href={getWhatsAppServiceLink(service)}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-3 rounded-none text-[10px] font-sans tracking-[0.25em] uppercase text-center flex items-center justify-center space-x-1 cursor-pointer ${themeClasses.buttonBg}`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Booking</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Custom inquiry note card */}
        <div className="mt-14 max-w-2xl mx-auto p-8 bg-white rounded-none border border-[#E5E1DA] text-center space-y-4">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF9F6]">
            <HeartHandshake className="w-4 h-4 text-[#BCB5A9]" />
          </div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#2D2D2D] font-sans">
            Need a Customized Makeup Look or Group Packages?
          </h3>
          <p className="text-xs text-[#7A756D] font-sans leading-relaxed max-w-md mx-auto">
            Providing group bookings for bridesmaid parties, pre-wedding cocktail events, or high-fashion catalogues. Connect with {config.name} below and get customized details.
          </p>
        </div>

      </div>
    </section>
  );
}
