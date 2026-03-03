import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import resqLogo from '@/assets/resq-logo.jpeg';

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
        toast.success('Account created! Please check your email to verify.');
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
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={resqLogo} alt="RESQ" className="mx-auto mb-2 h-16 w-16 rounded-xl object-cover" />
          <CardTitle className="font-heading text-2xl">{isSignup ? 'Create Account' : 'Welcome Back'}</CardTitle>
          <CardDescription>{isSignup ? 'Join the RESQ community' : 'Sign in to your account'}</CardDescription>
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
                    <Button type="button" variant={role === 'user' ? 'default' : 'outline'} className="flex-1" onClick={() => setRole('user')}>Citizen / User</Button>
                    <Button type="button" variant={role === 'ngo' ? 'default' : 'outline'} className="flex-1" onClick={() => setRole('ngo')}>NGO / Rescue Org</Button>
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
            <Button type="submit" className="w-full" disabled={loading}>
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
  );
};

export default Auth;
