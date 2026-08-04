import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  Calendar, MapPin, Users, Clock,
  CheckCircle, XCircle, Loader2, ArrowLeft, Globe,
} from 'lucide-react';
import { eventService } from '../services/event.service';
import { attendanceService } from '../services/attendance.service';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-600',
  PUBLISHED: 'bg-green-100 text-green-700',
  ONGOING: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-purple-100 text-purple-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventService.getEventById(id!),
    enabled: !!id,
  });

  const { data: myAttendances } = useQuery({
    queryKey: ['my-attendance'],
    queryFn: () => attendanceService.getUserAttendance(),
    enabled: !!user,
  });

  const myAttendance = myAttendances?.find((a) => a.eventId === id);

  const registerMutation = useMutation({
    mutationFn: () => attendanceService.registerForEvent(id!),
    onSuccess: () => {
      toast.success('Registered successfully! Check your QR code in the dashboard.');
      queryClient.invalidateQueries({ queryKey: ['my-attendance'] });
      queryClient.invalidateQueries({ queryKey: ['event', id] });
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Registration failed';
      toast.error(msg);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => attendanceService.cancelRegistration(id!),
    onSuccess: () => {
      toast.success('Registration cancelled');
      queryClient.invalidateQueries({ queryKey: ['my-attendance'] });
      queryClient.invalidateQueries({ queryKey: ['event', id] });
    },
    onError: () => toast.error('Failed to cancel registration'),
  });

  const publishMutation = useMutation({
    mutationFn: () => eventService.publishEvent(id!),
    onSuccess: () => {
      toast.success('Event published!');
      queryClient.invalidateQueries({ queryKey: ['event', id] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Event not found.</p>
      </div>
    );
  }

  const isOrganizer = user?.id === event.organizerId || user?.role === 'ADMIN';
  const canRegister = user && !myAttendance && ['PUBLISHED', 'ONGOING'].includes(event.status);

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {/* Hero */}
      <div className="h-56 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-700 mb-6 flex items-center justify-center overflow-hidden">
        {event.coverImage ? (
          <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <Calendar className="h-20 w-20 text-white opacity-40" />
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={clsx('badge', statusColors[event.status])}>{event.status}</span>
              <span className="badge bg-indigo-50 text-indigo-700">{event.mode}</span>
              {event.tags.map((tag) => (
                <span key={tag} className="badge bg-gray-100 text-gray-600">#{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            {event.organizer && (
              <p className="text-gray-500 mt-1">
                Organized by <span className="font-medium">{event.organizer.firstName} {event.organizer.lastName}</span>
              </p>
            )}
          </div>

          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-3">About this Event</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{event.description}</p>
          </div>

          {/* Schedules */}
          {event.schedules && event.schedules.length > 0 && (
            <div className="card">
              <h2 className="font-semibold text-gray-900 mb-4">Schedule</h2>
              <div className="space-y-3">
                {event.schedules.map((schedule) => (
                  <div key={schedule.id} className="flex gap-3 border-l-2 border-primary-500 pl-3">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{schedule.title}</p>
                      {schedule.description && <p className="text-sm text-gray-500">{schedule.description}</p>}
                      {schedule.speaker && <p className="text-xs text-primary-600">🎤 {schedule.speaker}</p>}
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      <p>{format(new Date(schedule.startTime), 'h:mm a')}</p>
                      <p>→ {format(new Date(schedule.endTime), 'h:mm a')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Event details card */}
          <div className="card space-y-3">
            <h3 className="font-semibold text-gray-900">Event Details</h3>

            <div className="flex items-start gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary-500" />
              <div>
                <p>{format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}</p>
                <p className="text-gray-400">
                  {format(new Date(event.startDate), 'h:mm a')} – {format(new Date(event.endDate), 'h:mm a')}
                </p>
              </div>
            </div>

            {event.location && (
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary-500" />
                <span>{event.location}</span>
              </div>
            )}

            {event.onlineLink && (
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Globe className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary-500" />
                <a href={event.onlineLink} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline truncate">
                  Join Online
                </a>
              </div>
            )}

            {event.capacity && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-primary-500" />
                <span>
                  {event._count?.attendances || 0} / {event.capacity} registered
                </span>
              </div>
            )}
          </div>

          {/* Registration card */}
          <div className="card">
            {!user ? (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-3">Sign in to register for this event</p>
                <a href="/login" className="btn-primary w-full flex justify-center">Sign In</a>
              </div>
            ) : myAttendance ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">You're registered!</span>
                </div>
                <p className="text-xs text-gray-500">Status: <span className="font-medium">{myAttendance.status}</span></p>
                {myAttendance.qrCode && (
                  <p className="text-xs text-gray-500">QR Code: <span className="font-mono bg-gray-100 px-1 rounded">{myAttendance.qrCode.slice(0, 8)}...</span></p>
                )}
                {myAttendance.status === 'REGISTERED' && (
                  <button
                    onClick={() => cancelMutation.mutate()}
                    disabled={cancelMutation.isPending}
                    className="btn-danger w-full flex items-center justify-center gap-2 text-sm"
                  >
                    <XCircle className="h-4 w-4" />
                    Cancel Registration
                  </button>
                )}
              </div>
            ) : canRegister ? (
              <button
                onClick={() => registerMutation.mutate()}
                disabled={registerMutation.isPending}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {registerMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Clock className="h-4 w-4" /> Register for Event
                  </>
                )}
              </button>
            ) : (
              <p className="text-sm text-gray-500 text-center">
                {event.status === 'COMPLETED' ? 'This event has ended.' : 'Registration is not available.'}
              </p>
            )}
          </div>

          {/* Organizer actions */}
          {isOrganizer && event.status === 'DRAFT' && (
            <div className="card border-amber-200 bg-amber-50">
              <h3 className="font-medium text-amber-800 mb-2">Organizer Actions</h3>
              <button
                onClick={() => publishMutation.mutate()}
                disabled={publishMutation.isPending}
                className="btn-primary w-full"
              >
                {publishMutation.isPending ? 'Publishing...' : 'Publish Event'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
