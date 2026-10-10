import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getServiceClient } from '@/lib/api/supabase-service';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function saveInquiryLocal(inquiry: Record<string, unknown>) {
  try {
    ensureDataDir();
    let inquiries: unknown[] = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      try {
        inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
      } catch {}
    }
    inquiries.unshift(inquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries.slice(0, 200), null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save inquiry locally:', err);
  }
}

export async function GET() {
  try {
    ensureDataDir();
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return NextResponse.json({ success: true, data: JSON.parse(raw) });
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (err) {
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, company_name, service_type, notes } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'يرجى كتابة الاسم ورقم الهاتف على الأقل' },
        { status: 400 }
      );
    }

    const newInquiry = {
      id: `inq-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : null,
      company_name: company_name ? company_name.trim() : null,
      service_type: service_type || 'طلب عام',
      notes: notes ? notes.trim() : null,
      source: 'موقع Creative Media (صفحة الهبوط)',
      created_at: new Date().toISOString(),
      status: 'جديد',
    };

    // 1. Always back up locally so no lead is lost
    saveInquiryLocal(newInquiry);

    // 2. Try inserting into Supabase leads table
    try {
      const service = getServiceClient();
      const { data, error } = await service
        .from('leads')
        .insert({
          name: newInquiry.name,
          company_name: newInquiry.company_name,
          phone: newInquiry.phone,
          whatsapp: newInquiry.phone,
          email: newInquiry.email,
          source: newInquiry.source,
          status: 'جديد',
          notes: newInquiry.notes ? `[طلب من الموقع]: ${newInquiry.notes} | الخدمة: ${newInquiry.service_type}` : `[طلب من الموقع]: مهتم بخدمة ${newInquiry.service_type}`,
        })
        .select()
        .maybeSingle();

      if (!error && data) {
        return NextResponse.json({
          success: true,
          message: 'تم استلام طلبكم بنجاح وسيتواصل معكم فريقنا في أقرب وقت',
          leadId: data.id,
        });
      }
    } catch (dbErr) {
      console.warn('Could not insert to Supabase leads, inquiry saved to local ledger:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'تم استلام طلبكم بنجاح وسيتواصل معكم فريقنا في أقرب وقت',
      leadId: newInquiry.id,
    });
  } catch (error) {
    console.error('Error processing landing page lead:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة' },
      { status: 500 }
    );
  }
}
