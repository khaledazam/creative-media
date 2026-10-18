import fs from 'fs';
import path from 'path';

const realPortfolio = [
  {
    id: 'port-1',
    title: 'مقر ومعرض شركة Creative Media الرئيسي',
    category: 'cladding',
    categoryLabel: 'الكلادينج والواجهات',
    clientName: 'المقر الرسمي للشركة',
    location: 'السنبلاوين، شارع عبد المنعم',
    completionYear: '2026',
    description: 'الواجهة الرسمية لمعرض ومقر الإدارة: كلادينج أبيض ناصع، حروف 3D بإنارة Samsung LED، أعمدة نيون معمارية، وبانوهات خشبية طولية.',
    featured: true,
    coverImage: '/landing/real/creative-media-hq.jpg',
    tags: ['المقر الرسمي', 'كلادينج أبيض', 'أعمدة نيون', 'حروف 3D']
  },
  {
    id: 'port-2',
    title: 'واجهة وبوتيك كافيه Looz الفاخر',
    category: 'signs',
    categoryLabel: 'حروف بارزة ونيون 3D',
    clientName: 'كافيه Looz',
    location: 'الدقهلية',
    completionYear: '2026',
    description: 'واجهة مقوسة بإضاءة كوف مخفية دافئة مع حروف نيون سكريبت بارزة تخطف الأنظار وتشطيب جداري متناسق.',
    featured: true,
    coverImage: '/landing/real/looz-cafe-facade.jpg',
    tags: ['حروف نيون', 'واجهة مقوسة', 'إضاءة كوف', 'أكريليك ليزر']
  },
  {
    id: 'port-3',
    title: 'واجهة برج الجزيرة التجاري (X WOMEN & X BOY)',
    category: 'cladding',
    categoryLabel: 'الكلادينج والواجهات',
    clientName: 'برج الجزيرة',
    location: 'الدقهلية',
    completionYear: '2026',
    description: 'تكسية كاملة لواجهة تجارية كبرى تمتد على طابقين بألواح الكلادينج، حروف نيون ليد خضراء، وقواطع CNC هندسية ومظلة سبوتات.',
    featured: true,
    coverImage: '/landing/real/xboy-xwomen-tower.jpg',
    tags: ['برج تجاري', 'كلادينج طابقين', 'نيون ليد', 'مظلة سبوتات']
  },
  {
    id: 'port-4',
    title: 'مجمع معارض شركة صبحي عبد الغني',
    category: 'cladding',
    categoryLabel: 'الكلادينج والواجهات',
    clientName: 'شركة صبحي عبد الغني',
    location: 'السنبلاوين',
    completionYear: '2026',
    description: 'واجهة عريضة جداً مكسوة ببديل الخشب المعماري المقاوم للشمس مع حروف 3D كهرمانية وأباليك إضاءة مزدوجة علوية وسفلية.',
    featured: true,
    coverImage: '/landing/real/sobhy-abdelghany-storefront.jpg',
    tags: ['تكسية خشبية', 'حروف كهرمانية', 'إضاءة Up-Down']
  },
  {
    id: 'port-5',
    title: 'مبنى سفريات الدلتا الدائري (واجهة ناصية)',
    category: 'cladding',
    categoryLabel: 'الكلادينج والواجهات',
    clientName: 'شركة سفريات الدلتا ومحمد رزق',
    location: 'الدقهلية',
    completionYear: '2025',
    description: 'تكسية واجهة ناصية دائرية معقدة هندسياً بشرائط كلادينج انسيابية، زجاج كرتن وول أزرق عاكس، وبوابة ليزر CNC ذهبية.',
    featured: true,
    coverImage: '/landing/real/delta-travel-corner-building.jpg',
    tags: ['ناصية دائرية', 'كرتن وول', 'بوابة ليزر ذهبية']
  },
  {
    id: 'port-6',
    title: 'واجهة متجر DUCK للأزياء (طابع مينيماليست)',
    category: 'storefronts',
    categoryLabel: 'المحلات والمعارض',
    clientName: 'متجر DUCK للأزياء',
    location: 'الدقهلية',
    completionYear: '2026',
    description: 'واجهة عصرية بنظام الكلادينج الرمادي المطفأ، مع سبوتات إضاءة غاطسة، حروف بيضاء 3D بارزة، ومدخل زجاجي مؤطر.',
    featured: false,
    coverImage: '/landing/real/duck-storefront.jpg',
    tags: ['مينيماليست', 'سبوتات غاطسة', 'حروف بيضاء 3D']
  },
  {
    id: 'port-7',
    title: 'واجهات DOGRY & BAZLAM التجارية الموحدة',
    category: 'storefronts',
    categoryLabel: 'المحلات والمعارض',
    clientName: 'DOGRY للأحذية & BAZLAM',
    location: 'الدقهلية',
    completionYear: '2026',
    description: 'تجليد متناسق لمتجرين متجاورين بألواح الكلادينج الأسود اللامع وبانوهات خشبية طولية وشعارات الماركات العالمية بدقة الليزر.',
    featured: false,
    coverImage: '/landing/real/dogry-bazlam-double.jpg',
    tags: ['كلادينج أسود لامع', 'بانوهات خشبية', 'أكريليك ليزر']
  },
  {
    id: 'port-8',
    title: 'تطوير واجهة مطعم أبو أحمد السوري (Before & After)',
    category: 'before-after',
    categoryLabel: 'مشاريع قبل وبعد',
    clientName: 'مطعم أبو أحمد السوري',
    location: 'الدقهلية',
    completionYear: '2026',
    description: 'تحويل واجهة قديمة متهالكة إلى واجهة كلادينج حمراء لامعة متناسقة مع الهوية السورية، مع حروف أكريليك مضيئة وهبوط إضاءة متجانس.',
    featured: true,
    coverImage: '/landing/real/abu-ahmad-after.jpg',
    beforeImage: '/landing/real/abu-ahmad-before.jpg',
    tags: ['قبل وبعد', 'كلادينج أحمر', 'حروف مضيئة']
  },
  {
    id: 'port-9',
    title: 'تجديد كاونتر الكاشير والاستقبال (Before & After)',
    category: 'before-after',
    categoryLabel: 'مشاريع قبل وبعد',
    clientName: 'معرض تجاري',
    location: 'الدقهلية',
    completionYear: '2026',
    description: 'إعادة بناء كاونتر الكاشير بالكامل من هيكل خشبي تقليدي قديم إلى كاونتر تجليد رخامي هندسي حديث مع بانوهات إضاءة مخفية.',
    featured: true,
    coverImage: '/landing/real/counter-cashier-after.jpg',
    beforeImage: '/landing/real/counter-cashier-before.jpg',
    tags: ['قبل وبعد', 'كاونتر رخامي', 'بانوهات ليد']
  },
  {
    id: 'port-10',
    title: 'تجليد وتكسيات جدارية ديكورية (هوم إن)',
    category: 'fitout',
    categoryLabel: 'التشطيبات والديكور',
    clientName: 'معرض هوم إن',
    location: 'الدقهلية',
    completionYear: '2026',
    description: 'أعمال تكسيات داخلية وبدائل خشب ورخام جدارية بمستوى تشطيب فندقي متقن ومظهر حديث يجذب الزوار.',
    featured: false,
    coverImage: '/landing/real/homein-installation.jpg',
    tags: ['تشطيبات تجارية', 'بديل خشب', 'تكسيات جدارية']
  },
  {
    id: 'port-11',
    title: 'كواليس الورشة: تشكيل الحروف المضيئة 3D',
    category: 'workshop',
    categoryLabel: 'كواليس الورشة والتصنيع',
    clientName: 'ورشة Creative Media',
    location: 'السنبلاوين',
    completionYear: '2026',
    description: 'مراحل تشكيل وقص الحروف بماكينات الفايبر ليزر والراوتر، وتثبيت ليدات Samsung الأصلية مع عوازل السيليكون ومقاومة المياه.',
    featured: false,
    coverImage: '/landing/real/workshop-letters-fabrication.jpg',
    tags: ['قص فايبر ليزر', 'تجميع يدوي', 'Samsung LED']
  },
  {
    id: 'port-12',
    title: 'كواليس الورشة: تجميع شيلدات الإعلانات والهياكل',
    category: 'workshop',
    categoryLabel: 'كواليس الورشة والتصنيع',
    clientName: 'ورشة التصنيع والحديد',
    location: 'السنبلاوين',
    completionYear: '2026',
    description: 'تصنيع هياكل الحديد الثقيل وشاسيهات التثبيت المقاومة للرياح مع معالجة كاملة بدهانات ضد الصدأ قبل الخروج للموقع.',
    featured: false,
    coverImage: '/landing/real/workshop-shields-assembly.jpg',
    tags: ['شاسيهات حديد', 'معالجة ضد الصدأ', 'هياكل إعلانية']
  }
];

const configFilePath = path.join(process.cwd(), 'src', 'data', 'landing-config.json');
const current = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
current.portfolio = realPortfolio;
fs.writeFileSync(configFilePath, JSON.stringify(current, null, 2), 'utf-8');
console.log('Successfully updated landing-config.json with all 12 real projects!');
