const organizers = [
  {
    id: 1,
    name: 'Sarah Kimani',
    role: 'Yoga & Mindfulness Lead',
    bio: 'Certified yoga instructor with 8 years of experience. Passionate about making wellness accessible to all.',
    events: 12,
    members: 240,
    avatar: '👩🏾',
    specialty: ['Yoga', 'Meditation', 'Breathwork'],
  },
  {
    id: 2,
    name: 'Dr. Amara Nwosu',
    role: 'Nutrition Specialist',
    bio: 'Registered dietitian and wellness educator. Runs monthly nutrition workshops and meal-planning clinics.',
    events: 18,
    members: 310,
    avatar: '👩🏿',
    specialty: ['Nutrition', 'Meal Planning', 'Health Education'],
  },
  {
    id: 3,
    name: 'Marcus Thompson',
    role: 'Fitness & Running Coach',
    bio: 'Former marathon runner turned community coach. Organizes group runs, boot camps, and fitness challenges.',
    events: 24,
    members: 480,
    avatar: '👨🏾',
    specialty: ['Running', 'Strength Training', 'HIIT'],
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Mental Wellness Advocate',
    bio: 'Licensed counselor focused on community mental health. Organizes retreats and support circles.',
    events: 9,
    members: 175,
    avatar: '👩🏽',
    specialty: ['Mental Health', 'Mindfulness', 'Support Circles'],
  },
  {
    id: 5,
    name: 'Chef Liu Wei',
    role: 'Culinary Health Coach',
    bio: 'Professional chef specializing in nutritious cooking. Runs cooking demos and healthy recipe workshops.',
    events: 15,
    members: 200,
    avatar: '👨🏻',
    specialty: ['Healthy Cooking', 'Plant-Based', 'Meal Prep'],
  },
  {
    id: 6,
    name: 'Zara Okafor',
    role: 'Dance & Movement Coach',
    bio: 'Professional dancer and fitness coach who blends cultural dance styles into engaging fitness classes.',
    events: 20,
    members: 390,
    avatar: '👩🏿',
    specialty: ['Dance Fitness', 'Afrobeats', 'Zumba'],
  },
];

export default function Organizers() {
  return (
    <section id="organizers" className="py-20 px-4 bg-[#f5f3ff]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#ddd6fe] text-[#7c3aed] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            🤝 Our Team
          </span>
          <h2 className="text-4xl font-bold text-[#4c1d95] mb-4">Meet the Organizers</h2>
          <p className="text-[#6b6375] max-w-xl mx-auto">
            Dedicated community leaders who plan, coordinate, and bring our health events to life.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizers.map((org) => (
            <div
              key={org.id}
              className="bg-white rounded-2xl p-6 border border-[#ede9fe] hover:shadow-lg transition-shadow duration-200"
            >
              {/* Avatar & name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#ede9fe] rounded-full flex items-center justify-center text-3xl">
                  {org.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-[#4c1d95] text-lg">{org.name}</h3>
                  <p className="text-sm text-[#8b5cf6] font-medium">{org.role}</p>
                </div>
              </div>

              <p className="text-sm text-[#6b6375] mb-5 leading-relaxed">{org.bio}</p>

              {/* Specialty tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {org.specialty.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#f5f3ff] text-[#7c3aed] text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex justify-around border-t border-[#f5f3ff] pt-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#7c3aed]">{org.events}</div>
                  <div className="text-xs text-[#6b6375]">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-[#7c3aed]">{org.members}</div>
                  <div className="text-xs text-[#6b6375]">Members Reached</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-[#6b6375] mb-4">Want to become a community organizer?</p>
          <a
            href="#contact"
            className="bg-[#7c3aed] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#6d28d9] transition-colors duration-200"
          >
            Apply to Organize
          </a>
        </div>
      </div>
    </section>
  );
}
