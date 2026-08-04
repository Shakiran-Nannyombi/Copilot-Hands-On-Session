import { useQuery } from '@tanstack/react-query';
import { attendanceService } from '../services/attendance.service';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { Calendar, MapPin, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  REGISTERED: { label: 'Registered', color: 'bg-blue-100 text-blue-700', icon: <Clock className="h-4 w-4" /> },
  CHECKED_IN: { label: 'Checked In', color: 'bg-green-100 text-green-700', icon: <CheckCircle className="h-4 w-4" /> },
  ABSENT: { label: 'Absent', color: 'bg-gray-100 text-gray-600', icon: <XCircle className="h-4 w-4" /> },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: <XCircle className="h-4 w-4" /> },
};

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: attendances, isLoading } = useQuery({
    queryKey: ['my-attendance'],
    queryFn: () => attendanceService.getUserAttendance(),
  });

  const upcoming = attendances?.filter((a) =>
    a.event && new Date(a.event.startDate) >= new Date() && a.status !== 'CANCELLED'
  ) || [];

  const past = attendances?.filter((a) =>
    a.event && new Date(a.event.startDate) < new Date()
  ) || [];

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's an overview of your events</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Events', value: attendances?.length || 0, color: 'text-primary-600' },
          { label: 'Upcoming', value: upcoming.length, color: 'text-blue-600' },
          { label: 'Attended', value: attendances?.filter((a) => a.status === 'CHECKED_IN').length || 0, color: 'text-green-600' },
          { label: 'Past Events', value: past.length, color: 'text-gray-600' },
        ].map((stat) => (
          <div key={stat.label} className="card text-center">
            <p className={clsx('text-3xl font-bold', stat.color)}>{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      ) : (
        <>
          {/* Upcoming Events */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
            {upcoming.length === 0 ? (
              <div className="card text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No upcoming events</p>
                <Link to="/events" className="btn-primary mt-3 inline-flex">Browse Events</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map((attendance) => (
                  <Link
                    key={attendance.id}
                    to={`/events/${attendance.eventId}`}
                    className="card flex items-center gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{attendance.event?.title}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {attendance.event && format(new Date(attendance.event.startDate), 'MMM d, h:mm a')}
                        </span>
                        {attendance.event?.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {attendance.event.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={clsx('badge flex items-center gap-1', statusConfig[attendance.status].color)}>
                      {statusConfig[attendance.status].icon}
                      {statusConfig[attendance.status].label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Past Events */}
          {past.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Past Events</h2>
              <div className="space-y-3">
                {past.slice(0, 5).map((attendance) => (
                  <Link
                    key={attendance.id}
                    to={`/events/${attendance.eventId}`}
                    className="card flex items-center gap-4 hover:shadow-md transition-shadow opacity-75"
                  >
                    <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-700 truncate">{attendance.event?.title}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {attendance.event && format(new Date(attendance.event.startDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <span className={clsx('badge', statusConfig[attendance.status].color)}>
                      {statusConfig[attendance.status].label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
