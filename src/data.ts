import { BrandConfig } from "./types";
import purnimaPortrait from "./assets/images/purnima.png";
import crimsonBride from "./assets/images/bridal-crimson.jpg";

export const purnimaDefaultPreset: BrandConfig = {
  id: "purnima",
  name: "Purnima Makeover",
  tagline: "Enhancing Beauty, Elevating You",
  subtitle: "Professional Bridal & Fashion Makeup Artist • Ranchi & Globally",
  location: "Ranchi, Jharkhand",
  address: "Purnima Beauty Parlour & Makeover, Ranchi, Jharkhand 834004",
  phone: "916391157751", // Customizable WhatsApp phone format (no leading +, spaces, or dashes for API routing)
  email: "purnimamakeover@gmail.com",
  instagram: "purnima_makeover_ranchi",
  facebook: "purnima.makeover",
  imageUrl: purnimaPortrait, // Representative elegant portrait matching her black & gold saree, fine contours
  bio: "Certified professional makeup artist based in Ranchi, Jharkhand. Traveling globally for royal bridal makeovers, high-fashion editorials, prestige masterclasses, and collaborate beauty projects. Believing that every face is an exquisite canvas, we elevate your natural beauty to majestic royalty on your most celebrated days.",
  theme: "gold",
  services: [
    {
      id: "srv_royal_bridal",
      name: "Royal Bridal Transformation",
      description: "HD & Airbrush luxury bridal makeup, customized skin prepping, lash styling, professional saree/dupatta draping, and advanced bridal hair styling with fresh floral accessories.",
      price: "₹15,500",
      features: [
        "Flawless HD/Airbrush premium finish",
        "Complimentary trial & pre-skin consultation",
        "Saree & Lehenga draping & accessory placement",
        "Luxury lashes & premium mink hair extension styling",
        "Touch-up companion kit for the wedding reception"
      ]
    },
    {
      id: "srv_glam_engagement",
      name: "Pre-Wedding & Engagement Glam",
      description: "Sophisticated modern styling tailored for your Sagan, Haldi, Roka, or Engagement celebration. Designed to glow under professional indoor and outdoor ambient lights.",
      price: "₹8,500",
      features: [
        "Luminous dew-drop makeup texture",
        "Thematic hair styling (braids, waves, or updo)",
        "Premium falsies lash upgrade included",
        "Saree, gown, or heavy suit draping details",
        "6-hour non-creasing color-lock technique"
      ]
    },
    {
      id: "srv_fashion_editorial",
      name: "Prestige Fashion & Editorial Shoot",
      description: "High-definition camera-ready makeup optimized for run-ways, catalogs, print publications, and digital portfolios, built with durable contour precision.",
      price: "₹10,500",
      features: [
        "Advanced matte sculpting & studio lighting proofing",
        "High-definition graphic or creative color design",
        "On-set touchups (up to 3 hours duration included)",
        "Avant-garde hair styling styling adjustments",
        "Compatible with professional camera studio strobes"
      ]
    },
    {
      id: "srv_celebration_party",
      name: "Elite Celebration & Party Makeup",
      description: "Elegant and stunning cocktail, reception, or bridesmaid makeup tailored to stand out while carrying a light, breeze-like comfortable feel.",
      price: "₹5,000",
      features: [
        "Customized lightweight mineral foundation base",
        "Soft-smudge smoky or clean winged eye beauty",
        "Premium blowout or hot roller soft waves",
        "Standard lash styling enhancement",
        "Waterproof lipstick & lock-in setting sprays"
      ]
    }
  ],
  portfolio: [
    {
      id: "p1",
      title: "Majestic Crimson Bridal Glow",
      category: "Bridal",
      imageUrl: crimsonBride,
      description: "Royal traditional Red Lehenga look with soft cut-crease eyes, sculpted glowing cheekbones, and customized gold jewelry placement.",
      priceEstimate: "₹15,000"
    },
    {
      id: "p2",
      title: "Thematic Peacock Emerald Saree Look",
      category: "Engagement",
      imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      description: "Elegant editorial look featuring a dark saree with custom antique-gold weaves. Perfectly styled with clean subtle makeup matching traditional celebrations.",
      priceEstimate: "₹8,500"
    },
    {
      id: "p3",
      title: "High-Fashion Editorial Runway Look",
      category: "Fashion",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
      description: "Clean radiant porcelain base, dynamic liquid gold highlighting, and minimalist nude lips tailored for high-profile designers.",
      priceEstimate: "₹12,000"
    },
    {
      id: "p4",
      title: "Luminous Dewy Reception Glamour",
      category: "Party",
      imageUrl: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=800",
      description: "Soft modern shimmer eyes, pastel mauve lips, and relaxed Hollywood curls ideal for modern wedding receptions and celebrations.",
      priceEstimate: "₹5,500"
    },
    {
      id: "p5",
      title: "Royal North-Indian Traditional Sangeet",
      category: "Bridal",
      imageUrl: "https://images.unsplash.com/photo-1583391265517-35bbadd01209?auto=format&fit=crop&q=80&w=800",
      description: "Matte bridal finish with rich smokey kohl eyes and crimson classic matte lip contour, styled with extensive royal head jewelry.",
      priceEstimate: "₹16,000"
    },
    {
      id: "p6",
      title: "Contemporary Indo-Western Reception",
      category: "Engagement",
      imageUrl: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&q=80&w=800",
      description: "A gorgeous combination of clean bronze eyelids, sleek side-swept locks, and glowing coral cheeks.",
      priceEstimate: "₹8,000"
    }
  ]
};

export const alternateBridesPreset: BrandConfig = {
  id: "luxe_aura",
  name: "Luxe Aura Beauty",
  tagline: "Unveiling Haute Couture Glamour",
  subtitle: "Elite Makeup Artistry Lab & Academy • Mumbai • Delhi",
  location: "Bandra West, Mumbai",
  address: "Studio 202, Premium Runway Heights, Bandra West, Mumbai 400050",
  phone: "919000012345",
  email: "bookings@luxeaura.com",
  instagram: "luxeaura_beauty",
  facebook: "luxeaura.official",
  imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", // Representative high-fashion corporate executive/editorial director picture
  bio: "Luxe Aura is a celebrity makeup atelier guided by top editorial stylists. We cater to high-end designer brands, Bollywood red carpets, and contemporary premium brides who seek a departure from ordinary styling. Each look is mathematically customized to harmonize with high-fashion lighting rigs and digital cinema cameras.",
  theme: "charcoal",
  services: [
    {
      id: "aur_srv_1",
      name: "Red Carpet & Celebrity Glam",
      description: "Signature camera-ready ultra-premium airbrush makeup featuring ultra-thin weightless silk coatings, professional contour sculpting, and personal assistant touch-up on site.",
      price: "₹25,500",
      features: [
        "High-definition camera ready dynamic foundation",
        "Premium mink personalized strip eyelashes",
        "Celebrity-tier hair designer selection",
        "Includes helper assistant on site for 4 hours",
        "Travel cost covered within city bounds"
      ]
    },
    {
      id: "aur_srv_2",
      name: "Avant-Garde Fashion Runway",
      description: "Innovative artistic concept makeup for runway models, designer lookbooks, and fashion films. Features bold structural embellishments, foil accents, and graphical liners.",
      price: "₹18,000",
      features: [
        "Futuristic shapes and custom color concepts",
        "3D elements (pearls, glitters, and metallics)",
        "Direct collaboration with runway creative director",
        "Extremely durable waterproof elements",
        "Gloss & styling adjustments during the shoot"
      ]
    }
  ],
  portfolio: [
    {
      id: "ap1",
      title: "High Contrast Vogue Portrait",
      category: "Fashion",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
      description: "Sharp metallic graphic eyeliner and dramatic glossy lips designed specifically for Vogue cover lighting layouts.",
      priceEstimate: "₹20,500"
    },
    {
      id: "ap2",
      title: "Gothic Glamour Editorial Look",
      category: "Party",
      imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=800",
      description: "Deep dark cherry lips, extremely pale flawless matte foundation skin, and soft grey smokey halo eyelids.",
      priceEstimate: "₹18,000"
    }
  ]
};

export const themePresetClasses = {
  gold: {
    primaryBg: "bg-[#FAF9F6]",
    headerBg: "bg-[#FAF9F6] border-b border-[#E5E1DA]",
    headerText: "text-[#2D2D2D]",
    accent: "text-[#D4AF37]",
    accentHover: "hover:text-[#BCB5A9]",
    buttonBg: "bg-[#2D2D2D] hover:bg-[#1A1A1A] text-white tracking-[0.2em] font-sans text-xs uppercase transition-colors duration-200",
    cardBg: "bg-white border border-[#E5E1DA] rounded-none",
    textColor: "text-[#7A756D]",
    headingColor: "text-[#2D2D2D] font-serif font-light",
    accentBg: "bg-[#E5E1DA] text-[#2D2D2D]",
    badgeBg: "bg-[#FAF9F6] border border-[#E5E1DA] text-[#7A756D]",
    footerBg: "bg-[#FAF9F6] border-t border-[#E5E1DA] text-[#7A756D]",
    ringColor: "focus:ring-1 focus:ring-[#D4AF37] outline-none",
    accentBorder: "border-[#D4AF37]",
    gradientText: "from-[#2D2D2D] to-[#4A453F] bg-linear-to-r",
    glowColor: "shadow-none",
    pillActive: "bg-[#2D2D2D] text-white tracking-widest font-sans text-[10px]",
    pillInactive: "bg-white border border-[#E5E1DA] text-[#7A756D] hover:bg-[#FAF9F6] tracking-widest font-sans text-[10px]",
  },
  rose: {
    primaryBg: "bg-[#FAF7F5]",
    headerBg: "bg-[#FAF7F5] border-b border-[#E9E1DC]",
    headerText: "text-[#3D3331]",
    accent: "text-[#B2827B]",
    accentHover: "hover:text-[#9A6962]",
    buttonBg: "bg-[#3D3331] hover:bg-[#2A2120] text-white tracking-[0.2em] font-sans text-xs uppercase transition-colors duration-200",
    cardBg: "bg-white border border-[#E9E1DC] rounded-none",
    textColor: "text-[#8C7B76]",
    headingColor: "text-[#3D3331] font-serif font-light",
    accentBg: "bg-[#E9E1DC] text-[#3D3331]",
    badgeBg: "bg-[#FAF7F5] border border-[#E9E1DC] text-[#8C7B76]",
    footerBg: "bg-[#FAF7F5] border-t border-[#E9E1DC] text-[#8C7B76]",
    ringColor: "focus:ring-1 focus:ring-[#B2827B] outline-none",
    accentBorder: "border-[#B2827B]",
    gradientText: "from-[#3D3331] to-[#5A4D4A] bg-linear-to-r",
    glowColor: "shadow-none",
    pillActive: "bg-[#3D3331] text-white tracking-widest font-sans text-[10px]",
    pillInactive: "bg-white border border-[#E9E1DC] text-[#8C7B76] hover:bg-[#FAF7F5] tracking-widest font-sans text-[10px]",
  },
  crimson: {
    primaryBg: "bg-[#FAF8F6]",
    headerBg: "bg-[#FAF8F6] border-b border-[#EAE3DE]",
    headerText: "text-[#2B1B17]",
    accent: "text-[#800020]",
    accentHover: "hover:text-[#5E0217]",
    buttonBg: "bg-[#2B1B17] hover:bg-[#140B08] text-white tracking-[0.2em] font-sans text-xs uppercase transition-colors duration-200",
    cardBg: "bg-white border border-[#EAE3DE] rounded-none",
    textColor: "text-[#82716C]",
    headingColor: "text-[#2B1B17] font-serif font-light",
    accentBg: "bg-[#EAE3DE] text-[#2B1B17]",
    badgeBg: "bg-[#FAF8F6] border border-[#EAE3DE] text-[#82716C]",
    footerBg: "bg-[#FAF8F6] border-t border-[#EAE3DE] text-[#82716C]",
    ringColor: "focus:ring-1 focus:ring-[#800020] outline-none",
    accentBorder: "border-[#800020]",
    gradientText: "from-[#2B1B17] to-[#46312B] bg-linear-to-r",
    glowColor: "shadow-none",
    pillActive: "bg-[#2B1B17] text-white tracking-widest font-sans text-[10px]",
    pillInactive: "bg-white border border-[#EAE3DE] text-[#82716C] hover:bg-[#FAF8F6] tracking-widest font-sans text-[10px]",
  },
  emerald: {
    primaryBg: "bg-[#FAF9F5]",
    headerBg: "bg-[#FAF9F5] border-b border-[#E3E6E0]",
    headerText: "text-[#1C2823]",
    accent: "text-[#3B4D45]",
    accentHover: "hover:text-[#27352E]",
    buttonBg: "bg-[#1C2823] hover:bg-[#0C1511] text-white tracking-[0.2em] font-sans text-xs uppercase transition-colors duration-200",
    cardBg: "bg-white border border-[#E3E6E0] rounded-none",
    textColor: "text-[#767E77]",
    headingColor: "text-[#1C2823] font-serif font-light",
    accentBg: "bg-[#E3E6E0] text-[#1C2823]",
    badgeBg: "bg-[#FAF9F5] border border-[#E3E6E0] text-[#767E77]",
    footerBg: "bg-[#FAF9F5] border-t border-[#E3E6E0] text-[#767E77]",
    ringColor: "focus:ring-1 focus:ring-[#3B4D45] outline-none",
    accentBorder: "border-[#3B4D45]",
    gradientText: "from-[#1C2823] to-[#2D3F37] bg-linear-to-r",
    glowColor: "shadow-none",
    pillActive: "bg-[#1C2823] text-white tracking-widest font-sans text-[10px]",
    pillInactive: "bg-white border border-[#E3E6E0] text-[#767E77] hover:bg-[#FAF9F5] tracking-widest font-sans text-[10px]",
  },
  charcoal: {
    primaryBg: "bg-[#FAFBFC]",
    headerBg: "bg-[#FAFBFC] border-b border-[#E5E9EC]",
    headerText: "text-[#111111]",
    accent: "text-[#333333]",
    accentHover: "hover:text-[#555555]",
    buttonBg: "bg-[#111111] hover:bg-black text-white tracking-[0.2em] font-sans text-xs uppercase transition-colors duration-200",
    cardBg: "bg-white border border-[#E5E9EC] rounded-none",
    textColor: "text-[#666C70]",
    headingColor: "text-[#111111] font-serif font-light",
    accentBg: "bg-[#E5E9EC] text-[#111111]",
    badgeBg: "bg-[#FAFBFC] border border-[#E5E9EC] text-[#666C70]",
    footerBg: "bg-[#FAFBFC] border-t border-[#E5E9EC] text-[#666C70]",
    ringColor: "focus:ring-1 focus:ring-[#333333] outline-none",
    accentBorder: "border-[#333333]",
    gradientText: "from-[#111111] to-[#3A3E40] bg-linear-to-r",
    glowColor: "shadow-none",
    pillActive: "bg-[#111111] text-white tracking-widest font-sans text-[10px]",
    pillInactive: "bg-white border border-[#E5E9EC] text-[#666C70] hover:bg-[#FAFBFC] tracking-widest font-sans text-[10px]",
  }
};

export const defaultFaqs = [
  {
    question: "How far in advance should I book my bridal makeup?",
    answer: "We highly recommend securing your wedding date as early as 3 to 6 months in advance. Dates during high wedding seasons (such as October to February in Ranchi) fill up incredibly quickly, especially for weekend events."
  },
  {
    question: "Do you offer on-venue makeup services for destination weddings?",
    answer: "Yes, definitely! Purnima travels worldwide for bridal and collaborative assignments. For on-venue styling, outbound traveling expenses and standard lodging charges are to be borne by the client."
  },
  {
    question: "What is the difference between custom HD Makeup and Airbrush Makeup?",
    answer: "HD Makeup uses ultra-fine light-reflective fluid pigments that create an invisible layer under high-resolution lenses. Airbrush Makeup utilizes special light compressor guns to deliver a weightless, fully sweatproof, and highly blended silicone veil layer on the skin, highly recommended for long-standing event climates."
  },
  {
    question: "Will you help with hair styling, saree draping, and jewelry setting?",
    answer: "Absolutely! All our customized bridal packages are all-inclusive. They include high-definition skin-prep prime, eyelashes, professional saree or dupatta draping, jewelry anchoring, hair styling, hair extension coordination, and fresh flower placement."
  },
  {
    question: "Can I do a pre-bridal booking trial?",
    answer: "Yes, booking trials are available for brides-to-be on request, where we discuss custom skin moods, makeup preferences, saree drapes, and hair textures beforehand so there are zero surprises on the big day."
  }
];

export const defaultTestimonials = [
  {
    id: "t1",
    name: "Sneha Kumari",
    role: "Delighted Bride (Ranchi)",
    comment: "Purnima did my makeup for my wedding night and reception, and she was simply magical! She created the exact traditional royal look I wanted. The makeup didn't crease or melt despite the heavy heat, and I looked absolutely stellar in my wedding album. Thank you so much!",
    rating: 5,
    date: "November 2025"
  },
  {
    id: "t2",
    name: "Anjali Shreya",
    role: "Fashion Model, Ranchi Runway",
    comment: "Purnima's editorial and runway mastery is top tier! Her matte contour sculpting and eyeshadow precision are flawless. I loved working with her for our fashion launch. She is incredibly professional, structured, and understands exactly what camera strobes require.",
    rating: 5,
    date: "January 2026"
  },
  {
    id: "t3",
    name: "Priyanka Roy",
    role: "Corporate Client (Engagement Glam)",
    comment: "I booked Purnima for my engagement look. The dewy glass-skin makeup she did got me so many compliments! She has an extremely clean hand and made sure that my hair and saree drape were solid. I didn't have to adjust my drape even once during the 6-hour event.",
    rating: 5,
    date: "February 2026"
  }
];
