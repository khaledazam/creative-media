'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import { useApp } from '@/lib/store';

import { Quotation, QuotationStatus, QuotationItem } from '@/lib/types';
interface QuotationFormProps {
  isOpen: boolean;
  onClose: () => void;
  quotation?: Quotation | null;
  onSave?: (quotation: Quotation) => void;
}

const UNITS = ['قطعة', 'متر', 'متر مربع', 'متر طولي', 'كيلو', 'ساعة', 'يوم', 'خدمة', 'أخرى'];

export function QuotationForm({ isOpen, onClose, quotation, onSave }: QuotationFormProps) {
  const { contacts, projects } = useApp();
  const [items, setItems] = useState<QuotationItem[]>([]);
  
  const [formData, setFormData] = useState({
    contactId: '',
    projectId: '',
    serviceType: '',
    validUntil: '',
    notes: ''
  });

  useEffect(() => {
    if (quotation) {
      setItems(quotation.items || []);
      setFormData({
        contactId: quotation.contactId || '',
        projectId: quotation.projectId || '',
        serviceType: quotation.serviceType || '',
        validUntil: quotation.validUntil ? quotation.validUntil.split('T')[0] : '',
        notes: quotation.notes || ''
      });
    } else {
      setItems([]);
      setFormData({
        contactId: '',
        projectId: '',
        serviceType: '',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: ''
      });
    }
  }, [quotation, isOpen]);
  
  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice) - item.discount, 0);
  const discount = 0;
  const tax = subtotal * 0.14; 
  const total = subtotal - discount + tax;

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: '', quantity: 1, unit: 'قطعة', unitPrice: 0, discount: 0, total: 0 }
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuotationItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        updated.total = (updated.quantity * updated.unitPrice) - updated.discount;
        return updated;
      }
      return item;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      const newQuotation: Quotation = {
        id: quotation ? quotation.id : `quote-${Date.now()}`,
        quotationNumber: quotation ? quotation.quotationNumber : `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        contactId: formData.contactId,
        projectId: formData.projectId || null,
        serviceType: formData.serviceType,
        status: quotation ? quotation.status : 'مسودة',
        subtotal,
        discount,
        tax,
        total,
        validUntil: new Date(formData.validUntil).toISOString(),
        notes: formData.notes,
        createdAt: quotation ? quotation.createdAt : new Date().toISOString(),
        items: items
      };
      onSave(newQuotation);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={quotation ? 'تعديل عرض السعر' : 'إنشاء عرض سعر'} size="xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-300">العميل</label>
            <select 
              required
              value={formData.contactId}
              onChange={e => setFormData({...formData, contactId: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/[0.12] rounded-lg px-3 py-2 text-white">
              <option value="">اختر العميل</option>
              {contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-300">المشروع</label>
            <select 
              value={formData.projectId}
              onChange={e => setFormData({...formData, projectId: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/[0.12] rounded-lg px-3 py-2 text-white">
              <option value="">بدون مشروع</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-300">نوع الخدمة</label>
            <input 
              type="text" 
              required
              value={formData.serviceType}
              onChange={e => setFormData({...formData, serviceType: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/[0.12] rounded-lg px-3 py-2 text-white" 
              placeholder="مثال: تشطيبات داخلية" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-300">تاريخ الانتهاء</label>
            <input 
              type="date" 
              required
              value={formData.validUntil}
              onChange={e => setFormData({...formData, validUntil: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/[0.12] rounded-lg px-3 py-2 text-white" 
            />
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">البنود</h3>
            <Button type="button" variant="secondary" size="sm" onClick={handleAddItem} icon={<Plus size={14} />}>
              إضافة بند
            </Button>
          </div>
          <div className="border border-white/[0.06] rounded-xl overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-white/[0.03] text-zinc-400">
                <tr>
                  <th className="px-4 py-2 font-medium">الوصف</th>
                  <th className="px-4 py-2 font-medium">الكمية</th>
                  <th className="px-4 py-2 font-medium">الوحدة</th>
                  <th className="px-4 py-2 font-medium">سعر الوحدة</th>
                  <th className="px-4 py-2 font-medium">الخصم</th>
                  <th className="px-4 py-2 font-medium">الإجمالي</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="p-2">
                      <input type="text" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} required className="w-full bg-transparent border border-white/[0.12] rounded px-2 py-1 text-white focus:border-brand-500" />
                    </td>
                    <td className="p-2 w-20">
                      <input type="number" value={item.quantity || ''} onChange={e => updateItem(item.id, 'quantity', Number(e.target.value))} required min="1" className="w-full bg-transparent border border-white/[0.12] rounded px-2 py-1 text-white focus:border-brand-500" />
                    </td>
                    <td className="p-2 w-28">
                      <select value={item.unit} onChange={e => updateItem(item.id, 'unit', e.target.value)} className="w-full bg-zinc-800 border border-white/[0.12] rounded px-2 py-1 text-white focus:border-brand-500">
                        {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </td>
                    <td className="p-2 w-28">
                      <input type="number" value={item.unitPrice || ''} onChange={e => updateItem(item.id, 'unitPrice', Number(e.target.value))} required min="0" className="w-full bg-transparent border border-white/[0.12] rounded px-2 py-1 text-white focus:border-brand-500" />
                    </td>
                    <td className="p-2 w-24">
                      <input type="number" value={item.discount || ''} onChange={e => updateItem(item.id, 'discount', Number(e.target.value))} min="0" className="w-full bg-transparent border border-white/[0.12] rounded px-2 py-1 text-white focus:border-brand-500" />
                    </td>
                    <td className="p-2 text-zinc-300 w-24">{((item.quantity * item.unitPrice) - item.discount).toFixed(2)}</td>
                    <td className="p-2 w-10 text-center">
                      <button type="button" onClick={() => handleRemoveItem(item.id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-zinc-500">لا توجد بنود مضافة</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals & Notes */}
        <div className="flex flex-col md:flex-row justify-between gap-6 pt-4 border-t border-white/[0.06]">
          <div className="flex-1 space-y-1">
            <label className="text-sm font-medium text-zinc-300">ملاحظات</label>
            <textarea 
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/[0.12] rounded-lg px-3 py-2 text-white h-24 focus:border-brand-500 focus:outline-none" 
              placeholder="شروط أو ملاحظات العرض...">
            </textarea>
          </div>
          
          <div className="w-full md:w-64 space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/[0.06]">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">الإجمالي الفرعي</span>
              <span className="text-white font-medium">{subtotal.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">الخصم</span>
              <span className="text-white font-medium">{discount.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">الضريبة (14%)</span>
              <span className="text-white font-medium">{tax.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-3 border-t border-white/[0.12]">
              <span className="text-zinc-300">الإجمالي النهائي</span>
              <span className="text-brand-400">{total.toFixed(2)} ج.م</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button variant="secondary" onClick={onClose} type="button">إلغاء</Button>
          <Button type="submit">حفظ العرض</Button>
        </div>
      </form>
    </Modal>
  );
}
