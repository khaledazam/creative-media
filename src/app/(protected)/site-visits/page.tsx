'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { RowActionsMenu, type RowAction } from '@/components/ui/RowActionsMenu';
import { Plus, Edit, Trash2, MapPin, Calendar, Camera } from 'lucide-react';
import { useApp } from '@/lib/store';
import { SiteVisit, SiteVisitStatus } from '@/lib/types';
import { SiteVisitForm } from '@/components/site-visits/SiteVisitForm';



const STATUS_COLORS: Record<SiteVisitStatus, 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'> = {
  'مجدولة': 'info',
  'تمت المعاينة': 'success',
  'تم الإلغاء': 'danger',
};

import { mockSiteVisits } from '@/mock';

export default function SiteVisitsPage() {
  const { contacts, projects, team } = useApp();
  const [visits, setVisits] = useState<SiteVisit[]>(mockSiteVisits as any[]);
  const [editingVisit, setEditingVisit] = useState<SiteVisit | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveVisit = (visit: Partial<SiteVisit>) => {
    if (visit.id) {
      setVisits(visits.map(v => v.id === visit.id ? { ...v, ...visit } as SiteVisit : v));
    } else {
      const newVisit = { ...visit, id: Date.now().toString() } as SiteVisit;
      setVisits([newVisit, ...visits]);
    }
  };

  const handleDelete = (id: string) => {
    setVisits(visits.filter(v => v.id !== id));
  };

  const buildActions = (v: SiteVisit): RowAction[] => [
    { label: 'تعديل', icon: <Edit size={14} />, onClick: () => { setEditingVisit(v); setIsFormOpen(true); } },
    { label: 'إضافة صور', icon: <Camera size={14} />, onClick: () => {} },
    { label: 'حذف', icon: <Trash2 size={14} />, variant: 'danger', onClick: () => handleDelete(v.id) },
  ];

  const columns: Column<SiteVisit>[] = [
    {
      key: 'project',
      header: 'المشروع',
      width: 'w-[15%]',
      render: (v) => {
        const p = projects.find(p => p.id === v.projectId) || { name: 'مشروع افتراضي' };
        return <span className="font-semibold text-white">{p.name}</span>;
      },
    },
    {
      key: 'client',
      header: 'العميل',
      width: 'w-[15%]',
      render: (v) => {
        const c = contacts.find(c => c.id === v.contactId) || { name: 'عميل افتراضي' };
        return <span className="text-zinc-300">{c.name}</span>;
      },
    },
    {
      key: 'date',
      header: 'تاريخ المعاينة',
      width: 'w-[12%]',
      render: (v) => (
        <span className="inline-flex items-center gap-1 text-zinc-300">
          <Calendar size={14} className="text-zinc-500" />
          {new Date(v.visitDate).toLocaleDateString('en-GB')}
        </span>
      ),
    },
    {
      key: 'location',
      header: 'الموقع',
      width: 'w-[20%]',
      render: (v) => (
        <span className="inline-flex items-center gap-1 text-zinc-400">
          <MapPin size={14} className="text-zinc-500 shrink-0" />
          <span className="truncate">{v.location}</span>
        </span>
      ),
    },
    {
      key: 'assignee',
      header: 'المسؤول',
      width: 'w-[12%]',
      render: (v) => {
        const member = team.find(m => m.id === v.assigneeId) || { name: 'مسؤول فني' };
        return <span className="text-zinc-300">{member.name}</span>;
      },
    },
    {
      key: 'status',
      header: 'الحالة',
      width: 'w-[12%]',
      render: (v) => <Badge variant={STATUS_COLORS[v.status]}>{v.status}</Badge>,
    },
    {
      key: 'actions',
      header: <span className="sr-only">الإجراءات</span>,
      align: 'right',
      width: 'w-12',
      render: (v: SiteVisit) => <RowActionsMenu actions={buildActions(v)} label={`إجراءات المعاينة`} />,
    },
  ];

  return (
    <div className="animate-fadeIn min-h-screen">
      <Header
        title="معاينات المواقع"
        subtitle={<span className="hidden sm:inline">{visits.length} معاينة</span>}
        searchPlaceholder="البحث في المعاينات..."
        actions={
          <Button onClick={() => { setEditingVisit(null); setIsFormOpen(true); }} icon={<Plus size={16} />}>
            جدولة معاينة
          </Button>
        }
      />

      <div className="p-4 lg:p-6 space-y-4">
        {visits.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.06] flex items-center justify-center">
              <MapPin className="text-zinc-500" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">لا توجد معاينات مجدولة</h3>
            <p className="text-zinc-400 mb-4">قم بجدولة معاينة جديدة للموقع</p>
            <Button onClick={() => { setEditingVisit(null); setIsFormOpen(true); }}>جدولة معاينة</Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={visits}
            keyExtractor={(v) => v.id}
            onRowClick={() => {}}
            emptyState="لم يتم العثور على معاينات"
          />
        )}
      </div>

      {isFormOpen && (
        <SiteVisitForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          visit={editingVisit}
          onSave={handleSaveVisit}
        />
      )}
    </div>
  );
}
