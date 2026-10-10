'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Send, CheckCircle2, FileText, History, CheckSquare, Plus, Search, Clock } from 'lucide-react';
import { Contract } from '@/lib/types';
import { toast } from '@/components/ui/Toast';

export default function ContractDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contractId = params.id as string;
  const { contracts, updateContract, createContractVersion, sendContractOTP } = useApp();
  
  const contract = contracts.find(c => c.id === contractId);
  const [isSending, setIsSending] = useState(false);

  if (!contract) {
    return (
      <div className="p-8 text-center text-zinc-400">
        العقد غير موجود
      </div>
    );
  }

  const handleSendContract = async () => {
    setIsSending(true);
    
    try {
      const contractUrl = `${window.location.origin}/portal/contracts/${contract.id}`;
      const message = `*Creative Media*\n\nمرحباً ${contract.customerInfo.name}،\n\nتم إصدار عقد جديد خاص بمشروعك (${contract.projectInfo.name}).\n\nيرجى مراجعة العقد وتأكيده عبر الرابط التالي:\n${contractUrl}\n\nشكراً لثقتكم بنا!`;
      
      const res = await fetch('http://localhost:3001/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: contract.customerInfo.phone,
          message: message
        })
      });

      if (res.ok) {
        updateContract(contract.id, { status: 'sent', sentAt: new Date().toISOString() });
        toast('success', 'تم إرسال العقد للعميل على الواتساب بنجاح');
      } else {
        toast('error', 'حدث خطأ أثناء إرسال رسالة الواتساب');
      }
    } catch (e) {
      console.error(e);
      toast('error', 'فشل الاتصال بخادم الواتساب (تأكد من تشغيل node whatsapp-server.js)');
    }
    
    setIsSending(false);
  };
  
  const handleCreateNewVersion = () => {
    createContractVersion(contract.id, { status: 'draft' });
  };
  
  const handleCreateProject = () => {
    // In a real implementation this would prepopulate a project form
    router.push('/projects?new=true&contractId=' + contract.id);
  };

  const isConfirmed = contract.status === 'confirmed';
  const isReadOnly = isConfirmed || contract.status === 'sent' || contract.status === 'pending_confirmation';

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('/contracts')} className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
          <ArrowRight size={20} />
        </Button>
        <Header
          title={`العقد: ${contract.contractNumber}`}
          subtitle={contract.title}
        />
        
        <div className="mr-auto flex gap-3">
          {contract.status === 'draft' && (
            <Button onClick={handleSendContract} disabled={isSending} className="gap-2 bg-brand-600 hover:bg-brand-500">
              <Send size={16} />
              {isSending ? 'جاري الإرسال...' : 'إرسال للعميل'}
            </Button>
          )}
          {isConfirmed && (
            <Button onClick={handleCreateProject} className="gap-2 bg-emerald-600 hover:bg-emerald-500">
              <Plus size={16} />
              إنشاء المشروع
            </Button>
          )}
          {isReadOnly && !isConfirmed && (
            <Button onClick={handleCreateNewVersion} variant="secondary" className="gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
              <FileText size={16} />
              إنشاء إصدار جديد للتعديل
            </Button>
          )}
        </div>
      </div>
      
      {/* Contract Version & Status Banner */}
      <div className="flex gap-4">
        <Card className="flex-1 p-4 bg-brand-500/10 border-brand-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm text-zinc-400">الإصدار الحالي</p>
              <p className="text-lg font-bold text-white">V{contract.version}</p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm text-zinc-400">الحالة</p>
            <p className="text-lg font-medium text-white">{
              contract.status === 'confirmed' ? 'تم التأكيد' :
              contract.status === 'sent' ? 'تم الإرسال (بانتظار المشاهدة)' :
              contract.status === 'viewed' ? 'تمت المشاهدة' :
              contract.status === 'pending_confirmation' ? 'بانتظار رمز التحقق' :
              contract.status === 'draft' ? 'مسودة' : contract.status
            }</p>
          </div>
        </Card>
        
        {isConfirmed && (
          <Card className="flex-1 p-4 bg-emerald-500/10 border-emerald-500/20 flex items-center gap-4">
            <CheckCircle2 size={32} className="text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-emerald-400">العقد مؤكد قانونياً</p>
              <p className="text-xs text-zinc-400 mt-1">بواسطة رمز التحقق (OTP) على الرقم: <span dir="ltr">{contract.confirmedPhone}</span></p>
              <p className="text-[10px] text-zinc-500 mt-1 font-mono">{contract.contentHash || 'HASH_PLACEHOLDER'}</p>
            </div>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Contract Preview */}
        <div className="lg:col-span-2">
          <Card className="p-8 bg-zinc-950 border-white/10 shadow-2xl relative overflow-hidden print:shadow-none print:border-none">
            {/* Watermark for draft */}
            {contract.status === 'draft' && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] rotate-[-45deg] select-none">
                <span className="text-8xl font-black text-white">مسودة</span>
              </div>
            )}
            
            {/* Header */}
            <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Creative Media</h1>
                <p className="text-zinc-400">عقد اتفاق وتنفيذ أعمال</p>
              </div>
              <div className="text-left">
                <p className="text-zinc-300 font-medium text-lg mb-1">{contract.contractNumber}</p>
                <p className="text-sm text-zinc-500">الإصدار: {contract.version}</p>
                <p className="text-sm text-zinc-500">{new Date(contract.createdAt).toLocaleDateString('ar-EG')}</p>
              </div>
            </div>
            
            <div className="space-y-8 text-zinc-300 leading-relaxed">
              {/* Introduction */}
              <p>
                إنه في يوم الموافق {new Date(contract.createdAt).toLocaleDateString('ar-EG')}، تم الاتفاق بين كل من:
              </p>
              
              <div className="space-y-4 pr-4 border-r-2 border-brand-500/50">
                <div>
                  <span className="font-bold text-white">الطرف الأول (المنفذ): </span>
                  شركة Creative Media، ويمثلها السيد/ ________________
                </div>
                <div>
                  <span className="font-bold text-white">الطرف الثاني (العميل): </span>
                  {contract.customerInfo.name} ({contract.customerInfo.company})، هاتف: <span dir="ltr">{contract.customerInfo.phone}</span>، العنوان: {contract.customerInfo.address}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mt-8 mb-4">1. بيانات المشروع ونطاق العمل</h3>
              <p className="pr-4">{contract.projectInfo.name}</p>
              <p className="pr-4 text-zinc-400">{contract.projectInfo.description}</p>
              
              <h3 className="text-xl font-bold text-white mt-8 mb-4">2. القيمة المالية وطريقة الدفع</h3>
              <div className="pr-4 space-y-2">
                <p>إجمالي قيمة العقد: <span className="font-bold text-white" dir="ltr">{contract.financialTerms.totalAmount.toLocaleString('en-US')} ج.م</span></p>
                <div className="bg-white/5 rounded-lg p-4 mt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-400">
                        <th className="text-right pb-2">الدفعة</th>
                        <th className="text-left pb-2">القيمة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contract.financialTerms.paymentSchedule.map((ps, i) => (
                        <tr key={ps.id} className="border-b border-white/5 last:border-0">
                          <td className="py-2">{ps.description}</td>
                          <td className="py-2 text-left font-medium" dir="ltr">{ps.amount.toLocaleString('en-US')} ج.م</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">3. شروط العقد</h3>
              <div className="pr-4 space-y-4">
                {contract.terms.map((term, i) => (
                  <div key={term.id}>
                    <h4 className="font-bold text-zinc-200 mb-1">{3 + i + 1}. {term.title}</h4>
                    <p className="text-sm text-zinc-400">{term.content}</p>
                  </div>
                ))}
              </div>
              
              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 mt-16 pt-8 border-t border-white/10">
                <div className="text-center">
                  <p className="font-bold text-white mb-8">الطرف الأول (Creative Media)</p>
                  <p className="text-zinc-500">________________________</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-white mb-8">الطرف الثاني (العميل)</p>
                  {isConfirmed ? (
                    <div className="flex flex-col items-center">
                      <div className="text-emerald-400 flex items-center justify-center gap-2 mb-2">
                        <CheckSquare size={16} />
                        تم الاعتماد إلكترونياً
                      </div>
                      <p className="text-xs text-zinc-500 font-mono">{contract.contentHash?.substring(0, 16)}...</p>
                    </div>
                  ) : (
                    <p className="text-zinc-500">________________________</p>
                  )}
                </div>
              </div>

            </div>
          </Card>
        </div>
        
        {/* Sidebar: Activity Timeline */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
              <History size={18} className="text-zinc-400" />
              سجل نشاط العقد
            </h3>
            
            <div className="relative border-r border-white/10 pr-6 space-y-6">
              {contract.activities.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((activity, i) => {
                const date = new Date(activity.date);
                
                let icon = <div className="w-2 h-2 rounded-full bg-zinc-500" />;
                let color = "text-zinc-400";
                let text = "نشاط غير معروف";
                
                switch(activity.event) {
                  case 'created':
                  case 'version_created':
                    icon = <FileText size={12} className="text-blue-400" />;
                    color = "text-blue-400";
                    text = `تم إنشاء الإصدار ${activity.version}`;
                    break;
                  case 'sent':
                    icon = <Send size={12} className="text-brand-400" />;
                    color = "text-brand-400";
                    text = "تم إرسال العقد للعميل";
                    break;
                  case 'viewed':
                    icon = <Search size={12} className="text-purple-400" />;
                    color = "text-purple-400";
                    text = "العميل قام بفتح العقد";
                    break;
                  case 'otp_requested':
                    icon = <Clock size={12} className="text-amber-400" />;
                    color = "text-amber-400";
                    text = "العميل طلب رمز التحقق (OTP)";
                    break;
                  case 'confirmed':
                    icon = <CheckCircle2 size={12} className="text-emerald-400" />;
                    color = "text-emerald-400";
                    text = "تم توقيع وتأكيد العقد";
                    break;
                }
                
                return (
                  <div key={activity.id} className="relative">
                    <div className="absolute -right-[33px] top-1 w-6 h-6 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                      {icon}
                    </div>
                    <p className={`text-sm font-medium ${color}`}>{text}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-zinc-500">{activity.actorName}</p>
                      <p className="text-[10px] text-zinc-600" dir="ltr">{date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          
          {contract.status === 'sent' && (
            <div className="mt-6 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
              <p className="text-sm text-blue-400 font-medium mb-2">رابط العميل (للتجربة)</p>
              <p className="text-xs text-zinc-400 mb-3">يمكنك فتح هذا الرابط لتجربة ما يراه العميل.</p>
              <Button onClick={() => window.open(`/portal/contracts/${contract.id}`, '_blank')} variant="secondary" className="w-full text-xs" size="sm">
                فتح صفحة العميل
              </Button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
