import { Event } from '../../types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Wifi, WifiOff, MonitorPlay } from 'lucide-react';
import { clsx } from 'clsx';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-600',
  PUBLISHED: 'bg-green-100 text-green-700',
  ONGOING: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-purple-100 text-purple-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

const modeIcons: Record<string, React.ReactNode> = {
  ONLINE: <Wifi className="h-3.5 w-3.5" />,
  OFFLINE: <WifiOff className="h-3.5 w-3.5" />,
  HYBRID: <MonitorPlay className="h-3.5 w-3.5" />,
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link to={`/events/${event.id}`} className="block group">
      <div className="card hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Cover or placeholder */}
        <div className="h-36 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 mb-4 flex items-center justify-center overflow-hidden">
          {event.coverImage ? (
            <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <Calendar className="h-12 w-12 text-white opacity-60" />
          )}
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className={clsx('badge', statusColors[event.status])}>
            {event.status}
          </span>
          <span className="badge bg-indigo-50 text-indigo-700 flex items-center gap-1">
            {modeIcons[event.mode]}
            {event.mode}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
          {event.title}
        </h3>

        {/* Meta */}
        <div className="mt-auto space-y-1.5 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{format(new Date(event.startDate), 'MMM d, yyyy · h:mm a')}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          {event._count && (
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span>{event._count.attendances} registered</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {event.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
