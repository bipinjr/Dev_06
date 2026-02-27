import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PawPrint, Heart, Shield, MapPin, Phone, ArrowRight, Users, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import resqLogo from '@/assets/resq-logo.jpeg';
import heroRescue from '@/assets/hero-rescue.jpg';
import animalDog from '@/assets/animal-dog.jpg';
import animalCat from '@/assets/animal-cat.jpg';
import animalBird from '@/assets/animal-bird.jpg';
import volunteerTeam from '@/assets/volunteer-team.jpg';
import adoptionSuccess from '@/assets/adoption-success.jpg';

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const stats = [
  { label: 'Animals Reported', value: '2,400+', icon: PawPrint },
  { label: 'Rescued & Safe', value: '1,800+', icon: Heart },
  { label: 'Active NGOs', value: '35+', icon: Shield },
  { label: 'Volunteers', value: '500+', icon: Users },
];

const animalCategories = [
  { name: 'Dogs', image: animalDog, count: '1,200+ rescued', desc: 'Street dogs often face injuries, malnourishment, and abandonment. Report and help them find shelter.' },
  { name: 'Cats', image: animalCat, count: '680+ rescued', desc: 'Stray cats need medical care and safe spaces. Your report can save a life.' },
  { name: 'Birds', image: animalBird, count: '320+ rescued', desc: 'Injured birds need specialized care. Spot one in distress? Let us know immediately.' },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroRescue} alt="Animal rescue" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <motion.div {...fade} className="max-w-xl">
            <div className="mb-6 flex items-center gap-3">
              <img src={resqLogo} alt="RESQ" className="h-14 w-14 rounded-xl object-cover shadow-lg ring-2 ring-primary-foreground/20" />
              <h1 className="font-heading text-5xl font-extrabold tracking-tight text-primary-foreground md:text-6xl">
                RESQ
              </h1>
            </div>
            <p className="mb-3 font-heading text-xl font-semibold text-accent">
              Street Animal Rescue Platform
            </p>
            <p className="mb-8 text-lg text-primary-foreground/80">
              Every street animal deserves a chance. Report animals in distress, connect with rescue NGOs, and help them find care and forever homes — right here in Bangalore.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/report"><PawPrint className="mr-2 h-5 w-5" />Report an Animal</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/feed">View Reports <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section className="border-b bg-card">
        <div className="container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fade} transition={{ delay: 0.1 * i, duration: 0.4 }} className="text-center">
              <s.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
              <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====== ANIMALS WE HELP ====== */}
      <section className="bg-background py-16">
        <div className="container">
          <motion.div {...fade} className="mb-10 text-center">
            <h2 className="mb-3 font-heading text-3xl font-bold md:text-4xl">Animals We Help</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From injured dogs to abandoned cats and wounded birds — every report you submit brings them one step closer to safety and care.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {animalCategories.map((animal, i) => (
              <motion.div key={animal.name} {...fade} transition={{ delay: 0.15 * i, duration: 0.5 }}>
                <Card className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-square overflow-hidden">
                    <img src={animal.image} alt={animal.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <CardContent className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-heading text-xl font-bold">{animal.name}</h3>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{animal.count}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{animal.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="border-y bg-card py-16">
        <div className="container">
          <motion.div {...fade} className="mb-10 text-center">
            <h2 className="mb-3 font-heading text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Three simple steps to save a life</p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Report', desc: 'Spot an animal in distress? Upload a photo, pin the location on the map, and submit a detailed report.', icon: Phone, color: 'bg-destructive/10 text-destructive' },
              { step: '02', title: 'Rescue', desc: 'Local NGOs receive your report instantly, claim it, and dispatch a rescue team to the exact location.', icon: Stethoscope, color: 'bg-warning/10 text-warning' },
              { step: '03', title: 'Rehabilitate', desc: 'Animals receive medical care and find forever homes through adoption, fostering, or community support.', icon: Heart, color: 'bg-success/10 text-success' },
            ].map((item, i) => (
              <motion.div key={item.title} {...fade} transition={{ delay: 0.15 * i, duration: 0.5 }}
                className="relative rounded-xl border bg-background p-6 text-center shadow-sm">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 font-heading text-sm font-bold text-primary-foreground">
                  Step {item.step}
                </span>
                <div className={`mx-auto mb-4 mt-4 flex h-14 w-14 items-center justify-center rounded-xl ${item.color}`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== VOLUNTEER / JOIN US ====== */}
      <section className="bg-background py-16">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div {...fade}>
              <img src={volunteerTeam} alt="Volunteer team rescuing street animals" className="rounded-2xl shadow-xl" />
            </motion.div>
            <motion.div {...fade} transition={{ delay: 0.2 }}>
              <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">Join Our Rescue Community</h2>
              <p className="mb-4 text-muted-foreground">
                Our network of passionate volunteers and NGOs across Bangalore work tirelessly to rescue, treat, and rehabilitate street animals every day.
              </p>
              <ul className="mb-6 space-y-3">
                {[
                  'Report animals in distress from anywhere in Bangalore',
                  'Connect directly with local rescue NGOs',
                  'Track your reports from submission to rescue',
                  'Support animals through adoption, fostering, or donations',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <PawPrint className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Button asChild><Link to="/auth?mode=signup">Sign Up as Volunteer</Link></Button>
                <Button variant="outline" asChild><Link to="/auth?mode=signup">Register Your NGO</Link></Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== ADOPTION SUCCESS ====== */}
      <section className="border-t bg-card py-16">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div {...fade} className="order-2 md:order-1">
              <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">Every Rescue Has a Happy Ending</h2>
              <p className="mb-4 text-muted-foreground">
                Hundreds of animals have found loving homes through RESQ. Whether you adopt, foster, or provide medical support — you're making a difference.
              </p>
              <div className="mb-6 grid grid-cols-2 gap-4">
                {[
                  { value: '450+', label: 'Successful Adoptions' },
                  { value: '120+', label: 'Foster Families' },
                  { value: '800+', label: 'Medical Treatments' },
                  { value: '95%', label: 'Recovery Rate' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg border bg-background p-3 text-center">
                    <p className="font-heading text-xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Button size="lg" asChild>
                <Link to="/feed"><Heart className="mr-2 h-5 w-5" />Browse Animals to Adopt</Link>
              </Button>
            </motion.div>
            <motion.div {...fade} transition={{ delay: 0.2 }} className="order-1 md:order-2">
              <img src={adoptionSuccess} alt="Happy adoption story" className="rounded-2xl shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="bg-primary py-16">
        <div className="container text-center">
          <motion.div {...fade}>
            <h2 className="mb-4 font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
              See an Animal in Distress?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
              Don't look away. Your report can trigger an immediate rescue response and save a life today.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/report"><PawPrint className="mr-2 h-5 w-5" />Report Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/feed">View All Reports</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
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
