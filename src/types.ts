export interface PortfolioItem {
  id: string;
  title: string;
  category: "Bridal" | "Fashion" | "Engagement" | "Party";
  imageUrl: string;
  description: string;
  priceEstimate?: string;
}

export interface ServiceDetail {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
}

export interface BrandConfig {
  id: string;
  name: string;
  tagline: string;
  subtitle: string;
  location: string;
  address: string;
  phone: string; // WhatsApp number
  email: string;
  instagram: string; // username
  facebook: string; // profile link or name
  imageUrl: string; // Purnima's Portrait URL
  bio: string;
  theme: "gold" | "rose" | "crimson" | "charcoal" | "emerald";
  services: ServiceDetail[];
  portfolio: PortfolioItem[];
}

export interface Inquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  locationType: "studio" | "venue";
  venueAddress: string;
  guestCount: number;
  specialNotes: string;
  status: "pending" | "confirmed" | "followup" | "completed";
  createdAt: string;
}
