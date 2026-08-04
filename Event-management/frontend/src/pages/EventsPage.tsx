import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Plus, Loader2 } from 'lucide-react';
import { eventService } from '../services/event.service';
import EventCard from '../components/events/EventCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MODES = ['ALL', 'ONLINE', 'OFFLINE', 'HYBRID'];
const STATUSES = ['ALL', 'PUBLISHED', 'ONGOING', 'COMPLETED'];

export default function EventsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('ALL');
  const [status, setStatus] = useState('PUBLISHED');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['events', { search, mode, status, page }],
    queryFn: () =>
      eventService.getEvents({
        search: search || undefined,
        mode: mode !== 'ALL' ? mode : undefined,
        status: status !== 'ALL' ? status : undefined,
        page,
        limit: 12,
      }),
    staleTime: 60000,
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
          <p className="text-gray-500 text-sm mt-1">Discover events happening in your community</p>
        </div>
        {user && ['ORGANIZER', 'ADMIN'].includes(user.role) && (
          <Link to="/events/create" className="btn-primary flex items-center gap-2">
            <Plus className="h-4 w-4" /> Create Event
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="input-field pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={mode}
            onChange={(e) => { setMode(e.target.value); setPage(1); }}
            className="input-field w-auto"
          >
            {MODES.map((m) => (
              <option key={m} value={m}>{m === 'ALL' ? 'All Modes' : m}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="input-field w-auto"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s === 'ALL' ? 'All Statuses' : s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      ) : isError ? (
        <div className="text-center py-20">
          <p className="text-red-500">Failed to load events. Please try again.</p>
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No events found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.data.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Pagination */}
          {data?.pagination && data.pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-secondary"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {data.pagination.pages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= data.pagination.pages}
                className="btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
