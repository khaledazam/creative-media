'use client';

import { useState, useMemo } from 'react';
import {
  Phone,
  MessageCircle,
  Copy,
  Check,
  ChevronDown,
  Search,
  Sparkles,
  MapPin,
  SlidersHorizontal,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { NEON_PRODUCTS } from '@/lib/neon/neon-products';
import { COMPANY_INFO, getTelLink, getWhatsAppLink } from '@/lib/company-info';

interface LandingNeonCatalogProps {
  onSelectProductForQuote?: (productTitle: string) => void;
}

export function LandingNeonCatalog({ onSelectProductForQuote }: LandingNeonCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const categories = ['الكل', 'حروف بارزة', 'نيون فليكس', 'لايت بوكس', 'استاندات ذكية', 'واجهات متكاملة'];

  const filteredProducts = useMemo(() => {
    return NEON_PRODUCTS.filter((prod) => {
      const matchCat = selectedCategory === 'الكل' || prod.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.quickChips.some((chip) => chip.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (text: string, label: string) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(`تم نسخ: ${label}`);
      setTimeout(() => setCopiedText(null), 2400);
    }
  };

  const primaryPhone = COMPANY_INFO.contacts.primary.phoneInternational;
  const primaryWhatsapp = COMPANY_INFO.contacts.primary.whatsappDigits;

  return (
    <section id="neon" className="relative py-24 bg-[#07090d] text-[#f7f8fa] overflow-hidden border-t border-b border-white/5">
      {/* ── AMBIENT NEON GLOW BACKDROPS (ZoneX cyber atmosphere) ── */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(73,215,255,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(244,180,63,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* ── TOAST NOTIFICATION ────────────────────────────── */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#111824] border border-[#49d7ff]/30 text-cyan-300 px-5 py-2.5 rounded-full text-xs font-semibold shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex items-center gap-2 transition-all duration-300 ${
          copiedText ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <Check className="w-4 h-4 text-emerald-400" />
        <span>{copiedText}</span>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── TOP BADGE & SECTION INTRO ─────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#49d7ff]/10 border border-[#49d7ff]/30 text-[#49d7ff] text-xs font-bold mb-4 shadow-[0_0_15px_rgba(73,215,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#49d7ff] animate-ping" />
            <span>كتالوج النيون واليافطات المضيئة 2026 • طابع ZONE-X</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            CREATIVE <span className="text-[#f4b43f] neon-glow-gold">MEDIA</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#49d7ff] neon-glow-cyan mt-1">
              حروف 3D بارزة • نيون فليكس • شاشات ولايت بوكس
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            قائمة الأسعار والمواصفات الفنية المعتمدة لمنتجات الديكور المضيء واليافطات، تصنيع هندسي بأحدث ماكينات الفايبر ليزر والـ CNC مع إضاءة Samsung LED معتمدة وضمان تشغيل حقيقي.
          </p>
        </div>

        {/* ── ZONEX HEADER BANNER WITH CONTACT INFO ─────────── */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 p-6 sm:p-8 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent shadow-[0_14px_45px_rgba(0,0,0,0.45)] mb-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-right">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#49d7ff]/20 to-[#f4b43f]/20 border border-white/15 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(73,215,255,0.2)]">
                <Sparkles className="w-7 h-7 text-[#f4b43f]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>طلب فوري ومقايسة مجانية لليافطات والنيون</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                    ONLINE
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  تواصل مباشرة مع مهندسي التنفيذ للحصول على مقايسة دقيقة لمشروعك مع الرسم الهندسي مجاناً.
                </p>
              </div>
            </div>

            {/* Direct Contact Pills */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-end">
              <div className="border border-[#f4b43f]/30 bg-[#f4b43f]/[0.08] rounded-xl px-4 py-2.5 text-center min-w-[160px]">
                <small className="block text-[#f4b43f] text-[10px] font-semibold mb-0.5">
                  إدارة المشروعات والتعاقدات
                </small>
                <strong className="block text-sm font-mono text-white tracking-wider" dir="ltr">
                  {COMPANY_INFO.contacts.primary.phoneFormatted}
                </strong>
                <span className="text-[10px] text-zinc-400">{COMPANY_INFO.contacts.primary.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getTelLink(primaryPhone)}
                  className="min-h-[42px] px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-[#f4b43f] to-[#ffc85f] text-zinc-950 flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_18px_rgba(244,180,63,0.3)]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>اتصال مباشر</span>
                </a>
                <a
                  href={getWhatsAppLink(primaryWhatsapp, 'مرحباً Creative Media، أود الاستفسار عن تفاصيل وأسعار الحروف واليافطات المضيئة')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-4 rounded-xl font-bold text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-1.5 hover:bg-emerald-500/25 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>محادثة واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTROLS & FILTER BAR ─────────────────────────── */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن نوع الحروف أو المواصفة (أكريليك، إنفينتي، نيون...)"
              className="w-full h-12 pr-10 pl-4 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#49d7ff] focus:ring-1 focus:ring-[#49d7ff]/30 transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#f4b43f] to-[#ffc85f] text-zinc-950 shadow-[0_0_20px_rgba(244,180,63,0.35)]'
                      : 'bg-white/[0.03] text-zinc-300 border border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product count indicator */}
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1 mb-6">
          <span>يتم عرض {filteredProducts.length} منتج ومواصفة معتمدة</span>
          <span className="text-[#f4b43f] font-medium">✓ أسعار استرشادية معتمدة 2026</span>
        </div>

        {/* ── PRODUCTS GRID (ZoneX Card Design) ─────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isOpen = openCardId === product.id;

            return (
              <div
                key={product.id}
                className="group relative rounded-[22px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.015] shadow-[0_14px_38px_rgba(0,0,0,0.35)] hover:border-[#49d7ff]/35 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Product Image Frame */}
                <div className="relative w-full aspect-[5/4] bg-[#090d13] border-b border-white/10 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d13] via-transparent to-transparent opacity-60" />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold bg-[#f4b43f]/90 text-zinc-950 backdrop-blur-md shadow-md">
                      {product.badge}
                    </div>
                  )}

                  {/* Category Chip Over Image */}
                  <div className="absolute bottom-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold text-[#49d7ff] border border-[#49d7ff]/30 bg-[#090d13]/85 backdrop-blur-md">
                    {product.category}
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Title & Copy Button */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-bold text-white group-hover:text-[#49d7ff] transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <button
                      onClick={() => handleCopy(product.title, product.title)}
                      title="نسخ اسم المنتج"
                      className="shrink-0 p-1.5 rounded-lg border border-[#49d7ff]/25 bg-[#49d7ff]/10 text-[#49d7ff] hover:bg-[#49d7ff]/20 active:scale-95 transition-all text-[11px]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price Block (ZoneX Gold Box) */}
                  <div className="border border-[#f4b43f]/30 bg-gradient-to-b from-[#f4b43f]/15 to-[#f4b43f]/05 rounded-xl p-3 text-center mb-4">
                    <small className="block text-[#f4b43f]/80 text-[10px] font-medium mb-0.5">
                      {product.priceNote || 'السعر التقديري الأساسي'}
                    </small>
                    <strong className="block text-lg sm:text-xl font-black text-[#f4b43f] neon-glow-gold">
                      {product.basePrice}
                    </strong>
                    {product.controllerPrice && (
                      <span className="block mt-1 text-[10px] text-zinc-300 font-medium">
                        {product.controllerPrice}
                      </span>
                    )}
                  </div>

                  {/* Quick Chips List */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {product.quickChips.map((chip, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/[0.035] text-zinc-300 border border-white/10"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.07]">
                    <button
                      onClick={() => setOpenCardId(isOpen ? null : product.id)}
                      className={`min-h-[40px] px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isOpen
                          ? 'bg-[#f4b43f]/20 border-[#f4b43f]/40 text-[#f4b43f]'
                          : 'bg-[#f4b43f]/10 border-[#f4b43f]/25 text-[#f4b43f] hover:bg-[#f4b43f]/15'
                      }`}
                    >
                      <span>المواصفات</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <a
                      href={getWhatsAppLink(
                        primaryWhatsapp,
                        `مرحباً Creative Media، أود طلب مقايسة بخصوص: ${product.title} (${product.basePrice})`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] px-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 active:scale-95 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>واتساب</span>
                    </a>
                  </div>

                  {/* Direct Quote Request Button */}
                  {onSelectProductForQuote && (
                    <button
                      onClick={() => onSelectProductForQuote(product.title)}
                      className="mt-2 w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>طلب معاينة ومقايسة بالموقع</span>
                      <ArrowUpRight className="w-3 h-3 text-[#B89A67]" />
                    </button>
                  )}

                  {/* ── COLLAPSIBLE DETAILS ACCORDION ─────────── */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[1400px] opacity-100 mt-4 pt-4 border-t border-white/10' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {/* Technical Specifications */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 mb-3">
                      <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 mb-2">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>المواصفات الهندسية والخامات</span>
                      </h4>
                      <ul className="space-y-1.5 text-[11px] text-zinc-300 pr-3 list-disc marker:text-[#f4b43f]">
                        {product.specifications.map((spec, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What's Included */}
                    {product.included && product.included.length > 0 && (
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 mb-3">
                        <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>الملحقات وضمان التشغيل</span>
                        </h4>
                        <ul className="space-y-1.5 text-[11px] text-zinc-300 pr-3 list-disc marker:text-emerald-400">
                          {product.included.map((inc, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Variants and Sizes Grid */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="mb-3">
                        <h5 className="text-[11px] font-bold text-zinc-400 mb-2 flex items-center justify-between">
                          <span>جدول المقاسات الشائعة:</span>
                          <span className="text-[10px] text-zinc-500">اختر وانسخ للطلب</span>
                        </h5>
                        <div className="space-y-2">
                          {product.variants.map((variant) => (
                            <div
                              key={variant.id}
                              className="rounded-lg border border-[#f4b43f]/20 bg-[#f4b43f]/[0.04] p-2.5 flex items-center justify-between gap-2"
                            >
                              <div>
                                <span className="block text-xs font-bold text-white">{variant.name}</span>
                                <span className="text-[10px] text-zinc-400">مقاس: {variant.size}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-[#f4b43f]">{variant.price}</span>
                                <button
                                  onClick={() =>
                                    handleCopy(`${product.title} - ${variant.name} (${variant.price})`, variant.name)
                                  }
                                  className="px-2 py-1 rounded bg-[#49d7ff]/10 border border-[#49d7ff]/20 text-[#49d7ff] text-[10px] font-bold hover:bg-[#49d7ff]/20 active:scale-95"
                                >
                                  نسخ
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technical Note */}
                    {product.technicalNote && (
                      <div className="rounded-xl border border-dashed border-[#f4b43f]/30 bg-[#f4b43f]/[0.05] p-3 text-[10.5px] text-[#f4b43f] leading-relaxed">
                        {product.technicalNote}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── ZONE-X LOCATION & DIRECTIONS BANNER ──────────── */}
        <div className="mt-16 rounded-2xl border-t border-b border-t-[#49d7ff]/30 border-b-[#f4b43f]/30 bg-gradient-to-b from-[#49d7ff]/[0.05] via-white/[0.01] to-transparent p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-16 h-1 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#49d7ff] to-[#f4b43f]" />
          
          <h3 className="text-lg sm:text-2xl font-black text-white tracking-wide mb-2">
            CREATIVE MEDIA • معرض الخامات واللوحات الإعلانية المضيئة
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-6">
            نرحب بزيارتكم في معرضنا لمعاينة عينات الأكريليك، الاستانلس الذهبي والفضي، والنيون فليكس على الطبيعة، أو طلب زيارة هندسية لموقعك.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-right mb-6">
            <div className="p-3.5 rounded-xl border border-white/10 bg-black/30">
              <small className="block text-[10px] text-zinc-400 mb-1">المقر الرئيسي والمعرض</small>
              <strong className="block text-xs sm:text-sm text-zinc-200">
                {COMPANY_INFO.address.fullArabic}
              </strong>
            </div>
            <div className="p-3.5 rounded-xl border border-white/10 bg-black/30">
              <small className="block text-[10px] text-zinc-400 mb-1">المسؤولون المعتمدون</small>
              <strong className="block text-xs sm:text-sm text-zinc-200 font-mono" dir="ltr">
                {COMPANY_INFO.contacts.primary.phoneFormatted}
              </strong>
              <span className="text-[10px] text-zinc-400">
                {COMPANY_INFO.contacts.primary.name} • {COMPANY_INFO.contacts.secondary.name} ({COMPANY_INFO.contacts.secondary.phoneFormatted})
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://maps.google.com/?q=السنبلاوين+شارع+عبد+المنعم"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-6 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <MapPin className="w-4 h-4" />
              <span>الاتجاهات على خرائط Google</span>
            </a>
            <a
              href="#contact"
              className="min-h-[44px] px-6 rounded-xl text-xs font-bold bg-white/10 text-[#f4b43f] border border-[#f4b43f]/30 flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>طلب مقايسة واجهة متكاملة</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
