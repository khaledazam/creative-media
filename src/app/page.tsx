'use client';

import { useState } from 'react';
import { useLandingData } from '@/lib/landing/use-landing-data';
import { getLocalBusinessStructuredData } from '@/lib/company-info';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingAbout } from '@/components/landing/LandingAbout';
import { LandingExpertise } from '@/components/landing/LandingExpertise';
import { LandingPortfolio } from '@/components/landing/LandingPortfolio';
import { LandingProcess } from '@/components/landing/LandingProcess';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingConversionBanner } from '@/components/landing/LandingConversionBanner';
import { LandingContact } from '@/components/landing/LandingContact';
import { LandingFooter } from '@/components/landing/LandingFooter';

export default function HomePage() {
  const { config } = useLandingData();
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  const handleSelectProjectForQuote = (projectName: string) => {
    setSelectedService(`طلب مقايسة لمشروع: ${projectName}`);
  };

  const structuredData = getLocalBusinessStructuredData();

  return (
    <div className="min-h-screen bg-[#111412] text-[#F8F6F1] selection:bg-[#B89A67] selection:text-[#111412] overflow-x-hidden w-full max-w-full relative">
      {/* Technical SEO Structured Data (LocalBusiness) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 1. Architectural Frosted Glass Navbar */}
      <LandingNavbar
        phone={config.contact?.phonePrimary}
        whatsapp={config.contact?.whatsappNumber}
      />

      {/* 2. Cinematic Architectural Hero */}
      <LandingHero hero={config.hero} />

      {/* 3. About Creative Media (Editorial Asymmetric Layout) */}
      <LandingAbout />

      {/* 4. Our Expertise & Business Pillars */}
      <LandingExpertise onSelectService={handleSelectService} />

      {/* 5. Selected Projects Portfolio Gallery */}
      <LandingPortfolio
        portfolio={config.portfolio}
        onSelectProjectForQuote={handleSelectProjectForQuote}
      />

      {/* 6. Architectural Workflow & Process */}
      <LandingProcess />

      {/* 7. Craftsmanship & Standards (Why Creative Media) */}
      <LandingFeatures />

      {/* 8. Conversion Transition Banner */}
      <LandingConversionBanner />

      {/* 9. Contact Section with Verified Officials & Quotation Form */}
      <LandingContact
        contact={config.contact}
        selectedServicePreload={selectedService}
      />

      {/* 10. Architectural Footer & Verified Phone Actions */}
      <LandingFooter contact={config.contact} />
    </div>
  );
}
