import { useState } from 'react';

const interests = [
  'Fitness Events',
  'Nutrition Workshops',
  'Mental Wellness',
  'Dance & Movement',
  'Cooking Classes',
  'Become an Organizer',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({ name: '', email: '', interest: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-[#f5f3ff]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#ddd6fe] text-[#7c3aed] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            ✉️ Get Involved
          </span>
          <h2 className="text-4xl font-bold text-[#4c1d95] mb-4">Join Our Community</h2>
          <p className="text-[#6b6375] max-w-xl mx-auto">
            Have questions, want to participate, or ready to lead? Reach out and we'll connect you with the right organizer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info cards */}
          <div className="space-y-6">
            {[
              {
                icon: '📍',
                title: 'Visit Us',
                text: 'Community Wellness Center\n123 Main Street, Suite 200',
              },
              {
                icon: '📞',
                title: 'Call Us',
                text: '(555) 123-4567\nMon–Fri · 8 AM – 6 PM',
              },
              {
                icon: '📧',
                title: 'Email Us',
                text: 'hello@bloomhealthclub.org\nWe reply within 24 hours',
              },
              {
                icon: '🗓️',
                title: 'Drop-in Hours',
                text: 'Every Saturday · 10 AM – 12 PM\nNo appointment needed',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-5 flex items-start gap-4 border border-[#ede9fe] hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mt-0.5">{card.icon}</span>
                <div>
                  <h3 className="font-semibold text-[#4c1d95] mb-1">{card.title}</h3>
                  <p className="text-sm text-[#6b6375] whitespace-pre-line">{card.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 border border-[#ede9fe] shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-[#4c1d95] mb-2">Thank you, {form.name}!</h3>
                <p className="text-[#6b6375]">
                  We've received your message and will be in touch shortly at{' '}
                  <span className="text-[#7c3aed] font-medium">{form.email}</span>.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 text-[#7c3aed] text-sm font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#4c1d95] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full border border-[#ddd6fe] rounded-xl px-4 py-3 text-sm text-[#1f1535] placeholder-[#c4b5fd] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4c1d95] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-[#ddd6fe] rounded-xl px-4 py-3 text-sm text-[#1f1535] placeholder-[#c4b5fd] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4c1d95] mb-1.5">
                    I'm interested in
                  </label>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className="w-full border border-[#ddd6fe] rounded-xl px-4 py-3 text-sm text-[#1f1535] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent transition bg-white"
                  >
                    <option value="">Select an interest…</option>
                    {interests.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4c1d95] mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us how you'd like to get involved…"
                    className="w-full border border-[#ddd6fe] rounded-xl px-4 py-3 text-sm text-[#1f1535] placeholder-[#c4b5fd] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#7c3aed] text-white py-3 rounded-full font-semibold hover:bg-[#6d28d9] transition-colors duration-200"
                >
                  Send Message 💜
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
