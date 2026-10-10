export interface SiteVisit {
  id: string;
  project_id: string;
  title: string;
  visit_date: string;
  status: 'مجدولة' | 'تمت المعاينة' | 'تم الإلغاء';
  assignee_id: string;
  measurements: {
    width: number;
    height: number;
    area: number;
    facades: number;
  };
  notes: string;
  created_at: string;
}

export const mockSiteVisits: SiteVisit[] = [
  {
    id: 'sv-001',
    project_id: 'proj-001',
    title: 'معاينة مطعم La Piazza',
    visit_date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'تمت المعاينة',
    assignee_id: 'team-001',
    measurements: {
      width: 12.5,
      height: 4.2,
      area: 52.5,
      facades: 1
    },
    notes: 'الجدران بحاجة لبعض الترميم قبل تركيب الشاسيه المعدني.',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'sv-002',
    project_id: 'proj-003',
    title: 'معاينة موقع اليافطة',
    visit_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'مجدولة',
    assignee_id: 'team-003',
    measurements: {
      width: 0,
      height: 0,
      area: 0,
      facades: 0
    },
    notes: 'التأكد من قوة الرياح والأساسات في الموقع المقترح.',
    created_at: new Date().toISOString()
  }
];
