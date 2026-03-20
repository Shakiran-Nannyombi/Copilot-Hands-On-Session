import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['Wellness', 'Fitness', 'Education', 'Sports', 'Social'];

const INITIAL_FORM_STATE = {
  title: '',
  date: '',
  time: '',
  location: '',
  category: 'Wellness',
  spots: '',
  description: '',
  organizer: '',
};

export default function NewEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-lavender-100 shadow-md p-10 text-center max-w-md w-full">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-lavender-900 mb-2">Event Created!</h2>
          <p className="text-lavender-500 mb-6">
            <strong className="text-lavender-700">"{form.title}"</strong> has been successfully submitted.
            Your community will see it in the events list shortly.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/events')}
              className="px-6 py-2.5 bg-lavender-600 text-white rounded-xl font-medium hover:bg-lavender-700 transition-colors"
            >
              View Events
            </button>
            <button
              onClick={() => { setForm(INITIAL_FORM_STATE); setSubmitted(false); }}
              className="px-6 py-2.5 bg-lavender-50 text-lavender-700 rounded-xl font-medium hover:bg-lavender-100 transition-colors"
            >
              Create Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-lavender-900 mb-2">Create a New Event</h1>
        <p className="text-lavender-500">
          Fill in the details below to add your event to the community calendar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-lavender-100 shadow-sm p-8 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-lavender-700 mb-1" htmlFor="title">
            Event Title *
          </label>
          <input
            id="title"
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Morning Yoga in the Park"
            className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 text-lavender-900 placeholder-lavender-300"
          />
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-lavender-700 mb-1" htmlFor="date">
              Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 text-lavender-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-lavender-700 mb-1" htmlFor="time">
              Time *
            </label>
            <input
              id="time"
              name="time"
              type="time"
              required
              value={form.time}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 text-lavender-900"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-lavender-700 mb-1" htmlFor="location">
            Location *
          </label>
          <input
            id="location"
            name="location"
            required
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Central Park Lawn"
            className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 text-lavender-900 placeholder-lavender-300"
          />
        </div>

        {/* Category + Spots */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-lavender-700 mb-1" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 text-lavender-900 bg-white"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-lavender-700 mb-1" htmlFor="spots">
              Available Spots
            </label>
            <input
              id="spots"
              name="spots"
              type="number"
              min="1"
              value={form.spots}
              onChange={handleChange}
              placeholder="e.g. 30"
              className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 text-lavender-900 placeholder-lavender-300"
            />
          </div>
        </div>

        {/* Organizer */}
        <div>
          <label className="block text-sm font-semibold text-lavender-700 mb-1" htmlFor="organizer">
            Organizer Name *
          </label>
          <input
            id="organizer"
            name="organizer"
            required
            value={form.organizer}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 text-lavender-900 placeholder-lavender-300"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-lavender-700 mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the event, what to expect, what to bring…"
            className="w-full px-4 py-2.5 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 text-lavender-900 placeholder-lavender-300 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-lavender-600 text-white font-semibold rounded-xl hover:bg-lavender-700 transition-colors shadow-sm text-base"
        >
          Publish Event
        </button>
      </form>
    </div>
  );
}
