'use client';

import Link from 'next/link';
import { COMPANY_INFO, getTelLink, getWhatsAppLink } from '@/lib/company-info';
import { LandingContactInfo } from '@/lib/landing/types';
import {
  MessageCircle,
  Phone,
  MapPin,
  Lock,
  ArrowUp,
  Facebook,
  Instagram,
} from 'lucide-react';

interface LandingFooterProps {
  contact?: LandingContactInfo;
}

export function LandingFooter({ contact }: LandingFooterProps) {
  const contact1 = COMPANY_INFO.contacts.primary;
  const contact2 = COMPANY_INFO.contacts.secondary;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative bg-[#111412] border-t border-white/10 pt-20 pb-14 overflow-hidden text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-14 text-right">
            
            {/* Col 1: Brand Lockup & Purpose */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#B89A67]/40 p-0.5 bg-[#171A1B] shrink-0">
                  <img
                    src="/logos/logo.png"
                    alt={COMPANY_INFO.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div>
                  <span className="text-[#F8F6F1] font-bold text-lg block">
                    {COMPANY_INFO.name}
                  </span>
                  <span className="text-[11px] text-[#B89A67] font-semibold block">
                    عمارة • واجهات • كلادينج • تشطيبات
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                شركة متخصصة في تصميم وتنفيذ واجهات الكلادينج (ACP)، التشطيبات المعمارية والديكور الداخلي، وواجهات المتاجر التجارية بأعلى معايير الإتقان.
              </p>

              <div className="flex items-start gap-2 pt-2 text-xs text-zinc-300">
                <MapPin size={15} className="text-[#B89A67] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address.fullArabic}</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h4 className="text-sm font-bold text-[#F8F6F1] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A67]" />
                أقسام الموقع
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#hero" className="hover:text-[#B89A67] transition-colors">
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#B89A67] transition-colors">
                    عن الشركة
                  </a>
                </li>
                <li>
                  <a href="#expertise" className="hover:text-[#B89A67] transition-colors">
                    تخصصاتنا المعمارية
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-[#B89A67] transition-colors">
                    معرض المشاريع
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-[#B89A67] transition-colors">
                    مسار العمل والتنفيذ
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#B89A67] transition-colors">
                    طلب عرض سعر
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Services Breakdown */}
            <div>
              <h4 className="text-sm font-bold text-[#F8F6F1] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A67]" />
                التخصصات الرئيسية
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li className="hover:text-zinc-200 transition-colors">الكلادينج والواجهات المعمارية (ACP)</li>
                <li className="hover:text-zinc-200 transition-colors">التشطيبات والديكور الداخلي (Fit-Out)</li>
                <li className="hover:text-zinc-200 transition-colors">واجهات المحلات والمعارض التجارية</li>
                <li className="hover:text-zinc-200 transition-colors">حروف بارزة ويافطات مضيئة 3D</li>
                <li className="hover:text-zinc-200 transition-colors">ديكورات وتشكيلات CNC المعمارية</li>
              </ul>
            </div>

            {/* Col 4: Verified Contacts & Admin Access */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#F8F6F1] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A67]" />
                أرقام التواصل الرسمية
              </h4>
              
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[11px] text-zinc-500 block">{contact1.name} ({contact1.role}):</span>
                  <a
                    href={getTelLink(contact1.phoneInternational)}
                    className="inline-flex items-center gap-1.5 text-zinc-200 hover:text-[#B89A67] font-mono font-bold mt-0.5"
                  >
                    <Phone size={13} className="text-[#B89A67]" />
                    <span>{contact1.phoneRaw}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-500 block">{contact2.name} ({contact2.role}):</span>
                  <a
                    href={getTelLink(contact2.phoneInternational)}
                    className="inline-flex items-center gap-1.5 text-zinc-200 hover:text-[#B89A67] font-mono font-bold mt-0.5"
                  >
                    <Phone size={13} className="text-[#B89A67]" />
                    <span>{contact2.phoneRaw}</span>
                  </a>
                </div>
              </div>

              {/* Verified Social Channels */}
              <div className="pt-2 flex items-center gap-2">
                {COMPANY_INFO.socials.facebook && (
                  <a
                    href={COMPANY_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-[#B89A67] border border-white/5 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={14} />
                  </a>
                )}
                {COMPANY_INFO.socials.instagram && (
                  <a
                    href={COMPANY_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-[#B89A67] border border-white/5 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={14} />
                  </a>
                )}
              </div>

              {/* Admin Portal Gateway */}
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/10 text-xs transition-colors"
                >
                  <Lock size={12} className="text-[#B89A67]" />
                  <span>دخول الإدارة (Dashboard)</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-zinc-500 text-center sm:text-right">
              جميع الحقوق محفوظة © {new Date().getFullYear()} {COMPANY_INFO.name}. هندسة وتكسية الواجهات والتشطيبات المعمارية.
            </p>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-[#B89A67] border border-white/10 transition-colors cursor-pointer"
            >
              <span>العودة للأعلى</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Direct WhatsApp Pill */}
      <a
        href={getWhatsAppLink(contact1.whatsappDigits, 'مرحباً Creative Media، أود الاستفسار بخصوص مشروع واجهات أو تشطيبات')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="محادثة واتساب مباشرة"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>
        <MessageCircle size={18} className="text-black" />
        <span className="hidden sm:inline">واتساب مباشر ({contact1.name})</span>
      </a>
    </>
  );
}
