import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import resqLogo from '@/assets/resq-logo.jpeg';
import authBg from '@/assets/auth-bg.jpg';
import { PawPrint, Shield, Heart } from 'lucide-react';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isSignup, setIsSignup] = useState(searchParams.get('mode') === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'user' | 'ngo'>('user');
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        if (!fullName.trim()) { toast.error('Please enter your name'); setLoading(false); return; }
        if (role === 'ngo' && !orgName.trim()) { toast.error('Please enter organization name'); setLoading(false); return; }
        await signUp(email, password, fullName, role, orgName || undefined);
        toast.success('Account created! Logging you in...');
        navigate('/');
      } else {
        await signIn(email, password);
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left side - Background image (hidden on mobile) */}
      <div className="relative hidden w-1/2 lg:block">
        <img src={authBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <img src={resqLogo} alt="RESQ" className="mb-6 h-20 w-20 rounded-2xl object-cover shadow-2xl ring-4 ring-primary-foreground/20" />
          <h2 className="mb-4 font-heading text-4xl font-extrabold text-primary-foreground">RESQ</h2>
          <p className="mb-8 text-lg text-primary-foreground/80">Street Animal Rescue Platform</p>
          <div className="space-y-4">
            {[
              { icon: PawPrint, text: 'Report animals in distress instantly' },
              { icon: Shield, text: 'Connect with verified rescue NGOs' },
              { icon: Heart, text: 'Support through adoption & donations' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-primary-foreground/90">
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-0 shadow-none lg:shadow-xl lg:border">
          <CardHeader className="text-center">
            <div className="lg:hidden mb-4 flex justify-center">
              <img src={resqLogo} alt="RESQ" className="h-16 w-16 rounded-xl object-cover" />
            </div>
            <CardTitle className="font-heading text-2xl">{isSignup ? 'Create Account' : 'Welcome Back'}</CardTitle>
            <CardDescription>{isSignup ? 'Join the RESQ rescue community' : 'Sign in to continue saving lives'}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <>
                  <div>
                    <Label>Full Name</Label>
                    <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your name" required />
                  </div>
                  <div>
                    <Label>I am a</Label>
                    <div className="mt-1 flex gap-2">
                      <Button type="button" variant={role === 'user' ? 'default' : 'outline'} className="flex-1" onClick={() => setRole('user')}>
                        <PawPrint className="mr-1 h-4 w-4" />Citizen / User
                      </Button>
                      <Button type="button" variant={role === 'ngo' ? 'default' : 'outline'} className="flex-1" onClick={() => setRole('ngo')}>
                        <Shield className="mr-1 h-4 w-4" />NGO / Rescue Org
                      </Button>
                    </div>
                  </div>
                  {role === 'ngo' && (
                    <div>
                      <Label>Organization Name</Label>
                      <Input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="e.g. CUPA Bangalore" required />
                    </div>
                  )}
                </>
              )}
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button className="font-medium text-primary underline" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;