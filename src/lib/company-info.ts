/**
 * ─────────────────────────────────────────────────────────────
 * CREATIVE MEDIA — CENTRALIZED COMPANY INFORMATION & CONTACTS
 * ─────────────────────────────────────────────────────────────
 * Single typed source of truth for all public company data.
 * All phone numbers, addresses, and contacts are strictly verified.
 * 
 * Rules:
 *  - Do NOT invent phone numbers, emails, office hours, or coordinates.
 *  - Use valid international phone formats for tel: links.
 *  - Use raw international format without + for WhatsApp links (e.g. 201028986879).
 */

export interface ContactPerson {
  name: string;
  role: string;
  phoneRaw: string;
  phoneFormatted: string;
  phoneInternational: string;
  whatsappDigits: string;
}

export interface CompanyInformation {
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  editorialDescription: string;
  market: string;
  language: string;
  direction: 'rtl' | 'ltr';
  address: {
    city: string;
    street: string;
    landmark: string;
    fullArabic: string;
    country: string;
  };
  contacts: {
    primary: ContactPerson;
    secondary: ContactPerson;
  };
  pillars: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    image: string;
  }[];
  socials: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
}

export const COMPANY_INFO: CompanyInformation = {
  name: 'Creative Media',
  legalName: 'Creative Media للحلول المعمارية والديكور وتكسية الواجهات',
  tagline: 'تصميم وتنفيذ الواجهات المعمارية والكلادينج والتشطيبات الداخلية',
  shortDescription: 'نصنع واجهات تلفت الأنظار، ومساحات تعكس هويتك المعمارية والتجارية.',
  editorialDescription:
    'في Creative Media، نجمع بين الإبداع الهندسي ودقة التنفيذ لنقدم حلولاً متكاملة في الكلادينج (ACP)، الواجهات المعمارية للمحلات والمباني، أعمال التشطيبات والديكور الداخلي، والقص بالليزر والـ CNC بأعلى معايير الإتقان.',
  market: 'مصر (الدقهلية، القاهرة، وكافة المحافظات)',
  language: 'ar',
  direction: 'rtl',
  address: {
    city: 'السنبلاوين',
    street: 'شارع عبد المنعم',
    landmark: 'بجوار صيدلية الهدى',
    fullArabic: 'السنبلاوين، شارع عبد المنعم، بجوار صيدلية الهدى',
    country: 'جمهورية مصر العربية',
  },
  contacts: {
    primary: {
      name: 'محمد العزب',
      role: 'إدارة المشروعات والتعاقدات',
      phoneRaw: '01028986879',
      phoneFormatted: '010 2898 6879',
      phoneInternational: '+201028986879',
      whatsappDigits: '201028986879',
    },
    secondary: {
      name: 'سيف سامي',
      role: 'الإشراف الفني والتنفيذ الميداني',
      phoneRaw: '01029535753',
      phoneFormatted: '010 2953 5753',
      phoneInternational: '+201029535753',
      whatsappDigits: '201029535753',
    },
  },
  pillars: [
    {
      id: 'facades-cladding',
      title: 'الكلادينج والواجهات المعمارية',
      subtitle: 'تكسية واجهات الأبراج والمعارض والمتاجر بأنظمة ACP المعمارية',
      description:
        'تصميم وتوريد وتركيب ألواح الألمنيوم المركبة (الكلادينج) المقاومة للحرائق والرطوبة، مع هياكل حديدية هندسية معالجة ضد الصدأ وعوامل التعرية، لضمان استقامة الزوايا وثبات الواجهة لعقود.',
      features: [
        'ألواح كلادينج معتمدة ومقاومة للحرائق والرطوبة',
        'شاسيهات حديدية محسوبة إنشائياً لمقاومة الرياح',
        'تشكيلات معمارية عصرية وقص هندسي بالمليمتر',
        'تسليم مطابق للأكواد الهندسية مع ضمان الجودة',
      ],
      image: '/landing/real/delta-travel-corner-building.jpg',
    },
    {
      id: 'interior-fitout',
      title: 'التشطيبات والديكور الداخلي',
      subtitle: 'تجهيز متكامل للمقرات التجارية والمعارض والمساحات الإدارية (Fit-Out)',
      description:
        'تحويل الفراغات الصامتة إلى بيئات حيوية ملهمة. نتولى إدارة التشطيبات الهندسية من الأرضيات والأسقف المعلقة، إلى القواطع الزجاجية، بدائل الخشب والرخام، والإضاءات المعمارية المخفية.',
      features: [
        'تصميم 3D كامل وتوزيع معماري للمساحات قبل التنفيذ',
        'قواطع سيكوريت زجاجية وحلول عزل صوتي متقدمة',
        'تشطيبات ديكورية بالخشب وبديل الرخام وبانوهات CNC',
        'توزيع إضاءة مدروس هندسياً يعزز فخامة المكان',
      ],
      image: '/landing/real/looz-cafe-interior.jpg',
    },
    {
      id: 'storefronts-signs',
      title: 'واجهات المحلات واللوحات الإعلانية 3D',
      subtitle: 'هندسة بصرية تحول واجهة متجرك إلى علامة بارزة في محيطها',
      description:
        'تنفيذ واجهات المعارض والمحلات التجارية بنظام تسليم مفتاح، يشمل الحروف البارزة المضيئة (ستانلس، أكريليك كوري، نيون فليكس)، وشاشات العرض الذكية عالية السطوع.',
      features: [
        'حروف بارزة بإنارة Samsung LED موفرة وموثوقة',
        'قص ليزر دقيق لماكينات الألياف الضوئية بدقة متناهية',
        'شاشات LED خارجية وداخلية بدقات وضوح عالية',
        'تجليد متكامل لواجهة المتجر يعكس هوية البراند',
      ],
      image: '/landing/real/creative-media-hq.jpg',
    },
  ],
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
};

/** Helper to generate valid tel: links */
export function getTelLink(phoneInternational: string): string {
  return `tel:${phoneInternational.replace(/\s+/g, '')}`;
}

/** Helper to generate valid WhatsApp direct chat links */
export function getWhatsAppLink(whatsappDigits: string, defaultMessage?: string): string {
  const cleanDigits = whatsappDigits.replace(/[^0-9]/g, '');
  const msg = defaultMessage || 'مرحباً Creative Media، أود الاستفسار عن خدمات الواجهات والتشطيبات';
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(msg)}`;
}

/** Helper for Schema.org LocalBusiness structured data */
export function getLocalBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    description: COMPANY_INFO.editorialDescription,
    url: 'https://creativemedia.com',
    telephone: COMPANY_INFO.contacts.primary.phoneInternational,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: 'الدقهلية',
      addressCountry: 'EG',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
    },
    knowsAbout: [
      'Architectural finishing',
      'Interior decoration and fit-out',
      'Exterior architectural cladding',
      'Aluminum Composite Panel (ACP) facades',
      'Commercial storefronts',
      'Architectural facade solutions',
      'Signage and advertising execution',
      'CNC decorative works',
    ],
  };
}
