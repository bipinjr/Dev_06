import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PawPrint, Heart, Shield, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import resqHero from '@/assets/resq-hero.jpeg';
import resqLogo from '@/assets/resq-logo.jpeg';

const stats = [
  { label: 'Animals Reported', value: '2,400+', icon: PawPrint },
  { label: 'Rescued & Safe', value: '1,800+', icon: Heart },
  { label: 'Active NGOs', value: '35+', icon: Shield },
  { label: 'Cities Covered', value: '1', icon: MapPin },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary/5">
        <div className="container grid items-center gap-8 py-16 md:grid-cols-2 md:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 flex items-center gap-3">
              <img src={resqLogo} alt="RESQ" className="h-14 w-14 rounded-xl object-cover shadow-md" />
              <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                RESQ
              </h1>
            </div>
            <p className="mb-2 font-heading text-xl font-semibold text-primary">
              Street Animal Rescue Platform
            </p>
            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
              Report animals in distress, connect with rescue NGOs, and help street animals find care and forever homes — right here in Bangalore.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/report"><PawPrint className="mr-2 h-5 w-5" />Report an Animal</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/feed">View Reports</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <img src={resqHero} alt="Street animal rescue" className="rounded-2xl shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="container grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
              <s.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
              <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container py-16">
        <h2 className="mb-10 text-center font-heading text-3xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: 'Report', desc: 'Spot an animal in distress? Upload a photo, pin the location on the map, and submit a report.', icon: '📸' },
            { title: 'Rescue', desc: 'Local NGOs receive your report, claim it, and dispatch a rescue team to the location.', icon: '🚑' },
            { title: 'Rehabilitate', desc: 'Animals receive medical care. You can adopt, foster, or support their recovery.', icon: '🏠' },
          ].map((step, i) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.15 }}
              className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <span className="mb-3 inline-block text-4xl">{step.icon}</span>
              <h3 className="mb-2 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={resqLogo} alt="RESQ" className="h-6 w-6 rounded object-cover" />
            <span className="font-heading font-semibold text-foreground">RESQ</span>
          </div>
          <p>Street Animal Rescue Platform — Bangalore</p>
          <p>Built with ❤️ for street animals everywhere</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
