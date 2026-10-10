'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { RowActionsMenu, type RowAction } from '@/components/ui/RowActionsMenu';
import { QuotationForm } from '@/components/quotations/QuotationForm';
import { Quotation, QuotationStatus } from '@/lib/types';
import { Plus, Edit, Trash2, FileText, Download } from 'lucide-react';
import { useApp } from '@/lib/store';
import { toast } from '@/components/ui/Toast';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useRouter } from 'next/navigation';

const STATUS_COLORS: Record<QuotationStatus, 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'> = {
  'مسودة': 'default',
  'تم الإرسال': 'info',
  'تمت المشاهدة': 'purple',
  'مقبول': 'success',
  'مرفوض': 'danger',
  'منتهي': 'warning',
};

import { mockQuotations } from '@/mock';

export default function QuotationsPage() {
  const router = useRouter();
  const { contacts, contracts } = useApp();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('saoudi_quotations');
      if (stored) {
        setQuotations(JSON.parse(stored));
      } else {
        setQuotations(mockQuotations);
        localStorage.setItem('saoudi_quotations', JSON.stringify(mockQuotations));
      }
    } catch (e) {
      setQuotations(mockQuotations);
    }
  }, []);

  const handleSaveQuotation = (quotation: Quotation) => {
    let updated;
    if (editingQuotation) {
      updated = quotations.map(q => q.id === quotation.id ? quotation : q);
      toast('success', 'تم تحديث عرض السعر بنجاح');
    } else {
      updated = [quotation, ...quotations];
      toast('success', 'تم إنشاء عرض السعر بنجاح');
    }
    setQuotations(updated);
    localStorage.setItem('saoudi_quotations', JSON.stringify(updated));
    setIsFormOpen(false);
    setEditingQuotation(null);
  };

  const handleEdit = (q: Quotation) => {
    setEditingQuotation(q);
    setIsFormOpen(true);
  };

  const handleDelete = () => {
    if (deletingId) {
      const updated = quotations.filter(q => q.id !== deletingId);
      setQuotations(updated);
      localStorage.setItem('saoudi_quotations', JSON.stringify(updated));
      toast('success', 'تم حذف عرض السعر بنجاح');
      setDeletingId(null);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingQuotation(null);
  };

  const buildActions = (q: Quotation): RowAction[] => {
    const hasContract = contracts.some(c => c.quotationId === q.id);
    return [
      { label: 'تعديل', icon: <Edit size={14} />, onClick: () => handleEdit(q) },
      { label: 'تحميل PDF', icon: <Download size={14} />, onClick: () => toast('info', 'جاري إنشاء PDF...') },
      !hasContract ? { label: 'إنشاء عقد', icon: <FileText size={14} />, onClick: () => router.push('/contracts/new') } : null,
      { label: 'حذف', icon: <Trash2 size={14} />, variant: 'danger', onClick: () => setDeletingId(q.id) },
    ].filter(Boolean) as RowAction[];
  };

  const columns: Column<Quotation>[] = [
    {
      key: 'number',
      header: 'رقم العرض',
      width: 'w-[12%]',
      render: (q) => (
        <span className="font-semibold text-white focus:outline-none rounded">
          {q.quotationNumber}
        </span>
      ),
    },
    {
      key: 'customer',
      header: 'العميل',
      width: 'w-[15%]',
      render: (q) => {
        const c = contacts.find(c => c.id === q.contactId) || { name: 'عميل افتراضي ' + q.id };
        return <span className="text-zinc-300">{c.name}</span>;
      },
    },
    {
      key: 'service',
      header: 'الخدمة',
      width: 'w-[15%]',
      render: (q) => <span className="text-zinc-300">{q.serviceType}</span>,
    },
    {
      key: 'total',
      header: 'الإجمالي',
      width: 'w-[12%]',
      render: (q) => <span className="text-zinc-200 font-medium">{q.total.toFixed(2)} ج.م</span>,
    },
    {
      key: 'status',
      header: 'الحالة',
      width: 'w-[12%]',
      render: (q) => <Badge variant={STATUS_COLORS[q.status]}>{q.status}</Badge>,
    },
    {
      key: 'created',
      header: 'تاريخ الإنشاء',
      width: 'w-[12%]',
      render: (q) => <span className="text-sm text-zinc-400">{new Date(q.createdAt).toLocaleDateString('en-GB')}</span>,
    },
    {
      key: 'valid',
      header: 'تاريخ الانتهاء',
      width: 'w-[12%]',
      render: (q) => <span className="text-sm text-zinc-400">{new Date(q.validUntil).toLocaleDateString('en-GB')}</span>,
    },
    {
      key: 'actions',
      header: <span className="sr-only">الإجراءات</span>,
      align: 'right',
      width: 'w-12',
      render: (q: Quotation) => <RowActionsMenu actions={buildActions(q)} label={`إجراءات ${q.quotationNumber}`} />,
    },
  ];

  return (
    <div className="animate-fadeIn min-h-screen">
      <Header
        title="عروض الأسعار"
        subtitle={<span className="hidden sm:inline">{quotations.length} عرض سعر</span>}
        searchPlaceholder="البحث برقم العرض أو العميل..."
        actions={
          <Button onClick={() => setIsFormOpen(true)} icon={<Plus size={16} />}>
            إنشاء عرض سعر
          </Button>
        }
      />

      <div className="p-4 lg:p-6 space-y-4">
        {quotations.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.06] flex items-center justify-center">
              <FileText className="text-zinc-500" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">لا يوجد عروض أسعار بعد</h3>
            <p className="text-zinc-400 mb-4">قم بإنشاء عرض السعر الأول للعميل</p>
            <Button onClick={() => setIsFormOpen(true)}>إنشاء عرض سعر</Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={quotations}
            keyExtractor={(q) => q.id}
            onRowClick={(q) => handleEdit(q)}
            initialSort={{ key: 'created', dir: 'desc' }}
            emptyState="لم يتم العثور على عروض أسعار مطابقة"
          />
        )}
      </div>

      <QuotationForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        quotation={editingQuotation}
        onSave={handleSaveQuotation}
      />

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="حذف عرض السعر"
        message="هل أنت متأكد من حذف عرض السعر؟ لا يمكن التراجع عن هذا الإجراء."
        confirmLabel="حذف"
        variant="danger"
      />
    </div>
  );
}
