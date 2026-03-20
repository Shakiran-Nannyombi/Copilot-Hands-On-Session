import { Link } from 'react-router-dom';

const stats = [
  { label: 'Active Organizers', value: '120+' },
  { label: 'Events This Month', value: '34' },
  { label: 'Community Members', value: '2,400+' },
  { label: 'Cities', value: '8' },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Morning Yoga in the Park',
    date: 'Sat, Apr 5 · 7:00 AM',
    location: 'Central Park Lawn',
    category: 'Wellness',
    spots: 12,
  },
  {
    id: 2,
    title: 'Community 5K Fun Run',
    date: 'Sun, Apr 6 · 8:00 AM',
    location: 'Riverside Trail',
    category: 'Fitness',
    spots: 50,
  },
  {
    id: 3,
    title: 'Nutrition Workshop',
    date: 'Tue, Apr 8 · 6:30 PM',
    location: 'Community Hall B',
    category: 'Education',
    spots: 20,
  },
];

const categoryColors = {
  Wellness: 'bg-lavender-100 text-lavender-700',
  Fitness: 'bg-purple-100 text-purple-700',
  Education: 'bg-indigo-100 text-indigo-700',
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-lavender-600 via-lavender-500 to-lavender-400 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-lavender-200 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            🌿 Community Health &amp; Wellness Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Organize. Connect.
            <br />
            <span className="text-lavender-100">Thrive Together.</span>
          </h1>
          <p className="text-lg md:text-xl text-lavender-100 max-w-2xl mx-auto mb-10">
            A central hub for community health organizers to plan events, coordinate activities,
            and inspire healthier lifestyles across neighborhoods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="px-8 py-3 bg-white text-lavender-700 font-semibold rounded-full hover:bg-lavender-50 transition-colors shadow-lg"
            >
              Browse Events
            </Link>
            <Link
              to="/events/new"
              className="px-8 py-3 bg-lavender-800/40 text-white font-semibold rounded-full border border-white/30 hover:bg-lavender-800/60 transition-colors backdrop-blur-sm"
            >
              Plan an Event
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-lavender-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ label, value }) => (
            <div key={label}>
              <div className="text-3xl font-extrabold text-lavender-600">{value}</div>
              <div className="text-sm text-lavender-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-lavender-900">Upcoming Events</h2>
          <Link to="/events" className="text-sm text-lavender-600 hover:text-lavender-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-sm border border-lavender-100 p-6 hover:shadow-md hover:border-lavender-300 transition-all group"
            >
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${categoryColors[event.category]}`}
              >
                {event.category}
              </span>
              <h3 className="text-lg font-bold text-lavender-900 mb-2 group-hover:text-lavender-700 transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-lavender-500 mb-1">📅 {event.date}</p>
              <p className="text-sm text-lavender-500 mb-4">📍 {event.location}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-lavender-400">{event.spots} spots left</span>
                <Link
                  to="/events"
                  className="text-sm font-medium text-lavender-600 hover:text-lavender-700"
                >
                  Register →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-lavender-50 border-y border-lavender-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-lavender-900 mb-4">
            Ready to make an impact?
          </h2>
          <p className="text-lavender-500 max-w-xl mx-auto mb-8">
            Join our network of dedicated health club organizers and help your community
            access wellness activities, education, and support.
          </p>
          <Link
            to="/organizers"
            className="inline-block px-8 py-3 bg-lavender-600 text-white font-semibold rounded-full hover:bg-lavender-700 transition-colors shadow-sm"
          >
            Meet the Organizers
          </Link>
        </div>
      </section>
    </div>
  );
}
