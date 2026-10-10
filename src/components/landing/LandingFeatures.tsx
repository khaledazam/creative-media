'use client';

import { ShieldCheck, Cpu, Box, Clock, CheckCircle2, Sparkles, Ruler, Award } from 'lucide-react';

export function LandingFeatures() {
  return (
    <section id="why-us" className="py-24 md:py-32 relative overflow-hidden bg-[#171A1B] text-[#F8F6F1] border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#B89A67]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#B89A67]/30 text-xs font-semibold text-[#D4B98B]">
            <Sparkles size={13} />
            <span>معايير الثقة والاحتراف</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8F6F1] tracking-tight leading-tight">
            لماذا يثق العملاء في Creative Media؟
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            نركز على تفاصيل الصنعة الهندسية، ملاءمة الخامات المعتمدة، والتنسيق الوثيق بين الرسومات المعمارية والتنفيذ الميداني لضمان استثمار دائم.
          </p>
        </div>

        {/* 4 Architectural Standards Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Precision Manufacturing & CNC */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#111412] border border-white/10 hover:border-[#B89A67]/40 transition-all duration-300 group flex flex-col justify-between text-right">
            <div>
              <div className="inline-flex p-3 rounded-xl bg-[#B89A67]/15 text-[#B89A67] border border-[#B89A67]/25 mb-6 group-hover:scale-105 transition-transform">
                <Cpu size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8F6F1] mb-3 group-hover:text-[#D4B98B] transition-colors">
                دقة القص بالليزر وتشكيل الـ CNC
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                نعتمد ماكينات حديثة لقص الألواح وتفريغ الزخارف الهندسية والحروف البارزة بدقة تصل لأجزاء المليمتر، ما يضمن استقامة الفواصل وتطابق الزوايا المعمارية دون أي عيوب تشطيب.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-white/5 text-xs text-zinc-400">
              <CheckCircle2 size={16} className="text-[#B89A67] shrink-0" />
              <span>استقامة تامة لفواصل التمدد وزوايا الكلادينج 90 درجة</span>
            </div>
          </div>

          {/* Card 2: Certified Materials & Fire Rating */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#111412] border border-white/10 hover:border-[#B89A67]/40 transition-all duration-300 group flex flex-col justify-between text-right">
            <div>
              <div className="inline-flex p-3 rounded-xl bg-[#B89A67]/15 text-[#B89A67] border border-[#B89A67]/25 mb-6 group-hover:scale-105 transition-transform">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8F6F1] mb-3 group-hover:text-[#D4B98B] transition-colors">
                خامات معتمدة ومقاومة للعوامل الجوية
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                نستخدم ألواح الكلادينج ذات الكثافة المعتمدة والمقاومة لدرجات الحرارة وأشعة الشمس والحرائق، مع دهانات PVDF الأصلية التي تحافظ على ثبات اللون والبريق لسنوات طويلة.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-white/5 text-xs text-zinc-400">
              <CheckCircle2 size={16} className="text-[#B89A67] shrink-0" />
              <span>شاسيهات حديدية معالجة ضد الصدأ ومقاومة لأحمال الرياح</span>
            </div>
          </div>

          {/* Card 3: 3D Visualization Before Execution */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#111412] border border-white/10 hover:border-[#B89A67]/40 transition-all duration-300 group flex flex-col justify-between text-right">
            <div>
              <div className="inline-flex p-3 rounded-xl bg-[#B89A67]/15 text-[#B89A67] border border-[#B89A67]/25 mb-6 group-hover:scale-105 transition-transform">
                <Box size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8F6F1] mb-3 group-hover:text-[#D4B98B] transition-colors">
                تنسيق معماري ونمذجة 3D قبل البدء
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                لا نترك شيئاً للصدفة أو التقدير العشوائي. نقوم برفع المقاسات الميدانية وبناء مخطط ثلاثي الأبعاد يعرض درجات الألوان، تموضع الإضاءة، وتفاصيل الواجهة لاعتماده رسمياً قبل الشروع في التصنيع.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-white/5 text-xs text-zinc-400">
              <CheckCircle2 size={16} className="text-[#B89A67] shrink-0" />
              <span>مطابقة كاملة بين التصميم المعتمد والواقع المنفذ</span>
            </div>
          </div>

          {/* Card 4: Strict Timelines & Communication */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#111412] border border-white/10 hover:border-[#B89A67]/40 transition-all duration-300 group flex flex-col justify-between text-right">
            <div>
              <div className="inline-flex p-3 rounded-xl bg-[#B89A67]/15 text-[#B89A67] border border-[#B89A67]/25 mb-6 group-hover:scale-105 transition-transform">
                <Clock size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8F6F1] mb-3 group-hover:text-[#D4B98B] transition-colors">
                انضباط الجدول الزمني والتواصل المباشر
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                ندرك أهمية مواعيد الافتتاح التجاري لأصحاب الأعمال والمتاجر، لذلك نلتزم ببرنامج زمني محدد للمشروع مع متابعة فنية دورية وإشراف مباشر من مسؤولي التنفيذ (محمد العزب وسيف سامي).
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-white/5 text-xs text-zinc-400">
              <CheckCircle2 size={16} className="text-[#B89A67] shrink-0" />
              <span>تواصل مستمر وتقارير إنجاز مرحلية حتى يوم التسليم</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
