const galleryItems = [
  { id: 1, emoji: '🧘', title: 'Sunrise Yoga', tag: 'Fitness' },
  { id: 2, emoji: '🥗', title: 'Nutrition Fair', tag: 'Education' },
  { id: 3, emoji: '🏃', title: 'Community Run', tag: 'Fitness' },
  { id: 4, emoji: '🌸', title: 'Wellness Retreat', tag: 'Wellness' },
  { id: 5, emoji: '💪', title: 'Strength Bootcamp', tag: 'Fitness' },
  { id: 6, emoji: '🎉', title: 'Health Fair', tag: 'Community' },
  { id: 7, emoji: '🍎', title: 'Cooking Class', tag: 'Education' },
  { id: 8, emoji: '💃', title: 'Dance Fitness', tag: 'Fitness' },
];

const tagColors = {
  Fitness: 'bg-[#ede9fe] text-[#7c3aed]',
  Education: 'bg-[#ddd6fe] text-[#6d28d9]',
  Wellness: 'bg-[#f5f3ff] text-[#8b5cf6]',
  Community: 'bg-[#c4b5fd] text-white',
};

const bgColors = [
  'bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe]',
  'bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe]',
  'bg-gradient-to-br from-[#ddd6fe] to-[#c4b5fd]',
  'bg-gradient-to-br from-[#c4b5fd] to-[#a78bfa]',
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#ede9fe] text-[#7c3aed] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            📸 Our Community
          </span>
          <h2 className="text-4xl font-bold text-[#4c1d95] mb-4">Event Highlights</h2>
          <p className="text-[#6b6375] max-w-xl mx-auto">
            A glimpse into the vibrant events and moments shared by our community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              className={`${bgColors[i % bgColors.length]} rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform duration-200 cursor-pointer aspect-square`}
            >
              <span className="text-5xl">{item.emoji}</span>
              <div className="text-center">
                <p className="font-semibold text-[#4c1d95] text-sm">{item.title}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${tagColors[item.tag]}`}>
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
