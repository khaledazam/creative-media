import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/inputs/Select';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/inputs/Textarea';
import { DateInput } from '@/components/ui/inputs/DateInput';
import { MapPicker } from '@/components/ui/inputs/MapPicker';
import { useApp } from '@/lib/store';
import { SiteVisit, SiteVisitStatus } from '@/lib/types';

interface SiteVisitFormProps {
  isOpen: boolean;
  onClose: () => void;
  visit?: SiteVisit | null;
  onSave: (visit: Partial<SiteVisit>) => void;
}

export function SiteVisitForm({ isOpen, onClose, visit, onSave }: SiteVisitFormProps) {
  const { projects, contacts, team } = useApp();
  
  const [projectId, setProjectId] = useState(visit?.projectId || '');
  const [contactId, setContactId] = useState(visit?.contactId || '');
  const [visitDate, setVisitDate] = useState(visit?.visitDate || '');
  const [location, setLocation] = useState(visit?.location || '');
  const [assigneeId, setAssigneeId] = useState(visit?.assigneeId || '');
  const [status, setStatus] = useState<SiteVisitStatus>(visit?.status || 'مجدولة');
  const [measurements, setMeasurements] = useState(visit?.measurements || '');
  const [notes, setNotes] = useState(visit?.notes || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: visit?.id,
      projectId,
      contactId,
      visitDate,
      location,
      assigneeId,
      status,
      measurements,
      notes,
      photos: visit?.photos || []
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={visit ? 'تعديل المعاينة' : 'جدولة معاينة جديدة'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="المشروع"
            value={projectId}
            onChange={setProjectId}
            options={[
              { value: '', label: 'اختر المشروع' },
              ...projects.map(p => ({ value: p.id, label: p.name }))
            ]}
          />
          <Select
            label="العميل"
            value={contactId}
            onChange={setContactId}
            options={[
              { value: '', label: 'اختر العميل' },
              ...contacts.map(c => ({ value: c.id, label: c.name }))
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DateInput
            label="تاريخ المعاينة"
            value={visitDate}
            onChange={setVisitDate}
          />
          <Select
            label="المهندس / المسؤول الفني"
            value={assigneeId}
            onChange={setAssigneeId}
            options={[
              { value: '', label: 'اختر المسؤول' },
              ...team.map(m => ({ value: m.id, label: m.name }))
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="الحالة"
            value={status}
            onChange={(v) => setStatus(v as SiteVisitStatus)}
            options={[
              { value: 'مجدولة', label: 'مجدولة' },
              { value: 'تمت المعاينة', label: 'تمت المعاينة' },
              { value: 'تم الإلغاء', label: 'تم الإلغاء' },
            ]}
          />
        </div>

        <MapPicker 
          label="الموقع (اختر مكان المعاينة على الخريطة)"
          location={location}
          onChange={setLocation}
        />

        <Textarea
          label="القياسات والأبعاد (كروكي مبدئي)"
          value={measurements}
          onChange={setMeasurements}
          placeholder="سجل أبعاد الغرف أو المساحات..."
          rows={3}
        />

        <Textarea
          label="ملاحظات المعاينة"
          value={notes}
          onChange={setNotes}
          placeholder="سجل أي متطلبات خاصة للعميل أو ملاحظات فنية..."
          rows={3}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>إلغاء</Button>
          <Button type="submit">{visit ? 'حفظ التعديلات' : 'جدولة الزيارة'}</Button>
        </div>
      </form>
    </Modal>
  );
}
