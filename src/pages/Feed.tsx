import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ReportCard from '@/components/ReportCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const Feed = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      let query = supabase.from('rescue_reports').select('*').order('created_at', { ascending: false });
      if (statusFilter !== 'all') query = query.eq('status', statusFilter);
      const { data } = await query;
      setReports(data ?? []);
      setLoading(false);
    };
    fetchReports();
  }, [statusFilter]);

  const filtered = reports.filter(r =>
    r.description?.toLowerCase().includes(search.toLowerCase()) ||
    r.animal_type?.toLowerCase().includes(search.toLowerCase()) ||
    r.address?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-8">
      <h1 className="mb-6 font-heading text-3xl font-bold">Animal Reports</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search reports..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="rescued">Rescued</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-72 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">No reports found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(r => (
            <ReportCard key={r.id} {...r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
