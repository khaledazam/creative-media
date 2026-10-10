'use client';

import { LandingService } from '@/lib/landing/types';
import { Layers, Sparkles, Tv, Store, Printer, Palette, CheckCircle2, ArrowLeft } from 'lucide-react';

interface LandingServicesProps {
  services: LandingService[];
  onSelectService?: (serviceTitle: string) => void;
}

const iconMap: Record<string, any> = {
  Layers,
  Sparkles,
  Tv,
  Store,
  Printer,
  Palette,
};

export function LandingServices({ services, onSelectService }: LandingServicesProps) {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-[#07080a]">
      {/* Background glow highlights */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25">
            <Sparkles size={13} />
            <span>مجالات وتخصصات رائدة</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            حلول هندسية ودعائية تليق بهوية علامتك
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            نجمع بين الدقة الهندسية والابتكار الإعلاني لنقدم واجهات ومعارض تخلد في أذهان عملائك وتزيد من جاذبية مشروعك التجاري.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((srv, idx) => {
            const Icon = iconMap[srv.iconName] || Layers;
            return (
              <div
                key={srv.id || idx}
                className="relative flex flex-col justify-between p-6 sm:p-7 xl:p-8 rounded-3xl bg-zinc-950/85 border border-white/10 hover:border-amber-500/40 hover:shadow-[0_15px_40px_rgba(245,158,11,0.1)] transition-all duration-300 group overflow-hidden"
              >
                {/* Top Glowing Corner Edge */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-400/20 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 text-amber-400 border border-amber-500/30 group-hover:scale-110 group-hover:border-amber-400/60 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all duration-300">
                      <Icon size={26} />
                    </div>

                    {srv.badge && (
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-sm">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Feature Checkmarks */}
                  {srv.features && srv.features.length > 0 && (
                    <div className="space-y-2.5 mb-7 border-t border-white/5 pt-5">
                      {srv.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                          <span className="font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={() => onSelectService && onSelectService(srv.title)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-zinc-200 hover:text-black bg-white/[0.04] hover:bg-amber-400 border border-white/10 hover:border-amber-400 transition-all duration-200 shadow-sm"
                  >
                    <span>طلب استشارة أو مقايسة للخدمة</span>
                    <ArrowLeft size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
