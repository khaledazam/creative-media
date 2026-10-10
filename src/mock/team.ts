import { TeamMember } from '../lib/types';

export const mockTeam: TeamMember[] = [
  {
    id: 'team-001',
    name: 'أحمد محمد',
    email: 'ahmed@creativemedia.com',
    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Mohamed&background=random',
    role: 'owner',
    title: 'مدير مشاريع',
    status: 'active',
  },
  {
    id: 'team-002',
    name: 'محمد علي',
    email: 'mohamed@creativemedia.com',
    avatar: 'https://ui-avatars.com/api/?name=Mohamed+Ali&background=random',
    role: 'member',
    title: 'مصمم',
    status: 'active',
  },
  {
    id: 'team-003',
    name: 'محمود حسن',
    email: 'mahmoud@creativemedia.com',
    avatar: 'https://ui-avatars.com/api/?name=Mahmoud+Hassan&background=random',
    role: 'member',
    title: 'مشرف تنفيذ',
    status: 'active',
  },
  {
    id: 'team-004',
    name: 'سيد عبد الرحمن',
    email: 'sayed@creativemedia.com',
    avatar: 'https://ui-avatars.com/api/?name=Sayed+Abdelrahman&background=random',
    role: 'member',
    title: 'فني تركيبات',
    status: 'active',
  }
];
