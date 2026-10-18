'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Camera,
  Layers,
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
  MessageCircle,
  CheckCircle2,
  Eye,
  Sliders,
  Building2,
  Wrench,
  Repeat,
} from 'lucide-react';
import { COMPANY_INFO, getWhatsAppLink } from '@/lib/company-info';

export interface RealProjectItem {
  id: string;
  title: string;
  category: 'كلادينج' | 'نيون ويافطات' | 'تشطيبات وديكور' | 'قبل وبعد' | 'الورشة والموقع';
  image: string;
  badge?: string;
  location?: string;
  client?: string;
  description: string;
  tags: string[];
  beforeImage?: string;
}

const REAL_PROJECTS: RealProjectItem[] = [
  {
    id: 'cm-hq',
    title: 'مقر ومعرض شركة Creative Media الرئيسي',
    category: 'كلادينج',
    badge: 'المقر الرسمي',
    image: '/landing/real/creative-media-hq.jpg',
    location: 'السنبلاوين، الدقهلية',
    client: 'Creative Media HQ',
    description:
      'الواجهة الرسمية لمعرض ومقر الإدارة: كلادينج أبيض ناصع، حروف 3D بإنارة Samsung LED، أعمدة نيون معمارية، وبانوهات خشبية طولية.',
    tags: ['المقر الرسمي', 'كلادينج أبيض', 'أعمدة نيون', 'حروف 3D'],
  },
  {
    id: 'looz-cafe',
    title: 'واجهة وبوتيك كافيه Looz الفاخر',
    category: 'نيون ويافطات',
    badge: 'تصميم فندقي',
    image: '/landing/real/looz-cafe-facade.jpg',
    location: 'الدقهلية',
    client: 'كافيه Looz',
    description:
      'واجهة مقوسة بإضاءة كوف مخفية دافئة مع حروف نيون سكريبت بارزة تخطف الأنظار وتشطيب جداري متناسق.',
    tags: ['حروف نيون', 'واجهة مقوسة', 'إضاءة كوف', 'أكريليك ليزر'],
  },
  {
    id: 'xboy-tower',
    title: 'واجهة برج الجزيرة التجاري (X WOMEN & X BOY)',
    category: 'كلادينج',
    badge: 'طابقين متكاملين',
    image: '/landing/real/xboy-xwomen-tower.jpg',
    location: 'الدقهلية',
    client: 'برج الجزيرة',
    description:
      'تكسية كاملة لواجهة تجارية كبرى تمتد على طابقين بألواح الكلادينج، حروف نيون ليد خضراء، وقواطع CNC هندسية.',
    tags: ['برج تجاري', 'كلادينج طابقين', 'نيون ليد', 'مظلة سبوتات'],
  },
  {
    id: 'sobhy-facade',
    title: 'مجمع معارض شركة صبحي عبد الغني',
    category: 'كلادينج',
    badge: '4 فتحات تجارية',
    image: '/landing/real/sobhy-abdelghany-storefront.jpg',
    location: 'السنبلاوين',
    client: 'شركة صبحي عبد الغني',
    description:
      'واجهة عريضة جداً مكسوة ببديل الخشب المعماري المقاوم للشمس مع حروف 3D كهرمانية وأباليك إضاءة مزدوجة.',
    tags: ['تكسية خشبية', 'حروف كهرمانية', 'إضاءة Up-Down'],
  },
  {
    id: 'delta-travel',
    title: 'مبنى سفريات الدلتا الدائري (واجهة ناصية)',
    category: 'كلادينج',
    badge: 'ناصية معمارية',
    image: '/landing/real/delta-travel-corner-building.jpg',
    location: 'الدقهلية',
    client: 'شركة سفريات الدلتا',
    description:
      'تكسية واجهة ناصية دائرية معقدة هندسياً بشرائط كلادينج انسيابية، زجاج كرتن وول أزرق عاكس، وبوابة ليزر CNC ذهبية.',
    tags: ['ناصية دائرية', 'كرتن وول', 'بوابة ليزر ذهبية'],
  },
  {
    id: 'duck-fashion',
    title: 'واجهة متجر DUCK للأزياء (طابع مينيماليست)',
    category: 'كلادينج',
    badge: 'مودرن',
    image: '/landing/real/duck-storefront.jpg',
    location: 'الدقهلية',
    client: 'متجر DUCK',
    description:
      'كلادينج رمادي مطفي بفتحات CNC أفقية، حروف بيضاء ثلاثية الأبعاد بكنار أسود، وسبوت لايت مخفي بمدخل زجاجي.',
    tags: ['مينيماليست', 'حروف 3D', 'سبوت لايت مخفي'],
  },
  {
    id: 'abu-ahmad-ba',
    title: 'تجديد وتحول واجهة مطعم أبو أحمد السوري',
    category: 'قبل وبعد',
    badge: 'تحول معماري جذري',
    image: '/landing/real/abu-ahmad-after.jpg',
    beforeImage: '/landing/real/abu-ahmad-before.jpg',
    location: 'الدقهلية',
    client: 'مطعم أبو أحمد السوري',
    description:
      'تحويل واجهة قديمة متهالكة إلى بوابة كلادينج حمراء لامعة متناسقة مع الهوية السورية مع حروف أكريليك مضيئة وهبوط إضاءة متجانس.',
    tags: ['قبل وبعد', 'كلادينج أحمر', 'حروف أكريليك', 'تطوير واجهة'],
  },
  {
    id: 'counter-cashier-ba',
    title: 'كاونتر استقبال وكاشير كلادينج فضي ميتاليك',
    category: 'قبل وبعد',
    badge: 'تشطيب داخلي',
    image: '/landing/real/counter-cashier-after.jpg',
    beforeImage: '/landing/real/counter-cashier-before.jpg',
    location: 'معرض تجاري',
    client: 'كاشير تجاري',
    description:
      'تصنيع كاونتر كاشير بحواف دائرية انسيابية مكسوة بألواح BM BOND الإماراتية الأصلية بضمان 15 سنة وحروف Pay here.',
    tags: ['قبل وبعد', 'كاونتر كلادينج', 'BM BOND', 'حواف دائرية'],
  },
  {
    id: 'dogry-bazlam',
    title: 'واجهات DOGRY & BAZLAM التجارية الموحدة',
    category: 'كلادينج',
    badge: 'واجهة مزدوجة',
    image: '/landing/real/dogry-bazlam-double.jpg',
    location: 'الدقهلية',
    client: 'DOGRY & BAZLAM',
    description:
      'تجليد موحد لمتجرين متجاورين بألواح الكلادينج الأسود اللامع وبانوهات خشبية طولية وشعارات الماركات العالمية بدقة الليزر.',
    tags: ['كلادينج أسود', 'بانوهات خشبية', 'أكريليك ليزر'],
  },
  {
    id: 'homein-install',
    title: 'تركيب واجهة وصندوق إضاءة HOME IN المضيء',
    category: 'الورشة والموقع',
    badge: 'من أرض الموقع',
    image: '/landing/real/homein-installation.jpg',
    location: 'موقع العمل',
    client: 'HOME IN',
    description:
      'فنيو Creative Media أثناء رفع وتثبيت وتوصيل صندوق الإضاءة الباك لايت والعمود النيوني المضيء على الواجهة.',
    tags: ['فريق العمل', 'تركيب ميداني', 'عمود نيون', 'باك لايت'],
  },
  {
    id: 'workshop-letters',
    title: 'تصنيع وقص الحروف البارزة بورشة العمل',
    category: 'الورشة والموقع',
    badge: 'من داخل ورشتنا',
    image: '/landing/real/workshop-letters-fabrication.jpg',
    location: 'ورشة تصنيع Creative Media',
    client: 'تصنيع داخلي',
    description:
      'قص وتفريغ وتجميع حروف وأرقام الأكريليك الكوري البيور بماكينات الليزر وإعداد شبكة ليدات سامسونج بالداخل.',
    tags: ['تصنيع داخلي', 'أكريليك كوري', 'ماكينات ليزر', 'شاسيه زنكور'],
  },
  {
    id: 'workshop-shields',
    title: 'تجميع الدروع الإعلانية 3D بالورشة',
    category: 'الورشة والموقع',
    badge: 'دقة المليمتر',
    image: '/landing/real/workshop-shields-assembly.jpg',
    location: 'ورشة تصنيع Creative Media',
    client: 'دروع AHA',
    description:
      'تركيب طبقات الأكريليك الميرور الذهبي والإنارة الداخلية للشعارات المجسمة وفحص جودة الإضاءة قبل الشحن والتركيب.',
    tags: ['أكريليك ميرور', 'شعار 3D', 'فحص الجودة'],
  },
];

interface LandingRealShowcaseProps {
  onSelectProjectForQuote?: (projectName: string) => void;
}

export function LandingRealShowcase({ onSelectProjectForQuote }: LandingRealShowcaseProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('الكل');
  const [activeModalProject, setActiveModalProject] = useState<RealProjectItem | null>(null);
  const [baViewMode, setBaViewMode] = useState<Record<string, 'after' | 'before'>>({});

  const filterTabs = ['الكل', 'كلادينج', 'نيون ويافطات', 'تشطيبات وديكور', 'قبل وبعد', 'الورشة والموقع'];

  const filteredProjects = REAL_PROJECTS.filter((p) => {
    if (selectedFilter === 'الكل') return true;
    return p.category === selectedFilter;
  });

  const toggleBaMode = (id: string) => {
    setBaViewMode((prev) => ({
      ...prev,
      [id]: prev[id] === 'before' ? 'after' : 'before',
    }));
  };

  const primaryWhatsapp = COMPANY_INFO.contacts.primary.whatsappDigits;

  return (
    <section id="real-showcase" className="py-24 md:py-32 relative bg-[#0c0e12] text-[#F8F6F1] overflow-hidden border-t border-white/10">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(73,215,255,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,154,103,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B89A67]/10 border border-[#B89A67]/30 text-xs font-bold text-[#D4B98B] shadow-sm">
            <Camera size={14} className="text-[#B89A67]" />
            <span>من أرض الواقع • تصوير حي لأعمالنا الحقيقية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            معرض الأعمال الواقعية والتنفيذ الميداني
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            لا نعتمد على صور الإنترنت أو التصاميم الافتراضية؛ هذه لقطات حقيقية لمشاريع قمنا بتصنيعها وتركيبها بأيدي فريقنا الهندسي والفني في الدقهلية ومختلف المحافظات.
          </p>

          {/* Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => {
              const active = selectedFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-[#B89A67] to-[#D4B98B] text-zinc-950 shadow-md scale-105'
                      : 'bg-white/[0.04] text-zinc-300 border border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => {
            const isBeforeAfter = !!project.beforeImage;
            const currentMode = baViewMode[project.id] || 'after';
            const displayImage = isBeforeAfter && currentMode === 'before' ? project.beforeImage! : project.image;

            return (
              <div
                key={project.id}
                className="group rounded-3xl bg-[#14171d] border border-white/10 hover:border-[#B89A67]/40 shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
              >
                {/* Visual Imagery Frame */}
                <div className="relative aspect-[4/3] bg-black overflow-hidden">
                  <img
                    src={displayImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14171d] via-transparent to-transparent opacity-70" />

                  {/* Top Badge */}
                  {project.badge && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold bg-[#111412]/85 text-[#D4B98B] border border-[#B89A67]/35 backdrop-blur-md">
                      {project.badge}
                    </div>
                  )}

                  {/* Before / After Toggle Button */}
                  {isBeforeAfter && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBaMode(project.id);
                      }}
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-[#B89A67] text-zinc-950 shadow-lg flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
                    >
                      <Repeat size={12} />
                      <span>{currentMode === 'after' ? 'اعرض (قبل التنفيذ)' : 'اعرض (بعد التنفيذ)'}</span>
                    </button>
                  )}

                  {/* Quick Expand Button */}
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="absolute bottom-3 left-3 p-2 rounded-xl bg-black/60 text-white border border-white/20 hover:bg-[#B89A67] hover:text-black transition-colors"
                    title="معاينة الصورة بالحجم الكامل"
                  >
                    <Maximize2 size={14} />
                  </button>

                  {/* Mode Label */}
                  {isBeforeAfter && (
                    <div className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/75 text-zinc-300 border border-white/15">
                      {currentMode === 'after' ? '✓ بعد التنفيذ' : '⚠ الموقع قبل التنفيذ'}
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[11px] text-[#B89A67] font-semibold mb-2">
                    <span>{project.location || 'الدقهلية'}</span>
                    <span>•</span>
                    <span className="text-zinc-400">{project.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#D4B98B] transition-colors leading-snug mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.035] text-zinc-300 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                    <button
                      onClick={() =>
                        onSelectProjectForQuote
                          ? onSelectProjectForQuote(project.title)
                          : window.open(
                              getWhatsAppLink(
                                primaryWhatsapp,
                                `مرحباً Creative Media، أود طلب تنفيذ مشروع مشابه لـ: ${project.title}`
                              ),
                              '_blank'
                            )
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4B98B] hover:text-white transition-colors cursor-pointer"
                    >
                      <span>اطلب تنفيذ مماثل</span>
                      <ArrowRight size={13} />
                    </button>

                    <a
                      href={getWhatsAppLink(
                        primaryWhatsapp,
                        `مرحباً Creative Media، أود الاستفسار عن تفاصيل مشروع: ${project.title}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                      title="استفسار عبر واتساب"
                    >
                      <MessageCircle size={15} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Neon Link Promotion Banner */}
        <div className="mt-16 rounded-3xl border border-[#49d7ff]/25 bg-gradient-to-r from-[#49d7ff]/[0.08] via-transparent to-[#B89A67]/[0.08] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#49d7ff]/15 text-[#49d7ff] text-xs font-bold border border-[#49d7ff]/30">
              <Sparkles size={12} />
              <span>كتالوج اليافطات والنيون فليكس التفاعلي</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              هل تبحث عن حروف بارزة، إنفينتي، أو نيون فليكس مع الأسعار والمقاسات؟
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              تصفح كتالوج النيون المستقل واستعرض المواصفات الفنية وجداول المقاسات مع زر النسخ السريع والطلب المباشر.
            </p>
          </div>

          <Link
            href="/neon"
            className="shrink-0 min-h-[46px] px-7 rounded-xl font-bold text-xs bg-gradient-to-r from-[#49d7ff] to-cyan-300 text-zinc-950 flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(73,215,255,0.3)]"
          >
            <span>⚡ فتح كتالوج النيون 3D</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeModalProject && (
        <div
          onClick={() => setActiveModalProject(null)}
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-xl grid place-items-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-3xl bg-[#14171d] border border-white/15 overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-white hover:text-black transition-colors"
            >
              <X size={18} />
            </button>

            <div className="aspect-[16/10] sm:aspect-[16/9] bg-black overflow-hidden relative">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-[#B89A67]">
                    {activeModalProject.category} • {activeModalProject.location}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-black text-white mt-1">
                    {activeModalProject.title}
                  </h3>
                </div>

                <a
                  href={getWhatsAppLink(
                    primaryWhatsapp,
                    `مرحباً Creative Media، أود الاستفسار وطلب معاينة لتنفيذ مشروع مماثل لـ: ${activeModalProject.title}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 min-h-[42px] px-6 rounded-xl font-bold text-xs bg-emerald-500 text-zinc-950 flex items-center justify-center gap-2 hover:bg-emerald-400 active:scale-95 transition-all"
                >
                  <MessageCircle size={15} />
                  <span>طلب معاينة للمشروع</span>
                </a>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeModalProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
