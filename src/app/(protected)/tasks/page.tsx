'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { RowActionsMenu, type RowAction } from '@/components/ui/RowActionsMenu';
import { Plus, Edit, Trash2, Calendar, CheckSquare } from 'lucide-react';
import { useApp } from '@/lib/store';
import { TaskDetailPanel } from '@/components/tasks/TaskDetailPanel';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Task } from '@/lib/types';
import { parseDateOnly } from '@/lib/date-utils';

const STATUS_MAP: Record<string, { label: string; color: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' }> = {
  'todo': { label: 'لم تبدأ', color: 'default' },
  'in_progress': { label: 'قيد التنفيذ', color: 'info' },
  'in_review': { label: 'مراجعة', color: 'warning' },
  'done': { label: 'مكتملة', color: 'success' },
  'late': { label: 'متأخرة', color: 'danger' },
};

const PRIORITY_MAP: Record<string, { label: string; color: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' }> = {
  'low': { label: 'منخفضة', color: 'default' },
  'medium': { label: 'متوسطة', color: 'info' },
  'high': { label: 'عالية', color: 'warning' },
  'urgent': { label: 'عاجلة', color: 'danger' },
};

export default function TasksPage() {
  const { tasks, projects, team, deleteTask } = useApp();
  const [viewingTaskId, setViewingTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const viewingTask = viewingTaskId ? tasks.find(t => t.id === viewingTaskId) ?? null : null;

  const buildActions = (t: Task): RowAction[] => [
    { label: 'عرض التفاصيل', icon: <CheckSquare size={14} />, onClick: () => setViewingTaskId(t.id) },
    { label: 'تعديل', icon: <Edit size={14} />, onClick: () => setEditingTask(t) },
    { label: 'حذف', icon: <Trash2 size={14} />, variant: 'danger', onClick: () => deleteTask(t.id) },
  ];

  const columns: Column<Task>[] = [
    {
      key: 'title',
      header: 'عنوان المهمة',
      width: 'w-[20%]',
      render: (t) => <span className="font-semibold text-white">{t.title}</span>,
    },
    {
      key: 'project',
      header: 'المشروع',
      width: 'w-[15%]',
      render: (t) => {
        const p = projects.find(p => p.id === t.project_id) || { name: 'بدون مشروع' };
        return <span className="text-zinc-300">{p.name}</span>;
      },
    },
    {
      key: 'assignee',
      header: 'المسؤول',
      width: 'w-[15%]',
      render: (t) => {
        const members = team.filter(m => t.assignee_ids.includes(m.id));
        return <span className="text-zinc-300">{members.map(m => m.name).join(', ') || 'غير معين'}</span>;
      },
    },
    {
      key: 'category',
      header: 'فئة المهمة',
      width: 'w-[10%]',
      render: (t) => t.task_category ? <Badge variant="default">{t.task_category}</Badge> : <span className="text-zinc-600">—</span>,
    },
    {
      key: 'priority',
      header: 'الأولوية',
      width: 'w-[10%]',
      render: (t) => {
        const p = PRIORITY_MAP[t.priority] || PRIORITY_MAP['medium'];
        return <Badge variant={p.color}>{p.label}</Badge>;
      },
    },
    {
      key: 'status',
      header: 'الحالة',
      width: 'w-[10%]',
      render: (t) => {
        let statusKey: string = t.status;
        if (t.due_date && t.status !== 'done' && parseDateOnly(t.due_date) < new Date()) {
          statusKey = 'late';
        }
        const s = STATUS_MAP[statusKey] || STATUS_MAP['todo'];
        return <Badge variant={s.color}>{s.label}</Badge>;
      },
    },
    {
      key: 'due',
      header: 'تاريخ الاستحقاق',
      width: 'w-[15%]',
      render: (t) => t.due_date ? (
        <span className="inline-flex items-center gap-1 text-zinc-300">
          <Calendar size={14} className="text-zinc-500" />
          {parseDateOnly(t.due_date).toLocaleDateString('en-GB')}
        </span>
      ) : <span className="text-zinc-600">—</span>,
    },
    {
      key: 'actions',
      header: <span className="sr-only">الإجراءات</span>,
      align: 'right',
      width: 'w-12',
      render: (t: Task) => <RowActionsMenu actions={buildActions(t)} label="إجراءات المهمة" />,
    },
  ];

  return (
    <div className="animate-fadeIn min-h-screen">
      <Header
        title="المهام"
        subtitle={<span className="hidden sm:inline">{tasks.length} مهمة</span>}
        searchPlaceholder="البحث في المهام..."
        actions={
          <Button onClick={() => setEditingTask({} as Task)} icon={<Plus size={16} />}>
            مهمة جديدة
          </Button>
        }
      />

      <div className="p-4 lg:p-6 space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.06] flex items-center justify-center">
              <CheckSquare className="text-zinc-500" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">لا توجد مهام بعد</h3>
            <p className="text-zinc-400 mb-4">قم بإنشاء مهمة جديدة لإدارة عملك</p>
            <Button onClick={() => setEditingTask({} as Task)}>إنشاء مهمة</Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={tasks}
            keyExtractor={(t) => t.id}
            onRowClick={(t) => setViewingTaskId(t.id)}
            emptyState="لم يتم العثور على مهام"
          />
        )}
      </div>

      {editingTask && (
        <TaskForm
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          projectId={editingTask.project_id}
          task={editingTask.id ? editingTask : undefined}
        />
      )}

      <TaskDetailPanel
        task={viewingTask}
        onClose={() => setViewingTaskId(null)}
        onEdit={(task) => { setViewingTaskId(null); setEditingTask(task); }}
        onDelete={(id) => deleteTask(id)}
      />
    </div>
  );
}
