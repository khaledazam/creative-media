'use client';

import dynamic from 'next/dynamic';

const MapPickerBase = dynamic(() => import('./MapPickerBase'), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-white/[0.05] animate-pulse rounded-md flex items-center justify-center text-zinc-500">جاري تحميل الخريطة...</div>
});

interface MapPickerProps {
  label?: string;
  location: string;
  onChange: (loc: string) => void;
}

export function MapPicker({ label, location, onChange }: MapPickerProps) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-zinc-300">{label}</label>}
      <MapPickerBase location={location} onChange={onChange} />
      {location && location.includes(',') && (
        <div className="text-xs text-zinc-400 mt-1 flex justify-between items-center">
          <span>الإحداثيات المحددة: <span dir="ltr">{location}</span></span>
          <a href={`https://www.google.com/maps/search/?api=1&query=${location}`} target="_blank" rel="noreferrer" className="text-brand-500 hover:underline inline-flex items-center gap-1">
            (فتح في خرائط جوجل)
          </a>
        </div>
      )}
    </div>
  );
}
