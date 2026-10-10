'use client';

import { useState } from 'react';
import { LandingContactInfo } from '@/lib/landing/types';
import { COMPANY_INFO, getTelLink, getWhatsAppLink } from '@/lib/company-info';
import {
  Phone,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  User,
  ShieldCheck,
} from 'lucide-react';

interface LandingContactProps {
  contact?: LandingContactInfo;
  selectedServicePreload?: string;
}

const SERVICE_OPTIONS = [
  'الكلادينج والواجهات المعمارية (ACP)',
  'التشطيبات والديكور الداخلي (Fit-Out)',
  'واجهات المحلات والمعارض التجارية',
  'حروف بارزة ويافطات مضيئة 3D',
  'ديكورات وتشكيلات CNC المعمارية',
  'شاشات العرض الذكية والـ LED',
  'استشارة ومعاينة موقع عامة',
];

export function LandingContact({ contact, selectedServicePreload }: LandingContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company_name: '',
    email: '',
    service_type: selectedServicePreload || SERVICE_OPTIONS[0],
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const contact1 = COMPANY_INFO.contacts.primary;
  const contact2 = COMPANY_INFO.contacts.secondary;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/landing/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'فشل إرسال الطلب، يرجى المحاولة ثانية');
      }

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        company_name: '',
        email: '',
        service_type: SERVICE_OPTIONS[0],
        notes: '',
      });
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-[#171A1B] text-[#F8F6F1] border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-[#B89A67]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#B89A67]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#B89A67]/30 text-xs font-semibold text-[#D4B98B]">
            <Sparkles size={13} />
            <span>تواصل مباشر ومعاينة هندسية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8F6F1] tracking-tight leading-tight">
            تواصل معنا لطلب مقايسة أو استشارة لمشروعك
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            فريق المهندسين ومسؤولي المشروعات في Creative Media متاح للإجابة على استفساراتكم وترتيب موعد المعاينة الميدانية.
          </p>
        </div>

        {/* 2-Column Balanced Architecture */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch w-full">
          
          {/* Card 1: Official Verified Contact Cards & Address (40%) */}
          <div className="w-full lg:w-[42%] flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#111412] border border-white/10 shadow-2xl text-right space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8F6F1] mb-2">
                  مسؤولو التواصل المباشر
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  يمكنكم الاتصال مباشرة بالمسؤولين الفنيين والإداريين أو المراسلة الفورية عبر واتساب.
                </p>
              </div>

              {/* Verified Contact Person 1: محمد العزب */}
              <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#B89A67]/40 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#B89A67]/15 text-[#B89A67] flex items-center justify-center shrink-0">
                      <User size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#F8F6F1]">
                        {contact1.name}
                      </h4>
                      <span className="text-[11px] text-[#B89A67] font-medium block">
                        {contact1.role}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5 font-mono">
                    متاح للاتصال
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={getTelLink(contact1.phoneInternational)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-[#F8F6F1] hover:text-[#B89A67] border border-white/10 transition-colors"
                  >
                    <Phone size={13} className="text-[#B89A67]" />
                    <span className="font-mono">{contact1.phoneRaw}</span>
                  </a>

                  <a
                    href={getWhatsAppLink(contact1.whatsappDigits, 'مرحباً أ. محمد العزب، أود الاستفسار بخصوص مشروع من خلال موقع Creative Media')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-colors"
                    title="محادثة واتساب"
                  >
                    <MessageCircle size={15} />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>

              {/* Verified Contact Person 2: سيف سامي */}
              <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#B89A67]/40 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#B89A67]/15 text-[#B89A67] flex items-center justify-center shrink-0">
                      <User size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#F8F6F1]">
                        {contact2.name}
                      </h4>
                      <span className="text-[11px] text-[#B89A67] font-medium block">
                        {contact2.role}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5 font-mono">
                    متاح للاتصال
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={getTelLink(contact2.phoneInternational)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-[#F8F6F1] hover:text-[#B89A67] border border-white/10 transition-colors"
                  >
                    <Phone size={13} className="text-[#B89A67]" />
                    <span className="font-mono">{contact2.phoneRaw}</span>
                  </a>

                  <a
                    href={getWhatsAppLink(contact2.whatsappDigits, 'مرحباً أ. سيف سامي، أود الاستفسار بخصوص مشروع من خلال موقع Creative Media')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-colors"
                    title="محادثة واتساب"
                  >
                    <MessageCircle size={15} />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>

              {/* Official Address Block */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#B89A67] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#F8F6F1] font-bold block mb-0.5">العنوان الرسمي:</span>
                    <p className="text-zinc-300 leading-relaxed font-normal">
                      {COMPANY_INFO.address.fullArabic}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Commitment note */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-2.5 text-xs text-zinc-400">
              <ShieldCheck size={16} className="text-[#B89A67] shrink-0" />
              <span>معاينة هندسية واستشارة مجانية لكافة المواقع التجارية</span>
            </div>
          </div>

          {/* Card 2: Interactive Quotation / Lead Form (58%) */}
          <div className="w-full lg:flex-1 p-6 sm:p-8 lg:p-9 rounded-2xl bg-[#111412] border border-white/10 shadow-2xl text-right flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8F6F1] mb-2">
                  طلب مقايسة وعرض سعر مجاني
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  سجل بياناتك وسيتواصل معك مهندسو Creative Media خلال 24 ساعة لمناقشة التفاصيل وترتيب المعاينة.
                </p>
              </div>

              {success ? (
                <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in zoom-in duration-300 my-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-[#F8F6F1]">تم استلام طلبكم بنجاح!</h4>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    شكراً لتواصلكم مع Creative Media. سيتصل بكم أحد مسؤولي المشروعات لمناقشة تفاصيل المعاينة وعرض الأسعار.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppLink(contact1.whatsappDigits, 'مرحباً، أرسلت للتو طلباً عبر الموقع بخصوص مشروع وأود المتابعة.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={15} />
                      <span>متابعة فورية عبر الواتساب</span>
                    </a>
                    <button
                      onClick={() => setSuccess(false)}
                      className="w-full sm:w-auto px-5 py-3 rounded-lg bg-white/5 text-zinc-300 hover:text-white text-xs border border-white/10"
                    >
                      إرسال طلب آخر
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {errorMessage && (
                    <div className="p-3.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        الاسم الكامل <span className="text-[#B89A67]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="الاسم الكريم أو اسم المسؤول"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#171A1B] border border-white/10 focus:border-[#B89A67] rounded-lg text-sm text-[#F8F6F1] placeholder-zinc-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        رقم الهاتف / الواتساب <span className="text-[#B89A67]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="010xxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#171A1B] border border-white/10 focus:border-[#B89A67] rounded-lg text-sm text-[#F8F6F1] placeholder-zinc-500 focus:outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        اسم المنشأة أو المحل (اختياري)
                      </label>
                      <input
                        type="text"
                        placeholder="اسم الشركة أو المتجر التجاري"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#171A1B] border border-white/10 focus:border-[#B89A67] rounded-lg text-sm text-[#F8F6F1] placeholder-zinc-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        البريد الإلكتروني (اختياري)
                      </label>
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#171A1B] border border-white/10 focus:border-[#B89A67] rounded-lg text-sm text-[#F8F6F1] placeholder-zinc-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      التخصص أو الخدمة المطلوبة
                    </label>
                    <select
                      value={formData.service_type}
                      onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                      className="w-full px-4 py-3 bg-[#171A1B] border border-white/10 focus:border-[#B89A67] rounded-lg text-sm text-[#F8F6F1] focus:outline-none transition-all"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#111412] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Notes / Details */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      تفاصيل المشروع (الموقع، المقاسات التقريبية، متطلبات خاصة)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="وضح المدينة، المقاسات التقريبية، وأي تفاصيل ترغب بتنفيذها..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 bg-[#171A1B] border border-white/10 focus:border-[#B89A67] rounded-lg text-sm text-[#F8F6F1] placeholder-zinc-500 focus:outline-none transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      id="btn-submit-lead"
                      className="w-full py-4 px-6 rounded-xl font-bold text-sm text-[#111412] bg-[#B89A67] hover:bg-[#D4B98B] shadow-md disabled:opacity-50 flex items-center justify-center gap-2.5 transition-all transform active:scale-98 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>جارٍ إرسال طلبكم...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>إرسال طلب المقايسة للمهندس المختص</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
