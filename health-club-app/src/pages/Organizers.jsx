import { useState } from 'react';

const organizers = [
  {
    id: 1,
    name: 'Amara Osei',
    role: 'Wellness Coordinator',
    city: 'Atlanta, GA',
    bio: 'Certified yoga instructor and holistic wellness advocate with 8 years of community experience.',
    events: 14,
    members: 320,
    avatar: '🧘',
    specialties: ['Yoga', 'Mindfulness', 'Breathwork'],
  },
  {
    id: 2,
    name: 'Jordan Lee',
    role: 'Fitness Lead',
    city: 'Portland, OR',
    bio: 'Personal trainer and run club founder who believes fitness should be accessible to everyone.',
    events: 22,
    members: 480,
    avatar: '🏃',
    specialties: ['Running', 'HIIT', 'Strength Training'],
  },
  {
    id: 3,
    name: 'Dr. Fatima Nkosi',
    role: 'Nutrition Educator',
    city: 'Chicago, IL',
    bio: 'Registered dietitian and public health doctor committed to food literacy and healthy eating.',
    events: 9,
    members: 210,
    avatar: '🥗',
    specialties: ['Nutrition', 'Meal Planning', 'Public Health'],
  },
  {
    id: 4,
    name: 'Sasha Patel',
    role: 'Mindfulness Facilitator',
    city: 'Austin, TX',
    bio: 'Meditation teacher and corporate wellness consultant helping individuals reduce stress.',
    events: 17,
    members: 275,
    avatar: '🧠',
    specialties: ['Meditation', 'Stress Management', 'Sleep Health'],
  },
  {
    id: 5,
    name: 'Marcus Webb',
    role: 'Senior Wellness Coach',
    city: 'Detroit, MI',
    bio: 'Dedicated to improving quality of life for seniors through safe, inclusive fitness programs.',
    events: 11,
    members: 190,
    avatar: '🏋️',
    specialties: ['Senior Fitness', 'Mobility', 'Balance Training'],
  },
  {
    id: 6,
    name: 'Chef Isabelle Roy',
    role: 'Healthy Living Chef',
    city: 'Seattle, WA',
    bio: 'Former restaurant chef turned community cook teaching wholesome recipes on a budget.',
    events: 8,
    members: 160,
    avatar: '👩‍🍳',
    specialties: ['Healthy Cooking', 'Meal Prep', 'Plant-Based Diets'],
  },
];

export default function Organizers() {
  const [search, setSearch] = useState('');

  const filtered = organizers.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.role.toLowerCase().includes(search.toLowerCase()) ||
      o.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-lavender-900 mb-2">Community Organizers</h1>
        <p className="text-lavender-500 max-w-xl">
          Meet the dedicated individuals who plan, coordinate, and lead our health &amp; wellness events.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, role, or city…"
          className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 bg-white text-lavender-900 placeholder-lavender-300"
        />
      </div>

      {/* Organizer cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-lavender-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium">No organizers found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((org) => (
            <div
              key={org.id}
              className="bg-white rounded-2xl border border-lavender-100 shadow-sm hover:shadow-md hover:border-lavender-300 transition-all p-6 flex flex-col"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-lavender-100 rounded-2xl flex items-center justify-center text-3xl">
                  {org.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-lavender-900">{org.name}</h3>
                  <p className="text-sm text-lavender-500">{org.role}</p>
                  <p className="text-xs text-lavender-400">📍 {org.city}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-lavender-600 leading-relaxed mb-4 flex-1">{org.bio}</p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-4">
                {org.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-lavender-50 text-lavender-600 px-2.5 py-1 rounded-full border border-lavender-200"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-6 pt-4 border-t border-lavender-50 text-center">
                <div className="flex-1">
                  <div className="text-xl font-bold text-lavender-600">{org.events}</div>
                  <div className="text-xs text-lavender-400">Events</div>
                </div>
                <div className="flex-1">
                  <div className="text-xl font-bold text-lavender-600">{org.members}</div>
                  <div className="text-xs text-lavender-400">Members</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Join CTA */}
      <div className="mt-16 bg-gradient-to-r from-lavender-600 to-lavender-500 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Become an Organizer</h2>
        <p className="text-lavender-100 mb-6 max-w-md mx-auto">
          Do you run health or wellness activities in your community? Join our network and reach more people.
        </p>
        <button className="px-8 py-3 bg-white text-lavender-700 font-semibold rounded-full hover:bg-lavender-50 transition-colors shadow-sm">
          Apply to Join
        </button>
      </div>
    </div>
  );
}
