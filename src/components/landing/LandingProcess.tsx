'use client';

import { Sparkles, MapPin, ClipboardList, Palette, Wrench, ShieldCheck } from 'lucide-react';

export function LandingProcess() {
  const steps = [
    {
      num: '01',
      title: 'الاستشارة والمعاينة الميدانية',
      description:
        'زيارة الموقع من قِبل مهندسينا لرفع المقاسات الدقيقة وفحص طبيعة الجدران والواجهات الحالية، وتحديد الارتفاعات والأحمال الهندسية.',
      icon: MapPin,
    },
    {
      num: '02',
      title: 'دراسة المتطلبات والمواصفات',
      description:
        'تحديد الخامات المناسبة للمشروع (نوع ألواح الكلادينج ACP، سماكة الحديد، أنواع الإضاءات LED، بدائل الرخام والخشب) وتقديم مقايسة أسعار تفصيلية شفافة.',
      icon: ClipboardList,
    },
    {
      num: '03',
      title: 'التصميم والنمذجة ثلاثية الأبعاد (3D)',
      description:
        'إعداد تصوّر معماري واقعي 3D للواجهة أو الديكور الداخلي ليرى العميل النتيجة النهائية وتوزيع الإضاءة والألوان قبل قص أو تصنيع أي قطعة.',
      icon: Palette,
    },
    {
      num: '04',
      title: 'التصنيع والتنفيذ الميداني',
      description:
        'قص بالليزر وماكينات الـ CNC، تجهيز الشاسيهات الحديدية المعالجة ضد الصدأ، والتركيب الميداني بدقة المليمتر بإشراف فني وهندسي صارم.',
      icon: Wrench,
    },
    {
      num: '05',
      title: 'المراجعة والتسليم والضمان',
      description:
        'اختبار استقامة الزوايا، فواصل التمدد، وتوصيلات الإضاءة، ثم تسليم المشروع مطابقاً للمواصفات المتفق عليها وتزويد العميل بشهادة الضمان.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="process" className="py-24 md:py-32 relative bg-[#111412] text-[#F8F6F1] overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#B89A67]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#B89A67]/30 text-xs font-semibold text-[#D4B98B]">
            <Sparkles size={13} />
            <span>منهجية العمل الهندسي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8F6F1] tracking-tight leading-tight">
            مسار تنفيذ دقيق من الفكرة إلى التسليم
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            نتبع خطوات مرحلية واضحة تضمن جودة التصنيع، سلامة الهياكل الإنشائية، والالتزام الصارم بالجدول الزمني للعميل.
          </p>
        </div>

        {/* Architectural Timeline / Staggered Flow */}
        <div className="relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B89A67]/30 to-transparent -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="flex flex-col justify-between p-6 rounded-2xl bg-[#171A1B] border border-white/10 hover:border-[#B89A67]/50 transition-all duration-300 group shadow-lg text-right"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-black text-[#B89A67]/80 font-mono">
                        {step.num}
                      </span>
                      <div className="p-3 rounded-xl bg-white/[0.04] text-[#B89A67] border border-white/5 group-hover:bg-[#B89A67]/15 group-hover:scale-105 transition-all">
                        <Icon size={18} />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#F8F6F1] mb-2 group-hover:text-[#D4B98B] transition-colors leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 text-[10px] text-[#B89A67] font-semibold">
                    المرحلة {idx + 1} من 5
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
