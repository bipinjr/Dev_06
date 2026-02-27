import { Card, CardContent } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface ReportCardProps {
  id: string;
  animal_type: string;
  description: string;
  image_urls: string[];
  address: string;
  city: string;
  status: string;
  created_at: string;
}

const ReportCard = ({ id, animal_type, description, image_urls, address, city, status, created_at }: ReportCardProps) => {
  const imageUrl = image_urls?.[0] || '/placeholder.svg';
  return (
    <Link to={`/report/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={imageUrl} alt={animal_type} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-heading text-sm font-semibold capitalize text-foreground">{animal_type}</span>
            <StatusBadge status={status} />
          </div>
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{description}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{city}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDistanceToNow(new Date(created_at), { addSuffix: true })}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ReportCard;
