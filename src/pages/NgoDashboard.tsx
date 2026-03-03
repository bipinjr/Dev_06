import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import StatusBadge from '@/components/StatusBadge';
import { toast } from 'sonner';
import { MapPin, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const NgoDashboard = () => {
  const { user, profile } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [noteMap, setNoteMap] = useState<Record<string, string>>({});
  const [interests, setInterests] = useState<any[]>([]);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    let query = supabase.from('rescue_reports').select('*').order('created_at', { ascending: false });
    // Show all reports (NGO can claim any open one, plus see their assigned)
    const { data } = await query;
    setReports(data ?? []);

    // Fetch interests for assigned reports
    const assignedIds = (data ?? []).filter(r => r.assigned_ngo_id === user.id).map(r => r.id);
    if (assignedIds.length > 0) {
      const { data: intData } = await supabase.from('adoption_interests').select('*, profiles!adoption_interests_user_id_fkey(full_name)').in('report_id', assignedIds);
      setInterests(intData ?? []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [user]);

  const filtered = filter === 'all' ? reports
    : filter === 'mine' ? reports.filter(r => r.assigned_ngo_id === user?.id)
    : reports.filter(r => r.status === filter);

  const claimReport = async (reportId: string) => {
    if (!user) return;
    const { error } = await supabase.from('rescue_reports').update({ assigned_ngo_id: user.id, status: 'in_progress' }).eq('id', reportId);
    if (error) { toast.error(error.message); return; }
    toast.success('Report claimed!');
    fetchData();
  };

  const updateStatus = async (reportId: string, status: string) => {
    const { error } = await supabase.from('rescue_reports').update({ status: status as any }).eq('id', reportId);
    if (error) { toast.error(error.message); return; }
    toast.success('Status updated');
    fetchData();
  };

  const saveNotes = async (reportId: string) => {
    const { error } = await supabase.from('rescue_reports').update({ ngo_notes: noteMap[reportId] }).eq('id', reportId);
    if (error) { toast.error(error.message); return; }
    toast.success('Notes saved');
  };

  // Stats
  const openCount = reports.filter(r => r.status === 'open').length;
  const rescuedCount = reports.filter(r => r.status === 'rescued' || r.status === 'closed').length;
  const myCount = reports.filter(r => r.assigned_ngo_id === user?.id).length;
  const chartData = [
    { name: 'Open', count: openCount },
    { name: 'In Progress', count: reports.filter(r => r.status === 'in_progress').length },
    { name: 'Rescued', count: reports.filter(r => r.status === 'rescued').length },
    { name: 'Closed', count: reports.filter(r => r.status === 'closed').length },
  ];

  return (
    <div className="container py-8">
      <h1 className="mb-2 font-heading text-3xl font-bold">NGO Dashboard</h1>
      <p className="mb-6 text-muted-foreground">{profile?.organization_name || 'Rescue Organization'}</p>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card><CardContent className="flex flex-col items-center p-4">
          <AlertCircle className="mb-1 h-6 w-6 text-destructive" />
          <span className="text-2xl font-bold">{openCount}</span>
          <span className="text-xs text-muted-foreground">Open Reports</span>
        </CardContent></Card>
        <Card><CardContent className="flex flex-col items-center p-4">
          <CheckCircle className="mb-1 h-6 w-6 text-success" />
          <span className="text-2xl font-bold">{rescuedCount}</span>
          <span className="text-xs text-muted-foreground">Rescued</span>
        </CardContent></Card>
        <Card><CardContent className="flex flex-col items-center p-4">
          <TrendingUp className="mb-1 h-6 w-6 text-primary" />
          <span className="text-2xl font-bold">{myCount}</span>
          <span className="text-xs text-muted-foreground">My Assigned</span>
        </CardContent></Card>
        <Card><CardContent className="flex flex-col items-center p-4">
          <span className="text-2xl font-bold">{interests.length}</span>
          <span className="text-xs text-muted-foreground">Support Interests</span>
        </CardContent></Card>
      </div>

      {/* Chart */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-sm font-medium">Reports by Status</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(180, 80%, 25%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-3">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="mine">My Assigned</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="rescued">Rescued</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports list */}
      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />)}</div>
      ) : filtered.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">No reports found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map(r => (
            <Card key={r.id}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  {r.image_urls?.[0] && (
                    <img src={r.image_urls[0]} alt={r.animal_type} className="h-28 w-28 shrink-0 rounded-lg object-cover" />
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-semibold capitalize">{r.animal_type}</span>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{r.address}, {r.city}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      {r.status === 'open' && !r.assigned_ngo_id && (
                        <Button size="sm" onClick={() => claimReport(r.id)}>Claim Report</Button>
                      )}
                      {r.assigned_ngo_id === user?.id && (
                        <Select value={r.status} onValueChange={v => updateStatus(r.id, v)}>
                          <SelectTrigger className="h-8 w-36 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="rescued">Rescued</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    {/* NGO Notes */}
                    {r.assigned_ngo_id === user?.id && (
                      <div className="pt-2">
                        <Textarea
                          placeholder="Internal notes..."
                          value={noteMap[r.id] ?? r.ngo_notes ?? ''}
                          onChange={e => setNoteMap(m => ({ ...m, [r.id]: e.target.value }))}
                          rows={2}
                          className="text-sm"
                        />
                        <Button size="sm" variant="outline" className="mt-1" onClick={() => saveNotes(r.id)}>Save Notes</Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NgoDashboard;
