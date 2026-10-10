'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/inputs/Select';
import { Textarea } from '@/components/ui/inputs/Textarea';
import Modal from '@/components/ui/Modal';
import { useApp } from '@/lib/store';
import { Share2, Plus, Image as ImageIcon, Copy, ExternalLink, Settings, Eye, Check } from 'lucide-react';
import { toast } from '@/components/ui/Toast';

export default function PortalManagementPage() {
  const { projects } = useApp();
  const [activeTab, setActiveTab] = useState<'links' | 'updates' | 'settings'>('links');
  
  // Link Generation State
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  
  // Update Modal State
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateProject, setUpdateProject] = useState('');

  const handleGenerateLink = () => {
    if (!selectedProjectId) {
      toast('error', 'يرجى اختيار مشروع أولاً');
      return;
    }
    // Generate a secure token/link (Mocked for now)
    const token = btoa(selectedProjectId + Date.now()).slice(0, 10);
    const link = `${window.location.origin}/portal/${token}`;
    setGeneratedLink(link);
    toast('success', 'تم إنشاء الرابط بنجاح');
  };

  const copyToClipboard = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    toast('success', 'تم نسخ الرابط');
  };

  const handlePublishUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateProject || !updateTitle) return;
    // Store update logic here
    toast('success', 'تم نشر التحديث في بوابة العميل بنجاح');
    setIsUpdateModalOpen(false);
    setUpdateTitle('');
    setUpdateDescription('');
    setUpdateProject('');
  };

  return (
    <div className="animate-fadeIn min-h-screen pb-12" dir="rtl">
      <Header
        title="إدارة بوابة العملاء"
        subtitle="التحكم في الروابط، التحديثات، وما يراه العميل"
        actions={
          <Button icon={<Plus size={16} />} onClick={() => setIsUpdateModalOpen(true)}>
            نشر تحديث جديد
          </Button>
        }
      />

      <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
        
        {/* Tabs */}
        <div className="flex bg-surface-raised border border-white/[0.08] p-1 rounded-lg w-max mb-6">
          <button
            onClick={() => setActiveTab('links')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'links' ? 'bg-brand-500 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            روابط المشاريع
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'updates' ? 'bg-brand-500 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            تحديثات الموقع
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'settings' ? 'bg-brand-500 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            الإعدادات
          </button>
        </div>

        {activeTab === 'links' && (
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Share2 className="text-brand-400" size={20} />
                توليد رابط بوابة لعميل
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                قم باختيار المشروع لإنشاء رابط آمن ومخصص للعميل لمتابعة سير العمل.
              </p>
              
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Select
                    label="اختر المشروع"
                    value={selectedProjectId}
                    onChange={setSelectedProjectId}
                    options={[
                      { value: '', label: 'اختر مشروعاً...' },
                      ...projects.map(p => ({ value: p.id, label: p.name }))
                    ]}
                  />
                </div>
                <Button onClick={handleGenerateLink}>
                  توليد الرابط
                </Button>
              </div>

              {generatedLink && (
                <div className="mt-6 p-4 bg-brand-500/10 border border-brand-500/20 rounded-lg">
                  <label className="block text-sm font-medium text-brand-300 mb-2">الرابط المخصص للعميل:</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={generatedLink} 
                      readOnly 
                      className="flex-1 font-mono text-left" 
                      dir="ltr"
                    />
                    <Button variant="secondary" icon={<Copy size={16} />} onClick={copyToClipboard}>
                      نسخ
                    </Button>
                    <a href={generatedLink} target="_blank" rel="noreferrer">
                      <Button variant="secondary" icon={<ExternalLink size={16} />}>
                        فتح
                      </Button>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="glass-card rounded-xl p-6 text-center py-16">
            <ImageIcon className="mx-auto text-zinc-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">لا توجد تحديثات منشورة مؤخراً</h3>
            <p className="text-zinc-400 mb-6">قم بنشر صور وإنجازات من الموقع ليتمكن العملاء من رؤيتها في البوابة الخاصة بهم.</p>
            <Button icon={<Plus size={16} />} onClick={() => setIsUpdateModalOpen(true)}>
              نشر أول تحديث
            </Button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="glass-card rounded-xl p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Settings className="text-brand-400" size={20} />
              إعدادات الخصوصية والعرض للعملاء
            </h3>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                <div>
                  <h4 className="font-medium text-white mb-1">عرض التكلفة الإجمالية</h4>
                  <p className="text-sm text-zinc-400">السماح للعميل برؤية الدفعات وتكلفة المشروع في البوابة</p>
                </div>
                <div className="w-12 h-6 bg-brand-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                <div>
                  <h4 className="font-medium text-white mb-1">مشاركة المخططات الهندسية</h4>
                  <p className="text-sm text-zinc-400">عرض قسم المخططات بصيغة PDF للعميل</p>
                </div>
                <div className="w-12 h-6 bg-brand-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                <div>
                  <h4 className="font-medium text-white mb-1">عرض بيانات فريق العمل</h4>
                  <p className="text-sm text-zinc-400">إظهار أسماء المهندسين المشرفين على المشروع</p>
                </div>
                <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Update Modal */}
      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} title="نشر تحديث في الموقع" size="md">
        <form onSubmit={handlePublishUpdate} className="space-y-4" dir="rtl">
          <Select
            label="المشروع"
            value={updateProject}
            onChange={setUpdateProject}
            options={[
              { value: '', label: 'اختر المشروع...' },
              ...projects.map(p => ({ value: p.id, label: p.name }))
            ]}
          />
          <Input
            label="عنوان التحديث"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            placeholder="مثال: الانتهاء من أعمال السباكة"
          />
          <Textarea
            label="التفاصيل (اختياري)"
            value={updateDescription}
            onChange={setUpdateDescription}
            placeholder="اكتب رسالة للعميل تشرح فيها ما تم إنجازه..."
            rows={3}
          />
          <div className="border-2 border-dashed border-white/[0.1] rounded-lg p-8 text-center bg-white/[0.02]">
            <ImageIcon className="mx-auto text-zinc-500 mb-2" size={32} />
            <p className="text-sm text-zinc-400">انقر هنا لرفع صور أو فيديو من الموقع</p>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsUpdateModalOpen(false)}>إلغاء</Button>
            <Button type="submit" icon={<Check size={16} />}>نشر التحديث</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
