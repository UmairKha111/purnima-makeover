import { useState, useEffect } from "react";
import { purnimaDefaultPreset, themePresetClasses } from "./data";
import { BrandConfig, Inquiry } from "./types";
import Navbar from "./components/Navbar";
import BrandCustomizer from "./components/BrandCustomizer";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import BookingForm from "./components/BookingForm";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import InquiryDashboard from "./components/InquiryDashboard";
import Footer from "./components/Footer";

export default function App() {
  // 1. Brand Configuration State (Loads custom brand details or default Purnima Ranchi Preset)
  const [config, setConfig] = useState<BrandConfig>(() => {
    const saved = localStorage.getItem("whitelabel_brand_config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Force migrate old Unsplash image to our newly generated premium portrait of Purnima Makeover
        if (
          parsed.id === "purnima" ||
          parsed.imageUrl === "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800" ||
          !parsed.imageUrl ||
          parsed.imageUrl.includes("unsplash.com")
        ) {
          parsed.imageUrl = purnimaDefaultPreset.imageUrl;
        }
        
        // Force update portfolio list and services for 'purnima' preset to keep images fresh and avoid stale/broken local state
        if (parsed.id === "purnima") {
          parsed.portfolio = purnimaDefaultPreset.portfolio;
          parsed.services = purnimaDefaultPreset.services;
        }
        return parsed;
      } catch (err) {
        console.error("Failed to parse brand config", err);
      }
    }
    return purnimaDefaultPreset;
  });

  // 2. Local Submitted Inquiries State (CRM Tracking for the Artist)
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem("whitelabel_inquiries");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse local inquiries list", err);
      }
    }
    return [];
  });

  // 3. Modals and drawers status toggles
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  // Determine if the user has unlocked the Demo Customization Panel
  const [isDemoMode, setIsDemoMode] = useState(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      const isParam = search.includes("demo=true") || 
                      search.includes("admin=true") || 
                      search.includes("edit=true") || 
                      search.includes("customize=true");
      const isStored = localStorage.getItem("demo_admin_activated") === "true";
      return isParam || isStored;
    }
    return false;
  });

  const handleToggleDemoMode = () => {
    setIsDemoMode((prev) => {
      const newVal = !prev;
      localStorage.setItem("demo_admin_activated", newVal ? "true" : "false");
      return newVal;
    });
  };

  // Persist Brand edits immediately
  useEffect(() => {
    localStorage.setItem("whitelabel_brand_config", JSON.stringify(config));
  }, [config]);

  // Persist client inquiries immediately
  useEffect(() => {
    localStorage.setItem("whitelabel_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  // Hook up active theme preset classes safely
  const activeThemeClasses = themePresetClasses[config.theme] || themePresetClasses.gold;

  // CRM Actions handlers
  const handleAddNewInquiry = (newInq: Inquiry) => {
    setInquiries((prev) => [newInq, ...prev]);
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: Inquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const handleClearAllInquiries = () => {
    setInquiries([]);
  };

  const handleSelectServiceForm = (serviceName: string) => {
    setSelectedService(serviceName);
    // Briefly reset after triggering scroll/select to allow repeated trigger clicks
    setTimeout(() => {
      setSelectedService("");
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-stone-900 overflow-x-hidden ${activeThemeClasses.primaryBg}`}>
      {/* 1. Global Navigation */}
      <Navbar
        config={config}
        themeClasses={activeThemeClasses}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        inquiryCount={inquiries.filter((i) => i.status === "pending").length}
        isDemoMode={isDemoMode}
        onToggleDemoMode={handleToggleDemoMode}
      />

      {/* 2. Hero Presentation (Shows main portrait character elegantly) */}
      <Hero
        config={config}
        themeClasses={activeThemeClasses}
      />

      {/* 3. Portfolio interactive lookbook */}
      <Portfolio
        config={config}
        themeClasses={activeThemeClasses}
      />

      {/* 4. Services packages list grids */}
      <Services
        config={config}
        themeClasses={activeThemeClasses}
        onSelectServiceForm={handleSelectServiceForm}
      />

      {/* 5. Client dynamic reviews */}
      <Testimonials
        themeClasses={activeThemeClasses}
      />

      {/* 6. Comprehensive booking form details */}
      <BookingForm
        config={config}
        themeClasses={activeThemeClasses}
        selectedService={selectedService}
        onAddInquiry={handleAddNewInquiry}
      />

      {/* 7. Accordion FAQs */}
      <FAQ
        themeClasses={activeThemeClasses}
      />

      {/* 8. Global footer details */}
      <Footer
        config={config}
        themeClasses={activeThemeClasses}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        isDemoMode={isDemoMode}
      />

      {/* 9. Floating Brand Customizer Control Center Drawer */}
      <BrandCustomizer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onChangeConfig={setConfig}
        themeClasses={activeThemeClasses}
      />

      {/* 10. Local CRM Inquiries list Dashboard Modal */}
      <InquiryDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        config={config}
        themeClasses={activeThemeClasses}
        inquiries={inquiries}
        onUpdateStatus={handleUpdateInquiryStatus}
        onDelete={handleDeleteInquiry}
        onClearAll={handleClearAllInquiries}
      />
    </div>
  );
}
