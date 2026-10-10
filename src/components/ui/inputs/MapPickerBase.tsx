'use client';

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapPickerBaseProps {
  location: string;
  onChange: (location: string) => void;
}

function LocationMarker({ position, setPosition }: { position: L.LatLng | null, setPosition: (p: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : <Marker position={position} icon={icon} />;
}

function AutoLocate({ setPosition, hasInitialLocation }: { setPosition: (p: L.LatLng) => void, hasInitialLocation: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (!hasInitialLocation && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const userPos = new L.LatLng(latitude, longitude);
          setPosition(userPos);
          map.flyTo(userPos, 14);
        },
        (err) => {
          console.error("Error getting location:", err);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, [hasInitialLocation, map, setPosition]);
  
  return null;
}

export default function MapPickerBase({ location, onChange }: MapPickerBaseProps) {
  const defaultCenter = [24.7136, 46.6753] as [number, number]; // Riyadh
  const [currentPos, setCurrentPos] = useState<L.LatLng | null>(null);

  useEffect(() => {
    if (location && location.includes(',')) {
      const [lat, lng] = location.split(',').map(Number);
      if (!isNaN(lat) && !isNaN(lng)) {
        setCurrentPos(new L.LatLng(lat, lng));
      }
    }
  }, [location]);

  const handlePositionChange = (p: L.LatLng) => {
    setCurrentPos(p);
    onChange(`${p.lat.toFixed(6)},${p.lng.toFixed(6)}`);
  };

  return (
    <div style={{ height: '300px' }} className="w-full rounded-md overflow-hidden border border-white/[0.1] relative z-0">
      <MapContainer 
        center={currentPos || defaultCenter} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={currentPos} setPosition={handlePositionChange} />
        <AutoLocate setPosition={handlePositionChange} hasInitialLocation={!!(location && location.includes(','))} />
      </MapContainer>
    </div>
  );
}