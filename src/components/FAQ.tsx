import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { defaultFaqs, themePresetClasses } from "../data";

interface FAQProps {
  themeClasses: typeof themePresetClasses[keyof typeof themePresetClasses];
}

export default function FAQ({ themeClasses }: FAQProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className={`py-24 border-t border-[#E5E1DA] transition-colors duration-300 ${themeClasses.primaryBg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-[#7A756D]">
            CLIENT CONCERNS
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-light tracking-wide ${themeClasses.headingColor}`}>
            Common Inquiries
          </h2>
          <div className="h-[1px] w-24 bg-[#E5E1DA] mx-auto"></div>
          <p className="text-xs text-[#7A756D] font-sans max-w-sm mx-auto leading-relaxed">
            Got queries regarding pre-skin preps, trials, or on-venue travel to other cities? We have compiled the answers for you.
          </p>
        </div>

        {/* FAQs list accordion */}
        <div className="space-y-4">
          {defaultFaqs.map((faq, index) => {
            const isOpen = activeIdx === index;
            return (
              <div
                key={index}
                className="bg-white border border-[#E5E1DA] rounded-none overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  type="button"
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between font-serif font-light text-[#2D2D2D] text-sm sm:text-base hover:bg-[#FAF9F6] transition focus:outline-none cursor-pointer uppercase tracking-wider"
                >
                  <span className="pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#7A756D] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-[#FAF9F6] text-xs sm:text-sm text-[#7A756D] leading-relaxed font-sans text-left">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
