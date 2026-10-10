import { Quotation } from '@/lib/types';

export const mockQuotations: Quotation[] = [
  {
    id: 'quote-001',
    quotationNumber: 'QT-2026-001',
    contactId: 'contact-001',
    projectId: 'proj-001',
    serviceType: 'تشطيبات داخلية',
    status: 'مسودة',
    items: [
      { id: 'item-1', description: 'أرضيات بورسلين إسباني 120x60', quantity: 120, unit: 'متر مربع', unitPrice: 850, discount: 0, total: 102000 },
      { id: 'item-2', description: 'تأسيس شبكة الكهرباء والسمارت هوم', quantity: 1, unit: 'مقطوعية', unitPrice: 25000, discount: 0, total: 25000 },
      { id: 'item-3', description: 'تأسيس أعمال السباكة المعلقة', quantity: 1, unit: 'مقطوعية', unitPrice: 15500, discount: 0, total: 15500 }
    ],
    subtotal: 142500,
    discount: 0,
    tax: 19950,
    total: 162450,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'الأسعار سارية لمدة 30 يوماً من تاريخ العرض وتشمل التوريد والتركيب والضمان.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'quote-002',
    quotationNumber: 'QT-2026-002',
    contactId: 'contact-002',
    projectId: 'proj-002',
    serviceType: 'كلادينج',
    status: 'تم الإرسال',
    items: [
      { id: 'item-1', description: 'توريد وتركيب كلادينج خارجي مقاوم للحريق', quantity: 85, unit: 'متر مربع', unitPrice: 750, discount: 0, total: 63750 },
      { id: 'item-2', description: 'شاسيه حديد مجلفن وحوامل مع الإضاءة المخفية', quantity: 1, unit: 'مقطوعية', unitPrice: 24250, discount: 0, total: 24250 }
    ],
    subtotal: 88000,
    discount: 3000,
    tax: 11900,
    total: 96900,
    validUntil: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'الضمان 5 سنوات على ألواح الكلادينج وسنة على الإنارة.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'quote-003',
    quotationNumber: 'QT-2026-003',
    contactId: 'contact-003',
    projectId: 'proj-003',
    serviceType: 'تجهيز مكاتب',
    status: 'تم الإرسال',
    items: [
      { id: 'item-1', description: 'قواطع زجاج سيكوريت 10 مم مع إكسسوارات إيطالي', quantity: 45, unit: 'متر مربع', unitPrice: 1200, discount: 0, total: 54000 },
      { id: 'item-2', description: 'أسقف معلقة وبلاطات جبسية عازلة للصوت', quantity: 90, unit: 'متر مربع', unitPrice: 350, discount: 0, total: 31500 },
      { id: 'item-3', description: 'أبواب خشبية مدمجة ودهانات ديكورية', quantity: 4, unit: 'عدد', unitPrice: 4500, discount: 0, total: 18000 }
    ],
    subtotal: 103500,
    discount: 5000,
    tax: 13790,
    total: 112290,
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'التسليم خلال 21 يوم عمل من توقيع العقد.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'quote-004',
    quotationNumber: 'QT-2026-004',
    contactId: 'contact-001',
    projectId: 'proj-001',
    serviceType: 'تشطيبات داخلية',
    status: 'مقبول',
    items: [
      { id: 'item-1', description: 'أعمال دهانات جوتن وديكورات بديل خشب ورخام', quantity: 1, unit: 'مقطوعية', unitPrice: 48000, discount: 0, total: 48000 }
    ],
    subtotal: 48000,
    discount: 0,
    tax: 6720,
    total: 54720,
    validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'تم قبول العرض وجاري توقيع العقد النهائي.',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  }
];
