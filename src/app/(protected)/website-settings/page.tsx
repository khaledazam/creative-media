'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLandingData } from '@/lib/landing/use-landing-data';
import { defaultLandingConfig } from '@/lib/landing/default-data';
import { LandingPortfolioItem, LandingService, LandingStat } from '@/lib/landing/types';
import { useApp } from '@/lib/store';
import {
  Globe,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  Sparkles,
  Phone,
  BarChart3,
  Briefcase,
  Mail,
  CheckCircle2,
  AlertCircle,
  Copy,
  Inbox,
  Image as ImageIcon,
} from 'lucide-react';
import { toast } from '@/components/ui/Toast';

const CATEGORY_OPTIONS = [
  { value: 'cladding', label: 'واجهات وكلادينج' },
  { value: 'signs', label: 'حروف ويافطات مضيئة' },
  { value: 'screens', label: 'شاشات عرض LED' },
  { value: 'fitout', label: 'تشطيبات وديكور' },
  { value: 'branding', label: 'هوية وبصريات' },
];

export default function WebsiteSettingsPage() {
  const { config, saveConfig, loading, saving } = useLandingData();
  const { projects } = useApp();

  const [activeTab, setActiveTab] = useState<'hero' | 'portfolio' | 'services' | 'stats' | 'contact' | 'inquiries'>('hero');
  const [formData, setFormData] = useState(config);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Sync state when config loads
  useEffect(() => {
    if (config) {
      setFormData(config);
    }
  }, [config]);

  // Load inquiries when switching to inquiries tab
  useEffect(() => {
    if (activeTab === 'inquiries') {
      setLoadingInquiries(true);
      fetch('/api/landing/lead')
        .then((res) => res.json())
        .then((data) => {
          if (data?.data) setInquiries(data.data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoadingInquiries(false));
    }
  }, [activeTab]);

  const handleSave = async () => {
    const success = await saveConfig(formData);
    if (success) {
      toast('success', 'تم حفظ التعديلات ونشرها بنجاح');
    } else {
      toast('error', 'حدث خطأ أثناء الحفظ، يرجى المحاولة ثانية');
    }
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد من استعادة الإعدادات الافتراضية؟')) {
      setFormData(defaultLandingConfig);
      saveConfig(defaultLandingConfig);
      toast('success', 'تمت استعادة الإعدادات الافتراضية');
    }
  };

  // Portfolio handlers
  const handleAddPortfolio = () => {
    const newItem: LandingPortfolioItem = {
      id: `port-${Date.now()}`,
      title: 'مشروع جديد',
      category: 'cladding',
      categoryLabel: 'واجهات وكلادينج',
      clientName: 'اسم العميل',
      location: 'المدينة',
      completionYear: '2026',
      description: 'وصف تفصيلي للأعمال المنفذة في هذا المشروع...',
      featured: true,
      coverImage: '/landing/real/creative-media-hq.jpg',
      tags: ['واجهات', 'كلادينج'],
    };
    setFormData((prev) => ({
      ...prev,
      portfolio: [newItem, ...prev.portfolio],
    }));
  };

  const handleImportProject = (projectId: string) => {
    const p = projects.find((item) => item.id === projectId);
    if (!p) return;
    const newItem: LandingPortfolioItem = {
      id: `port-${Date.now()}`,
      title: p.name,
      category: 'cladding',
      categoryLabel: 'واجهات وكلادينج',
      clientName: 'عميل Creative Media',
      location: p.location || 'مصر',
      completionYear: new Date().getFullYear().toString(),
      description: p.description || 'أعمال هندسية وإعلانية متكاملة بأعلى معايير الجودة.',
      featured: true,
      coverImage: '/landing/real/creative-media-hq.jpg',
      tags: ['Creative Media', 'سابقة أعمال'],
      linkedProjectId: p.id,
    };
    setFormData((prev) => ({
      ...prev,
      portfolio: [newItem, ...prev.portfolio],
    }));
    toast('success', `تم استيراد المشروع "${p.name}" إلى سابقة الأعمال`);
  };

  const handleRemovePortfolio = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((item) => item.id !== id),
    }));
  };

  const handleUpdatePortfolio = (id: string, updates: Partial<LandingPortfolioItem>) => {
    setFormData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    }));
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Top action header */}
      <div className="bg-surface-elevated/80 backdrop-blur-md border-b border-border-base sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-500/15 text-brand-400 border border-brand-500/20">
                <Globe size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  إدارة الموقع الإلكتروني وصفحة الهبوط
                  <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-normal">
                    Creative Media CMS
                  </span>
                </h1>
                <p className="text-xs text-zinc-400">
                  تحكم ديناميكياً في محتوى صفحة الهبوط، سابقة الأعمال، وأرقام التواصل المعروضة للجمهور
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            >
              <ExternalLink size={14} />
              معاينة الموقع ↗
            </Link>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/10 rounded-lg transition-all"
              title="استعادة القيم الأصلية"
            >
              <RotateCcw size={14} />
              استعادة الافتراضي
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 active:scale-95 disabled:opacity-50 rounded-lg shadow-lg shadow-brand-600/25 transition-all"
            >
              <Save size={15} />
              {saving ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}
            </button>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center gap-2 overflow-x-auto border-t border-white/5 pt-3">
          {[
            { id: 'hero', label: 'الرئيسية والبانر', icon: Sparkles },
            { id: 'portfolio', label: `سابقة الأعمال (${formData.portfolio?.length || 0})`, icon: Briefcase },
            { id: 'services', label: 'الخدمات والمجالات', icon: Layers },
            { id: 'stats', label: 'أرقام وإحصائيات', icon: BarChart3 },
            { id: 'contact', label: 'أرقام التواصل والسوشيال', icon: Phone },
            { id: 'inquiries', label: `الطلبات الواردة (${inquiries.length})`, icon: Inbox },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Content */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        {/* 1. HERO TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-surface-elevated border border-border-base rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                <Sparkles size={18} className="text-brand-400" />
                قسم البطل والواجهة الرئيسية (Hero Section)
              </h2>
              <p className="text-xs text-zinc-400 mb-6">
                هذه النصوص هي أول ما يشاهده العميل عند زيارة الموقع الرئيسي
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">الشارة العلوية (Badge)</label>
                  <input
                    type="text"
                    value={formData.hero.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, badge: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">رابط صورة الخلفية (Banner Image)</label>
                  <input
                    type="text"
                    value={formData.hero.bgImageUrl || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, bgImageUrl: e.target.value } })
                    }
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">العنوان الرئيسي (Title)</label>
                  <input
                    type="text"
                    value={formData.hero.title}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, title: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">
                    الكلمات المميزة المضيئة (Highlight Text)
                  </label>
                  <input
                    type="text"
                    value={formData.hero.highlightText}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, highlightText: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-300 mb-2">الوصف التعريفي (Description)</label>
                  <textarea
                    rows={3}
                    value={formData.hero.description}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, description: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">نص الزر الأساسي</label>
                  <input
                    type="text"
                    value={formData.hero.primaryCtaText}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, primaryCtaText: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">نص الزر الثانوي</label>
                  <input
                    type="text"
                    value={formData.hero.secondaryCtaText}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, secondaryCtaText: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Live Banner Preview Box */}
            <div className="bg-surface-elevated border border-border-base rounded-2xl p-6">
              <h3 className="text-xs font-semibold text-zinc-400 mb-4 uppercase tracking-wider">
                معاينة مباشرة لشكل قسم البطل:
              </h3>
              <div className="relative rounded-xl overflow-hidden p-8 border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-950">
                <div className="max-w-2xl space-y-4">
                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    {formData.hero.badge}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                    {formData.hero.title}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                      {formData.hero.highlightText}
                    </span>
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed">{formData.hero.description}</p>
                  <div className="flex gap-3 pt-2">
                    <span className="px-4 py-2 rounded-lg bg-brand-500 text-black font-semibold text-xs shadow-md">
                      {formData.hero.primaryCtaText}
                    </span>
                    <span className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs border border-white/10">
                      {formData.hero.secondaryCtaText}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-elevated border border-border-base rounded-2xl p-5">
              <div>
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Briefcase size={18} className="text-brand-400" />
                  سابقة الأعمال والمشاريع المعروضة على الموقع
                </h2>
                <p className="text-xs text-zinc-400">
                  أضف أعمالك الحالية أو استورد مشاريعك المسجلة بالفعل في النظام بنقرة واحدة
                </p>
              </div>

              <div className="flex items-center gap-3">
                {projects.length > 0 && (
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleImportProject(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                    className="px-3 py-2 bg-black/40 border border-border-base rounded-xl text-xs text-brand-300 focus:outline-none"
                  >
                    <option value="" disabled>
                      📥 استيراد من مشاريع الداشبورد...
                    </option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  onClick={handleAddPortfolio}
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium rounded-xl transition-all shadow-sm"
                >
                  <Plus size={15} />
                  إضافة عمل جديد
                </button>
              </div>
            </div>

            {/* Portfolio List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.portfolio.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-surface-elevated border border-border-base rounded-2xl p-5 space-y-4 hover:border-brand-500/30 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-mono text-zinc-500">#{index + 1}</span>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.featured}
                          onChange={(e) => handleUpdatePortfolio(item.id, { featured: e.target.checked })}
                          className="rounded border-zinc-700 text-brand-500 focus:ring-0"
                        />
                        مميز بالرئيسية
                      </label>
                      <button
                        onClick={() => handleRemovePortfolio(item.id)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="حذف هذا المشروع"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">اسم المشروع</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdatePortfolio(item.id, { title: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">التصنيف</label>
                      <select
                        value={item.category}
                        onChange={(e) => {
                          const cat = e.target.value;
                          const opt = CATEGORY_OPTIONS.find((o) => o.value === cat);
                          handleUpdatePortfolio(item.id, {
                            category: cat,
                            categoryLabel: opt ? opt.label : cat,
                          });
                        }}
                        className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                      >
                        {CATEGORY_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">اسم العميل</label>
                      <input
                        type="text"
                        value={item.clientName || ''}
                        onChange={(e) => handleUpdatePortfolio(item.id, { clientName: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">الموقع / المدينة</label>
                      <input
                        type="text"
                        value={item.location || ''}
                        onChange={(e) => handleUpdatePortfolio(item.id, { location: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-400 mb-1">رابط صورة الغلاف</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.coverImage}
                        onChange={(e) => handleUpdatePortfolio(item.id, { coverImage: e.target.value })}
                        placeholder="/landing/real/creative-media-hq.jpg"
                        className="flex-1 px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                      />
                      {item.coverImage && (
                        <div className="w-10 h-9 rounded-lg overflow-hidden border border-white/10 shrink-0">
                          <img src={item.coverImage} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-400 mb-1">تفاصيل ومواصفات العمل</label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => handleUpdatePortfolio(item.id, { description: e.target.value })}
                      className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                      الكلمات الدلالية والوسوم (مفصولة بفاصلة)
                    </label>
                    <input
                      type="text"
                      value={item.tags?.join('، ') || ''}
                      onChange={(e) =>
                        handleUpdatePortfolio(item.id, {
                          tags: e.target.value.split(/[,،]/).map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-surface-elevated border border-border-base rounded-2xl p-5">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Layers size={18} className="text-brand-400" />
                الخدمات ومجالات التخصص (Services)
              </h2>
              <p className="text-xs text-zinc-400">
                تحكم في قائمة الخدمات الـ 6 الرئيسية المعروضة في صفحة الهبوط
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.services.map((srv, idx) => (
                <div key={srv.id} className="bg-surface-elevated border border-border-base rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-400">خدمة #{idx + 1}</span>
                    <input
                      type="text"
                      placeholder="شارة مميزة (اختياري)"
                      value={srv.badge || ''}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[idx] = { ...srv, badge: e.target.value };
                        setFormData({ ...formData, services: newServices });
                      }}
                      className="px-2.5 py-1 bg-black/40 border border-border-base rounded-lg text-xs text-amber-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">عنوان الخدمة</label>
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[idx] = { ...srv, title: e.target.value };
                        setFormData({ ...formData, services: newServices });
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">وصف تفصيلي للخدمة</label>
                    <textarea
                      rows={3}
                      value={srv.description}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[idx] = { ...srv, description: e.target.value };
                        setFormData({ ...formData, services: newServices });
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">
                      مزايا ونقاط القوة (مفصولة بفاصلة)
                    </label>
                    <input
                      type="text"
                      value={srv.features?.join('، ') || ''}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[idx] = {
                          ...srv,
                          features: e.target.value.split(/[,،]/).map((f) => f.trim()).filter(Boolean),
                        };
                        setFormData({ ...formData, services: newServices });
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. STATS TAB */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="bg-surface-elevated border border-border-base rounded-2xl p-5">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-brand-400" />
                أرقام وإحصائيات الثقة (Key Metrics)
              </h2>
              <p className="text-xs text-zinc-400">
                تخصيص الأرقام التي تظهر في شريط الإحصائيات لتعزيز مصداقية الشركة
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {formData.stats.map((stat, idx) => (
                <div key={stat.id} className="bg-surface-elevated border border-border-base rounded-2xl p-5 space-y-4">
                  <span className="text-xs font-semibold text-brand-400">عداد #{idx + 1}</span>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">القيمة الرقمية</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...formData.stats];
                        newStats[idx] = { ...stat, value: e.target.value };
                        setFormData({ ...formData, stats: newStats });
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-lg font-bold text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">اللاحقة (مثل + أو %)</label>
                    <input
                      type="text"
                      value={stat.suffix || ''}
                      onChange={(e) => {
                        const newStats = [...formData.stats];
                        newStats[idx] = { ...stat, suffix: e.target.value };
                        setFormData({ ...formData, stats: newStats });
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">النص التوضيحي</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...formData.stats];
                        newStats[idx] = { ...stat, label: e.target.value };
                        setFormData({ ...formData, stats: newStats });
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-border-base rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-surface-elevated border border-border-base rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                <Phone size={18} className="text-brand-400" />
                بيانات وأرقام التواصل وشبكات التواصل الاجتماعي
              </h2>
              <p className="text-xs text-zinc-400 mb-6">
                هذه الأرقام والروابط يتم تفعيلها فورياً في أزرار الاتصال والواتساب بالموقع
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">رقم الهاتف الأساسي (اتصال مباشر)</label>
                  <input
                    type="text"
                    value={formData.contact.phonePrimary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, phonePrimary: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">رقم هاتف إضافي (اختياري)</label>
                  <input
                    type="text"
                    value={formData.contact.phoneSecondary || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, phoneSecondary: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">
                    رقم الواتساب (مع كود الدولة مثل +20...)
                  </label>
                  <input
                    type="text"
                    value={formData.contact.whatsappNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, whatsappNumber: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">البريد الإلكتروني للشركة</label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-300 mb-2">
                    الرسالة التلقائية لمحادثة الواتساب
                  </label>
                  <input
                    type="text"
                    value={formData.contact.whatsappDefaultMessage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, whatsappDefaultMessage: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">العنوان الجغرافي / المقر</label>
                  <input
                    type="text"
                    value={formData.contact.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, address: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">ساعات ومواعيد العمل</label>
                  <input
                    type="text"
                    value={formData.contact.workingHours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, workingHours: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Social media links */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">رابط الفيسبوك</label>
                  <input
                    type="text"
                    value={formData.contact.socials?.facebook || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact,
                          socials: { ...formData.contact.socials, facebook: e.target.value },
                        },
                      })
                    }
                    placeholder="https://facebook.com/..."
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">رابط إنستجرام</label>
                  <input
                    type="text"
                    value={formData.contact.socials?.instagram || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact,
                          socials: { ...formData.contact.socials, instagram: e.target.value },
                        },
                      })
                    }
                    placeholder="https://instagram.com/..."
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">رابط تيك توك</label>
                  <input
                    type="text"
                    value={formData.contact.socials?.tiktok || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact,
                          socials: { ...formData.contact.socials, tiktok: e.target.value },
                        },
                      })
                    }
                    placeholder="https://tiktok.com/@..."
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">رابط لينكد إن</label>
                  <input
                    type="text"
                    value={formData.contact.socials?.linkedin || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact,
                          socials: { ...formData.contact.socials, linkedin: e.target.value },
                        },
                      })
                    }
                    placeholder="https://linkedin.com/company/..."
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-border-base rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-surface-elevated border border-border-base rounded-2xl p-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Inbox size={18} className="text-brand-400" />
                  صندوق الرسائل وطلبات المقايسة الواردة من صفحة الهبوط
                </h2>
                <p className="text-xs text-zinc-400">
                  تلقي استفسارات العملاء المباشرة وتحويلها لمشاريع أو متابعتها
                </p>
              </div>

              <Link
                href="/leads"
                className="px-3.5 py-2 text-xs font-medium text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 rounded-xl transition-all"
              >
                انتقل لإدارة العملاء المحتملين (Leads) →
              </Link>
            </div>

            {loadingInquiries ? (
              <div className="text-center py-16 text-zinc-500 text-xs">جارٍ تحميل الرسائل...</div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-16 bg-surface-elevated border border-border-base rounded-2xl">
                <Inbox size={36} className="mx-auto text-zinc-600 mb-3" />
                <p className="text-sm font-medium text-zinc-300">لا توجد رسائل جديدة حتى الآن</p>
                <p className="text-xs text-zinc-500 mt-1">
                  أي عميل يرسل استفساراً من صفحة الهبوط سيظهر هنا وتلقائياً في قسم الـ Leads
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq: any) => (
                  <div
                    key={inq.id}
                    className="bg-surface-elevated border border-border-base rounded-2xl p-5 space-y-3 hover:border-brand-500/30 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center text-sm">
                          {inq.name?.[0] || 'ع'}
                        </span>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{inq.name}</h4>
                          <span className="text-xs text-zinc-400">{inq.company_name || 'عميل فردي'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/20">
                          {inq.service_type || 'طلب عام'}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">
                          {new Date(inq.created_at || Date.now()).toLocaleDateString('ar-EG')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-zinc-500 block mb-0.5">الهاتف / واتساب:</span>
                        <a href={`tel:${inq.phone}`} className="text-brand-300 hover:underline font-mono">
                          {inq.phone}
                        </a>
                      </div>
                      {inq.email && (
                        <div>
                          <span className="text-zinc-500 block mb-0.5">البريد:</span>
                          <a href={`mailto:${inq.email}`} className="text-zinc-300 hover:underline">
                            {inq.email}
                          </a>
                        </div>
                      )}
                      <div>
                        <span className="text-zinc-500 block mb-0.5">المصدر:</span>
                        <span className="text-zinc-400">{inq.source || 'الموقع'}</span>
                      </div>
                    </div>

                    {inq.notes && (
                      <div className="bg-black/30 p-3 rounded-xl border border-white/5 text-xs text-zinc-300 leading-relaxed">
                        {inq.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
