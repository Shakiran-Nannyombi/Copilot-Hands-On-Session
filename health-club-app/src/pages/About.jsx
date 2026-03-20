import { Link } from 'react-router-dom';

const values = [
  { icon: '🌿', title: 'Community First', desc: 'Every decision we make centres on the health and wellbeing of our local communities.' },
  { icon: '🤝', title: 'Collaboration', desc: 'We believe that organizers working together can create far greater impact than working alone.' },
  { icon: '📅', title: 'Accessible Events', desc: 'Our platform makes it easy to find, plan, and attend wellness events regardless of location or budget.' },
  { icon: '🌈', title: 'Inclusive Spaces', desc: 'Health is for everyone — we celebrate diversity and ensure all are welcomed and respected.' },
];

const team = [
  { name: 'Priya Sharma', role: 'Founder & Director', emoji: '👩‍💼' },
  { name: 'David Kim', role: 'Platform Engineer', emoji: '👨‍💻' },
  { name: 'Lena Müller', role: 'Community Manager', emoji: '👩‍🤝‍👩' },
  { name: 'Omar Hassan', role: 'Events Coordinator', emoji: '🗓️' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-lavender-50 border-b border-lavender-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-4xl mb-4">🌿</span>
          <h1 className="text-4xl font-extrabold text-lavender-900 mb-4">About Health Club</h1>
          <p className="text-lg text-lavender-500 leading-relaxed max-w-2xl mx-auto">
            Health Club is a community-driven platform connecting wellness enthusiasts, fitness coaches,
            nutritionists, and organizers to build healthier communities — one event at a time.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-lavender-900 mb-4">Our Mission</h2>
        <p className="text-lavender-600 leading-relaxed text-lg">
          We exist to make health and wellness accessible, engaging, and communal. Through our platform,
          community organizers can easily plan events — from yoga classes to nutrition workshops — and connect
          with people who share their passion for healthier living.
        </p>
      </section>

      {/* Values */}
      <section className="bg-lavender-50 border-y border-lavender-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-lavender-900 mb-10 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-lavender-100 p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-lavender-900 mb-2">{title}</h3>
                <p className="text-sm text-lavender-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-lavender-900 mb-10 text-center">Meet the Core Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map(({ name, role, emoji }) => (
            <div key={name} className="text-center">
              <div className="w-20 h-20 bg-lavender-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-3">
                {emoji}
              </div>
              <p className="font-semibold text-lavender-900">{name}</p>
              <p className="text-sm text-lavender-400">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-lavender-700 to-lavender-500 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
          <p className="text-lavender-100 mb-8">
            Whether you're an organizer, a participant, or just curious — there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="px-8 py-3 bg-white text-lavender-700 font-semibold rounded-full hover:bg-lavender-50 transition-colors shadow-md"
            >
              Browse Events
            </Link>
            <Link
              to="/organizers"
              className="px-8 py-3 border border-white/40 text-white font-semibold rounded-full hover:bg-lavender-800/30 transition-colors"
            >
              Meet Organizers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
