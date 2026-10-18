'use client';

import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/company-info';
import { ArrowLeft, Check, Layers, Store, Building, Sparkles } from 'lucide-react';

interface LandingExpertiseProps {
  onSelectService?: (serviceTitle: string) => void;
}

export function LandingExpertise({ onSelectService }: LandingExpertiseProps) {
  const pillars = COMPANY_INFO.pillars;

  return (
    <section id="expertise" className="py-24 md:py-32 relative bg-[#111412] text-[#F8F6F1] overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#B89A67]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#B89A67]/30 text-xs font-semibold text-[#D4B98B]">
            <Sparkles size={13} />
            <span>مجالات وتخصصات Creative Media</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8F6F1] tracking-tight leading-tight">
            حلول معمارية متكاملة للواجهات والتشطيبات
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            نركز على ركيزتين أساسيتين في تنفيذ المساحات: هندسة وتكسية الواجهات الخارجية، والتجهيز الداخلي المتكامل للمقرات التجارية والمعارض.
          </p>
        </div>

        {/* Pillar Showcase (Editorial Asymmetric Large Cards) */}
        <div className="space-y-12 lg:space-y-16">
          {pillars.map((pillar, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={pillar.id}
                className={`flex flex-col ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-stretch gap-8 lg:gap-12 rounded-3xl bg-[#171A1B] border border-white/10 hover:border-[#B89A67]/40 p-6 sm:p-8 lg:p-10 transition-all duration-300 group shadow-xl`}
              >
                {/* Visual Imagery (50%) */}
                <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[360px] bg-black">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/landing/real/creative-media-hq.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111412] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-lg bg-[#111412]/85 backdrop-blur-md border border-[#B89A67]/30 text-[11px] font-bold text-[#D4B98B]">
                    ركيزة رئيسية #{idx + 1}
                  </div>
                </div>

                {/* Content & Capabilities (50%) */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6 text-right">
                  <div className="space-y-4">
                    <div className="inline-flex p-3 rounded-xl bg-[#B89A67]/15 text-[#B89A67] border border-[#B89A67]/25 w-fit">
                      {idx === 0 ? <Layers size={22} /> : idx === 1 ? <Store size={22} /> : <Building size={22} />}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8F6F1] group-hover:text-[#D4B98B] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-[#B89A67]">
                      {pillar.subtitle}
                    </p>

                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      {pillar.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2.5 pt-2 border-t border-white/5">
                      {pillar.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <div className="p-0.5 rounded-full bg-[#B89A67]/20 text-[#B89A67] shrink-0 mt-0.5">
                            <Check size={12} />
                          </div>
                          <span className="font-medium leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <a
                      href="#contact"
                      onClick={() => onSelectService && onSelectService(pillar.title)}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold text-[#111412] bg-[#B89A67] hover:bg-[#D4B98B] shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <span>طلب استشارة أو مقايسة لـ {pillar.title}</span>
                      <ArrowLeft size={14} />
                    </a>

                    {pillar.id === 'storefronts-signs' && (
                      <a
                        href="#neon"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-[#49d7ff] bg-[#49d7ff]/10 hover:bg-[#49d7ff]/20 border border-[#49d7ff]/30 shadow-[0_0_15px_rgba(73,215,255,0.2)] transition-all cursor-pointer"
                      >
                        <Sparkles size={14} className="text-[#49d7ff]" />
                        <span>⚡ كتالوج النيون واليافطات 3D والأسعار</span>
                        <ArrowLeft size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
