import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Sparkles, Sliders, Palette, RefreshCw, Copy, Check, Upload, 
  HelpCircle, Trash2, Plus, ArrowRight, Instagram, MessageSquare, Mail, MapPin 
} from "lucide-react";
import { BrandConfig } from "../types";
import { purnimaDefaultPreset, alternateBridesPreset, themePresetClasses } from "../data";

interface BrandCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  config: BrandConfig;
  onChangeConfig: (newConfig: BrandConfig) => void;
  themeClasses: typeof themePresetClasses[keyof typeof themePresetClasses];
}

export default function BrandCustomizer({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  themeClasses,
}: BrandCustomizerProps) {
  const [activeTab, setActiveTab] = useState<"basics" | "theme" | "services" | "code">("basics");
  const [isCopied, setIsCopied] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  
  // Local state for easy form management
  const [localConfig, setLocalConfig] = useState<BrandConfig>({ ...config });

  // Keep local config in sync with parent updates (e.g., preset changes)
  useEffect(() => {
    setLocalConfig({ ...config });
  }, [config]);

  const handleApplyPreset = (preset: "purnima" | "alternate") => {
    const selected = preset === "purnima" ? purnimaDefaultPreset : alternateBridesPreset;
    onChangeConfig(selected);
  };

  const handleChangeBasic = (key: keyof BrandConfig, value: any) => {
    const updated = { ...localConfig, [key]: value };
    setLocalConfig(updated);
    onChangeConfig(updated);
  };

  const handleUpdateService = (idx: number, field: string, value: any) => {
    const updatedServices = [...localConfig.services];
    updatedServices[idx] = { ...updatedServices[idx], [field]: value };
    const updated = { ...localConfig, services: updatedServices };
    setLocalConfig(updated);
    onChangeConfig(updated);
  };

  const handleAddService = () => {
    const newService = {
      id: `srv_custom_${Date.now()}`,
      name: "New Glamour Package",
      description: "Customize this glamorous beauty description in real-time.",
      price: "₹6,000",
      features: ["Premium skin lock prep", "Standard eyelash extensions"]
    };
    const updated = { ...localConfig, services: [...localConfig.services, newService] };
    setLocalConfig(updated);
    onChangeConfig(updated);
  };

  const handleRemoveService = (id: string) => {
    const updated = {
      ...localConfig,
      services: localConfig.services.filter(s => s.id !== id)
    };
    setLocalConfig(updated);
    onChangeConfig(updated);
  };

  const handleExportJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleImportJSON = () => {
    try {
      setImportError("");
      const parsed = JSON.parse(importText);
      if (!parsed.name || !parsed.theme || !Array.isArray(parsed.services)) {
        throw new Error("Missing required fields (name, theme, services list).");
      }
      onChangeConfig(parsed);
      setImportText("");
      alert("Successfully loaded custom makeup brand configuration!");
    } catch (err: any) {
      setImportError(err.message || "Invalid JSON configuration format.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950 z-50 cursor-pointer"
          />

          {/* Silder Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-stone-900 border-l border-stone-850 shadow-2xl z-50 flex flex-col focus:outline-none"
          >
            {/* Panel Header */}
            <div className="p-6 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded bg-amber-500/10 text-amber-500">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-md font-bold text-stone-100 font-sans">
                    Makeup Brand Studio
                  </h2>
                  <p className="text-xs text-stone-400 font-mono">
                    Instant White-Label Re-theme Engine
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition"
                aria-label="Close Customizer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Presets Bar */}
            <div className="px-6 py-4 bg-stone-950/50 border-b border-stone-800 flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-wider text-stone-400 uppercase">
                ⚡ LOAD BRAND PRESETS:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleApplyPreset("purnima")}
                  className={`px-3 py-2 text-xs rounded border transition flex items-center justify-center space-x-1 cursor-pointer ${
                    config.id === "purnima"
                      ? "bg-amber-500/15 border-amber-500 text-amber-300 font-semibold"
                      : "bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Purnima Ranchi (Default)</span>
                </button>
                <button
                  onClick={() => handleApplyPreset("alternate")}
                  className={`px-3 py-2 text-xs rounded border transition flex items-center justify-center space-x-1 cursor-pointer ${
                    config.id === "luxe_aura"
                      ? "bg-stone-500/15 border-stone-400 text-stone-200 font-semibold"
                      : "bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800"
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Luxe Aura (Metropolitan)</span>
                </button>
              </div>
            </div>

            {/* Config Mode Tab Navigation */}
            <div className="flex border-b border-stone-800 bg-stone-900 text-xs text-stone-400">
              <button
                onClick={() => setActiveTab("basics")}
                className={`flex-1 py-3 text-center border-b-2 font-medium transition ${
                  activeTab === "basics"
                    ? "border-amber-500 text-amber-400 bg-stone-800/40"
                    : "border-transparent hover:text-stone-200"
                }`}
              >
                1. Brand Details
              </button>
              <button
                onClick={() => setActiveTab("theme")}
                className={`flex-1 py-3 text-center border-b-2 font-medium transition ${
                  activeTab === "theme"
                    ? "border-amber-500 text-amber-400 bg-stone-800/40"
                    : "border-transparent hover:text-stone-200"
                }`}
              >
                2. Palette / Theme
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`flex-1 py-3 text-center border-b-2 font-medium transition ${
                  activeTab === "services"
                    ? "border-amber-500 text-amber-400 bg-stone-800/40"
                    : "border-transparent hover:text-stone-200"
                }`}
              >
                3. Services
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex-1 py-3 text-center border-b-2 font-medium transition ${
                  activeTab === "code"
                    ? "border-amber-500 text-amber-400 bg-stone-800/40"
                    : "border-transparent hover:text-stone-200"
                }`}
              >
                4. Code Export
              </button>
            </div>

            {/* Customizer Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === "basics" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase mb-1">
                      👑 MAKEUP ARTIST / BRAND NAME
                    </label>
                    <input
                      type="text"
                      className="w-full bg-stone-800 border border-stone-750 rounded px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                      value={localConfig.name}
                      onChange={(e) => handleChangeBasic("name", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase mb-1">
                      ✨ BRAND MAIN TAGLINE
                    </label>
                    <input
                      type="text"
                      className="w-full bg-stone-800 border border-stone-750 rounded px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                      value={localConfig.tagline}
                      onChange={(e) => handleChangeBasic("tagline", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase mb-1">
                      🌟 SUBTITLE DESCRIPTION
                    </label>
                    <input
                      type="text"
                      className="w-full bg-stone-800 border border-stone-750 rounded px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                      value={localConfig.subtitle}
                      onChange={(e) => handleChangeBasic("subtitle", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-stone-400 uppercase mb-1">
                        📍 LOCATION BASE
                      </label>
                      <input
                        type="text"
                        className="w-full bg-stone-800 border border-stone-750 rounded px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                        value={localConfig.location}
                        onChange={(e) => handleChangeBasic("location", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-stone-400 uppercase mb-1">
                        💬 WHATSAPP NUMBER
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 916391157751"
                        className="w-full bg-stone-800 border border-stone-750 rounded px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                        value={localConfig.phone}
                        onChange={(e) => handleChangeBasic("phone", e.target.value)}
                      />
                      <p className="text-[10px] text-stone-500 mt-0.5 font-mono">
                        Without + or spaces (e.g., 9199xxxxxxxxx)
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase mb-1">
                      🖼️ PRINCIPAL CHARACTER IMAGE URL
                    </label>
                    <input
                      type="text"
                      className="w-full bg-stone-800 border border-stone-750 rounded px-3 py-2 text-xs text-stone-100 font-mono focus:outline-none focus:border-amber-500"
                      value={localConfig.imageUrl}
                      onChange={(e) => handleChangeBasic("imageUrl", e.target.value)}
                    />
                    <p className="text-[10px] text-stone-500 mt-1 font-sans">
                      Paste a direct image URL to replace the portrait of the makeup artist.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase mb-1">
                      📝 BRAND BIO & STORY
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-stone-800 border border-stone-750 rounded px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
                      value={localConfig.bio}
                      onChange={(e) => handleChangeBasic("bio", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-stone-400 mb-1">INSTAGRAM</label>
                      <input
                        type="text"
                        className="w-full bg-stone-800 border border-stone-750 rounded px-2.5 py-1.5 text-xs text-stone-100 focus:outline-none"
                        value={localConfig.instagram}
                        onChange={(e) => handleChangeBasic("instagram", e.target.value)}
                        placeholder="Username"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-stone-400 mb-1">FACEBOOK</label>
                      <input
                        type="text"
                        className="w-full bg-stone-800 border border-stone-750 rounded px-2.5 py-1.5 text-xs text-stone-100 focus:outline-none"
                        value={localConfig.facebook}
                        onChange={(e) => handleChangeBasic("facebook", e.target.value)}
                        placeholder="Id"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-stone-400 mb-1">EMAIL</label>
                      <input
                        type="text"
                        className="w-full bg-stone-800 border border-stone-750 rounded px-2.5 py-1.5 text-xs text-stone-100 focus:outline-none"
                        value={localConfig.email}
                        onChange={(e) => handleChangeBasic("email", e.target.value)}
                        placeholder="Email ID"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase mb-1">
                      🏨 PHYSICAL HOME ADDRESS
                    </label>
                    <input
                      type="text"
                      className="w-full bg-stone-800 border border-stone-750 rounded px-3 py-2 text-sm text-stone-100 focus:outline-none"
                      value={localConfig.address}
                      onChange={(e) => handleChangeBasic("address", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {activeTab === "theme" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-stone-200 mb-3">
                      Select Aesthetic Color Theme
                    </h3>
                    <p className="text-xs text-stone-400 mb-4 font-sans">
                      Choosing a curated luxury theme preset defines all backgrounds, buttons, borders, and overlays across the entire landing page.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {(Object.keys(themePresetClasses) as Array<keyof typeof themePresetClasses>).map((tKey) => {
                        const isSelected = localConfig.theme === tKey;
                        return (
                          <button
                            key={tKey}
                            onClick={() => handleChangeBasic("theme", tKey)}
                            className={`p-3 rounded-lg border text-left transition flex flex-col justify-between h-20 cursor-pointer ${
                              isSelected
                                ? "border-amber-500 bg-stone-800/80"
                                : "border-stone-800 bg-stone-900 hover:bg-stone-800/40"
                            }`}
                          >
                            <span className="text-xs font-bold text-stone-200 capitalize">
                              {tKey} Theme
                            </span>
                            <div className="flex space-x-1.5">
                              {/* Swatches representation */}
                              <span className={`w-4 h-4 rounded-full border border-stone-800 ${
                                tKey === 'gold' ? 'bg-amber-600' :
                                tKey === 'rose' ? 'bg-rose-500' :
                                tKey === 'crimson' ? 'bg-red-700' :
                                tKey === 'emerald' ? 'bg-emerald-600' : 'bg-stone-900'
                              }`} />
                              <span className={`w-4 h-4 rounded-full border border-stone-800 ${
                                tKey === 'gold' ? 'bg-stone-900' :
                                tKey === 'rose' ? 'bg-emerald-50' :
                                tKey === 'crimson' ? 'bg-stone-900' :
                                tKey === 'emerald' ? 'bg-stone-900' : 'bg-stone-100'
                              }`} />
                              {isSelected && (
                                <span className="ml-auto text-[10px] text-amber-500 font-mono">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-stone-950 border border-stone-800">
                    <h4 className="text-xs font-mono text-stone-300 uppercase mb-2">
                      💡 Aesthetic Tip:
                    </h4>
                    <ul className="text-xs text-stone-400 space-y-1.5 list-disc pl-4 font-sans">
                      <li>Use <strong className="text-amber-400">Gold</strong> for royal Jharkhand/Ranchi wedding aesthetics.</li>
                      <li>Use <strong className="text-rose-400">Rose</strong> for chic pre-wedding and engagement lookbooks.</li>
                      <li>Use <strong className="text-red-400">Crimson</strong> for elegant modern bridal aesthetics and heavy lehengas.</li>
                      <li>Use <strong className="text-zinc-200">Charcoal</strong> for elite magazines, high-fashion catalog runways, or workshops.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "services" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono tracking-wider text-stone-400 uppercase">
                      📋 EDIT SERVICES & PACAKGES
                    </span>
                    <button
                      onClick={handleAddService}
                      className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-xs font-mono text-amber-400 hover:text-white transition flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Service</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {localConfig.services.map((service, index) => (
                      <div
                        key={service.id}
                        className="p-4 rounded-lg bg-stone-900 border border-stone-800 relative space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-amber-500 font-mono">
                            Service #{index + 1}
                          </span>
                          <button
                            onClick={() => handleRemoveService(service.id)}
                            className="text-stone-500 hover:text-red-400 transition"
                            aria-label="Remove Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Package Name"
                            className="w-full bg-stone-800 border border-stone-750 rounded px-2 py-1.5 text-xs text-stone-100 font-semibold mb-2"
                            value={service.name}
                            onChange={(e) => handleUpdateService(index, "name", e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Price (e.g., ₹15,500)"
                            className="w-full bg-stone-800 border border-stone-750 rounded px-2 py-1.5 text-xs text-stone-150 font-mono mb-2"
                            value={service.price}
                            onChange={(e) => handleUpdateService(index, "price", e.target.value)}
                          />
                          <textarea
                            placeholder="Brief description"
                            className="w-full bg-stone-800 border border-stone-750 rounded px-2 py-1.5 text-xs text-stone-300 resize-none mb-2"
                            rows={2}
                            value={service.description}
                            onChange={(e) => handleUpdateService(index, "description", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "code" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-stone-200 mb-2">
                      Export Brand Config Code
                    </h3>
                    <p className="text-xs text-stone-300 mb-3">
                      Export this design configuration manually. You can copy this JSON object and place it directly into your codebase, or share it to migrate to another domain.
                    </p>
                    <button
                      onClick={handleExportJSON}
                      className="w-full py-2.5 rounded bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold transition flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>COPIED CONFIGURATION!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>COPY CONFIG CODE TO CLIPBOARD</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="border-t border-stone-800 pt-5">
                    <h3 className="text-sm font-semibold text-stone-200 mb-2">
                      Import Custom JSON Brand
                    </h3>
                    <p className="text-xs text-stone-400 mb-3">
                      Paste in an exported configuration block generated earlier to fully retheme the website instantly for a new artist.
                    </p>
                    <textarea
                      rows={5}
                      placeholder='{ "id": "luxe", "name": "...", "theme": "...", "services": [...] }'
                      className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-xs text-amber-200 font-mono"
                      value={importText}
                      onChange={(e) => {
                        setImportText(e.target.value);
                        setImportError("");
                      }}
                    />
                    {importError && (
                      <p className="text-red-400 text-xs mt-1.5 font-mono">{importError}</p>
                    )}
                    <button
                      onClick={handleImportJSON}
                      disabled={!importText.trim()}
                      className={`w-full py-2.5 rounded text-xs font-semibold transition mt-3 flex items-center justify-center space-x-2 cursor-pointer ${
                        importText.trim()
                          ? "bg-stone-100 hover:bg-white text-stone-900"
                          : "bg-stone-800 text-stone-500 cursor-not-allowed"
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span>APPLY IMPORTED BRAND CONFIG</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Panel Footer */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex justify-between items-center text-xs text-stone-400 font-mono">
              <span className="flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Active Theme:</span>
                <strong className="text-amber-400 uppercase">{config.theme}</strong>
              </span>
              <span>v1.0.0 (Reactive-Render)</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
