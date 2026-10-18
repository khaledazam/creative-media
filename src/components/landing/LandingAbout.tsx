'use client';

import { COMPANY_INFO } from '@/lib/company-info';
import { CheckCircle2, ArrowLeft, Building2, DraftingCompass, Hammer } from 'lucide-react';

export function LandingAbout() {
  return (
    <section id="about" className="py-24 md:py-32 relative bg-[#171A1B] text-[#F8F6F1] overflow-hidden border-t border-white/5">
      {/* Background Architectural Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B89A67]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Col 1: Editorial Asymmetric Imagery (45%) */}
          <div className="w-full lg:w-[46%] relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src="/landing/real/delta-travel-corner-building.jpg"
                alt="تنفيذ واجهات معمارية وكلادينج Creative Media"
                className="w-full aspect-[4/3] object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    '/landing/real/creative-media-hq.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111412] via-transparent to-transparent opacity-80" />
              
              {/* Overlay architectural tag */}
              <div className="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-[#111412]/85 backdrop-blur-md border border-white/10">
                <span className="text-xs font-bold text-[#D4B98B] block mb-1">
                  رؤية متكاملة للتنفيذ المعماري
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  تنسيق مباشر بين التصميم النظري وأصول الصنعة الميدانية في تكسية الواجهات والتشطيب.
                </p>
              </div>
            </div>

            {/* Accent Architectural Badge */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-4 p-4 rounded-xl bg-[#111412] border border-[#B89A67]/30 shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-[#B89A67]/15 text-[#B89A67] flex items-center justify-center shrink-0">
                <Building2 size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F8F6F1] block">تنفيذ معتمد في مصر</span>
                <span className="text-[11px] text-zinc-400">واجهات • محلات • مقرات تجارية</span>
              </div>
            </div>
          </div>

          {/* Col 2: Editorial Content & Positioning (54%) */}
          <div className="w-full lg:w-[54%] space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#B89A67]/30 text-xs font-semibold text-[#D4B98B]">
              <span>عن Creative Media</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold text-[#F8F6F1] tracking-tight leading-[1.3]">
              حيث يلتقي الفكر المعماري بدقة التصنيع والتنفيذ
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              تأسست <strong>Creative Media</strong> ككيان متخصص يهدف إلى سد الفجوة بين الرسومات المعمارية والتنفيذ الميداني الواقعي. نحن ندرك أن واجهة المبنى أو المتجر ليست مجرد غطاء خارجي، بل هي الرسالة البصرية الأولى التي تحدد هيبة ومكانة مشروعك.
            </p>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              نقدم حلولاً متكاملة تبدأ من المعاينة الهندسية الدقيقة ورفع المقاسات، مروراً بالتصميم ثلاثي الأبعاد واختيار خامات الكلادينج والتشطيب، وحتى التصنيع والتثبيت والإنارة تحت إشراف هندسي مباشر.
            </p>

            {/* Three Pillars of Trust */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="text-[#B89A67]">
                  <DraftingCompass size={20} />
                </div>
                <h3 className="text-xs font-bold text-[#F8F6F1]">تخطيط هندسي</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  دراسة إنشائية للأحمال والزوايا قبل تركيب الشاسيهات.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="text-[#B89A67]">
                  <Hammer size={20} />
                </div>
                <h3 className="text-xs font-bold text-[#F8F6F1]">جودة الخامات</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  استخدام ألواح كلادينج أصلية ومقاومة لعوامل الطقس.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="text-[#B89A67]">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-xs font-bold text-[#F8F6F1]">التزام بالتسليم</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  مراعاة مواعيد الافتتاح التجاري والتشغيل للعميل.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#expertise"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#B89A67] hover:text-[#D4B98B] transition-colors group"
              >
                <span>تعرف على مجالات وتخصصات العمل لدينا</span>
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
