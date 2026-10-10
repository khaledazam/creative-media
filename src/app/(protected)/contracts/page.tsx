'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Search, FileText, ChevronLeft, CheckCircle2, Send, Clock, XCircle, AlertCircle } from 'lucide-react';

export default function ContractsPage() {
  const { contracts, projects, leads, contacts } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContracts = contracts.filter(contract => 
    contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"><FileText size={12} /> مسودة</span>;
      case 'ready': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"><CheckCircle2 size={12} /> جاهز للإرسال</span>;
      case 'sent': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20"><Send size={12} /> تم الإرسال</span>;
      case 'viewed': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20"><Search size={12} /> تمت المشاهدة</span>;
      case 'pending_confirmation': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"><Clock size={12} /> بانتظار التأكيد</span>;
      case 'confirmed': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 size={12} /> تم التأكيد</span>;
      case 'rejected': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"><XCircle size={12} /> مرفوض</span>;
      case 'completed': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20"><CheckCircle2 size={12} /> منتهي</span>;
      case 'cancelled': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20"><XCircle size={12} /> ملغي</span>;
      default: return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <Header
        title="العقود"
        subtitle="إدارة جميع عقود التنفيذ والخدمات الخاصة بـ Creative Media."
        actions={
          <Link href="/contracts/new">
            <Button className="gap-2">
              <Plus size={16} />
              عقد جديد
            </Button>
          </Link>
        }
      />

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="البحث برقم العقد، العميل، أو العنوان..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-lg pr-10 pl-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="border-b border-white/5 text-zinc-400">
                <th className="pb-3 px-4 font-medium">رقم العقد</th>
                <th className="pb-3 px-4 font-medium">العميل</th>
                <th className="pb-3 px-4 font-medium">المشروع / العنوان</th>
                <th className="pb-3 px-4 font-medium">الإصدار</th>
                <th className="pb-3 px-4 font-medium">قيمة العقد</th>
                <th className="pb-3 px-4 font-medium">الحالة</th>
                <th className="pb-3 px-4 font-medium">تاريخ الإنشاء</th>
                <th className="pb-3 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText size={32} className="mb-4 text-zinc-600" />
                      <p>لم يتم العثور على أي عقود.</p>
                      <Link href="/contracts/new" className="mt-4 text-brand-400 hover:text-brand-300">
                        إنشاء العقد الأول
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContracts.map((contract) => (
                  <tr key={contract.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-4 font-medium text-white">
                      {contract.contractNumber}
                    </td>
                    <td className="py-4 px-4 text-zinc-300">
                      {contract.customerInfo.company || contract.customerInfo.name}
                    </td>
                    <td className="py-4 px-4 text-zinc-300">
                      <div className="truncate max-w-[200px]" title={contract.title}>
                        {contract.title}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-zinc-400">
                      V{contract.version}
                    </td>
                    <td className="py-4 px-4 font-medium text-brand-400" dir="ltr" style={{ textAlign: 'right' }}>
                      {contract.financialTerms.totalAmount.toLocaleString('en-US')} ج.م
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(contract.status)}
                    </td>
                    <td className="py-4 px-4 text-zinc-400 text-xs">
                      {new Date(contract.createdAt).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="py-4 px-4 text-left">
                      <Link href={`/contracts/${contract.id}`}>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          عرض التفاصيل
                          <ChevronLeft size={14} className="mr-1" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
