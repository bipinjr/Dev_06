import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatusBadge from '@/components/StatusBadge';
import MapPicker from '@/components/MapPicker';
import { toast } from 'sonner';
import { MapPin, Phone, Clock, Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const supportTypes = [
  { value: 'adopt', label: '🏠 Adopt' },
  { value: 'foster', label: '🤝 Foster' },
  { value: 'donate_food', label: '🍖 Donate Food' },
  { value: 'medical_support', label: '💊 Medical Support' },
];

const ReportDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [supportType, setSupportType] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase.from('rescue_reports').select('*').eq('id', id).single().then(({ data }) => {
      setReport(data);
      setLoading(false);
    });
  }, [id]);

  const handleSupport = async () => {
    if (!user || !supportType) { toast.error('Please select how you want to help'); return; }
    const { error } = await supabase.from('adoption_interests').insert({
      report_id: id,
      user_id: user.id,
      support_type: supportType as any,
      message: supportMessage || null,
    });
    if (error) {
      if (error.code === '23505') toast.error('You already expressed this type of interest');
      else toast.error(error.message);
      return;
    }
    toast.success('Thank you! Your interest has been recorded.');
    setDialogOpen(false);
    setSupportType('');
    setSupportMessage('');
  };

  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;
  if (!report) return <div className="py-16 text-center text-muted-foreground">Report not found</div>;

  const imageUrl = report.image_urls?.[0] || '/placeholder.svg';

  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <img src={imageUrl} alt={report.animal_type} className="h-64 w-full rounded-t-lg object-cover sm:h-80" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-2xl capitalize">{report.animal_type}</CardTitle>
            <StatusBadge status={report.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">{report.description}</p>
          {report.condition && <p className="text-sm text-muted-foreground"><strong>Condition:</strong> {report.condition}</p>}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{report.address}, {report.city}</span>
            {report.contact_phone && <span className="flex items-center gap-1"><Phone className="h-4 w-4" />{report.contact_phone}</span>}
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}</span>
          </div>

          {report.landmark && <p className="text-sm text-muted-foreground"><strong>Landmark:</strong> {report.landmark}</p>}

          {report.latitude && report.longitude && (
            <MapPicker lat={report.latitude} lng={report.longitude} readonly />
          )}

          {user && report.status !== 'closed' && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" size="lg"><Heart className="mr-2 h-5 w-5" />I Want to Help</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>How would you like to help?</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {supportTypes.map(t => (
                      <Button key={t.value} variant={supportType === t.value ? 'default' : 'outline'} onClick={() => setSupportType(t.value)} className="justify-start">
                        {t.label}
                      </Button>
                    ))}
                  </div>
                  <div>
                    <Label>Message (optional)</Label>
                    <Textarea value={supportMessage} onChange={e => setSupportMessage(e.target.value)} placeholder="Any details you'd like to share..." />
                  </div>
                  <Button onClick={handleSupport} className="w-full">Submit Interest</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportDetail;
