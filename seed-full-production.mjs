import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedFullProduction() {
  console.log("🚀 Starting Full Production Dashboard Seed...");

  // 1. Get main team member
  const { data: teamMembers } = await supabase.from('team_members').select('*');
  const mainMember = teamMembers?.[0]?.id || null;

  // 2. Clean up existing tasks, project_contacts, and projects
  console.log("🧹 Cleaning up old project and task duplicates...");
  await supabase.from('tasks').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('project_contacts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('leads').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // 3. Insert 5 realistic fit-out & contracting projects
  console.log("🏗️ Inserting Projects...");
  const projectsData = [
    {
      name: 'تشطيب فيلا حي الياسمين',
      description: 'تشطيبات داخلية متكاملة لفيلا سكنية مودرن مع سمارت هوم وأرضيات رخام.',
      status: 'active',
      start_date: '2026-09-01',
      due_date: '2026-12-15',
      budget_type: 'amount',
      budget_value: 650000,
      hourly_tracking: false,
      hourly_rate: null,
      autonomous_enabled: false,
      color: '#3b82f6',
    },
    {
      name: 'تجهيز مقر شركة الأفق للاستثمار',
      description: 'أعمال قواطع زجاجية سيكوريت، شبكات، وأسقف معلقة ودهانات ديكورية للمكاتب.',
      status: 'active',
      start_date: '2026-09-15',
      due_date: '2026-11-10',
      budget_type: 'amount',
      budget_value: 280000,
      hourly_tracking: false,
      hourly_rate: null,
      autonomous_enabled: false,
      color: '#10b981',
    },
    {
      name: 'واجهة وكلادينج مطعم La Piazza',
      description: 'تصنيع وتركيب تجليد كلادينج خارجي مقاوم للحريق وشاسيه حديد مع لافتة مضيئة.',
      status: 'active',
      start_date: '2026-09-20',
      due_date: '2026-10-20',
      budget_type: 'amount',
      budget_value: 125000,
      hourly_tracking: false,
      hourly_rate: null,
      autonomous_enabled: false,
      color: '#f59e0b',
    },
    {
      name: 'تشطيب وتأثيث كافيه ريفا التجمع',
      description: 'تشطيبات وديكور كامل يشمل أعمال الكهرباء، النجارة، الديكورات الخشبية، وتنسيق الإضاءة.',
      status: 'active',
      start_date: '2026-10-01',
      due_date: '2026-12-30',
      budget_type: 'amount',
      budget_value: 420000,
      hourly_tracking: false,
      hourly_rate: null,
      autonomous_enabled: false,
      color: '#8b5cf6',
    },
    {
      name: 'تصميم وتنفيذ صالون إيليت التخصصي',
      description: 'أعمال تجديد وترميم كاملة تشمل السباكة والأرضيات ووحدات الديكور.',
      status: 'active',
      start_date: '2026-08-15',
      due_date: '2026-09-28', // Intentionally past due date to demonstrate overdue alerts!
      budget_type: 'amount',
      budget_value: 190000,
      hourly_tracking: false,
      hourly_rate: null,
      autonomous_enabled: false,
      color: '#ef4444',
    }
  ];

  const { data: insertedProjects, error: prjErr } = await supabase
    .from('projects')
    .insert(projectsData)
    .select();

  if (prjErr) {
    console.error("Error inserting projects:", prjErr);
    process.exit(1);
  }
  console.log(`✅ Inserted ${insertedProjects.length} distinct projects.`);

  // 4. Insert 8 Realistic Leads across all pipeline stages
  console.log("👥 Inserting Leads...");
  const leadsData = [
    {
      name: 'م. تركي الخالدي',
      email: 'turki@al-khaldi.com',
      phone: '0501234567',
      company: 'فيلا خاصة - حي النرجس',
      source: 'referral',
      status: 'new',
      notes: 'طلب مقايسة أولية لتشطيب فيلا 450 متر مسطح، يرغب بتشطيب الترا سوبر لوكس.'
    },
    {
      name: 'د. سارة المنصور',
      email: 'sara@newcare-clinic.com',
      phone: '0559876543',
      company: 'مجمع عيادات نيو كير',
      source: 'website',
      status: 'new',
      notes: 'تجهيز 6 عيادات طبية متخصصة مع أرضيات فينيل أنتي بكتيريا وأسقف معلقة.'
    },
    {
      name: 'أحمد محمود العبدلي',
      email: 'ahmed@alsahab.sa',
      phone: '0543219876',
      company: 'مؤسسة السحاب التجارية',
      source: 'social',
      status: 'contacted',
      notes: 'تم التواصل هاتفياً وإرسال سابقة الأعمال، بانتظار إرسال المخطط المعماري.'
    },
    {
      name: 'م. عبدالعزيز الشريف',
      email: 'al-shareef@madar-dev.com',
      phone: '0567891234',
      company: 'شركة مدار للتطوير العقاري',
      source: 'network',
      status: 'contacted',
      notes: 'مشروع مكاتب إدارية في برج العليا، تم تحديد موعد المعاينة يوم الثلاثاء القادم.'
    },
    {
      name: 'شركة الأندلس العقارية',
      email: 'projects@alandalus.com',
      phone: '0505544332',
      company: 'الأندلس العقارية',
      source: 'referral',
      status: 'qualified',
      notes: 'تمت الزيارة الميدانية وتحديد نطاق العمل لـ 4 وحدات دوبلكس فاخرة.'
    },
    {
      name: 'سلطان القحطاني',
      email: 'sultan@alqahtani-est.com',
      phone: '0533322114',
      company: 'شاليه مودرن - بنبان',
      source: 'cold_outreach',
      status: 'qualified',
      notes: 'ميزانية معتمدة 350 ألف، جاهز للبدء فور إنهاء عروض الأسعار.'
    },
    {
      name: 'شركة أفق الاستثمارية',
      email: 'info@ofok-invest.com',
      phone: '0501199887',
      company: 'أفق القابضة',
      source: 'network',
      status: 'proposal',
      notes: 'تم تقديم عرض السعر النهائي (QT-2026-003) وبانتظار اعتماد التوقيع.'
    },
    {
      name: 'مجموعة المهيدب التجارية',
      email: 'procurement@muhaidib.com',
      phone: '0554477889',
      company: 'المهيدب أوتوموتيف',
      source: 'referral',
      status: 'won',
      notes: 'تم توقيع العقد النهائي وسداد الدفعة المقدمة بنجاح.'
    }
  ];

  const { data: insertedLeads, error: leadsErr } = await supabase
    .from('leads')
    .insert(leadsData)
    .select();

  if (leadsErr) {
    console.error("Error inserting leads:", leadsErr);
  } else {
    console.log(`✅ Inserted ${insertedLeads.length} leads across all stages.`);
  }

  // 5. Insert Realistic Tasks for Projects
  console.log("📋 Inserting Tasks...");
  const p1 = insertedProjects[0].id; // فيلا الياسمين
  const p2 = insertedProjects[1].id; // مكاتب الأفق
  const p3 = insertedProjects[2].id; // مطعم La Piazza
  const p4 = insertedProjects[3].id; // كافيه ريفا
  const p5 = insertedProjects[4].id; // صالون إيليت (Overdue)

  const tasksData = [
    // فيلا الياسمين
    {
      project_id: p1,
      title: 'اعتماد المخططات المعمارية والتنفيذية',
      description: 'مراجعة المخططات الهندسية وتوزيع الفرش والكهرباء مع العميل.',
      status: 'done',
      priority: 'high',
      due_date: '2026-09-10',
    },
    {
      project_id: p1,
      title: 'أعمال السباكة المعلقة واختبار الضغط',
      description: 'تمديد مواسير الصرف والتغذية مع اختبار الضغط بشهادة معتمدة من الشركة المصنعة.',
      status: 'in_progress',
      priority: 'urgent',
      due_date: '2026-10-18',
    },
    {
      project_id: p1,
      title: 'تأسيس شبكة الكهرباء الذكية (Smart Home)',
      description: 'سحب أسلاك الكات 6 وتجهيز لوحات التحكم لإنارة وسيناريوهات السمارت.',
      status: 'in_progress',
      priority: 'high',
      due_date: '2026-10-25',
    },
    {
      project_id: p1,
      title: 'توريد وتركيب رخام الأرضيات الإيطالي',
      description: 'استلام بالات الرخام وبدء أعمال القص والتركيب بالغراء والكلبسات.',
      status: 'todo',
      priority: 'medium',
      due_date: '2026-11-15',
    },

    // مكاتب الأفق
    {
      project_id: p2,
      title: 'أعمال الهدد وإزالة القواطع الجبسية القديمة',
      description: 'تفريغ المساحة وترحيل مخلفات الهدم بالتنسيق مع إدارة المبنى.',
      status: 'done',
      priority: 'high',
      due_date: '2026-09-25',
    },
    {
      project_id: p2,
      title: 'تركيب قواطع الزجاج السيكوريت 10 مم',
      description: 'تثبيت البروفايلات الألومنيوم وتركيب الزجاج والأبواب الهيدروليكية.',
      status: 'in_progress',
      priority: 'high',
      due_date: '2026-10-22',
    },

    // واجهة La Piazza
    {
      project_id: p3,
      title: 'تركيب شاسيه الحديد المجلفن للواجهة',
      description: 'لحام وتثبيت الشاسيه الحامل لألواح الكلادينج واللافتة الرئيسية.',
      status: 'done',
      priority: 'high',
      due_date: '2026-10-02',
    },
    {
      project_id: p3,
      title: 'تجليد ألواح الكلادينج المقاوم للحريق وتوصيل الإضاءة',
      description: 'تركيب الشرائح مع عزل الفواصل وتركيب الليدات المخفية.',
      status: 'in_progress',
      priority: 'urgent',
      due_date: '2026-10-14',
    },

    // صالون إيليت (Overdue task to trigger alerts)
    {
      project_id: p5,
      title: 'تسليم أعمال السباكة السفلية للاستشاري',
      description: 'معاينة وفحص غرف التفتيش والتوصيلات ومطابقتها للمخطط.',
      status: 'in_progress',
      priority: 'urgent',
      due_date: '2026-09-24', // Past due date!
    },
    {
      project_id: p5,
      title: 'إنهاء صبة التسوية وعزل الحمامات',
      description: 'عزل ممبرين 4 مم واختبار المياه لمدة 48 ساعة.',
      status: 'in_progress',
      priority: 'high',
      due_date: '2026-09-27', // Past due date!
    }
  ];

  const { error: taskErr } = await supabase.from('tasks').insert(tasksData);
  if (taskErr) {
    console.error("Error inserting tasks:", taskErr);
  } else {
    console.log(`✅ Inserted ${tasksData.length} tasks (including overdue ones for alerts).`);
  }

  console.log("🎉 Full Production Seed Finished Successfully!");
}

seedFullProduction();
