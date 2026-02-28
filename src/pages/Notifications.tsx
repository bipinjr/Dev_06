import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifs = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);
    setNotifications(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchNotifs(); }, [user]);

  const markAsRead = async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id);
    fetchNotifs();
  };

  const markAllRead = async () => {
    if (!user) return;
    await supabase.from('notifications').update({ read: true }).eq('user_id', user.id).eq('read', false);
    fetchNotifs();
  };

  return (
    <div className="container max-w-2xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold">Notifications</h1>
        {notifications.some(n => !n.read) && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <Check className="mr-1 h-4 w-4" />Mark All Read
          </Button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />)}</div>
      ) : notifications.length === 0 ? (
        <div className="py-16 text-center">
          <Bell className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <Card key={n.id} className={`transition-colors ${!n.read ? 'border-primary/30 bg-primary/5' : ''}`}>
              <CardContent className="flex items-start gap-3 p-4">
                <Bell className={`mt-1 h-5 w-5 shrink-0 ${!n.read ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="flex-1">
                  <p className="font-medium">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}</span>
                    {n.report_id && <Link to={`/report/${n.report_id}`} className="text-xs text-primary underline">View Report</Link>}
                  </div>
                </div>
                {!n.read && (
                  <Button size="sm" variant="ghost" onClick={() => markAsRead(n.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
