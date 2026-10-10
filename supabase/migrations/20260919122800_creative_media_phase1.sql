-- Migration: Creative Media Phase 1

-- 1. Enum for Service Types
CREATE TYPE service_type_enum AS ENUM (
  'دعاية وإعلان',
  'كلادينج',
  'تشطيبات داخلية',
  'تشطيبات خارجية',
  'لافتات',
  'هوية بصرية',
  'طباعة',
  'تركيب',
  'أخرى'
);

-- 2. Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    company_name TEXT,
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    source TEXT,
    service_type service_type_enum,
    estimated_value NUMERIC(12,2),
    assigned_to UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'جديد',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Customers Table Extension (Assume customers exists or we create it)
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    company_name TEXT,
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    address TEXT,
    tax_number TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Quotations Table
CREATE TABLE IF NOT EXISTS public.quotations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quotation_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id),
    project_id UUID, -- References projects later
    service_type service_type_enum,
    status TEXT DEFAULT 'مسودة',
    subtotal NUMERIC(12,2) DEFAULT 0,
    discount NUMERIC(12,2) DEFAULT 0,
    tax NUMERIC(12,2) DEFAULT 0,
    total NUMERIC(12,2) DEFAULT 0,
    valid_until TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Quotation Items
CREATE TABLE IF NOT EXISTS public.quotation_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quotation_id UUID REFERENCES public.quotations(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity NUMERIC(10,2) NOT NULL,
    unit TEXT,
    unit_price NUMERIC(12,2) NOT NULL,
    discount NUMERIC(12,2) DEFAULT 0,
    total NUMERIC(12,2) NOT NULL
);

-- 6. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    customer_id UUID REFERENCES public.customers(id),
    type service_type_enum,
    description TEXT,
    status TEXT DEFAULT 'جديد',
    progress INTEGER DEFAULT 0,
    start_date TIMESTAMP WITH TIME ZONE,
    due_date TIMESTAMP WITH TIME ZONE,
    assigned_manager UUID REFERENCES auth.users(id),
    quotation_id UUID REFERENCES public.quotations(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.quotations ADD CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES public.projects(id);

-- 7. Site Visits
CREATE TABLE IF NOT EXISTS public.site_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id),
    customer_id UUID REFERENCES public.customers(id),
    visit_date TIMESTAMP WITH TIME ZONE,
    location TEXT,
    measurements TEXT,
    notes TEXT,
    photos JSONB,
    assigned_to UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'مجدولة',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
