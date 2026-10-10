'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckSquare, Lock } from 'lucide-react';
import { toast } from '@/components/ui/Toast';

export default function PortalContractPage() {
  const params = useParams();
  const contractId = params.contractId as string;
  const { contracts, loading, sendContractOTP, verifyContractOTP, confirmContract, updateContract } = useApp();
  
  const contract = contracts.find(c => c.id === contractId);
  const [agreed, setAgreed] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Simulate marking as viewed on load
  useEffect(() => {
    if (contract && contract.status === 'sent') {
      updateContract(contract.id, { status: 'viewed', viewedAt: new Date().toISOString() });
    }
  }, [contract, updateContract]);

  if (loading) {
    return <div className="p-12 text-center text-zinc-400">جاري تحميل العقد...</div>;
  }

  if (!contract) {
    return <div className="p-12 text-center text-zinc-400">لم يتم العثور على العقد</div>;
  }

  const handleRequestOTP = async () => {
    if (!agreed) return;
    setIsSending(true);
    await sendContractOTP(contract.id, contract.customerInfo.phone);
    setIsSending(false);
    setShowOTP(true);
    updateContract(contract.id, { status: 'pending_confirmation' });
    toast('success', `تم إرسال رمز التحقق إلى الرقم ${contract.customerInfo.phone}`);
  };

  const handleVerifyOTP = async () => {
    setIsVerifying(true);
    const isValid = await verifyContractOTP(contract.id, contract.customerInfo.phone, otpCode);
    setIsVerifying(false);
    
    if (isValid) {
      // Create deterministic-looking hash for demo
      const hash = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
      confirmContract(contract.id, contract.customerInfo.phone, hash);
      toast('success', 'تم تأكيد العقد بنجاح!');
      setShowOTP(false);
    } else {
      toast('error', 'الرمز غير صحيح، حاول مرة أخرى. (جرب 123456)');
    }
  };

  const isConfirmed = contract.status === 'confirmed';

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Main Contract Document */}
        <Card className="p-8 md:p-12 bg-zinc-900 border-white/10 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-white/10 pb-8">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl font-bold text-white mb-2">Creative Media</h1>
              <p className="text-xl text-brand-400">عقد اتفاق وتنفيذ أعمال</p>
            </div>
            <div className="text-right">
              <p className="text-zinc-300 font-medium text-lg mb-1">{contract.contractNumber}</p>
              <p className="text-sm text-zinc-500">تاريخ: {new Date(contract.createdAt).toLocaleDateString('ar-EG')}</p>
              <p className="text-sm text-zinc-500 mt-2">المشروع: {contract.projectInfo.name}</p>
            </div>
          </div>
          
          <div className="space-y-8 text-zinc-300 leading-relaxed text-lg">
            <p>
              إنه في يوم الموافق {new Date(contract.createdAt).toLocaleDateString('ar-EG')}، تم الاتفاق بين كل من:
            </p>
            
            <div className="space-y-4 pr-4 border-r-2 border-brand-500/50">
              <div>
                <span className="font-bold text-white">الطرف الأول (المنفذ): </span>
                شركة Creative Media
              </div>
              <div>
                <span className="font-bold text-white">الطرف الثاني (العميل): </span>
                {contract.customerInfo.name} ({contract.customerInfo.company})، هاتف: <span dir="ltr">{contract.customerInfo.phone}</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-white/10 pb-2">1. بيانات المشروع ونطاق العمل</h3>
            <p className="pr-4">{contract.projectInfo.description}</p>
            <p className="pr-4 mt-2">موقع التنفيذ: {contract.projectInfo.location}</p>
            
            <h3 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-white/10 pb-2">2. القيمة المالية وطريقة الدفع</h3>
            <div className="pr-4 space-y-4">
              <p className="text-xl">إجمالي القيمة: <span className="font-bold text-brand-400" dir="ltr">{contract.financialTerms.totalAmount.toLocaleString('en-US')} ج.م</span> (شامل الضريبة)</p>
              <div className="bg-white/5 rounded-xl p-6 mt-4">
                <table className="w-full text-base">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-400">
                      <th className="text-right pb-3 font-medium">الدفعة</th>
                      <th className="text-left pb-3 font-medium">القيمة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contract.financialTerms.paymentSchedule.map((ps) => (
                      <tr key={ps.id} className="border-b border-white/5 last:border-0">
                        <td className="py-3">{ps.description}</td>
                        <td className="py-3 text-left font-bold text-white" dir="ltr">{ps.amount.toLocaleString('en-US')} ج.م</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-white/10 pb-2">3. شروط العقد</h3>
            <div className="pr-4 space-y-6">
              {contract.terms.map((term, i) => (
                <div key={term.id}>
                  <h4 className="font-bold text-white mb-2">{3 + i + 1}. {term.title}</h4>
                  <p className="text-base text-zinc-400">{term.content}</p>
                </div>
              ))}
            </div>
            
          </div>
        </Card>

        {/* Action / Confirmation Area */}
        {isConfirmed ? (
          <Card className="p-8 bg-emerald-950/30 border-emerald-500/30 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare size={32} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">تم تأكيد العقد بنجاح</h2>
            <p className="text-emerald-400 mb-6">لقد تم توقيع العقد إلكترونياً من قبلكم.</p>
            <div className="inline-block text-right bg-black/30 p-4 rounded-lg border border-emerald-500/20">
              <p className="text-sm text-zinc-400">رقم الهاتف: <span dir="ltr">{contract.confirmedPhone}</span></p>
              <p className="text-sm text-zinc-400 mt-1">تاريخ التأكيد: {new Date(contract.confirmedAt!).toLocaleString('ar-EG')}</p>
              <p className="text-xs text-zinc-500 mt-2 font-mono">بصمة العقد: {contract.contentHash?.substring(0, 32)}...</p>
            </div>
          </Card>
        ) : (
          <Card className="p-6 bg-zinc-900 border-white/10">
            {!showOTP ? (
              <div className="space-y-6">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      checked={agreed}
                      onChange={e => setAgreed(e.target.checked)}
                    />
                    <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${agreed ? 'bg-brand-500 border-brand-500' : 'border-zinc-500 group-hover:border-zinc-400'}`}>
                      {agreed && <CheckSquare size={16} className="text-white" />}
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white mb-1">لقد قرأت جميع بنود العقد وأوافق عليها.</p>
                    <p className="text-sm text-zinc-400">بموافقتك على هذا العقد، فإنه يعتبر ملزماً قانونياً لكلا الطرفين.</p>
                  </div>
                </label>
                
                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <Button 
                    size="lg" 
                    className="w-full md:w-auto bg-brand-600 hover:bg-brand-500 text-lg px-8"
                    disabled={!agreed || isSending}
                    onClick={handleRequestOTP}
                  >
                    {isSending ? 'جاري إرسال الرمز...' : 'تأكيد العقد'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-md mx-auto text-center py-6">
                <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock size={32} className="text-brand-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">تأكيد العقد</h2>
                <p className="text-zinc-400">
                  تم إرسال رمز تحقق إلى رقم هاتفك المسجل:
                  <br/>
                  <span className="font-bold text-white mt-2 inline-block" dir="ltr">{contract.customerInfo.phone}</span>
                </p>
                <div className="pt-4">
                  <input
                    type="text"
                    dir="ltr"
                    maxLength={6}
                    placeholder="_ _ _ _ _ _"
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center text-3xl tracking-[1em] bg-zinc-950 border border-white/10 rounded-xl py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                  <p className="text-xs text-brand-400/50 mt-2 text-right">ملاحظة للتطوير: الرمز هو 123456</p>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button 
                    variant="secondary" 
                    className="flex-1"
                    onClick={() => setShowOTP(false)}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    className="flex-1 bg-brand-600 hover:bg-brand-500"
                    disabled={otpCode.length !== 6 || isVerifying}
                    onClick={handleVerifyOTP}
                  >
                    {isVerifying ? 'جاري التحقق...' : 'تأكيد'}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
