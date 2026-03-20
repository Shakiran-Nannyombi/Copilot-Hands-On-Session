export default function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-[#f5f3ff] via-[#ede9fe] to-white py-24 px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-[#ede9fe] text-[#7c3aed] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🌸 Community-Powered Wellness
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#4c1d95] leading-tight mb-6">
            Plan. Connect. <br />
            <span className="text-[#8b5cf6]">Thrive Together.</span>
          </h1>
          <p className="text-lg text-[#6b6375] max-w-lg mb-8 leading-relaxed">
            Bloom Health Club is your hub for community organizers to collaborate on health events,
            share resources, and bring wellness programs to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#events"
              className="bg-[#7c3aed] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#6d28d9] transition-colors duration-200 text-center"
            >
              Explore Events
            </a>
            <a
              href="#organizers"
              className="border-2 border-[#7c3aed] text-[#7c3aed] px-8 py-3 rounded-full font-semibold hover:bg-[#f5f3ff] transition-colors duration-200 text-center"
            >
              Meet Organizers
            </a>
          </div>
        </div>

        {/* Illustration / Stats card */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {[
            { emoji: '🏃', count: '1,200+', label: 'Active Members' },
            { emoji: '📅', count: '48', label: 'Events This Year' },
            { emoji: '🤝', count: '30+', label: 'Organizers' },
            { emoji: '🌍', count: '12', label: 'Communities' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200 border border-[#ede9fe]"
            >
              <div className="text-4xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-bold text-[#6d28d9]">{stat.count}</div>
              <div className="text-sm text-[#6b6375]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
