import { useState } from 'react';

const allEvents = [
  {
    id: 1,
    title: 'Morning Yoga in the Park',
    date: 'April 5, 2026',
    time: '7:00 AM',
    location: 'Riverside Park',
    category: 'Fitness',
    organizer: 'Sarah K.',
    spots: 20,
    spotsLeft: 7,
    description: 'Start your day with a peaceful yoga session surrounded by nature. All levels welcome.',
    emoji: '🧘',
  },
  {
    id: 2,
    title: 'Nutrition Workshop',
    date: 'April 12, 2026',
    time: '10:00 AM',
    location: 'Community Hall B',
    category: 'Education',
    organizer: 'Dr. Amara N.',
    spots: 30,
    spotsLeft: 15,
    description: 'Learn how to build balanced meal plans that support your health goals.',
    emoji: '🥗',
  },
  {
    id: 3,
    title: 'Community 5K Fun Run',
    date: 'April 19, 2026',
    time: '8:30 AM',
    location: 'Downtown Loop',
    category: 'Fitness',
    organizer: 'Marcus T.',
    spots: 100,
    spotsLeft: 42,
    description: 'A fun 5K run/walk for all fitness levels. Medals and refreshments for everyone!',
    emoji: '🏅',
  },
  {
    id: 4,
    title: 'Mental Wellness Retreat',
    date: 'April 26, 2026',
    time: '9:00 AM',
    location: 'Serenity Center',
    category: 'Wellness',
    organizer: 'Priya S.',
    spots: 25,
    spotsLeft: 3,
    description: 'A full-day retreat focusing on mindfulness, stress management, and self-care.',
    emoji: '🌸',
  },
  {
    id: 5,
    title: 'Healthy Cooking Demo',
    date: 'May 3, 2026',
    time: '11:00 AM',
    location: 'Kitchen Studio',
    category: 'Education',
    organizer: 'Chef Liu W.',
    spots: 18,
    spotsLeft: 10,
    description: 'Learn to cook delicious, nutritious meals with seasonal ingredients.',
    emoji: '👨‍🍳',
  },
  {
    id: 6,
    title: 'Dance & Move Fitness',
    date: 'May 10, 2026',
    time: '6:00 PM',
    location: 'Studio 4',
    category: 'Fitness',
    organizer: 'Zara O.',
    spots: 35,
    spotsLeft: 20,
    description: 'High-energy dance fitness class blending Afrobeats, Latin, and more.',
    emoji: '💃',
  },
];

const categories = ['All', 'Fitness', 'Education', 'Wellness'];

const categoryColors = {
  Fitness: 'bg-[#ede9fe] text-[#7c3aed]',
  Education: 'bg-[#ddd6fe] text-[#6d28d9]',
  Wellness: 'bg-[#f5f3ff] text-[#8b5cf6]',
};

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [registeredIds, setRegisteredIds] = useState([]);

  const filtered =
    activeCategory === 'All'
      ? allEvents
      : allEvents.filter((e) => e.category === activeCategory);

  const handleRegister = (id) => {
    setRegisteredIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="events" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#ede9fe] text-[#7c3aed] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            📅 Upcoming Events
          </span>
          <h2 className="text-4xl font-bold text-[#4c1d95] mb-4">Community Events</h2>
          <p className="text-[#6b6375] max-w-xl mx-auto">
            Discover and register for events planned by our community organizers. Something for everyone!
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeCategory === cat
                  ? 'bg-[#7c3aed] text-white'
                  : 'bg-[#f5f3ff] text-[#7c3aed] hover:bg-[#ede9fe]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => {
            const isRegistered = registeredIds.includes(event.id);
            const isFull = event.spotsLeft === 0;
            const pct = Math.round(((event.spots - event.spotsLeft) / event.spots) * 100);

            return (
              <div
                key={event.id}
                className="bg-white border border-[#ede9fe] rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{event.emoji}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[event.category]}`}>
                    {event.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#4c1d95] mb-2">{event.title}</h3>
                <p className="text-sm text-[#6b6375] mb-4 flex-1">{event.description}</p>

                <div className="space-y-1 text-sm text-[#6b6375] mb-4">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{event.date} · {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    <span>Organized by {event.organizer}</span>
                  </div>
                </div>

                {/* Spots progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-[#6b6375] mb-1">
                    <span>{event.spotsLeft} spots left</span>
                    <span>{pct}% full</span>
                  </div>
                  <div className="w-full bg-[#f5f3ff] rounded-full h-2">
                    <div
                      className="bg-[#8b5cf6] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleRegister(event.id)}
                  disabled={isFull && !isRegistered}
                  className={`w-full py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    isRegistered
                      ? 'bg-[#ede9fe] text-[#7c3aed] hover:bg-[#ddd6fe]'
                      : isFull
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#7c3aed] text-white hover:bg-[#6d28d9]'
                  }`}
                >
                  {isRegistered ? '✓ Registered' : isFull ? 'Event Full' : 'Register Now'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
