'use client';

export function LandingMarquee() {
  const items = [
    'واجهات كلادينج معتمدة',
    'حروف بارزة مضيئة 3D',
    'شاشات عرض LED عملاقة',
    'تشطيبات معارض ومحلات Fit-out',
    'ضمان موثق يصل إلى 10 سنوات',
    'قص ليزر وراوتر CNC دقيق',
    'معاينات ومخططات 3D مجانية',
    'إضاءات Samsung LED الأصلية',
    'ألواح مقاومة للحرائق والرطوبة',
    'تسليم مفتاح في الموعد المحدد',
  ];

  return (
    <div className="relative w-full py-4 bg-gradient-to-r from-amber-600/15 via-amber-500/10 to-amber-600/15 border-y border-amber-500/25 overflow-hidden backdrop-blur-md">
      {/* Edge gradient masks */}
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#07080a] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#07080a] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee-rtl flex items-center gap-8 text-xs sm:text-sm font-bold text-zinc-300">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-4 shrink-0">
            <span className="text-amber-400 font-extrabold text-base">✦</span>
            <span className="hover:text-amber-300 transition-colors tracking-wide">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
