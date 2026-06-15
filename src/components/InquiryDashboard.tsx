import { motion } from "motion/react";
import { 
  X, Check, Trash2, MessageSquare, Clock, Calendar, MapPin, Users,
  CheckCircle, AlertCircle, Sparkles, Inbox, RefreshCw, Smartphone
} from "lucide-react";
import { Inquiry, BrandConfig } from "../types";
import { themePresetClasses } from "../data";

interface InquiryDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  config: BrandConfig;
  themeClasses: typeof themePresetClasses[keyof typeof themePresetClasses];
  inquiries: Inquiry[];
  onUpdateStatus: (id: string, status: Inquiry["status"]) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export default function InquiryDashboard({
  isOpen,
  onClose,
  config,
  themeClasses,
  inquiries,
  onUpdateStatus,
  onDelete,
  onClearAll,
}: InquiryDashboardProps) {

  const getDirectClientChatLink = (inq: Inquiry) => {
    // Clear dynamic spaces/dashes before triggering
    const cleanNum = inq.phone.replace(/[^0-9]/g, "");
    const text = `Hi ${inq.clientName}! This is ${config.name}. I received your beauty booking form inquiry for the "${inq.eventType}" package on ${inq.eventDate}. I'm absolutely delighted to discuss the details and lock this slot on our schedule! Let me know if you would like to have a quick phone consultation.`;
    return `https://api.whatsapp.com/send?phone=${cleanNum}&text=${encodeURIComponent(text)}`;
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4 text-amber-500" />,
    confirmed: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    followup: <AlertCircle className="w-4 h-4 text-rose-500" />,
    completed: <Check className="w-4 h-4 text-sky-500" />
  };

  const statusColors = {
    pending: "bg-amber-50 text-amber-800 border-amber-200",
    confirmed: "bg-emerald-50 text-emerald-800 border-emerald-200",
    followup: "bg-rose-50 text-rose-800 border-rose-200",
    completed: "bg-sky-50 text-sky-800 border-sky-200"
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay mask */}
          <div 
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity cursor-pointer" 
          />

          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-white rounded-none shadow-none overflow-hidden text-left flex flex-col max-h-[85vh] border border-[#E5E1DA] focus:outline-none"
            >
              
              {/* Header */}
              <div className="p-6 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-white">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded bg-amber-500/10 text-amber-500">
                    <Inbox className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-md font-bold font-sans">
                      Device Inquiry Vault ({inquiries.length})
                    </h2>
                    <p className="text-[10px] text-stone-400 font-mono">
                      Offline LocalStorage Vault for {config.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {inquiries.length > 0 && (
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete all inquiries from local storage? This is irreversible.")) {
                          onClearAll();
                        }
                      }}
                      className="px-3 py-1.5 rounded bg-red-950 text-red-400 border border-red-900/40 text-[10px] uppercase font-mono tracking-widest hover:bg-red-900 hover:text-white transition cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition"
                    aria-label="Close Dashboard"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Central List area */}
              <div className="flex-1 overflow-y-auto p-6 bg-stone-50">
                {inquiries.length === 0 ? (
                  <div className="text-center py-20 space-y-4 max-w-sm mx-auto">
                    <div className="h-10 w-10 border border-[#E5E1DA] bg-white flex items-center justify-center text-stone-400 mx-auto">
                      <Inbox className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold font-sans uppercase tracking-widest text-stone-900">
                        Inquiry Vault is Empty
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        Form inquiries submitted on this device will instantly show up here offline. Fill out the Booking Form to test this panel!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-white rounded-none border border-[#E5E1DA] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        {/* Left items */}
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-stone-900 font-sans block">{inq.clientName}</span>
                            <span className="text-[10px] font-mono text-stone-400">• submitted {inq.createdAt}</span>
                            
                            {/* Interactive Status Selector inside local admin panel */}
                            <select
                              value={inq.status}
                              onChange={(e) => onUpdateStatus(inq.id, e.target.value as Inquiry["status"])}
                              className="text-[10px] font-sans font-medium uppercase py-1 px-3 rounded-none border border-[#E5E1DA] bg-[#FAF9F6] text-stone-800 cursor-pointer focus:outline-none"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="followup">Follow up</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>

                          {/* Quick spec info row */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 text-xs text-stone-600 font-sans">
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                              <strong className="text-stone-900">{inq.eventType}</strong>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-stone-400" />
                              <span>Date: {inq.eventDate} ({inq.eventTime})</span>
                            </span>
                            <span className="flex items-center gap-1.5 col-span-2">
                              <MapPin className="w-3.5 h-3.5 text-stone-400" />
                              <span className="truncate">Spot: {inq.locationType === 'studio' ? 'At Studio' : inq.venueAddress}</span>
                            </span>
                          </div>

                          {inq.specialNotes && (
                            <p className="text-xs text-stone-500 italic bg-stone-50 p-2.5 rounded border border-stone-100">
                              &ldquo;{inq.specialNotes}&rdquo;
                            </p>
                          )}
                        </div>

                        {/* Actions buttons columns */}
                        <div className="flex md:flex-col items-center md:items-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                          {/* Contact client phone WhatsApp */}
                          <a
                            href={getDirectClientChatLink(inq)}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center space-x-1.5 px-4 py-2 bg-[#2D2D2D] text-white rounded-none text-xs font-semibold tracking-widest uppercase hover:bg-stone-800 transition cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>CONTACT CLIENT</span>
                          </a>

                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1">
                              <Smartphone className="w-3 h-3" />
                              {inq.phone}
                            </span>
                            <button
                              onClick={() => onDelete(inq.id)}
                              className="p-1.5 text-stone-400 hover:text-red-500 rounded hover:bg-stone-100 transition"
                              aria-label="Delete Inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Panel Info */}
              <div className="p-4 bg-stone-950 border-t border-stone-800 text-stone-400 text-xs font-mono text-center flex flex-col sm:flex-row justify-between gap-1.5 items-center">
                <span>⚡ Note: Client contact numbers are simulated dynamically or gathered via form input.</span>
                <span className="text-amber-400">Purnima Makeover CRM v1.0</span>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
