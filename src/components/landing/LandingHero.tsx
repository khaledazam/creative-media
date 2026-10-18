'use client';

import { LandingHero as LandingHeroType } from '@/lib/landing/types';
import { ArrowLeft, ArrowDown, ShieldCheck, Ruler, Layers, Sparkles } from 'lucide-react';

interface LandingHeroProps {
  hero: LandingHeroType;
}

export function LandingHero({ hero }: LandingHeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[94vh] flex items-center justify-center pt-32 pb-20 md:py-36 overflow-hidden bg-[#111412]"
    >
      {/* 1. Immersive Architectural Photography Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-102 transform duration-1000 ease-out"
          style={{
            backgroundImage: `url(${
              hero.bgImageUrl ||
              '/landing/real/creative-media-hq.jpg'
            })`,
          }}
        />

        {/* Sophisticated Architectural Darkening Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111412] via-[#111412]/85 to-[#111412]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(184,154,103,0.08)_0%,transparent_60%)]" />

        {/* Subtle Architectural Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #B89A67 1px, transparent 1px), linear-gradient(to bottom, #B89A67 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-7 sm:space-y-8">
          
          {/* Architectural Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#B89A67]/30 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A67] animate-pulse" />
            <span className="text-xs font-semibold text-[#D4B98B] tracking-wide">
              {hero.badge || 'Creative Media • العمارة والواجهات والتشطيبات'}
            </span>
          </div>

          {/* Grand Architectural Display Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-extrabold text-[#F8F6F1] tracking-tight leading-[1.25] sm:leading-[1.2]">
            {hero.title || 'نصنع واجهات تلفت الأنظار، ومساحات'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4B98B] via-[#B89A67] to-[#D4B98B] underline decoration-[#B89A67]/40 underline-offset-8">
              {hero.highlightText || 'تعكس هويتك'}
            </span>
          </h1>

          {/* Editorial Supporting Description */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed max-w-3xl mx-auto">
            {hero.description ||
              'في Creative Media، نجمع بين الإبداع الهندسي ودقة التنفيذ لنقدم حلولًا متكاملة في الكلادينج، الواجهات المعمارية، التشطيبات والديكور.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a
              href={hero.primaryCtaLink || '#portfolio'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold text-[#111412] bg-[#B89A67] hover:bg-[#D4B98B] rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{hero.primaryCtaText || 'استكشف مشاريعنا'}</span>
              <ArrowLeft size={16} />
            </a>

            <a
              href={hero.secondaryCtaLink || '#contact'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-[#F8F6F1] hover:text-[#B89A67] bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#B89A67]/50 rounded-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{hero.secondaryCtaText || 'اطلب عرض سعر'}</span>
            </a>
          </div>

          {/* Factual Architectural Standards / Trust Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-10 border-t border-white/10 text-right sm:text-center">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-[#B89A67]/10 text-[#B89A67] shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-[#F8F6F1]">خامات معتمدة</span>
                <span className="text-[10px] text-zinc-400">ألواح ACP مقاومة للحرائق</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-[#B89A67]/10 text-[#B89A67] shrink-0">
                <Ruler size={16} />
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-[#F8F6F1]">دقة المليمتر</span>
                <span className="text-[10px] text-zinc-400">قص ليزر وماكينات CNC</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-[#B89A67]/10 text-[#B89A67] shrink-0">
                <Layers size={16} />
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-[#F8F6F1]">نمذجة ثلاثية 3D</span>
                <span className="text-[10px] text-zinc-400">رؤية واقعية قبل البدء</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-[#B89A67]/10 text-[#B89A67] shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-[#F8F6F1]">إشراف هندسي</span>
                <span className="text-[10px] text-zinc-400">تسليم مطابق للأكواد</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Down Scroll Hint */}
      <a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 text-zinc-500 hover:text-[#B89A67] transition-colors"
        aria-label="الانتقال إلى قسم عن الشركة"
      >
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
