import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/event.service';
import { Shield, Users, Calendar, BarChart2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-600',
  PUBLISHED: 'bg-green-100 text-green-700',
  ONGOING: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-purple-100 text-purple-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function AdminPage() {
  const { data: allEvents, isLoading } = useQuery({
    queryKey: ['admin-events'],
    queryFn: () => eventService.getEvents({ limit: 50, status: undefined }),
  });

  const stats = {
    total: allEvents?.pagination?.total || 0,
    published: allEvents?.data?.filter((e) => e.status === 'PUBLISHED').length || 0,
    ongoing: allEvents?.data?.filter((e) => e.status === 'ONGOING').length || 0,
    completed: allEvents?.data?.filter((e) => e.status === 'COMPLETED').length || 0,
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-7 w-7 text-primary-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">System overview and management</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Events', value: stats.total, color: 'text-primary-600', icon: Calendar },
          { label: 'Published', value: stats.published, color: 'text-green-600', icon: BarChart2 },
          { label: 'Ongoing', value: stats.ongoing, color: 'text-blue-600', icon: Users },
          { label: 'Completed', value: stats.completed, color: 'text-purple-600', icon: Users },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className={clsx('text-2xl font-bold', stat.color)}>{stat.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
              </div>
              <stat.icon className={clsx('h-8 w-8 opacity-20', stat.color)} />
            </div>
          </div>
        ))}
      </div>

      {/* Events table */}
      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">All Events</h2>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Title</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Organizer</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Mode</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Attendees</th>
                </tr>
              </thead>
              <tbody>
                {allEvents?.data.map((event) => (
                  <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <Link to={`/events/${event.id}`} className="font-medium text-primary-600 hover:underline">
                        {event.title}
                      </Link>
                    </td>
                    <td className="py-3 px-2 text-gray-500">
                      {event.organizer?.firstName} {event.organizer?.lastName}
                    </td>
                    <td className="py-3 px-2 text-gray-500">
                      {format(new Date(event.startDate), 'MMM d, yyyy')}
                    </td>
                    <td className="py-3 px-2">
                      <span className="badge bg-indigo-50 text-indigo-700">{event.mode}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className={clsx('badge', statusColors[event.status])}>{event.status}</span>
                    </td>
                    <td className="py-3 px-2 text-gray-500">{event._count?.attendances || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
