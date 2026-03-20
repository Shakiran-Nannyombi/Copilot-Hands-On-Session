export default function Footer() {
  return (
    <footer className="bg-lavender-900 text-lavender-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌿</span>
              <span className="text-lg font-bold text-white">
                Health<span className="text-lavender-300">Club</span>
              </span>
            </div>
            <p className="text-sm text-lavender-300 leading-relaxed">
              A platform for community organizers to collaborate, plan events, and build healthier communities together.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['Home', 'Events', 'Organizers', 'About'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-lavender-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-lavender-300">
              <li>📧 hello@healthclub.community</li>
              <li>📍 Community Center, Main St</li>
              <li>📞 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-lavender-800 mt-8 pt-6 text-center text-sm text-lavender-400">
          © {new Date().getFullYear()} Health Club Community. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
