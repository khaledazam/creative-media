'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, Save, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { ContractTemplate, ContractTerm } from '@/lib/types';

export default function NewContractPage() {
  const router = useRouter();
  const { addContract, contractTemplates, leads } = useApp();
  
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(contractTemplates[0] || null);
  const [terms, setTerms] = useState<ContractTerm[]>(contractTemplates[0]?.defaultTerms || []);
  
  const [formData, setFormData] = useState({
    contractNumber: `CM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    title: 'عقد تنفيذ أعمال',
    serviceType: 'دعاية وتشطيبات',
    
    // Customer
    customerName: '',
    companyName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    
    // Project
    projectName: '',
    projectDescription: '',
    projectLocation: '',
    
    // Financial
    contractValue: 0,
    downPayment: 0,
    taxRate: 0.14,
    
    // Timeline
    startDate: new Date().toISOString().split('T')[0],
    expectedDeliveryDate: '',
    durationDays: 30,
  });

  const handleSave = () => {
    const totalAmount = formData.contractValue * (1 + formData.taxRate);
    
    addContract({
      contractNumber: formData.contractNumber,
      customerId: 'new-customer', // Mock
      title: formData.title,
      serviceType: formData.serviceType,
      status: 'draft',
      
      customerInfo: {
        name: formData.customerName,
        company: formData.companyName,
        phone: formData.customerPhone,
        email: formData.customerEmail,
        address: formData.customerAddress,
      },
      projectInfo: {
        name: formData.projectName,
        description: formData.projectDescription,
        location: formData.projectLocation,
      },
      financialTerms: {
        contractValue: Number(formData.contractValue),
        downPayment: Number(formData.downPayment),
        taxRate: Number(formData.taxRate),
        totalAmount,
        paymentSchedule: [
          { id: 'ps-1', description: 'دفعة مقدمة', amount: Number(formData.downPayment), dueDate: formData.startDate }
        ],
      },
      timeline: {
        startDate: formData.startDate,
        expectedDeliveryDate: formData.expectedDeliveryDate,
        durationDays: Number(formData.durationDays),
      },
      terms: terms,
      
      contentHash: null,
      sentAt: null,
      viewedAt: null,
      confirmedAt: null,
      confirmedPhone: null,
      verificationMethod: null,
    });
    
    router.push('/contracts');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('/contracts')} className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
          <ArrowRight size={20} />
        </Button>
        <Header
          title="إنشاء عقد جديد"
          subtitle="إعداد عقد جديد للعميل بناءً على عرض السعر."
        />
      </div>

      <Card className="p-6">
        <div className="space-y-8">
          
          {/* 1. Template Selection */}
          <section>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FileText size={18} className="text-brand-400" />
              قالب العقد
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contractTemplates.map(template => (
                <div 
                  key={template.id}
                  onClick={() => { 
                    setSelectedTemplate(template); 
                    setFormData(f => ({ ...f, serviceType: template.serviceType }));
                    setTerms(template.defaultTerms.map(t => ({...t})));
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedTemplate?.id === template.id 
                      ? 'bg-brand-500/5 border-brand-500/30 ring-1 ring-brand-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                      : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1]'
                  }`}
                >
                  <h4 className="font-medium text-white mb-1">{template.name}</h4>
                  <p className="text-sm text-zinc-400">{template.serviceType}</p>
                </div>
              ))}
            </div>
          </section>
          
          <hr className="border-white/[0.05]" />

          {/* 2. Basic Info */}
          <section>
            <h3 className="text-lg font-medium text-white mb-4">المعلومات الأساسية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-200">عنوان العقد</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-200">رقم العقد</label>
                <input 
                  type="text" 
                  value={formData.contractNumber}
                  disabled
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-3 py-2 text-zinc-500 cursor-not-allowed"
                />
              </div>
            </div>
          </section>

          <hr className="border-white/[0.05]" />

          {/* 3. Customer Info */}
          <section>
            <h3 className="text-lg font-medium text-white mb-4">بيانات العميل</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-200">اسم العميل</label>
                <input 
                  type="text" 
                  value={formData.customerName}
                  onChange={e => setFormData({...formData, customerName: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-200">اسم الشركة</label>
                <input 
                  type="text" 
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-200">الهاتف</label>
                <input 
                  type="tel" 
                  dir="ltr"
                  value={formData.customerPhone}
                  onChange={e => setFormData({...formData, customerPhone: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg px-3 py-2 text-white text-right focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-200">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  dir="ltr"
                  value={formData.customerEmail}
                  onChange={e => setFormData({...formData, customerEmail: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg px-3 py-2 text-white text-right focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-zinc-200">العنوان</label>
                <input 
                  type="text" 
                  value={formData.customerAddress}
                  onChange={e => setFormData({...formData, customerAddress: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
            </div>
          </section>

          <hr className="border-white/[0.05]" />

          {/* 4. Project Info */}
          <section>
            <h3 className="text-lg font-medium text-white mb-4">بيانات المشروع</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-200">اسم المشروع</label>
                <input 
                  type="text" 
                  value={formData.projectName}
                  onChange={e => setFormData({...formData, projectName: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-200">موقع التنفيذ</label>
                <input 
                  type="text" 
                  value={formData.projectLocation}
                  onChange={e => setFormData({...formData, projectLocation: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-zinc-200">وصف المشروع / نطاق العمل</label>
                <textarea 
                  rows={3}
                  value={formData.projectDescription}
                  onChange={e => setFormData({...formData, projectDescription: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* 5. Financials & Timeline */}
          <section>
            <h3 className="text-lg font-medium text-white mb-4">البيانات المالية ومدة التنفيذ</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-200">قيمة العقد (قبل الضريبة)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">ج.م</span>
                  <input 
                    type="number" 
                    dir="ltr"
                    value={formData.contractValue || ''}
                    onChange={e => setFormData({...formData, contractValue: Number(e.target.value)})}
                    className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg pl-10 pr-3 py-2 text-white text-right focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-200">الدفعة المقدمة</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">ج.م</span>
                  <input 
                    type="number" 
                    dir="ltr"
                    value={formData.downPayment || ''}
                    onChange={e => setFormData({...formData, downPayment: Number(e.target.value)})}
                    className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg pl-10 pr-3 py-2 text-white text-right focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-200">تاريخ البداية</label>
                <input 
                  type="date" 
                  value={formData.startDate}
                  onChange={e => setFormData({...formData, startDate: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:bg-white/[0.06] focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* 6. Terms Editor */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <FileText size={18} className="text-brand-400" />
                بنود العقد
              </h3>
              <Button 
                variant="secondary" 
                size="sm"
                className="gap-2"
                onClick={() => setTerms([...terms, { id: `term-${Date.now()}`, title: '', content: '' }])}
              >
                <Plus size={16} />
                إضافة بند
              </Button>
            </div>
            <div className="space-y-4">
              {terms.map((term, index) => (
                <div key={term.id} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <input
                      type="text"
                      value={term.title}
                      placeholder="عنوان البند"
                      onChange={e => {
                        const newTerms = [...terms];
                        newTerms[index].title = e.target.value;
                        setTerms(newTerms);
                      }}
                      className="w-full font-medium bg-transparent border-b border-white/[0.1] pb-1 text-white focus:outline-none focus:border-brand-500"
                    />
                    <button 
                      onClick={() => setTerms(terms.filter((_, i) => i !== index))}
                      className="text-red-400 hover:text-red-300 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <textarea
                    value={term.content}
                    placeholder="محتوى البند"
                    onChange={e => {
                      const newTerms = [...terms];
                      newTerms[index].content = e.target.value;
                      setTerms(newTerms);
                    }}
                    className="w-full bg-black/20 border border-white/[0.05] rounded-lg px-3 py-2 text-sm text-zinc-300 min-h-[80px] focus:outline-none focus:border-brand-500/50"
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
            <Button variant="ghost" onClick={() => router.push('/contracts')}>
              إلغاء
            </Button>
            <Button className="gap-2" onClick={handleSave}>
              <Save size={16} />
              حفظ مسودة العقد
            </Button>
          </div>
          
        </div>
      </Card>
    </div>
  );
}
