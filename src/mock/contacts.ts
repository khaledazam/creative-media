import { Contact } from '../lib/types';

export const mockContacts: Contact[] = [
  {
    id: 'contact-001',
    name: 'أشرف محمود',
    email: 'ashraf@lapiazza.com',
    phone: '01001234567',
    company: 'مطعم La Piazza',
    notes: 'صاحب المطعم',
    color: '#E53E3E',
    avatar_url: '',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'contact-002',
    name: 'وليد عبد العزيز',
    email: 'waleed@shorouk.com',
    phone: '01123456789',
    company: 'شركة الشروق',
    notes: 'مدير المشتريات',
    color: '#3182CE',
    avatar_url: '',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'contact-003',
    name: 'سمير فؤاد',
    email: 'samir@alnoor.com',
    phone: '01234567890',
    company: 'شركة النور',
    notes: 'المدير التنفيذي',
    color: '#38A169',
    avatar_url: '',
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  }
];
