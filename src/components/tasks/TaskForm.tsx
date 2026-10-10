'use client';

import { useState, useEffect } from 'react';
import { AiReadiness, Task, TASK_TYPES, TaskType } from '@/lib/types';
import { useApp } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { TagsInput } from '@/components/ui/inputs/TagsInput';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/inputs/Select';
import { Textarea } from '@/components/ui/inputs/Textarea';
import { MultiSelect } from '@/components/ui/inputs/MultiSelect';
import { DateInput } from '@/components/ui/inputs/DateInput';
import { hasPermission } from '@/lib/access-control';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  task?: Task | null;
  /** Create mode only: seeds the due date (calendar day-click). */
  initialDueDate?: string;
}

export function TaskForm({ isOpen, onClose, projectId, task, initialDueDate }: TaskFormProps) {
  const { team, tasks, projects, addTask, updateTask } = useApp();
  const { teamMemberId, access } = useAuth();

  const isAgentsEnabled = process.env.NEXT_PUBLIC_ENABLE_AGENTS === 'true';
  const canManageAgents = hasPermission(access, 'agents.manage');
  const canAssignOthers = hasPermission(access, 'tasks.manage_all');

  const [selectedProjectId, setSelectedProjectId] = useState(projectId || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('todo');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');
  const [taskType, setTaskType] = useState<TaskType | ''>('');
  const [aiReadiness, setAiReadiness] = useState<AiReadiness | ''>('');
  const [taskCategory, setTaskCategory] = useState<Task['task_category'] | ''>('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [actualCost, setActualCost] = useState('');
  const [blockedByIds, setBlockedByIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setSelectedProjectId(task.project_id || projectId || '');
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setAssigneeIds(task.assignee_ids);
      setDueDate(task.due_date || '');
      setTags(task.tags.join(', '));
      setTaskType(task.task_type || '');
      setTaskCategory(task.task_category || '');
      setEstimatedCost(task.estimated_cost?.toString() || '');
      setActualCost(task.actual_cost?.toString() || '');
      setAiReadiness(task.ai_readiness || '');
      setBlockedByIds(task.blocked_by_ids || []);
    } else {
      setSelectedProjectId(projectId || '');
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setAssigneeIds(!canAssignOthers && teamMemberId ? [teamMemberId] : []);
      setDueDate(initialDueDate || '');
      setTags('');
      setTaskType('');
      setTaskCategory('');
      setEstimatedCost('');
      setActualCost('');
      setAiReadiness('');
      setBlockedByIds([]);
    }
  }, [canAssignOthers, isOpen, task, teamMemberId, initialDueDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    setSaving(true);
    const taskData: Partial<Task> & { project_id: string; title: string } = {
      project_id: selectedProjectId || projectId || '',
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      ...(canAssignOthers || !task ? { assignee_ids: assigneeIds } : {}),
      due_date: dueDate || null,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      ...(canManageAgents
        ? { task_type: taskType || null, ai_readiness: aiReadiness || null }
        : {}),
      task_category: taskCategory || undefined,
      estimated_cost: estimatedCost ? parseFloat(estimatedCost) : undefined,
      actual_cost: actualCost ? parseFloat(actualCost) : undefined,
      blocked_by_ids: blockedByIds,
      subtasks: task?.subtasks || [],
      comments: task?.comments || [],
      acceptance_criteria: task?.acceptance_criteria || [],
    };

    if (task) {
      setSelectedProjectId(task.project_id || projectId || '');
      await updateTask(task.id, taskData);
    } else {
      await addTask(taskData as Omit<Task, 'id' | 'created_at' | 'updated_at'>);
    }

    setSaving(false);
    onClose();
  };

  const statusOptions = [
    { value: 'todo', label: 'لم تبدأ' },
    { value: 'in_progress', label: 'قيد التنفيذ' },
    { value: 'in_review', label: 'مراجعة' },
    { value: 'done', label: 'مكتملة' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'منخفضة' },
    { value: 'medium', label: 'متوسطة' },
    { value: 'high', label: 'عالية' },
    { value: 'urgent', label: 'عاجلة' },
  ];

  const isEditing = !!task;

  const projectTaskOptions = tasks
    .filter((t) => t.project_id === projectId && t.id !== task?.id)
    .map((t) => ({ value: t.id, label: t.title }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'تعديل المهمة' : 'مهمة جديدة'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
        {(!projectId || !task) && (
          <Select
            label="المشروع"
            value={selectedProjectId}
            onChange={setSelectedProjectId}
            options={[
              { value: '', label: 'بدون مشروع' },
              ...projects.map(p => ({ value: p.id, label: p.name }))
            ]}
          />
        )}
        <Input
          label="عنوان المهمة"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="أدخل عنوان المهمة"
          required
        />

        <Textarea
          label="الوصف"
          value={description}
          onChange={setDescription}
          placeholder="تفاصيل المهمة..."
          rows={3}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="الحالة"
            value={status}
            onChange={(value) => setStatus(value as Task['status'])}
            options={statusOptions}
          />
          <Select
            label="الأولوية"
            value={priority}
            onChange={(value) => setPriority(value as Task['priority'])}
            options={priorityOptions}
          />
        </div>

        <DateInput label="تاريخ الاستحقاق" value={dueDate} onChange={setDueDate} clearable />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="فئة المهمة (أعمال المقاولات)"
            value={taskCategory}
            onChange={(value) => setTaskCategory(value as Task['task_category'] | '')}
            options={[
              { value: '', label: 'بدون فئة' },
              { value: 'تصميم', label: 'تصميم' },
              { value: 'توريد', label: 'توريد' },
              { value: 'تنفيذ', label: 'تنفيذ' },
              { value: 'إشراف', label: 'إشراف' },
              { value: 'تسليم', label: 'تسليم' },
            ]}
          />
          <div className="space-y-4">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-9 -translate-y-1/2 text-sm text-zinc-400 z-10">
                ر.س
              </span>
              <Input
                label="التكلفة التقديرية"
                type="text"
                inputMode="decimal"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                placeholder="0.00"
                className="pl-12"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <MultiSelect
          label="أعضاء الفريق"
          options={(canAssignOthers
            ? team
            : team.filter((member) => member.id === teamMemberId)
          ).map((m) => ({ value: m.id, label: m.name }))}
          value={assigneeIds}
          onChange={setAssigneeIds}
          placeholder="اختر فريق العمل..."
          selectAll
          searchable={team.length > 4}
        />

        {isAgentsEnabled && canManageAgents && (
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Task Type"
              value={taskType}
              onChange={(value) => setTaskType(value as TaskType | '')}
              options={[
                { value: '', label: 'None' },
                ...TASK_TYPES.map((t) => ({
                  value: t,
                  label: t.charAt(0).toUpperCase() + t.slice(1),
                })),
              ]}
            />
            <Select
              label="AI Ready"
              value={aiReadiness}
              onChange={(value) => setAiReadiness(value as AiReadiness | '')}
              options={[
                { value: '', label: 'Unclassified' },
                { value: 'ai_ready', label: 'AI Ready' },
                { value: 'human_only', label: 'Human' },
              ]}
            />
          </div>
        )}

        {projectTaskOptions.length > 0 && (
          <MultiSelect
            label="تعتمد على مهام أخرى (Blocked By)"
            options={projectTaskOptions}
            value={blockedByIds}
            onChange={setBlockedByIds}
            placeholder="المهام التي يجب إنهاؤها أولاً..."
            searchable={projectTaskOptions.length > 4}
          />
        )}

        <TagsInput
          label="الوسوم (Tags)"
          value={tags}
          onChange={setTags}
          placeholder="design, frontend, urgent"
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'جاري الحفظ...' : isEditing ? 'حفظ التعديلات' : 'إنشاء مهمة'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
