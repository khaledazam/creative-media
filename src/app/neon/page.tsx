'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function NeonCatalogPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#neon');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#07090d] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-[#49d7ff]/10 border border-[#49d7ff]/30 flex items-center justify-center mb-4 animate-pulse">
        <Sparkles className="w-8 h-8 text-[#49d7ff]" />
      </div>
      <h1 className="text-xl font-bold mb-2">جاري نقلك إلى قسم النيون واليافطات المضيئة بالصفحة الرئيسية...</h1>
      <p className="text-xs text-zinc-400 mb-6">تم دمج كتالوج النيون مباشرة في الموقع الرئيسي</p>
      <Link
        href="/#neon"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f4b43f] to-[#ffc85f] text-zinc-950 font-bold text-xs"
      >
        <span>انقر هنا إذا لم يتم التحويل تلقائياً</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
