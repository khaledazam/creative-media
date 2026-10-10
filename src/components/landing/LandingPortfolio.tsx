'use client';

import { useState, useMemo } from 'react';
import { LandingPortfolioItem } from '@/lib/landing/types';
import { MapPin, Calendar, Building, X, ArrowLeft, Eye, Sparkles } from 'lucide-react';

interface LandingPortfolioProps {
  portfolio: LandingPortfolioItem[];
  onSelectProjectForQuote?: (projectName: string) => void;
}

export function LandingPortfolio({ portfolio, onSelectProjectForQuote }: LandingPortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<LandingPortfolioItem | null>(null);

  // Extract unique categories cleanly
  const categories = useMemo(() => {
    const map = new Map<string, string>();
    map.set('all', 'جميع الأعمال والمشاريع');
    portfolio.forEach((p) => {
      if (p.category && p.categoryLabel) {
        map.set(p.category, p.categoryLabel);
      }
    });
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }));
  }, [portfolio]);

  // Filtered items
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return portfolio;
    return portfolio.filter((p) => p.category === selectedCategory);
  }, [portfolio, selectedCategory]);

  return (
    <section id="portfolio" className="py-24 md:py-32 relative bg-[#171A1B] text-[#F8F6F1] border-t border-white/5 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#B89A67]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#B89A67]/30 text-xs font-semibold text-[#D4B98B]">
            <Sparkles size={13} />
            <span>معرض المشاريع وسابقة الأعمال</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8F6F1] tracking-tight leading-tight">
            نماذج معمارية وتنفيذية من واقع أعمالنا
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            استعرض نماذج توضيحية وتنفيذية للمشاريع في تكسية الواجهات بالكلادينج، التجهيز الداخلي، والمحلات التجارية المنفذة بأعلى معايير الدقة.
          </p>
        </div>

        {/* Filter Pills with Architectural Styling */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 px-2 scrollbar-none w-full">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#B89A67] text-[#111412] shadow-md scale-102'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Architectural Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#111412] border border-white/10 hover:border-[#B89A67]/50 shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/11] overflow-hidden bg-black">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111412] via-transparent to-black/25 opacity-80" />

                {/* Floating Category Badge */}
                <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-md text-[11px] font-bold bg-[#111412]/85 backdrop-blur-md text-[#D4B98B] border border-[#B89A67]/35 shadow-sm">
                  {item.categoryLabel}
                </span>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#111412]/60 backdrop-blur-xs transition-opacity duration-300">
                  <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#B89A67] text-[#111412] text-xs font-bold shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
                    <Eye size={14} />
                    <span>تفاصيل ومواصفات المشروع</span>
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-right">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#F8F6F1] mb-2 group-hover:text-[#D4B98B] transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  {/* Metadata Row */}
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-[#B89A67]" />
                        <span>{item.location}</span>
                      </span>
                    )}

                    {item.completionYear && (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-400">
                        <Calendar size={13} />
                        <span>{item.completionYear}</span>
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2.5 py-0.5 rounded-md bg-white/[0.04] text-zinc-400 border border-white/5 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#171A1B] border border-[#B89A67]/40 rounded-2xl overflow-hidden shadow-2xl text-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 left-4 z-10 p-2.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors border border-white/10"
              aria-label="إغلاق"
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-video w-full bg-black">
              <img
                src={activeModalItem.coverImage}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171A1B] via-transparent to-transparent" />
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#B89A67]/20 text-[#D4B98B] border border-[#B89A67]/30">
                  {activeModalItem.categoryLabel}
                </span>

                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  {activeModalItem.location && <span>الموقع: {activeModalItem.location}</span>}
                  {activeModalItem.completionYear && (
                    <span className="font-mono">سنة التنفيذ: {activeModalItem.completionYear}</span>
                  )}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#F8F6F1]">
                {activeModalItem.title}
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {activeModalItem.description}
              </p>

              {activeModalItem.tags && activeModalItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeModalItem.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-lg bg-white/5 text-zinc-300 border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <a
                  href="#contact"
                  onClick={() => {
                    if (onSelectProjectForQuote) {
                      onSelectProjectForQuote(activeModalItem.title);
                    }
                    setActiveModalItem(null);
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B89A67] hover:bg-[#D4B98B] text-[#111412] font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>طلب معاينة أو تنفيذ مشروع مماثل</span>
                  <ArrowLeft size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
