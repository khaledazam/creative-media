import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { defaultLandingConfig } from '@/lib/landing/default-data';
import { LandingPageConfig } from '@/lib/landing/types';
import { getServiceClient } from '@/lib/api/supabase-service';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const CONFIG_FILE = path.join(DATA_DIR, 'landing-config.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readConfigFromFile(): LandingPageConfig | null {
  try {
    ensureDataDir();
    if (fs.existsSync(CONFIG_FILE)) {
      const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading landing config file:', err);
  }
  return null;
}

function writeConfigToFile(config: LandingPageConfig) {
  ensureDataDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

export async function GET() {
  try {
    // 1. Try file cache first
    const cached = readConfigFromFile();
    if (cached) {
      return NextResponse.json({ success: true, data: cached });
    }

    // 2. Try Supabase landing_settings table if available
    try {
      const service = getServiceClient();
      const { data, error } = await service
        .from('landing_settings')
        .select('config')
        .eq('id', 'default')
        .maybeSingle();

      if (!error && data?.config) {
        writeConfigToFile(data.config);
        return NextResponse.json({ success: true, data: data.config });
      }
    } catch {
      // Ignore if table does not exist yet
    }

    // 3. Fallback to default
    writeConfigToFile(defaultLandingConfig);
    return NextResponse.json({ success: true, data: defaultLandingConfig });
  } catch (error) {
    console.error('Error in GET /api/landing:', error);
    return NextResponse.json({ success: true, data: defaultLandingConfig });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LandingPageConfig;
    if (!body || !body.hero || !body.contact) {
      return NextResponse.json({ error: 'بيانات غير مكتملة' }, { status: 400 });
    }

    const updatedConfig: LandingPageConfig = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // Save to file
    writeConfigToFile(updatedConfig);

    // Optionally try saving to Supabase if table exists
    try {
      const service = getServiceClient();
      await service.from('landing_settings').upsert({
        id: 'default',
        config: updatedConfig,
        updated_at: new Date().toISOString(),
      });
    } catch {
      // Non-fatal if table not created
    }

    return NextResponse.json({ success: true, data: updatedConfig });
  } catch (error) {
    console.error('Error in POST /api/landing:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'فشل حفظ الإعدادات' },
      { status: 500 }
    );
  }
}
