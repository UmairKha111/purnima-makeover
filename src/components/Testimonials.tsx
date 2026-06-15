import { motion } from "motion/react";
import { Star, Quote, Heart } from "lucide-react";
import { defaultTestimonials, themePresetClasses } from "../data";

interface TestimonialsProps {
  themeClasses: typeof themePresetClasses[keyof typeof themePresetClasses];
}

export default function Testimonials({ themeClasses }: TestimonialsProps) {
  return (
    <section className="py-24 bg-white border-t border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-[#7A756D]">
            REAL APPRECIATION
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-light tracking-wide ${themeClasses.headingColor}`}>
            Bridal Testimonials
          </h2>
          <div className="h-[1px] w-24 bg-[#E5E1DA] mx-auto"></div>
          <p className="text-xs text-[#7A756D] font-sans max-w-sm mx-auto leading-relaxed">
            There is no greater honor than helping a client look and feel radiant on their most important days. Here is what they say.
          </p>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {defaultTestimonials.map((review, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={review.id}
              className="p-8 rounded-none border border-[#E5E1DA] bg-white relative flex flex-col justify-between"
            >
              {/* Giant quotation marks details */}
              <Quote className="absolute top-6 right-6 w-8 h-8 opacity-[0.03] text-[#2D2D2D] pointer-events-none" />

              <div className="space-y-4">
                {/* Visual stars rating */}
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, sIdx) => (
                    <span key={sIdx} className="text-[#BCB5A9] text-xs">★</span>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#7A756D] font-sans italic leading-relaxed text-left">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-6 border-t border-[#E5E1DA] mt-6 md:mt-8 text-left">
                <div className="h-8 w-8 rounded-none border border-[#E5E1DA] bg-[#FAF9F6] flex items-center justify-center text-[#2D2D2D] text-[10px] font-sans font-medium">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-[#2D2D2D] font-sans uppercase">{review.name}</h4>
                  <p className="text-[9px] text-[#7A756D] uppercase font-sans tracking-widest mt-0.5">{review.role} • {review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
