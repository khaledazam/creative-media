'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { COMPANY_INFO, getTelLink, getWhatsAppLink } from '@/lib/company-info';
import { createClient } from '@/lib/supabase/client';
import { Phone, MessageCircle, LogIn, LayoutDashboard, Menu, X, ArrowUpRight } from 'lucide-react';

interface LandingNavbarProps {
  phone?: string;
  whatsapp?: string;
}

export function LandingNavbar({ phone, whatsapp }: LandingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const primaryContact = COMPANY_INFO.contacts.primary;
  const activePhone = phone || primaryContact.phoneInternational;
  const activeWhatsapp = whatsapp || primaryContact.whatsappDigits;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        setUser(data.user || null);
      } catch {
        setUser(null);
      }
    }
    checkAuth();
  }, []);

  const navLinks = [
    { href: '#hero', label: 'الرئيسية' },
    { href: '#about', label: 'عن الشركة' },
    { href: '#expertise', label: 'تخصصاتنا' },
    { href: '#portfolio', label: 'سابقة الأعمال' },
    { href: '#neon', label: 'كتالوج النيون' },
    { href: '#process', label: 'مسار العمل' },
    { href: '#why-us', label: 'معاييرنا' },
    { href: '#contact', label: 'اتصل بنا' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#111412]/92 backdrop-blur-xl border-b border-[#B89A67]/20 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.7)]'
          : 'bg-gradient-to-b from-[#111412]/90 via-[#111412]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Identity / Logo */}
          <Link href="/" className="flex items-center gap-3.5 shrink-0 group">
            <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-[#B89A67]/35 p-0.5 bg-[#171A1B] shadow-md group-hover:border-[#B89A67] transition-all">
              <img
                src="/logos/logo.png"
                alt={COMPANY_INFO.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#F8F6F1] font-bold text-lg tracking-tight group-hover:text-[#B89A67] transition-colors flex items-center gap-2">
                {COMPANY_INFO.name}
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A67]" />
              </span>
              <span className="text-[10px] text-zinc-400 font-medium tracking-wide">
                واجهات معمارية • كلادينج • تشطيبات
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium rounded-full text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-all whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Direct Phone Call */}
            <a
              href={getTelLink(activePhone)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#F8F6F1] hover:text-[#B89A67] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#B89A67]/40 rounded-lg transition-all"
            >
              <Phone size={13} className="text-[#B89A67]" />
              <span className="font-mono text-xs">{primaryContact.phoneRaw}</span>
            </a>

            {/* Request Quote Primary Action */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#111412] bg-[#B89A67] hover:bg-[#D4B98B] rounded-lg shadow-sm transition-all hover:scale-102 active:scale-98"
            >
              <span>طلب عرض سعر</span>
              <ArrowUpRight size={13} />
            </a>

            {/* User Dashboard / Portal Login */}
            {user ? (
              <Link
                href="/dashboard"
                id="btn-goto-dashboard"
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-zinc-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 rounded-lg transition-all"
              >
                <LayoutDashboard size={13} className="text-[#B89A67]" />
                <span>لوحة التحكم</span>
              </Link>
            ) : (
              <Link
                href="/login"
                id="btn-goto-login"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                title="بوابة دخول الإدارة"
              >
                <LogIn size={13} />
                <span>دخول</span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/10"
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111412]/98 border-b border-[#B89A67]/25 px-6 py-6 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-200 hover:text-[#B89A67] hover:bg-white/[0.04] py-2.5 px-3.5 rounded-lg border-b border-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={getTelLink(activePhone)}
                className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-[#F8F6F1] bg-white/[0.05] border border-white/15 rounded-lg"
              >
                <Phone size={14} className="text-[#B89A67]" />
                <span>اتصال مباشر: {primaryContact.phoneRaw} ({primaryContact.name})</span>
              </a>

              <a
                href={getWhatsAppLink(activeWhatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 rounded-lg"
              >
                <MessageCircle size={15} />
                <span>واتساب فوري ({primaryContact.name})</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-[#111412] bg-[#B89A67] rounded-lg shadow-md"
              >
                <span>طلب مقايسة وعرض سعر</span>
              </a>

              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-zinc-300 bg-white/5 border border-white/10 rounded-lg"
                >
                  <LayoutDashboard size={14} />
                  <span>لوحة التحكم</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-zinc-400 hover:text-white"
                >
                  <LogIn size={14} />
                  <span>دخول الإدارة</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
