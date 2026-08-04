import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { attendanceService } from '../services/attendance.service';
import toast from 'react-hot-toast';
import { QrCode, CheckCircle, Search, Users, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { eventService } from '../services/event.service';

export default function AttendancePage() {
  const [qrCode, setQrCode] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [lastCheckedIn, setLastCheckedIn] = useState<{
    firstName: string;
    lastName: string;
    eventTitle: string;
  } | null>(null);

  const { data: eventsData } = useQuery({
    queryKey: ['my-events-attendance'],
    queryFn: () => eventService.getEvents({ status: 'ONGOING', limit: 50 }),
  });

  const { data: attendances, isLoading: loadingAttendances, refetch } = useQuery({
    queryKey: ['event-attendance', selectedEventId],
    queryFn: () => attendanceService.getEventAttendance(selectedEventId),
    enabled: !!selectedEventId,
  });

  const checkInMutation = useMutation({
    mutationFn: (code: string) => attendanceService.checkIn(code),
    onSuccess: (data) => {
      setLastCheckedIn({
        firstName: data.user?.firstName || '',
        lastName: data.user?.lastName || '',
        eventTitle: data.event?.title || '',
      });
      setQrCode('');
      toast.success(`✅ Checked in: ${data.user?.firstName} ${data.user?.lastName}`);
      refetch();
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Check-in failed';
      toast.error(msg);
    },
  });

  const handleCheckIn = () => {
    if (!qrCode.trim()) return toast.error('Please enter a QR code');
    checkInMutation.mutate(qrCode.trim());
  };

  const checkedIn = attendances?.filter((a) => a.status === 'CHECKED_IN').length || 0;
  const registered = attendances?.filter((a) => a.status === 'REGISTERED').length || 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Attendance Management</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Check-in panel */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary-600" />
            Check-In Attendee
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">QR Code</label>
              <div className="flex gap-2">
                <input
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckIn()}
                  className="input-field flex-1"
                  placeholder="Scan or enter QR code..."
                />
                <button
                  onClick={handleCheckIn}
                  disabled={checkInMutation.isPending}
                  className="btn-primary whitespace-nowrap"
                >
                  {checkInMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Check In'
                  )}
                </button>
              </div>
            </div>

            {lastCheckedIn && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {lastCheckedIn.firstName} {lastCheckedIn.lastName}
                  </p>
                  <p className="text-xs text-green-600">{lastCheckedIn.eventTitle}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Event selector & stats */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary-600" />
            Event Attendance List
          </h2>

          <div className="mb-4">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="input-field"
            >
              <option value="">Select an event...</option>
              {eventsData?.data.map((event) => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
          </div>

          {selectedEventId && (
            <div className="flex gap-4 mb-4">
              <div className="flex-1 bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">{registered}</p>
                <p className="text-xs text-blue-500">Registered</p>
              </div>
              <div className="flex-1 bg-green-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-600">{checkedIn}</p>
                <p className="text-xs text-green-500">Checked In</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Attendance list */}
      {selectedEventId && (
        <div className="mt-6 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Attendees</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search..." className="input-field pl-9 text-sm" />
            </div>
          </div>

          {loadingAttendances ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Name</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Student ID</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Email</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Check-in Time</th>
                  </tr>
                </thead>
                <tbody>
                  {attendances?.map((attendance) => (
                    <tr key={attendance.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium">
                        {attendance.user?.firstName} {attendance.user?.lastName}
                      </td>
                      <td className="py-3 px-2 text-gray-500">{attendance.user?.studentId || '—'}</td>
                      <td className="py-3 px-2 text-gray-500">{attendance.user?.email}</td>
                      <td className="py-3 px-2">
                        <span className={clsx('badge', {
                          'bg-green-100 text-green-700': attendance.status === 'CHECKED_IN',
                          'bg-blue-100 text-blue-700': attendance.status === 'REGISTERED',
                          'bg-gray-100 text-gray-600': attendance.status === 'ABSENT',
                          'bg-red-100 text-red-700': attendance.status === 'CANCELLED',
                        })}>
                          {attendance.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-gray-500">
                        {attendance.checkInTime
                          ? format(new Date(attendance.checkInTime), 'h:mm a')
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(!attendances || attendances.length === 0) && (
                <p className="text-center text-gray-400 py-8">No attendees found</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
