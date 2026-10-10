import { ProjectWorkflowStage } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ChevronLeft, ChevronRight, Circle, Clock, ArrowLeft, Check } from 'lucide-react';
import { toast } from '@/components/ui/Toast';

interface ProjectWorkflowPipelineProps {
  currentStage?: ProjectWorkflowStage;
  onChangeStage?: (stage: ProjectWorkflowStage) => void;
}

export const STAGES: { id: ProjectWorkflowStage; label: string; desc: string }[] = [
  { id: 'site_visit', label: 'معاينة الموقع', desc: 'النزول الميداني وفحص حالة الموقع وتحديد المتطلبات' },
  { id: 'measurement', label: 'رفع المقاسات', desc: 'أخذ الأبعاد والمناسيب بدقة بالأجهزة الهندسية' },
  { id: 'design', label: 'التصميم والمخططات', desc: 'إعداد المخططات المعمارية والتنفيذية والتصاميم 3D' },
  { id: 'client_approval', label: 'اعتماد العميل', desc: 'توقيع واعتماد العميل للرسومات والعينات' },
  { id: 'material_prep', label: 'تجهيز وتوريد الخامات', desc: 'شراء وتوريد المواد المعتمدة لموقع العمل' },
  { id: 'manufacturing', label: 'التصنيع والتجهيز', desc: 'أعمال الورش والنجارة وتصنيع الشاسيهات والقواطع' },
  { id: 'installation', label: 'التركيبات بالموقع', desc: 'التنفيذ والتركيب الفعلي بالموقع وفق أصول الصنعة' },
  { id: 'review', label: 'المراجعة والاستلام', desc: 'الفحص الهندسي الداخلي والتأكد من مطابقة الجودة' },
  { id: 'delivery', label: 'التسليم النهائي', desc: 'تسليم الموقع للعميل ومحضر الاستلام والضمان' },
];

export function ProjectWorkflowPipeline({ currentStage = 'site_visit', onChangeStage }: ProjectWorkflowPipelineProps) {
  const currentIndex = Math.max(0, STAGES.findIndex(s => s.id === currentStage));
  const currentObj = STAGES[currentIndex] || STAGES[0];
  const progressPct = Math.round(((currentIndex + 1) / STAGES.length) * 100);

  const handleNextStage = () => {
    if (currentIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentIndex + 1];
      onChangeStage?.(nextStage.id);
      toast('success', `تم تقديم المشروع إلى مرحلة: ${nextStage.label}`);
    }
  };

  const handlePrevStage = () => {
    if (currentIndex > 0) {
      const prevStage = STAGES[currentIndex - 1];
      onChangeStage?.(prevStage.id);
      toast('info', `تم الرجوع لمرحلة: ${prevStage.label}`);
    }
  };

  const handleSelectStage = (stage: typeof STAGES[number]) => {
    onChangeStage?.(stage.id);
    toast('info', `تم تحديد مرحلة: ${stage.label}`);
  };

  return (
    <Card className="p-5 lg:p-6 overflow-hidden">
      {/* Header with Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white">مراحل تنفيذ المشروع</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-500/15 text-brand-300 border border-brand-500/20">
              المرحلة {currentIndex + 1} من {STAGES.length}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              ({progressPct}% إنجاز المراحل)
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            الحالية: <span className="text-brand-300 font-medium">{currentObj.label}</span> — {currentObj.desc}
          </p>
        </div>

        {/* Advance & Back Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {currentIndex > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrevStage}
              className="gap-1 text-xs"
            >
              <ChevronRight size={14} />
              السابقة
            </Button>
          )}

          {currentIndex < STAGES.length - 1 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handleNextStage}
              className="gap-1 text-xs bg-brand-600 hover:bg-brand-500 text-white"
            >
              الانتقال لـ ({STAGES[currentIndex + 1].label})
              <ChevronLeft size={14} />
            </Button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Check size={14} />
              تم التسليم النهائي للمشروع
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-zinc-800 h-1.5 rounded-full mb-6 overflow-hidden">
        <div
          className="bg-brand-500 h-full transition-all duration-500 rounded-full"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      
      {/* Interactive Stages Stepper */}
      <div className="relative">
        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-none gap-2">
          {STAGES.map((stage, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isPending = index > currentIndex;
            
            return (
              <div 
                key={stage.id} 
                className="flex flex-col items-center min-w-[95px] relative z-10 cursor-pointer group"
                onClick={() => handleSelectStage(stage)}
                title={stage.desc}
              >
                <button 
                  type="button"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                    isCompleted ? 'bg-brand-500 text-white shadow-brand-500/20 group-hover:scale-105' : 
                    isCurrent ? 'bg-brand-600 text-white shadow-brand-500/40 ring-4 ring-brand-500/25 scale-110' : 
                    'bg-zinc-800/80 text-zinc-500 border border-zinc-700/60 hover:border-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={20} className="text-white" /> : 
                   isCurrent ? <Clock size={20} className="animate-pulse" /> : 
                   <span className="text-xs font-mono font-medium">{index + 1}</span>}
                </button>
                <span className={`text-[11px] font-medium mt-2.5 text-center transition-colors line-clamp-1 ${
                  isCurrent ? 'text-brand-300 font-semibold' : 
                  isCompleted ? 'text-zinc-300' : 
                  'text-zinc-500 group-hover:text-zinc-400'
                }`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
