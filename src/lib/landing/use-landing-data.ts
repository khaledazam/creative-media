'use client';

import { useState, useEffect, useCallback } from 'react';
import { LandingPageConfig } from './types';
import { defaultLandingConfig } from './default-data';

const STORAGE_KEY = 'creative_media_landing_config_v5';

function isDataValid(data: LandingPageConfig): boolean {
  if (!data || !Array.isArray(data.portfolio)) return false;
  // If data contains Unsplash or old placeholder titles, it's stale/fake
  const hasFake = data.portfolio.some(
    (p) =>
      p.coverImage?.includes('unsplash.com') ||
      p.title?.includes('معرض تجاري فاخر') ||
      p.clientName === 'معرض تجاري فاخر' ||
      p.clientName === 'مقر إداري' ||
      p.title?.includes('مجموعة شركات استثمارية')
  );
  return !hasFake;
}

export function useLandingData() {
  const [config, setConfig] = useState<LandingPageConfig>(defaultLandingConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from API + localStorage fallback
  useEffect(() => {
    let isMounted = true;

    // Purge old legacy keys
    try {
      localStorage.removeItem('creative_media_landing_config');
      localStorage.removeItem('creative_media_landing_config_v2');
      localStorage.removeItem('creative_media_landing_config_v3');
    } catch {}

    async function load() {
      // 1. Try local storage first for immediate paint
      try {
        const local = localStorage.getItem(STORAGE_KEY);
        if (local) {
          const parsed = JSON.parse(local);
          if (isMounted && isDataValid(parsed)) {
            setConfig(parsed);
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch {}

      // 2. Fetch fresh config from server API with no-store
      try {
        const res = await fetch('/api/landing?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json?.data && isMounted && isDataValid(json.data)) {
            setConfig(json.data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          }
        }
      } catch (err) {
        console.warn('Failed to fetch remote landing config, using cached/default:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    const handleSync = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setConfig(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleSync);

    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const saveConfig = useCallback(async (newConfig: LandingPageConfig): Promise<boolean> => {
    setSaving(true);
    setError(null);
    try {
      // Update state & local storage immediately
      setConfig(newConfig);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));

      // Post to API
      const res = await fetch('/api/landing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });

      if (!res.ok) {
        throw new Error('فشل حفظ التعديلات على الخادم');
      }

      const json = await res.json();
      if (json?.data) {
        setConfig(json.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
      }
      return true;
    } catch (err: unknown) {
      console.error('Error saving landing config:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء الحفظ');
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    config,
    saveConfig,
    loading,
    saving,
    error,
  };
}
