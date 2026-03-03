import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReportCard from '@/components/ReportCard';
import StatusBadge from '@/components/StatusBadge';
import { PawPrint, Heart } from 'lucide-react';

const UserDashboard = () => {
  const { user, profile } = useAuth();
  const [myReports, setMyReports] = useState<any[]>([]);
  const [myInterests, setMyInterests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [{ data: reports }, { data: interests }] = await Promise.all([
        supabase.from('rescue_reports').select('*').eq('reporter_id', user.id).order('created_at', { ascending: false }),
        supabase.from('adoption_interests').select('*, rescue_reports(*)').eq('user_id', user.id).order('created_at', { ascending: false }),
      ]);
      setMyReports(reports ?? []);
      setMyInterests(interests ?? []);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  return (
    <div className="container py-8">
      <h1 className="mb-2 font-heading text-3xl font-bold">Welcome, {profile?.full_name || 'User'}</h1>
      <p className="mb-6 text-muted-foreground">Your rescue activity dashboard</p>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card><CardContent className="flex flex-col items-center p-4">
          <PawPrint className="mb-1 h-6 w-6 text-primary" />
          <span className="text-2xl font-bold">{myReports.length}</span>
          <span className="text-xs text-muted-foreground">My Reports</span>
        </CardContent></Card>
        <Card><CardContent className="flex flex-col items-center p-4">
          <Heart className="mb-1 h-6 w-6 text-primary" />
          <span className="text-2xl font-bold">{myInterests.length}</span>
          <span className="text-xs text-muted-foreground">Support Given</span>
        </CardContent></Card>
      </div>

      <Tabs defaultValue="reports">
        <TabsList>
          <TabsTrigger value="reports">My Reports</TabsTrigger>
          <TabsTrigger value="interests">My Support</TabsTrigger>
        </TabsList>
        <TabsContent value="reports" className="mt-4">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />)}
            </div>
          ) : myReports.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">You haven't reported any animals yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {myReports.map(r => <ReportCard key={r.id} {...r} />)}
            </div>
          )}
        </TabsContent>
        <TabsContent value="interests" className="mt-4">
          {myInterests.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">You haven't expressed interest in any reports yet.</p>
          ) : (
            <div className="space-y-3">
              {myInterests.map((i: any) => (
                <Card key={i.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium capitalize">{i.rescue_reports?.animal_type} — {i.support_type.replace('_', ' ')}</p>
                      <p className="text-sm text-muted-foreground">{i.rescue_reports?.address}</p>
                    </div>
                    <StatusBadge status={i.rescue_reports?.status || 'open'} />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
