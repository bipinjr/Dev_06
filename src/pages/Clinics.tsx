import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Star, Search } from 'lucide-react';
import MapPicker from '@/components/MapPicker';
import { bangaloreClinics, type Clinic } from '@/data/clinics';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

const ClinicsMap = ({ clinics, selected, onSelect }: { clinics: Clinic[]; selected: string | null; onSelect: (id: string) => void }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current).setView([12.9716, 77.5946], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    clinics.forEach(clinic => {
      const marker = L.marker([clinic.latitude, clinic.longitude], { icon: redIcon }).addTo(map);
      marker.bindPopup(`<strong>${clinic.name}</strong><br/>${clinic.phone}`);
      marker.on('click', () => onSelect(clinic.id));
    });

    mapInstance.current = map;
    return () => { map.remove(); mapInstance.current = null; };
  }, [clinics]);

  useEffect(() => {
    if (!mapInstance.current || !selected) return;
    const clinic = clinics.find(c => c.id === selected);
    if (clinic) mapInstance.current.setView([clinic.latitude, clinic.longitude], 15);
  }, [selected, clinics]);

  return <div ref={mapRef} className="h-[400px] w-full rounded-xl" />;
};

const Clinics = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = bangaloreClinics.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase()) ||
    c.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container py-8">
      <h1 className="mb-2 font-heading text-3xl font-bold">Nearby Pet Clinics</h1>
      <p className="mb-6 text-muted-foreground">Find veterinary clinics and rescue centres across Bangalore</p>

      <ClinicsMap clinics={filtered} selected={selected} onSelect={setSelected} />

      <div className="mt-6 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search clinics by name, area, or specialty..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map(clinic => (
          <Card
            key={clinic.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${selected === clinic.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelected(clinic.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="font-heading text-lg">{clinic.name}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-warning">
                  <Star className="h-4 w-4 fill-current" />
                  {clinic.rating}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{clinic.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <a href={`tel:${clinic.phone}`} className="text-primary underline">{clinic.phone}</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{clinic.hours}</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {clinic.specialties.map(s => (
                  <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                ))}
              </div>
              <Button size="sm" variant="outline" className="mt-2 w-full" asChild>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${clinic.latitude},${clinic.longitude}`} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-1 h-4 w-4" />Get Directions
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clinics;
