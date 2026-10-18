import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('public/landing');
const destDir = path.resolve('public/landing/real');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Map selected best real images to clean semantic names
const imageMap = [
  // 1. Creative Media Official HQ & Showroom
  {
    src: 'WhatsApp Image 2026-10-18 at 1.45.59 PM.jpeg',
    dest: 'creative-media-hq.jpg',
    title: 'مقر ومعرض Creative Media',
    category: 'واجهات ومعارض',
    desc: 'واجهة المقر الرئيسي لـ Creative Media بالسنبلاوين: كلادينج أبيض فاخر، حروف 3D مضيئة، وأعمدة نيون معمارية.'
  },
  {
    src: 'WhatsApp Image 2026-10-18 at 1.45.59 PM (1).jpeg',
    dest: 'creative-media-hq-night.jpg',
    title: 'مقر Creative Media ليلاً',
    category: 'واجهات ومعارض',
    desc: 'توزيع الإضاءة المعمارية المخفية والنيون في واجهة مقر Creative Media.'
  },

  // 2. Luxury Boutique & Cafe "Looz"
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.57 PM (2).jpeg',
    dest: 'looz-cafe-facade.jpg',
    title: 'واجهة كافيه وبوتيك Looz الفاخر',
    category: 'حروف نيون ويافطات 3D',
    desc: 'واجهة مقوسة بإضاءة كوف مخفية مع حروف نيون سكريبت مضيئة بتوهج دافئ.'
  },
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.57 PM (1).jpeg',
    dest: 'looz-cafe-interior.jpg',
    title: 'كافيه Looz - تشطيب داخلي ونيون',
    category: 'تشطيبات وديكور',
    desc: 'تشطيب داخلي متكامل مع كتابة نيون جدارية مخصصة وإضاءات سبوت لايت.'
  },
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.57 PM (4).jpeg',
    dest: 'looz-cafe-daylight.jpg',
    title: 'واجهة كافيه Looz نهاراً',
    category: 'واجهات كلادينج',
    desc: 'تشطيب الألواح والزوايا الدائرية بدقة هندسية تحت ضوء النهار.'
  },

  // 3. Multi-level Commercial Tower "X WOMEN / X BOY" (برج الجزيرة)
  {
    src: 'WhatsApp Image 2026-10-18 at 1.46.01 PM.jpeg',
    dest: 'xboy-xwomen-tower.jpg',
    title: 'واجهة برج الجزيرة - X WOMEN & X BOY',
    category: 'واجهات كلادينج',
    desc: 'واجهة تجارية من طابقين مع مظلة كلادينج، حروف نيون خضراء 3D، وتكسيات زخرفية بالـ CNC.'
  },
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.58 PM.jpeg',
    dest: 'xboy-xwomen-night.jpg',
    title: 'برج الجزيرة التجاري ليلاً',
    category: 'حروف نيون ويافطات 3D',
    desc: 'حضور بصري ملفت من مسافة بعيدة عبر ليدات السطوع العالي والكلادينج الأبيض.'
  },

  // 4. Large Commercial Facade "شركة صبحي عبد الغني"
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.45 PM.jpeg',
    dest: 'sobhy-abdelghany-storefront.jpg',
    title: 'مجمع معارض صبحي عبد الغني',
    category: 'واجهات كلادينج',
    desc: 'واجهة تجارية ضخمة مكسوة ببديل الخشب المعماري، حروف 3D كهرمانية، وأباليك إضاءة هندسية مزدوجة.'
  },
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.46 PM.jpeg',
    dest: 'sobhy-abdelghany-daytime.jpg',
    title: 'تركيب واجهة صبحي عبد الغني نهاراً',
    category: 'من أرض الواقع',
    desc: 'فريق العمل الميداني أثناء رفع وتركيب ألواح الكلادينج والحروف البارزة.'
  },

  // 5. Modern Minimalist Storefront "DUCK"
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.56 PM.jpeg',
    dest: 'duck-storefront.jpg',
    title: 'واجهة متجر DUCK العصرية',
    category: 'واجهات كلادينج',
    desc: 'تصميم مينيماليست رمادي حديث مع فتحات تهوية CNC وإضاءات سبوت مدمجة ومدخل زجاجي ذهبي.'
  },
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.56 PM (3).jpeg',
    dest: 'duck-storefront-perspective.jpg',
    title: 'منظور مدخل DUCK',
    category: 'واجهات كلادينج',
    desc: 'دقة استقامة الشاسيهات والتقفيل الهندسي للكلادينج المقاوم للحرائق.'
  },

  // 6. Corner Commercial Building "سفريات الدلتا"
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.55 PM.jpeg',
    dest: 'delta-travel-corner-building.jpg',
    title: 'مبنى سفريات الدلتا الدائري',
    category: 'واجهات كلادينج',
    desc: 'تكسية واجهة ناصية دائرية بشرائط كلادينج زرقاء انسيابية وزجاج عاكس أزرق على ارتفاع طابقين.'
  },
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.54 PM (3).jpeg',
    dest: 'delta-travel-wide.jpg',
    title: 'واجهة سفريات الدلتا ومحمد رزق',
    category: 'واجهات كلادينج',
    desc: 'دمج واجهة الكلادينج مع بوابة ليزر CNC ذهبية مطعمة بالزخارف الإسلامية.'
  },

  // 7. Storefront "HOME IN" installation
  {
    src: 'WhatsApp Image 2026-10-18 at 1.45.48 PM.jpeg',
    dest: 'homein-installation.jpg',
    title: 'تركيب واجهة HOME IN المضيئة',
    category: 'من أرض الواقع',
    desc: 'فنيو Creative Media أثناء تركيب صندوق الإضاءة الباك لايت والعمود النيوني المضيء.'
  },

  // 8. Transformation Project: "أبو أحمد السوري" (Before & After)
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.51 PM.jpeg',
    dest: 'abu-ahmad-after.jpg',
    title: 'واجهة أبو أحمد السوري (بعد التنفيذ)',
    category: 'قبل وبعد',
    desc: 'بوابة كلادينج حمراء لامعة مع حروف أكريليك مضيئة وإضاءات هبوط مدمجة.'
  },
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.52 PM (1).jpeg',
    dest: 'abu-ahmad-before.jpg',
    title: 'موقع أبو أحمد السوري (قبل التنفيذ)',
    category: 'قبل وبعد',
    desc: 'الحالة الإنشائية القديمة قبل تدخل فريق Creative Media وتجديد الواجهة بالكامل.'
  },

  // 9. Dual Storefront "DOGRY & BAZLAM"
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.53 PM (3).jpeg',
    dest: 'dogry-bazlam-double.jpg',
    title: 'واجهات DOGRY & BAZLAM الموحدة',
    category: 'واجهات كلادينج',
    desc: 'تصميم تجاري موحد بألواح الكلادينج الأسود اللامع وبانوهات خشبية وحروف 3D حادة.'
  },
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.53 PM.jpeg',
    dest: 'dogry-shoes-facade.jpg',
    title: 'واجهة DOGRY للأحذية',
    category: 'واجهات كلادينج',
    desc: 'تجليد أسود كامل مع شعارات الماركات العالمية المنفذة بالأكريليك الليزر.'
  },

  // 10. Reception & Cashier Counter (Before & After)
  {
    src: 'WhatsApp Image 2026-10-18 at 1.45.50 PM.jpeg',
    dest: 'counter-cashier-after.jpg',
    title: 'كاونتر استقبال كلادينج فضي (بعد التنفيذ)',
    category: 'تشطيبات وديكور',
    desc: 'كاونتر كاشير مع حواف دائرية مكسوة بألواح كلادينج فضي ميتاليك وحروف بارزة Pay here.'
  },
  {
    src: 'WhatsApp Image 2026-10-18 at 1.45.58 PM.jpeg',
    dest: 'counter-cashier-before.jpg',
    title: 'كاونتر الكاشير أثناء التركيب (BM BOND)',
    category: 'من أرض الواقع',
    desc: 'استخدام ألواح BM BOND الإماراتية المعتمدة بضمان 15 سنة وتشكيلها على الشاسيه.'
  },

  // 11. Luxury Marble/Granite & 3D Shield "AHA"
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.49 PM (2).jpeg',
    dest: 'aha-tires-facade.jpg',
    title: 'واجهة درع AHA لتجارة الكاوتش',
    category: 'حروف نيون ويافطات 3D',
    desc: 'تكسية رخام جالاكسي مع درع إعلاني 3D بارز وحروف أكريليك بيضاء مضيئة.'
  },

  // 12. Inside Creative Media Workshop
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.50 PM (1).jpeg',
    dest: 'workshop-letters-fabrication.jpg',
    title: 'تصنيع الحروف البارزة بورشة العمل',
    category: 'من أرض الواقع',
    desc: 'تجهيز وقص وتجميع الحروف والأرقام الأكريليك بالألياف الضوئية داخل الورشة.'
  },
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.49 PM (4).jpeg',
    dest: 'workshop-shields-assembly.jpg',
    title: 'تجميع الدروع الإعلانية 3D بالورشة',
    category: 'من أرض الواقع',
    desc: 'تركيب طبقات الأكريليك الميرور الذهبي والإنارة الداخلية قبل النقل للموقع.'
  },

  // 13. Large Multi-story Building "شركة فلورنسا للتطوير العقاري"
  {
    src: 'WhatsApp Image 2026-10-18 at 1.53.58 PM (2).jpeg',
    dest: 'florence-real-estate-building.jpg',
    title: 'مشروع كلادينج أبراج شركة فلورنسا',
    category: 'واجهات كلادينج',
    desc: 'شاسيهات وسقالات معدنية لتكسية أعمدة وكمرات مبنى تجاري وإداري بألواح Master Panel.'
  }
];

let copied = 0;
for (const item of imageMap) {
  const sourcePath = path.join(srcDir, item.src);
  const targetPath = path.join(destDir, item.dest);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    copied++;
  } else {
    console.warn(`File not found: ${item.src}`);
  }
}

console.log(`Successfully organized and copied ${copied} real project photos to /public/landing/real/`);
