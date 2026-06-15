import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Calendar, User, Phone, MapPin, Mail, MessageSquare, 
  Users, CheckCircle2, Send, Clock, ChevronRight, ChevronLeft 
} from "lucide-react";
import { BrandConfig, Inquiry } from "../types";
import { themePresetClasses } from "../data";

interface BookingFormProps {
  config: BrandConfig;
  themeClasses: typeof themePresetClasses[keyof typeof themePresetClasses];
  selectedService: string;
  onAddInquiry: (inquiry: Inquiry) => void;
}

export default function BookingForm({
  config,
  themeClasses,
  selectedService,
  onAddInquiry,
}: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsAppLink, setWhatsAppLink] = useState("");

  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    eventType: "Royal Bridal Transformation",
    eventDate: "",
    eventTime: "08:00",
    locationType: "venue" as "studio" | "venue",
    venueAddress: "",
    guestCount: 1,
    specialNotes: "",
  });



  const [validationError, setValidationError] = useState("");

  // Automatically sync selected service from landing cards
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, eventType: selectedService }));
      const element = document.getElementById("booking-form");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedService]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError(""); // Clear validation error upon editing
  };

  const handleStepNext = () => {
    if (step === 1 && (!formData.clientName || !formData.phone)) {
      setValidationError("Please fill out your name and active mobile number to proceed.");
      return;
    }
    if (step === 2 && !formData.eventDate) {
      setValidationError("Please specify the date of your celebration.");
      return;
    }
    setValidationError("");
    setStep((prev) => prev + 1);
  };

  const handleStepPrev = () => {
    setValidationError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.clientName || !formData.phone || !formData.eventDate) {
      setValidationError("Required fields must be filled out before submitting.");
      return;
    }

    // 1. Build Inquiry Object
    const newInquiry: Inquiry = {
      id: `inq_${Date.now()}`,
      clientName: formData.clientName,
      email: formData.email,
      phone: formData.phone,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
      locationType: formData.locationType,
      venueAddress: formData.locationType === "studio" ? config.address : formData.venueAddress,
      guestCount: Number(formData.guestCount),
      specialNotes: formData.specialNotes,
      status: "pending",
      createdAt: new Date().toLocaleDateString()
    };

    // Save and alert parent (saved locally)
    onAddInquiry(newInquiry);

    // 2. Draft WhatsApp structured draft message
    const waText = `✨ BEAUTY INQUIRY BOOKING ✨
-------------------------------
Hello ${config.name}! I would love to inquire about locking a makeup booking slot on your schedule!

👑 CLIENT INFO:
- Name: ${formData.clientName}
- WhatsApp: ${formData.phone}
- Email: ${formData.email || "N/A"}

📅 EVENT DETAILS:
- Look Theme: ${formData.eventType}
- Targeted Date: ${formData.eventDate}
- Preparation Time: ${formData.eventTime}
- Guests Count: ${formData.guestCount} person(s)

📍 SESSION LOCATION:
- Session Type: ${formData.locationType.toUpperCase()}
- Address: ${formData.locationType === "studio" ? "At Studio Ranchi" : formData.venueAddress}

📝 SPECIAL REQUESTS / REFS:
"${formData.specialNotes || "None provided"}"

Thank you so much! Looking forward to discussing details and locking my date. ✨`;

    const waEncoded = `https://api.whatsapp.com/send?phone=${config.phone}&text=${encodeURIComponent(waText)}`;
    setWhatsAppLink(waEncoded);
    setIsSuccess(true);
  };

  const handleResetForm = () => {
    setFormData({
      clientName: "",
      email: "",
      phone: "",
      eventType: "Royal Bridal Transformation",
      eventDate: "",
      eventTime: "08:00",
      locationType: "venue",
      venueAddress: "",
      guestCount: 1,
      specialNotes: "",
    });
    setStep(1);
    setValidationError("");
    setIsSuccess(false);
  };

  return (
    <section id="booking-form" className="py-24 bg-[#FAF9F6] border-t border-[#E5E1DA] transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Card Frame */}
        <div className="bg-white rounded-none border border-[#E5E1DA] shadow-none overflow-hidden text-left">
          
          {/* Header Banner */}
          <div className="bg-white border-b border-[#E5E1DA] px-6 py-10 sm:p-12 text-center relative overflow-hidden">
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-[#7A756D] block mb-3">
              RESERVATIONS & BOOKING
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#2D2D2D] uppercase tracking-wide">
              Inquire & Lock Your Date
            </h2>
            <div className="h-[1px] w-20 bg-[#E5E1DA] mx-auto mt-4 mb-2"></div>
            <p className="text-[#7A756D] text-[10px] font-sans uppercase tracking-[0.2em]">
              Dynamic Booking Questionnaire • Pre-filled WhatsApp Delivery
            </p>
          </div>

          <div className="p-6 sm:p-12">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Visual Step Progress indicator */}
                <div className="flex items-center justify-between text-[10px] font-sans tracking-widest uppercase mb-8 border-b border-[#FAF9F6] pb-5 text-stone-400">
                  <span className={step >= 1 ? "text-[#2D2D2D] font-medium" : "text-[#BCB5A9]"}>01 // PROFILE</span>
                  <span className="text-stone-300 text-[9px] font-light">/</span>
                  <span className={step >= 2 ? "text-[#2D2D2D] font-medium" : "text-[#BCB5A9]"}>02 // SERVICE & TIME</span>
                  <span className="text-stone-300 text-[9px] font-light">/</span>
                  <span className={step >= 3 ? "text-[#2D2D2D] font-medium" : "text-[#BCB5A9]"}>03 // LOCATION & REFS</span>
                </div>

                {/* Inline Validation Alert */}
                {validationError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 tracking-wide rounded-none font-sans text-left">
                    {validationError}
                  </div>
                )}

                {/* Form Steps Inputs viewport */}
                <div className="min-h-[220px]">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <h3 className="text-xs font-semibold tracking-widest text-[#2D2D2D] uppercase font-sans border-l-2 border-[#2D2D2D] pl-3.5">
                        Client Credentials
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-sans tracking-widest uppercase text-[#7A756D] mb-1.5">Your Full Name *</label>
                          <input
                            type="text"
                            name="clientName"
                            required
                            placeholder="e.g. Sneha Kumari"
                            className="w-full bg-[#FAF9F6] border border-[#E5E1DA] rounded-none px-4 py-3 text-xs text-stone-950 focus:outline-none focus:border-[#2D2D2D] placeholder-[#BCB5A9]"
                            value={formData.clientName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-sans tracking-widest uppercase text-[#7A756D] mb-1.5">WhatsApp Mobile *</label>
                          <input
                            type="text"
                            name="phone"
                            required
                            placeholder="e.g. 9931139456"
                            className="w-full bg-[#FAF9F6] border border-[#E5E1DA] rounded-none px-4 py-3 text-xs text-stone-950 focus:outline-none focus:border-[#2D2D2D] placeholder-[#BCB5A9]"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase text-[#7A756D] mb-1.5">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="e.g. sneha@example.com"
                          className="w-full bg-[#FAF9F6] border border-[#E5E1DA] rounded-none px-4 py-3 text-xs text-stone-950 focus:outline-none focus:border-[#2D2D2D] placeholder-[#BCB5A9]"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <h3 className="text-xs font-semibold tracking-widest text-[#2D2D2D] uppercase font-sans border-l-2 border-[#2D2D2D] pl-3.5">
                        Service Customizations
                      </h3>
                      <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase text-[#7A756D] mb-1.5">Type of Look / Celebration Package</label>
                        <select
                          name="eventType"
                          className="w-full bg-[#FAF9F6] border border-[#E5E1DA] rounded-none px-4 py-3 text-xs text-stone-950 focus:outline-none focus:border-[#2D2D2D]"
                          value={formData.eventType}
                          onChange={handleInputChange}
                        >
                          {config.services.map((srv) => (
                            <option key={srv.id} value={srv.name}>{srv.name} ({srv.price})</option>
                          ))}
                          <option value="Custom Bespoke Session">Custom Bespoke Makeup Session</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-sans tracking-widest uppercase text-[#7A756D] mb-1.5">Event Celebration Date *</label>
                          <input
                            type="date"
                            name="eventDate"
                            required
                            className="w-full bg-[#FAF9F6] border border-[#E5E1DA] rounded-none px-4 py-3 text-xs text-stone-950 focus:outline-none focus:border-[#2D2D2D]"
                            value={formData.eventDate}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-sans tracking-widest uppercase text-[#7A756D] mb-1.5">Target Ready-By Time</label>
                          <input
                            type="time"
                            name="eventTime"
                            className="w-full bg-[#FAF9F6] border border-[#E5E1DA] rounded-none px-4 py-3 text-xs text-stone-950 focus:outline-none focus:border-[#2D2D2D]"
                            value={formData.eventTime}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <h3 className="text-xs font-semibold tracking-widest text-[#2D2D2D] uppercase font-sans border-l-2 border-[#2D2D2D] pl-3.5">
                        Logistics & Inspiration
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-sans tracking-widest uppercase text-[#7A756D] mb-1.5">Preparation Spot</label>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, locationType: "studio" }))}
                              className={`py-2 text-[10px] rounded-none border transition font-sans tracking-widest uppercase ${
                                formData.locationType === "studio"
                                  ? "bg-[#2D2D2D] border-[#2D2D2D] text-white font-medium"
                                  : "bg-white border-[#E5E1DA] text-[#7A756D] hover:bg-[#FAF9F6]"
                              }`}
                            >
                              Artist Studio
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, locationType: "venue" }))}
                              className={`py-2 text-[10px] rounded-none border transition font-sans tracking-widest uppercase ${
                                formData.locationType === "venue"
                                  ? "bg-[#2D2D2D] border-[#2D2D2D] text-white font-medium"
                                  : "bg-white border-[#E5E1DA] text-[#7A756D] hover:bg-[#FAF9F6]"
                              }`}
                            >
                              On Venue
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-sans tracking-widest uppercase text-[#7A756D] mb-1.5">Additional Sister/Guest Count</label>
                          <input
                            type="number"
                            name="guestCount"
                            min="1"
                            max="50"
                            className="w-full bg-[#FAF9F6] border border-[#E5E1DA] rounded-none px-4 py-3 text-xs text-stone-950 focus:outline-none focus:border-[#2D2D2D]"
                            value={formData.guestCount}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {formData.locationType === "venue" && (
                        <div>
                          <label className="block text-[10px] font-sans tracking-widest uppercase text-[#7A756D] mb-1.5">Hotel or Home Venue Address</label>
                          <input
                            type="text"
                            name="venueAddress"
                            placeholder="e.g. Radisson Blu' Ranchi, Hotel Grand, or home venue details"
                            className="w-full bg-[#FAF9F6] border border-[#E5E1DA] rounded-none px-4 py-3 text-xs text-stone-950 focus:outline-none focus:border-[#2D2D2D] placeholder-[#BCB5A9]"
                            value={formData.venueAddress}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase text-[#7A756D] mb-1.5">Inspirations / Saree or Jewelry notes / Requests</label>
                        <textarea
                          name="specialNotes"
                          rows={2}
                          placeholder="e.g. Saree draping custom, fresh botanical elements, extra dry-skin hydration, etc."
                          className="w-full bg-[#FAF9F6] border border-[#E5E1DA] rounded-none px-4 py-3 text-xs text-stone-950 focus:outline-none focus:border-[#2D2D2D] placeholder-[#BCB5A9] resize-none"
                          value={formData.specialNotes}
                          onChange={handleInputChange}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Navigation actions buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-[#E5E1DA]">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleStepPrev}
                      className="px-5 py-2.5 rounded-none border border-[#E5E1DA] bg-white text-[#7A756D] hover:bg-[#FAF9F6] text-[10px] font-sans tracking-widest uppercase flex items-center space-x-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleStepNext}
                      className="px-6 py-2.5 rounded-none bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white text-[10px] font-sans tracking-widest uppercase flex items-center space-x-1 ml-auto cursor-pointer"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`px-8 py-3.5 rounded-none text-[10px] font-semibold tracking-[0.25em] text-white transition flex items-center space-x-2 ml-auto cursor-pointer ${themeClasses.buttonBg}`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>DRAFT INQUIRY & SEND</span>
                    </button>
                  )}
                </div>

              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="inline-flex p-3 rounded-none bg-[#FAF9F6] border border-[#E5E1DA] text-[#2D2D2D]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-serif font-light text-[#2D2D2D] uppercase tracking-wide">
                    Your Booking Blueprint is Drafted!
                  </h3>
                  <p className="text-xs text-[#7A756D] font-sans max-w-sm mx-auto leading-relaxed">
                    We've saved your inquiry details locally in our management ledger. To complete the scheduling and confirm open slots with {config.name}, launch WhatsApp chat below to dispatch your structured blueprint.
                  </p>
                </div>

                <div className="pt-4 max-w-sm mx-auto space-y-3">
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-4 rounded-none text-[10px] font-medium tracking-[0.3em] uppercase text-center transition flex items-center justify-center space-x-2 cursor-pointer ${themeClasses.buttonBg}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>LAUNCH CHAT ON WHATSAPP</span>
                  </a>

                  <button
                    onClick={handleResetForm}
                    className="w-full py-2.5 rounded-none text-[10px] font-sans tracking-widest uppercase text-stone-400 hover:text-stone-800 transition cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
