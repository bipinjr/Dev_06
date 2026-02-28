import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MapPicker from '@/components/MapPicker';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Upload, MapPin } from 'lucide-react';

const animalTypes = ['Dog', 'Cat', 'Bird', 'Cow', 'Other'];

const ReportAnimal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    animal_type: '',
    description: '',
    condition: '',
    address: '',
    city: 'Bangalore',
    state: 'Karnataka',
    landmark: '',
    contact_phone: '',
    latitude: 12.9716,
    longitude: 77.5946,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, WebP, and GIF images are allowed');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!form.animal_type) { toast.error('Please select animal type'); return; }
    if (!form.description.trim()) { toast.error('Please describe the situation'); return; }
    if (!form.address.trim()) { toast.error('Please enter the address'); return; }

    setLoading(true);
    try {
      let imageUrls: string[] = [];

      if (imageFile) {
        const safeExt = imageFile.type.split('/')[1] || 'jpg';
        const filePath = `${user.id}/${Date.now()}.${safeExt}`;
        const { error: uploadError } = await supabase.storage
          .from('report-images')
          .upload(filePath, imageFile);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('report-images').getPublicUrl(filePath);
        imageUrls = [publicUrl];
      }

      const { error } = await supabase.from('rescue_reports').insert({
        reporter_id: user.id,
        animal_type: form.animal_type.toLowerCase(),
        description: form.description,
        condition: form.condition,
        image_urls: imageUrls,
        address: form.address,
        city: form.city,
        state: form.state,
        landmark: form.landmark || null,
        latitude: form.latitude,
        longitude: form.longitude,
        contact_phone: form.contact_phone || null,
      });

      if (error) throw error;
      toast.success('Report submitted successfully!');
      navigate('/feed');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl">Report an Animal in Distress</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image upload */}
            <div>
              <Label>Photo</Label>
              <div className="mt-1">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="h-48 w-full rounded-lg object-cover" />
                    <Button type="button" variant="destructive" size="sm" className="absolute right-2 top-2" onClick={() => { setImageFile(null); setImagePreview(null); }}>Remove</Button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-input p-8 transition-colors hover:border-primary">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload a photo</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Animal Type</Label>
                <Select value={form.animal_type} onValueChange={v => setForm(f => ({ ...f, animal_type: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {animalTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Contact Phone (optional)</Label>
                <Input value={form.contact_phone} onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>

            <div>
              <Label>Condition / Injury Description</Label>
              <Input value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value }))} placeholder="e.g. Broken leg, malnourished" />
            </div>

            <div>
              <Label>Detailed Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe what you saw, the animal's behavior, urgency level..." rows={3} />
            </div>

            <div>
              <Label>Address</Label>
              <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Street address where the animal was spotted" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>City</Label>
                <Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
              </div>
              <div>
                <Label>State</Label>
                <Input value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} />
              </div>
              <div>
                <Label>Landmark (optional)</Label>
                <Input value={form.landmark} onChange={e => setForm(f => ({ ...f, landmark: e.target.value }))} placeholder="Near..." />
              </div>
            </div>

            <div>
              <Label className="mb-2 flex items-center gap-1"><MapPin className="h-4 w-4" />Pin Location on Map</Label>
              <MapPicker lat={form.latitude} lng={form.longitude} onLocationSelect={(lat, lng) => setForm(f => ({ ...f, latitude: lat, longitude: lng }))} />
              <p className="mt-1 text-xs text-muted-foreground">Click on the map or drag the marker to set the exact location</p>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportAnimal;
