'use client';

import { AuthProvider } from '@/lib/auth-context';
import { AppProvider } from '@/lib/store';
import { DemoProvider } from '@/lib/demo-context';
import React from 'react';

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider>
      <AuthProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </AuthProvider>
    </DemoProvider>
  );
}
