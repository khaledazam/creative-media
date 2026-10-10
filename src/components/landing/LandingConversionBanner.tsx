'use client';

import { COMPANY_INFO, getTelLink } from '@/lib/company-info';
import { ArrowLeft, Phone, Sparkles } from 'lucide-react';

export function LandingConversionBanner() {
  const primaryContact = COMPANY_INFO.contacts.primary;

  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-[#111412] text-[#F8F6F1] border-t border-white/5">
      {/* Background Architectural Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1920&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111412] via-[#111412]/90 to-[#111412]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B89A67]/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#B89A67]/30 text-xs font-semibold text-[#D4B98B]">
          <Sparkles size={13} />
          <span>استشارة ومعاينة هندسية</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8F6F1] tracking-tight leading-tight">
          جاهز تحوّل فكرتك لمشروع مميز؟
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
          احكِ لنا عن مشروعك، ودعنا نساعدك في اختيار الحل المناسب للتصميم والتنفيذ بأعلى معايير الإتقان.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-[#111412] bg-[#B89A67] hover:bg-[#D4B98B] shadow-lg transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            <span>اطلب عرض سعر الآن</span>
            <ArrowLeft size={16} />
          </a>

          <a
            href={getTelLink(primaryContact.phoneInternational)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-[#F8F6F1] hover:text-[#B89A67] bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#B89A67]/40 transition-all cursor-pointer"
          >
            <Phone size={15} className="text-[#B89A67]" />
            <span>اتصل بنا مباشرة ({primaryContact.phoneRaw})</span>
          </a>
        </div>
      </div>
    </section>
  );
}
