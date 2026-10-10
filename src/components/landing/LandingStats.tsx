'use client';

import { LandingStat } from '@/lib/landing/types';
import { Building2, Award, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LandingStatsProps {
  stats: LandingStat[];
}

const iconMap: Record<string, any> = {
  Building2,
  Award,
  Users,
  ShieldCheck,
};

export function LandingStats({ stats }: LandingStatsProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section id="stats" className="relative py-10 sm:py-14 bg-gradient-to-b from-[#07080a] via-black to-[#07080a] border-y border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {stats.map((stat, idx) => {
            const Icon = iconMap[stat.iconName] || CheckCircle2;
            return (
              <div
                key={stat.id || idx}
                className="relative p-4 sm:p-6 lg:p-5 xl:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 hover:border-amber-500/40 hover:shadow-[0_10px_35px_rgba(245,158,11,0.12)] transition-all duration-300 group flex flex-col items-center text-center overflow-hidden"
              >
                {/* Subtle Top Golden Accent Line */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/25 mb-3 group-hover:scale-110 group-hover:bg-amber-500/20 group-hover:border-amber-400/40 transition-all duration-300">
                  <Icon size={20} className="sm:w-6 sm:h-6" />
                </div>

                <div className="text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-black text-white tracking-tight flex items-baseline gap-0.5 sm:gap-1 mb-1 font-mono">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-amber-200">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-amber-400 text-xl sm:text-2xl font-extrabold">{stat.suffix}</span>
                  )}
                </div>

                <p className="text-[11px] sm:text-xs lg:text-xs xl:text-sm text-zinc-300 font-semibold leading-relaxed">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
