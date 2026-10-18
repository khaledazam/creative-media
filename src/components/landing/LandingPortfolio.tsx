'use client';

import { useState, useMemo } from 'react';
import { LandingPortfolioItem } from '@/lib/landing/types';
import {
  MapPin,
  Calendar,
  Building,
  X,
  ArrowLeft,
  Eye,
  Sparkles,
  Sliders,
  CheckCircle2,
  MessageCircle,
  Repeat,
} from 'lucide-react';
import { COMPANY_INFO, getWhatsAppLink } from '@/lib/company-info';

interface LandingPortfolioProps {
  portfolio: LandingPortfolioItem[];
  onSelectProjectForQuote?: (projectName: string) => void;
}

export function LandingPortfolio({ portfolio, onSelectProjectForQuote }: LandingPortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<LandingPortfolioItem | null>(null);
  const [baViewMode, setBaViewMode] = useState<Record<string, 'after' | 'before'>>({});

  // Categories list
  const categoryFilters = [
    { value: 'all', label: 'جميع الأعمال الواقعية' },
    { value: 'cladding', label: 'الكلادينج والواجهات' },
    { value: 'signs', label: 'حروف بارزة ونيون 3D' },
    { value: 'storefronts', label: 'المحلات والمعارض' },
    { value: 'before-after', label: 'مشاريع قبل وبعد' },
    { value: 'workshop', label: 'كواليس الورشة والتصنيع' },
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return portfolio;
    return portfolio.filter((p) => p.category === selectedCategory);
  }, [portfolio, selectedCategory]);

  const toggleBaMode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBaViewMode((prev) => ({
      ...prev,
      [id]: prev[id] === 'before' ? 'after' : 'before',
    }));
  };

  const primaryWhatsapp = COMPANY_INFO.contacts.primary.whatsappDigits;

  return (
    <section id="portfolio" className="py-24 md:py-32 relative bg-[#121517] text-[#F8F6F1] border-t border-white/5 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#B89A67]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
            <Sparkles size={13} className="text-emerald-400" />
            <span>توثيق ميداني 100% واقعي • مشاريع حقيقية منفذة</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8F6F1] tracking-tight leading-tight">
            سابقة أعمال ومشاريع Creative Media الواقعية
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            توثيق هندسي وميداني لمشاريع تم تصميمها وتنفيذها فعلياً على أرض الواقع بأيدي مهندسي وفنيي الشركة في الدقهلية ومختلف محافظات مصر، بدون أي تصاميم تخيلية أو صور افتراضية.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 px-2 scrollbar-none w-full">
          {categoryFilters.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#B89A67] text-[#111412] shadow-lg shadow-[#B89A67]/20 scale-102'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Count indicator */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-6 px-1">
          <span>يتم عرض {filteredItems.length} عمل ومشروع موثق</span>
          <span className="text-[#B89A67] font-semibold">✓ جميع الصور التقطت من مواقع العمل والورشة</span>
        </div>

        {/* Architectural Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const hasBefore = Boolean(item.beforeImage);
            const currentMode = baViewMode[item.id] || 'after';
            const displayImage = hasBefore && currentMode === 'before' ? item.beforeImage! : item.coverImage;

            return (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-[#171A1B] border border-white/10 hover:border-[#B89A67]/50 shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Preview Container */}
                <div className="relative aspect-[16/11] overflow-hidden bg-black">
                  <img
                    src={displayImage}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/landing/real/creative-media-hq.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171A1B] via-transparent to-black/25 opacity-80" />

                  {/* Floating Category Badge */}
                  <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-md text-[11px] font-bold bg-[#111412]/85 backdrop-blur-md text-[#D4B98B] border border-[#B89A67]/35 shadow-sm">
                    {item.categoryLabel}
                  </span>

                  {/* Before / After Switcher Pill */}
                  {hasBefore && (
                    <button
                      type="button"
                      onClick={(e) => toggleBaMode(item.id, e)}
                      className={`absolute top-3.5 left-3.5 z-20 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-md border shadow-md transition-all ${
                        currentMode === 'before'
                          ? 'bg-amber-500/90 text-zinc-950 border-amber-400'
                          : 'bg-emerald-500/90 text-zinc-950 border-emerald-400'
                      }`}
                    >
                      <Repeat className="w-3 h-3" />
                      <span>{currentMode === 'before' ? 'الموقع قبل التنفيذ' : 'بعد التسليم النهائي'}</span>
                    </button>
                  )}

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#111412]/60 backdrop-blur-xs transition-opacity duration-300">
                    <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#B89A67] text-[#111412] text-xs font-bold shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
                      <Eye size={14} />
                      <span>معاينة تفاصيل المشروع</span>
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      {item.location && (
                        <span className="flex items-center gap-1 text-zinc-300">
                          <MapPin size={12} className="text-[#B89A67]" />
                          {item.location}
                        </span>
                      )}
                      {item.completionYear && (
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar size={12} className="text-[#B89A67]" />
                          {item.completionYear}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#F8F6F1] group-hover:text-[#D4B98B] transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    {item.clientName && (
                      <p className="text-xs text-[#B89A67] font-medium flex items-center gap-1">
                        <Building size={12} />
                        <span>العميل: {item.clientName}</span>
                      </p>
                    )}

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags & Action CTA */}
                  <div className="pt-3 border-t border-white/5 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-[#D4B98B] group-hover:text-[#F8F6F1] transition-colors pt-1">
                      <span>عرض المواصفات الهندسية</span>
                      <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── ARCHITECTURAL LIGHTBOX MODAL ──────────────────── */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#171A1B] border border-[#B89A67]/40 shadow-2xl text-right scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 left-4 z-20 p-2 rounded-full bg-[#111412]/80 hover:bg-[#111412] text-zinc-300 hover:text-white border border-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Image Header */}
            <div className="relative aspect-video w-full bg-black">
              <img
                src={
                  activeModalItem.beforeImage && baViewMode[activeModalItem.id] === 'before'
                    ? activeModalItem.beforeImage
                    : activeModalItem.coverImage
                }
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/landing/real/creative-media-hq.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171A1B] via-transparent to-transparent" />

              {/* Toggle in modal if Before & After */}
              {activeModalItem.beforeImage && (
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBaMode(activeModalItem.id, e)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#B89A67] text-[#111412] flex items-center gap-1.5 shadow-lg"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                    <span>
                      {baViewMode[activeModalItem.id] === 'before'
                        ? 'عرض الموقع بعد التسليم'
                        : 'عرض الموقع قبل التنفيذ'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#B89A67]/20 text-[#D4B98B] border border-[#B89A67]/30">
                  {activeModalItem.categoryLabel}
                </span>

                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  {activeModalItem.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-[#B89A67]" />
                      {activeModalItem.location}
                    </span>
                  )}
                  {activeModalItem.completionYear && (
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar size={13} className="text-[#B89A67]" />
                      {activeModalItem.completionYear}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#F8F6F1] mb-1">
                  {activeModalItem.title}
                </h3>
                {activeModalItem.clientName && (
                  <p className="text-xs text-[#B89A67] font-semibold">
                    العميل المعتمد: {activeModalItem.clientName}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                <span className="text-xs font-bold text-zinc-300 block">تفاصيل التنفيذ الهندسي:</span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {activeModalItem.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeModalItem.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/[0.05] text-[#D4B98B] border border-[#B89A67]/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={getWhatsAppLink(
                    primaryWhatsapp,
                    `مرحباً Creative Media، أود الاستفسار وطلب مقايسة مماثلة لمشروع: ${activeModalItem.title}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all"
                >
                  <MessageCircle size={15} />
                  <span>استفسار واتساب بخصوص هذا المشروع</span>
                </a>

                {onSelectProjectForQuote && (
                  <button
                    onClick={() => {
                      onSelectProjectForQuote(activeModalItem.title);
                      setActiveModalItem(null);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-[#111412] bg-[#B89A67] hover:bg-[#D4B98B] transition-all cursor-pointer shadow-md"
                  >
                    <span>طلب مقايسة لهذا المشروع بالذات</span>
                    <ArrowLeft size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
