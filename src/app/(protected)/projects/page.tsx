'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp, defaultFilters } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { Button } from '@/components/ui/Button';
import { AvatarGroup } from '@/components/ui/Avatar';
import { Tooltip } from '@/components/ui/Tooltip';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RowActionsMenu, type RowAction } from '@/components/ui/RowActionsMenu';
import { Plus, FolderKanban, Calendar, Users, Edit, Trash2, Bot } from 'lucide-react';
import { Project } from '@/lib/types';
import { toast } from '@/components/ui/Toast';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useAuth } from '@/lib/auth-context';
import { hasPermission } from '@/lib/access-control';
import { parseDateOnly } from '@/lib/date-utils';

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { projects, team, deleteProject, getTasksByProject, getPrimaryClient, filters, setFilters } = useApp();
  const { access } = useAuth();
  const canManageProjects = hasPermission(access, 'projects.manage');
  const canManageAgents = hasPermission(access, 'agents.manage');
  const isAgentsEnabled = process.env.NEXT_PUBLIC_ENABLE_AGENTS === 'true';
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  useEffect(() => { setFilters(defaultFilters); }, []);

  useEffect(() => {
    if (canManageProjects && searchParams.get('new') === 'true') {
      setIsFormOpen(true);
    }
  }, [canManageProjects, searchParams]);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const executeDelete = () => {
    if (!deletingProjectId) return;
    deleteProject(deletingProjectId);
    toast('success', 'Project deleted');
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const searchLower = filters.search.toLowerCase();
  const filtered = filters.search
    ? projects.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower))
    : projects;

  const activeProjects = filtered.filter(p => p.status === 'active');
  const completedProjects = filtered.filter(p => p.status === 'completed');
  const archivedProjects = filtered.filter(p => p.status === 'archived');

  const getProgress = (project: Project) => {
    const tasks = getTasksByProject(project.id);
    const done = tasks.filter(t => t.status === 'done').length;
    return { pct: tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0, total: tasks.length };
  };

  const buildActions = (p: Project): RowAction[] => [
    { label: 'تعديل', icon: <Edit size={14} />, onClick: () => handleEdit(p) },
    { label: 'حذف', icon: <Trash2 size={14} />, variant: 'danger', onClick: () => setDeletingProjectId(p.id) },
  ];

  const mobileCard = (p: Project) => {
    const { pct, total } = getProgress(p);
    const members = team.filter(m => p.member_ids.includes(m.id));
    const client = getPrimaryClient(p.id);
    return (
      <div className="glass-card rounded-xl p-4 hover:border-white/[0.12] transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/projects/${p.id}`}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold text-white inline-flex items-center gap-2 truncate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
            >
              {p.color && <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />}
              <span className="truncate">{p.name}</span>
            </Link>
            {client?.contact && (
              <div className="mt-1.5">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/[0.06] text-zinc-300">{client.contact.name}</span>
              </div>
            )}
          </div>
          {canManageProjects && <RowActionsMenu actions={buildActions(p)} label={`Actions for ${p.name}`} />}
        </div>

        <p className="mt-3 text-sm text-zinc-400 line-clamp-2">
          {p.description || <span className="text-zinc-600 italic">بدون وصف</span>}
        </p>

        {total > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
            </div>
            <span className="font-mono text-xs text-zinc-400 tabular-nums">{pct}%</span>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            {p.due_date && (
              <span className="inline-flex items-center gap-1"><Calendar size={13} className="text-zinc-500" />{parseDateOnly(p.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            )}
            {members.length > 0 && <span className="inline-flex items-center gap-1"><Users size={13} className="text-zinc-500" />{members.length}</span>}
          </div>
          {members.length > 0 && <AvatarGroup users={members} max={3} size="xs" />}
        </div>
      </div>
    );
  };

  const columns: Column<Project>[] = [
    {
      key: 'name',
      header: 'اسم المشروع',
      width: 'w-[15%]',
      sortValue: (p) => p.name.toLowerCase(),
      render: (p) => (
        <div className="flex items-center gap-2 min-w-0">
          {p.color && (
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
          )}
          <Link
            href={`/projects/${p.id}`}
            onClick={(e) => e.stopPropagation()}
            className="font-semibold text-white hover:text-brand-300 transition-colors truncate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
          >
            {p.name}
          </Link>
        </div>
      ),
    },
    {
      key: 'client',
      header: 'العميل',
      width: 'w-[12%]',
      className: 'hidden md:table-cell',
      render: (p) => {
        const client = getPrimaryClient(p.id);
        return client?.contact
          ? <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/[0.06] text-zinc-300">{client.contact.name}</span>
          : <span className="text-zinc-600 italic">—</span>;
      },
    },
    {
      key: 'type',
      header: 'نوع المشروع',
      width: 'w-[12%]',
      className: 'hidden lg:table-cell',
      render: (p) => {
        const text = (p.name + ' ' + (p.description || '')).toLowerCase();
        let projectType = 'تشطيبات داخلية';
        if (text.includes('كلادينج') || text.includes('واجهة') || text.includes('واجهات')) {
          projectType = 'واجهات وكلادينج';
        } else if (text.includes('مكتب') || text.includes('مكاتب') || text.includes('مقر') || text.includes('إدار')) {
          projectType = 'تجهيز مكاتب ومقرات';
        } else if (text.includes('كافيه') || text.includes('مطعم')) {
          projectType = 'مطاعم وكافيهات';
        }
        return <span className="text-zinc-300">{projectType}</span>;
      },
    },
    {
      key: 'status',
      header: 'المرحلة الحالية',
      width: 'w-[12%]',
      render: (p) => {
        const stageLabels: Record<string, { label: string; color: string }> = {
          site_visit: { label: 'معاينة الموقع', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
          measurement: { label: 'رفع المقاسات', color: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' },
          design: { label: 'التصميم والمخططات', color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
          client_approval: { label: 'اعتماد العميل', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
          material_prep: { label: 'تجهيز الخامات', color: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
          manufacturing: { label: 'التصنيع والتجهيز', color: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
          installation: { label: 'التركيبات بالموقع', color: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
          review: { label: 'المراجعة والاستلام', color: 'bg-teal-500/15 text-teal-400 border-teal-500/30' },
          delivery: { label: 'التسليم النهائي', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
        };
        const current = stageLabels[p.workflowStage || 'site_visit'] || stageLabels.site_visit;
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${current.color}`}>
            {current.label}
          </span>
        );
      },
    },
    {
      key: 'progress',
      header: 'نسبة الإنجاز',
      width: 'w-[16%]',
      className: 'hidden sm:table-cell',
      sortValue: (p) => getProgress(p).pct,
      render: (p) => {
        const { pct, total } = getProgress(p);
        if (total === 0) return <span className="text-zinc-600 italic text-xs">لا يوجد مهام</span>;
        return (
          <div className="flex items-center gap-2 min-w-[120px]">
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="font-mono text-xs text-zinc-400 tabular-nums w-8 text-right">{pct}%</span>
          </div>
        );
      },
    },
    {
      key: 'due',
      header: 'تاريخ التسليم',
      width: 'w-[10%]',
      className: 'hidden sm:table-cell',
      sortValue: (p) => p.due_date ? parseDateOnly(p.due_date).getTime() : Infinity,
      render: (p) => p.due_date
        ? (
          <span className="inline-flex items-center gap-1 text-zinc-300 whitespace-nowrap">
            <Calendar size={14} className="text-zinc-500" />
            {parseDateOnly(p.due_date).toLocaleDateString('en-GB')}
          </span>
        )
        : <span className="text-zinc-600 italic">—</span>,
    },
    {
      key: 'team',
      header: 'مدير المشروع',
      width: 'w-[12%]',
      render: (p) => {
        const members = team.filter(m => p.member_ids.includes(m.id));
        const manager = members[0];
        return manager
          ? (
            <div className="flex items-center gap-2">
              <AvatarGroup users={[manager]} max={1} size="xs" />
              <span className="text-xs text-zinc-300 truncate">{manager.name}</span>
            </div>
          )
          : <span className="text-zinc-600 italic text-xs">—</span>;
      },
    },
    ...(canManageProjects ? [{
      key: 'actions',
      header: <span className="sr-only">الإجراءات</span>,
      align: 'right' as const,
      width: 'w-12',
      render: (p: Project) => <RowActionsMenu actions={buildActions(p)} label={`Actions for ${p.name}`} />,
    }] : []),
  ];

  const renderSection = (key: string, label: string, rows: Project[]) => (
    <section key={key}>
      <SectionHeader label={label} count={rows.length} />
      <DataTable
        columns={columns}
        data={rows}
        keyExtractor={(p) => p.id}
        onRowClick={(p) => router.push(`/projects/${p.id}`)}
        stickyHeader={false}
        fixedLayout
        mobileCard={mobileCard}
      />
    </section>
  );

  return (
    <>
      <Header
        title="المشاريع"
        subtitle={<span className="hidden sm:inline">{projects.length} مشروع</span>}
        searchPlaceholder="البحث في المشاريع..."
        actions={canManageProjects ? (
          <Button onClick={() => setIsFormOpen(true)} icon={<Plus size={16} />}>
            مشروع جديد
          </Button>
        ) : undefined}
      />

      <div className="p-4 lg:p-6 space-y-6">
        {projects.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.06] flex items-center justify-center">
              <FolderKanban className="text-zinc-500" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">لا توجد مشاريع بعد</h3>
            <p className="text-zinc-400 mb-4">{canManageProjects ? 'قم بإنشاء مشروعك الأول للبدء' : 'لا توجد مشاريع مسندة إليك'}</p>
            {canManageProjects && <Button onClick={() => setIsFormOpen(true)}>إنشاء مشروع</Button>}
          </div>
        ) : (
          <>
            {activeProjects.length > 0 && renderSection('active', 'نشط', activeProjects)}
            {completedProjects.length > 0 && renderSection('completed', 'مكتمل', completedProjects)}
            {archivedProjects.length > 0 && renderSection('archived', 'مؤرشف', archivedProjects)}
          </>
        )}
      </div>

      {canManageProjects && <ProjectForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        project={editingProject}
      />}

      <ConfirmDialog
        isOpen={!!deletingProjectId}
        onClose={() => setDeletingProjectId(null)}
        onConfirm={executeDelete}
        title="حذف المشروع"
        message="هل أنت متأكد من حذف هذا المشروع وجميع المهام المرتبطة به؟ لا يمكن التراجع عن هذا الإجراء."
        confirmLabel="حذف"
        variant="danger"
      />
    </>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
