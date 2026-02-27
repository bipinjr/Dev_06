import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Phone, PawPrint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emergencyContacts = [
  { name: 'CUPA Emergency', phone: '+91 80 2351 1523', available: '24/7' },
  { name: 'BBMP Animal Control', phone: '+91 80 2266 0000', available: '24/7' },
  { name: 'Charlie\'s CARE', phone: '+91 99002 53500', available: '9AM-7PM' },
  { name: 'Police Control Room', phone: '100', available: '24/7' },
];

const EmergencySOS = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="h-16 w-16 rounded-full bg-destructive shadow-lg shadow-destructive/30 hover:bg-destructive/90 hover:shadow-xl"
            >
              <AlertTriangle className="h-7 w-7" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-heading text-xl text-destructive">
                <AlertTriangle className="h-6 w-6" />
                Emergency Animal Rescue
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you see an animal in immediate danger, call one of these emergency contacts or submit a quick report.
              </p>

              <div className="space-y-2">
                {emergencyContacts.map(contact => (
                  <a
                    key={contact.phone}
                    href={`tel:${contact.phone}`}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-secondary"
                  >
                    <div>
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.available}</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                      <Phone className="h-4 w-4" />
                      <span className="font-mono text-sm">{contact.phone}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="border-t pt-3">
                <Button asChild className="w-full" onClick={() => setOpen(false)}>
                  <Link to="/report">
                    <PawPrint className="mr-2 h-5 w-5" />
                    Submit Emergency Report
                  </Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Pulse ring animation */}
      <style>{`
        @keyframes sos-pulse {
          0% { box-shadow: 0 0 0 0 hsl(var(--destructive) / 0.4); }
          70% { box-shadow: 0 0 0 15px hsl(var(--destructive) / 0); }
          100% { box-shadow: 0 0 0 0 hsl(var(--destructive) / 0); }
        }
        .fixed button[class*="destructive"] {
          animation: sos-pulse 2s infinite;
        }
      `}</style>
    </>
  );
};

export default EmergencySOS;
