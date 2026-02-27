import { Badge } from '@/components/ui/badge';

const statusConfig: Record<string, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  in_progress: { label: 'In Progress', className: 'bg-warning/10 text-warning border-warning/20' },
  rescued: { label: 'Rescued', className: 'bg-success/10 text-success border-success/20' },
  closed: { label: 'Closed', className: 'bg-muted text-muted-foreground border-border' },
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = statusConfig[status] ?? statusConfig.open;
  return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
};

export default StatusBadge;
