import { LandingPageConfig } from './types';
import { COMPANY_INFO } from '../company-info';

export const defaultLandingConfig: LandingPageConfig = {
  hero: {
    badge: 'Creative Media • العمارة والواجهات والتشطيبات',
    title: 'نصنع واجهات تلفت الأنظار، ومساحات',
    highlightText: 'تعكس هويتك',
    description:
      'في Creative Media، نجمع بين الإبداع الهندسي ودقة التنفيذ لنقدم حلولًا متكاملة في الكلادينج، الواجهات المعمارية، التشطيبات والديكور.',
    primaryCtaText: 'استكشف مشاريعنا',
    primaryCtaLink: '#portfolio',
    secondaryCtaText: 'اطلب عرض سعر',
    secondaryCtaLink: '#contact',
    bgImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85',
  },
  stats: [
    {
      id: 'stat-1',
      value: '100%',
      suffix: '',
      label: 'مطابقة هندسية للمخططات المعتمدة',
      iconName: 'Compass',
    },
    {
      id: 'stat-2',
      value: '0.1mm',
      suffix: '',
      label: 'دقة قص وتشكيل بالليزر والـ CNC',
      iconName: 'Cpu',
    },
    {
      id: 'stat-3',
      value: 'A2/B1',
      suffix: '',
      label: 'خامات كلادينج معتمدة ومقاومة للحرائق',
      iconName: 'ShieldCheck',
    },
    {
      id: 'stat-4',
      value: '3D',
      suffix: '',
      label: 'نمذجة معمارية ومعاينة قبل التنفيذ',
      iconName: 'Layers',
    },
  ],
  services: [
    {
      id: 'srv-1',
      title: 'الكلادينج والواجهات المعمارية (ACP)',
      description:
        'تكسية وتطوير واجهات الأبراج والمعارض والمباني التجارية بألواح الألمنيوم المركبة عالية المقاومة ضد الحرائق والعوامل الجوية مع شاسيهات حديدية معالجة هندسياً.',
      iconName: 'Layers',
      badge: 'تخصص رئيسي',
      features: [
        'ألواح كلادينج معتمدة مقاومة للحرارة والبهتان',
        'هياكل تثبيت حديدية مدروسة لمقاومة أحمال الرياح',
        'تشكيلات معمارية عصرية 3D ترفع قيمة المبنى',
      ],
    },
    {
      id: 'srv-2',
      title: 'التشطيبات والديكور الداخلي (Fit-Out)',
      description:
        'تنفيذ وتجهيز هندسي متكامل للمقرات التجارية والمكاتب الإدارية والمعارض؛ يشمل الأرضيات، القواطع الزجاجية، الأسقف المعلقة، وبدائل الخشب والرخام.',
      iconName: 'Store',
      badge: 'تسليم مفتاح',
      features: [
        'مخططات معمارية وتوزيع فراغي دقيق',
        'قواطع سيكوريت وبدائل الرخام وبانوهات عصرية',
        'إشراف هندسي وتنفيذي حتى التسليم النهائي',
      ],
    },
    {
      id: 'srv-3',
      title: 'واجهات المحلات والمعارض التجارية',
      description:
        'تصميم وتنفيذ واجهات المتاجر وسلاسل الفروع بنظام الهوية المتكاملة، لتوحيد الانطباع البصري وجذب الجمهور بلمسة عصرية فاخرة.',
      iconName: 'Building2',
      badge: 'للمتاجر والشركات',
      features: [
        'دمج الكلادينج مع الزجاج والإضاءة المخفية',
        'تشطيبات مقاومة للاستخدام التجاري المكثف',
        'التزام صارم بمواعيد الافتتاح التجاري',
      ],
    },
    {
      id: 'srv-4',
      title: 'حروف بارزة ويافطات مضيئة 3D',
      description:
        'تصنيع الحروف البارزة المضيئة بمختلف الخامات (ستانلس ستيل، أكريليك كوري، زنكور، نيون فليكس) مع إضاءات LED فائقة السطوع وعمر افتراضي طويل.',
      iconName: 'Sparkles',
      features: [
        'إضاءات LED موفرة للطاقة ومقاومة للرطوبة',
        'قص دقيق بماكينات الليزر الحديثة',
        'ضمان معتمد على الإضاءة وجودة المواد',
      ],
    },
    {
      id: 'srv-5',
      title: 'ديكورات وتشكيلات CNC المعمارية',
      description:
        'أعمال القص والزخرفة المعمارية على ألواح الكلادينج، الأخشاب، والـ MDF بماكينات CNC الحديثة لتنفيذ فواصل جدارية، أسقف، وشاشات زخرفية هندسية.',
      iconName: 'Cpu',
      features: [
        'زخارف هندسية وإسلامية ومودرن مخصصة',
        'دقة تفاصيل عالية وتشطيب احترافي',
        'استخدامات داخلية وخارجية متعددة',
      ],
    },
    {
      id: 'srv-6',
      title: 'شاشات العرض الذكية والـ LED',
      description:
        'توريد وتركيب وبرمجة شاشات العرض الرقمية التفاعلية الداخلية والخارجية (Indoor & Outdoor) للمتاجر ومراكز الأعمال لتشغيل المحتوى الإعلاني بجودة فائقة.',
      iconName: 'Tv',
      features: [
        'شاشات خارجية مقاومة للأتربة والشمس المباشرة',
        'أنظمة تحكم ذكية وسهولة في تحديث المحتوى',
        'دقات وضوح عالية وموثوقية تشغيل مستمرة',
      ],
    },
  ],
  portfolio: [
    {
      id: 'port-1',
      title: 'واجهة معمارية متكاملة بألواح الكلادينج الخشبي والرمادي',
      category: 'cladding',
      categoryLabel: 'الكلادينج والواجهات',
      clientName: 'معرض تجاري فاخر',
      location: 'المنصورة / الدقهلية',
      completionYear: '2026',
      description:
        'تكسية كاملة للواجهة الرئيسية بألواح الكلادينج المقاومة للحرائق، بدمج متناسق بين اللون الرمادي المطفي والكلادينج الخشبي الطبيعي، مع إضاءات ليد معمارية مخفية وشاسيهات تثبيت هندسية.',
      featured: true,
      coverImage:
        'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1200&q=85',
      tags: ['كلادينج ACP', 'واجهات معمارية', 'إضاءة مخفية'],
    },
    {
      id: 'port-2',
      title: 'تجهيز وتشطيب المقر الإداري لمجموعة شركات استثمارية',
      category: 'fitout',
      categoryLabel: 'التشطيبات والديكور',
      clientName: 'مقر إداري',
      location: 'القاهرة الجديدة',
      completionYear: '2026',
      description:
        'أعمال تشطيبات داخلية هندسية شملت تركيب قواطع زجاجية سيكوريت عازلة، وبدائل رخام وخشب جدارية، وأسقف جبسوم بورد معمارية مع خطوط إضاءة Linear LED متطورة.',
      featured: true,
      coverImage:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
      tags: ['تشطيبات إدارية', 'قواطع زجاجية', 'بديل رخام'],
    },
    {
      id: 'port-3',
      title: 'واجهة متجر عصري وحروف استانلس ذهبي مضيئة Backlight',
      category: 'storefronts',
      categoryLabel: 'المحلات والمعارض',
      clientName: 'متجر مجوهرات وساعات',
      location: 'السنبلاوين',
      completionYear: '2025',
      description:
        'تصميم وتنفيذ واجهة تجارية راقية تجمع بين تجليد الكلادينج الأسود الملكي وحروف استانلس ستيل ذهبي ثلاثية الأبعاد بإضاءة خلفية دافئة Warm LED.',
      featured: true,
      coverImage:
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
      tags: ['واجهات متاجر', 'حروف استانلس', 'إضاءة خلفية'],
    },
    {
      id: 'port-4',
      title: 'تكسية واجهة برج إداري وزجاج كرتن وول Curtain Wall',
      category: 'cladding',
      categoryLabel: 'الكلادينج والواجهات',
      clientName: 'مبنى تجاري وإداري',
      location: 'الدقهلية',
      completionYear: '2025',
      description:
        'تكسية هندسية بألواح الكلادينج الفضي والرمادي الداكن مع دمج واجهات زجاجية مزدوجة عازلة للحرارة والصوت، مع هيكل حديدي مدروس ضد سرعة الرياح.',
      featured: true,
      coverImage:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
      tags: ['كلادينج أبراج', 'كرتن وول', 'شاسيهات حديد'],
    },
    {
      id: 'port-5',
      title: 'قواطع جدارية وبانوهات CNC معمارية مخصصة',
      category: 'cnc',
      categoryLabel: 'اللوحات والـ CNC',
      clientName: 'صالة استقبال وضيافة',
      location: 'المنصورة',
      completionYear: '2025',
      description:
        'قص وتشكيل زخارف معمارية على ماكينات CNC بدقة متناهية، مدمجة مع أخشاب طبيعية وإضاءة خلفية لإعطاء عمق بصري فخم لصالة الاستقبال.',
      featured: false,
      coverImage:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      tags: ['قص CNC', 'بانوهات خشبية', 'ديكورات جدارية'],
    },
    {
      id: 'port-6',
      title: 'شاشة إعلانية تفاعلية وواجهة معرض سيارات',
      category: 'storefronts',
      categoryLabel: 'المحلات والمعارض',
      clientName: 'معرض سيارات',
      location: 'طريق المنصورة',
      completionYear: '2026',
      description:
        'واجهة زجاجية عملاقة مع تجليد كلادينج وشاشة عرض LED خارجية عالية السطوع لعرض الطرازات بأعلى جودة تحت أشعة الشمس المباشرة.',
      featured: false,
      coverImage:
        'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=85',
      tags: ['معارض تجارية', 'شاشات LED', 'كلادينج'],
    },
  ],
  contact: {
    phonePrimary: COMPANY_INFO.contacts.primary.phoneInternational,
    phoneSecondary: COMPANY_INFO.contacts.secondary.phoneInternational,
    whatsappNumber: COMPANY_INFO.contacts.primary.phoneInternational,
    whatsappDefaultMessage:
      'مرحباً، أود الاستفسار عن خدمات ومشاريع Creative Media في الواجهات والتشطيبات',
    email: '',
    address: COMPANY_INFO.address.fullArabic,
    workingHours: '',
    mapEmbedUrl: '',
    socials: {
      facebook: COMPANY_INFO.socials.facebook,
      instagram: COMPANY_INFO.socials.instagram,
    },
  },
  aboutText: COMPANY_INFO.editorialDescription,
  updatedAt: new Date().toISOString(),
};
