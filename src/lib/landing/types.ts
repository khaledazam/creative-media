export interface LandingHero {
  badge: string;
  title: string;
  highlightText: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  bgImageUrl?: string;
}

export interface LandingStat {
  id: string;
  value: string;
  label: string;
  suffix?: string;
  iconName: string;
}

export interface LandingService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  features: string[];
}

export interface LandingPortfolioItem {
  id: string;
  title: string;
  category: 'cladding' | 'signs' | 'fitout' | 'screens' | 'branding' | string;
  categoryLabel: string;
  clientName?: string;
  location?: string;
  completionYear?: string;
  description: string;
  featured: boolean;
  coverImage: string;
  beforeImage?: string;
  galleryImages?: string[];
  tags: string[];
  linkedProjectId?: string;
}

export interface LandingContactInfo {
  phonePrimary: string;
  phoneSecondary?: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  email: string;
  address: string;
  workingHours: string;
  mapEmbedUrl?: string;
  socials: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface LandingInquiry {
  id: string;
  name: string;
  companyName?: string;
  phone: string;
  email?: string;
  serviceType: string;
  notes: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'converted';
}

export interface LandingPageConfig {
  hero: LandingHero;
  stats: LandingStat[];
  services: LandingService[];
  portfolio: LandingPortfolioItem[];
  contact: LandingContactInfo;
  aboutText?: string;
  updatedAt?: string;
}
