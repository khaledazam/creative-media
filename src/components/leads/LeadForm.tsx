'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/lib/types';
import { useApp } from '@/lib/store';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/inputs/Select';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { MultiSelect } from '@/components/ui/inputs/MultiSelect';
import { formatPhone } from '@/lib/format-phone';

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead | null;
  onConvertRequested?: (lead: Lead) => void;
}

const sourceOptions = [
  { value: 'referral', label: 'إحالة' },
  { value: 'website', label: 'موقع الشركة' },
  { value: 'social', label: 'تواصل اجتماعي' },
  { value: 'cold_outreach', label: 'تواصل مباشر' },
  { value: 'event', label: 'فعالية' },
  { value: 'network', label: 'شبكة علاقات' },
  { value: 'other', label: 'أخرى' },
];

const statusOptions = [
  { value: 'new', label: 'جديد' },
  { value: 'contacted', label: 'تم التواصل' },
  { value: 'qualified', label: 'تمت المعاينة' },
  { value: 'proposal', label: 'إعداد عرض السعر' },
  { value: 'won', label: 'تم التعاقد' },
  { value: 'lost', label: 'مرفوض' },
];

export function LeadForm({ isOpen, onClose, lead, onConvertRequested }: LeadFormProps) {
  const { team, addLead, updateLead } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [source, setSource] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [memberIds, setMemberIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setName(lead.name);
      setEmail(lead.email);
      setPhone(formatPhone(lead.phone));
      setCompany(lead.company);
      setSource(lead.source);
      setStatus(lead.status);
      setNotes(lead.notes);
      setMemberIds(lead.member_ids || []);
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setSource('other');
      setStatus('new');
      setNotes('');
      setMemberIds([]);
    }
  }, [lead, isOpen]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'الاسم مطلوب';
    if (!source) errs.source = 'المصدر مطلوب';
    if (!status) errs.status = 'الحالة مطلوبة';
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'البريد الإلكتروني غير صحيح';
    }
    const digits = phone.replace(/\D/g, '');
    if (phone.trim() && digits.length > 0 && digits.length < 11) {
      errs.phone = 'رقم الهاتف غير صحيح';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // If editing an existing lead and status changed to "won", redirect to Convert flow
    if (lead && status === 'won' && lead.status !== 'won' && onConvertRequested) {
      // Save any other field changes first (without the won status)
      const leadData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        source: source as Lead['source'],
        status: lead.status,
        notes,
        assigned_to: memberIds.length > 0 ? memberIds[0] : null,
        member_ids: memberIds,
        contact_id: lead.contact_id || null,
      };
      await updateLead(lead.id, leadData);
      onClose();
      onConvertRequested({ ...lead, ...leadData });
      return;
    }

    setSaving(true);
    const leadData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      source: source as Lead['source'],
      status: status as Lead['status'],
      notes,
      assigned_to: memberIds.length > 0 ? memberIds[0] : null,
      member_ids: memberIds,
      contact_id: lead?.contact_id || null,
    };

    if (lead) {
      await updateLead(lead.id, leadData);
    } else {
      await addLead(leadData);
    }

    setSaving(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={lead ? 'تعديل بيانات العميل' : 'عميل جديد'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسم العميل"
            required
            error={errors.name}
          />
          <Input
            label="الشركة (اختياري)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="اسم الشركة"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="البريد الإلكتروني (اختياري)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            error={errors.email}
            dir="ltr"
          />
          <Input
            label="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="010 0000 0000"
            error={errors.phone}
            dir="ltr"
          />
        </div>

        {lead && (
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="المصدر"
              value={source}
              onChange={(value) => setSource(value)}
              options={sourceOptions}
              placeholder="اختر المصدر..."
              error={errors.source}
            />
            <Select
              label="الحالة"
              value={status}
              onChange={(value) => setStatus(value)}
              options={statusOptions}
              placeholder="اختر الحالة..."
              error={errors.status}
            />
          </div>
        )}

        <MultiSelect
          label="أعضاء الفريق"
          options={team.map((m) => ({ value: m.id, label: m.name }))}
          value={memberIds}
          onChange={setMemberIds}
          placeholder="اختر أعضاء الفريق..."
          selectAll
          searchable={team.length > 4}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-300">ملاحظات</label>
          <RichTextEditor
            value={notes}
            onChange={setNotes}
            placeholder="ملاحظات إضافية..."
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'جاري الحفظ...' : lead ? 'حفظ التعديلات' : 'إضافة عميل'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
