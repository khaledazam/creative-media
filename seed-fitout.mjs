import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("🌱 Starting Fit-out & Contracting Seed...");

  // 1. Get current team members
  const { data: teamMembers, error: teamErr } = await supabase.from('team_members').select('*');
  if (teamErr) {
    console.error("Error fetching team members:", teamErr);
    process.exit(1);
  }
  const memberIds = teamMembers.map(m => m.id);
  const mainMember = memberIds[0] || null;

  console.log(`Found ${memberIds.length} team members.`);

  // 2. Insert Contacts (Clients & Subcontractors)
  const contacts = [
    {
      name: 'عبدالله الراجحي',
      email: 'abdullah@example.com',
      phone: '0501234567',
      company: 'العميل (مالك الفيلا)',
      notes: 'عميل VIP مهتم بالتفاصيل الدقيقة والرخام الإيطالي.',
      color: '#3b82f6',
      created_by: mainMember
    },
    {
      name: 'مؤسسة إنجاز للسباكة',
      email: 'plumbing@enjaz.com',
      phone: '0551122334',
      company: 'مقاول باطن - سباكة',
      notes: 'مقاول معتمد، الدفع بالدفعات.',
      color: '#ef4444',
      created_by: mainMember
    },
    {
      name: 'شركة أضواء الرياض',
      email: 'sales@adwa.com',
      phone: '0532233445',
      company: 'مورد كهرباء وإنارة',
      notes: 'مورد لمفاتيح الإضاءة الذكية.',
      color: '#eab308',
      created_by: mainMember
    }
  ];

  const { data: insertedContacts, error: contactErr } = await supabase
    .from('contacts')
    .insert(contacts)
    .select();
  
  if (contactErr) {
    console.error("Error inserting contacts:", contactErr);
    process.exit(1);
  }
  console.log("✅ Inserted Contacts.");

  // 3. Insert Projects
  const projects = [
    {
      name: 'تشطيب فيلا حي الياسمين',
      description: 'مشروع تشطيب كامل لفيلا سكنية مودرن مع تركيب أنظمة السمارت هوم وتنسيق الحدائق.',
      status: 'active',
      start_date: '2026-09-01',
      due_date: '2027-02-01',
      budget_type: 'amount',
      budget_value: 850000,
      hourly_tracking: false,
      hourly_rate: null,
      autonomous_enabled: false,
      color: '#3b82f6',
    },
    {
      name: 'تجديد مكاتب شركة الأفق',
      description: 'أعمال هدد وتوسعة للمكاتب الإدارية مع توريد وتركيب قواطع زجاجية.',
      status: 'active',
      start_date: '2026-10-01',
      due_date: '2026-11-15',
      budget_type: 'amount',
      budget_value: 120000,
      hourly_tracking: false,
      hourly_rate: null,
      autonomous_enabled: false,
      color: '#10b981',
    }
  ];

  const { data: insertedProjects, error: projectErr } = await supabase
    .from('projects')
    .insert(projects)
    .select();

  if (projectErr) {
    console.error("Error inserting projects:", projectErr);
    process.exit(1);
  }
  console.log("✅ Inserted Projects.");

  const p1 = insertedProjects[0].id;
  const p2 = insertedProjects[1].id;

  // 4. Link Contacts to Projects
  const projectContacts = [
    { project_id: p1, contact_id: insertedContacts[0].id, role: 'Client', is_primary_client: true },
    { project_id: p1, contact_id: insertedContacts[1].id, role: 'Subcontractor', is_primary_client: false },
    { project_id: p2, contact_id: insertedContacts[2].id, role: 'Supplier', is_primary_client: false }
  ];

  const { error: pcErr } = await supabase.from('project_contacts').insert(projectContacts);
  if (pcErr) console.error("Error linking project contacts:", pcErr);

  // 5. Insert Tasks
  const tasks = [
    // Project 1 Tasks
    {
      project_id: p1,
      title: 'اعتماد المخططات المعمارية',
      description: 'مراجعة المخططات النهائية مع العميل واعتمادها قبل بدء التنفيذ.',
      status: 'done',
      priority: 'high',
      due_date: '2026-09-10',
    },
    {
      project_id: p1,
      title: 'أعمال السباكة المعلقة',
      description: 'تمديد مواسير السباكة المعلقة لدورات المياه حسب المخطط.',
      status: 'in_progress',
      priority: 'high',
      due_date: '2026-10-15',
    },
    {
      project_id: p1,
      title: 'تركيب الرخام الإيطالي',
      description: 'توريد وتركيب رخام الأرضيات للدور الأرضي والمجالس.',
      status: 'todo',
      priority: 'medium',
      due_date: '2026-11-01',
    },
    // Project 2 Tasks
    {
      project_id: p2,
      title: 'أعمال الهدد وإزالة المخلفات',
      description: 'إزالة القواطع الجبسية القديمة وترحيل المخلفات للمرمى.',
      status: 'done',
      priority: 'high',
      due_date: '2026-10-05',
    },
    {
      project_id: p2,
      title: 'تركيب القواطع الزجاجية',
      description: 'أخذ المقاسات النهائية وتركيب القواطع.',
      status: 'todo',
      priority: 'medium',
      due_date: '2026-10-25',
    }
  ];

  const { error: taskErr } = await supabase.from('tasks').insert(tasks);
  if (taskErr) {
    console.error("Error inserting tasks:", taskErr);
  } else {
    console.log("✅ Inserted Tasks.");
  }

  console.log("🎉 Seeding completed successfully!");
}

seed();
