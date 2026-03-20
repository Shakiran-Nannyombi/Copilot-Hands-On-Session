import { useState } from 'react';
import { Link } from 'react-router-dom';

const allEvents = [
  {
    id: 1,
    title: 'Morning Yoga in the Park',
    date: '2026-04-05',
    time: '7:00 AM',
    location: 'Central Park Lawn',
    category: 'Wellness',
    organizer: 'Amara Osei',
    spots: 12,
    description: 'Start your weekend with a peaceful outdoor yoga session suitable for all levels.',
  },
  {
    id: 2,
    title: 'Community 5K Fun Run',
    date: '2026-04-06',
    time: '8:00 AM',
    location: 'Riverside Trail',
    category: 'Fitness',
    organizer: 'Jordan Lee',
    spots: 50,
    description: 'A friendly 5K run along the riverside. Prizes for first finishers in each age group.',
  },
  {
    id: 3,
    title: 'Nutrition Workshop',
    date: '2026-04-08',
    time: '6:30 PM',
    location: 'Community Hall B',
    category: 'Education',
    organizer: 'Dr. Fatima Nkosi',
    spots: 20,
    description: 'Learn about balanced diets, meal planning, and healthy eating on a budget.',
  },
  {
    id: 4,
    title: 'Mindfulness Meditation',
    date: '2026-04-10',
    time: '5:00 PM',
    location: 'Wellness Studio 3',
    category: 'Wellness',
    organizer: 'Sasha Patel',
    spots: 15,
    description: 'Guided mindfulness and breathing exercises for stress relief and mental clarity.',
  },
  {
    id: 5,
    title: 'Senior Fitness Class',
    date: '2026-04-12',
    time: '10:00 AM',
    location: 'Recreation Center',
    category: 'Fitness',
    organizer: 'Marcus Webb',
    spots: 25,
    description: 'Low-impact fitness exercises designed specifically for seniors aged 60+.',
  },
  {
    id: 6,
    title: 'Healthy Cooking Demo',
    date: '2026-04-15',
    time: '4:00 PM',
    location: 'Kitchen Lab A',
    category: 'Education',
    organizer: 'Chef Isabelle Roy',
    spots: 18,
    description: 'Live cooking demonstration featuring nutritious, easy-to-make recipes.',
  },
];

const categories = ['All', 'Wellness', 'Fitness', 'Education'];

const categoryColors = {
  Wellness: 'bg-lavender-100 text-lavender-700',
  Fitness: 'bg-purple-100 text-purple-700',
  Education: 'bg-indigo-100 text-indigo-700',
};

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allEvents.filter((e) => {
    const matchCat = activeCategory === 'All' || e.category === activeCategory;
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.organizer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-lavender-900 mb-2">Community Events</h1>
        <p className="text-lavender-500">
          Discover and join health &amp; wellness events organised by our community.
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events or organizers…"
          className="flex-1 px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 bg-white text-lavender-900 placeholder-lavender-300"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-lavender-600 text-white'
                  : 'bg-lavender-50 text-lavender-600 hover:bg-lavender-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* New event link */}
      <div className="mb-8">
        <Link
          to="/events/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-lavender-600 text-white rounded-xl font-medium hover:bg-lavender-700 transition-colors shadow-sm"
        >
          <span>＋</span> Create New Event
        </Link>
      </div>

      {/* Event cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-lavender-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium">No events found.</p>
          <p className="text-sm mt-1">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-lavender-100 shadow-sm hover:shadow-md hover:border-lavender-300 transition-all p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[event.category]}`}
                >
                  {event.category}
                </span>
                <span className="text-xs text-lavender-400">{event.spots} spots</span>
              </div>
              <h3 className="text-lg font-bold text-lavender-900 mb-2">{event.title}</h3>
              <p className="text-sm text-lavender-500 mb-1">
                📅 {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {event.time}
              </p>
              <p className="text-sm text-lavender-500 mb-1">📍 {event.location}</p>
              <p className="text-sm text-lavender-400 mb-4">👤 {event.organizer}</p>
              <p className="text-sm text-lavender-600 leading-relaxed flex-1">{event.description}</p>
              <button className="mt-4 w-full py-2 bg-lavender-100 text-lavender-700 rounded-xl text-sm font-medium hover:bg-lavender-200 transition-colors">
                Register →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
