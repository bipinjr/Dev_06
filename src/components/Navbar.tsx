import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, X, LogOut, LayoutDashboard, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import resqLogo from '@/assets/resq-logo.jpeg';

const Navbar = () => {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const fetchUnread = async () => {
      const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('read', false);
      setUnreadCount(count ?? 0);
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const dashboardPath = role === 'ngo' ? '/ngo-dashboard' : '/dashboard';

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={resqLogo} alt="RESQ" className="h-10 w-10 rounded-lg object-cover" />
          <span className="font-heading text-xl font-bold text-primary">RESQ</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" asChild><Link to="/feed">View Reports</Link></Button>
          {user && (
            <>
              <Button variant="ghost" asChild><Link to="/report">Report Animal</Link></Button>
              <Button variant="ghost" asChild><Link to={dashboardPath}><LayoutDashboard className="mr-1 h-4 w-4" />Dashboard</Link></Button>
              <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/notifications')}>
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}><LogOut className="mr-1 h-4 w-4" />Sign Out</Button>
            </>
          )}
          {!user && (
            <>
              <Button variant="ghost" asChild><Link to="/auth">Log In</Link></Button>
              <Button asChild><Link to="/auth?mode=signup">Sign Up</Link></Button>
            </>
          )}
        </nav>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card p-4 md:hidden">
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" asChild onClick={() => setMobileOpen(false)}><Link to="/feed">View Reports</Link></Button>
            {user ? (
              <>
                <Button variant="ghost" asChild onClick={() => setMobileOpen(false)}><Link to="/report">Report Animal</Link></Button>
                <Button variant="ghost" asChild onClick={() => setMobileOpen(false)}><Link to={dashboardPath}>Dashboard</Link></Button>
                <Button variant="ghost" asChild onClick={() => setMobileOpen(false)}><Link to="/notifications">Notifications {unreadCount > 0 && `(${unreadCount})`}</Link></Button>
                <Button variant="ghost" onClick={() => { handleSignOut(); setMobileOpen(false); }}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild onClick={() => setMobileOpen(false)}><Link to="/auth">Log In</Link></Button>
                <Button asChild onClick={() => setMobileOpen(false)}><Link to="/auth?mode=signup">Sign Up</Link></Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
