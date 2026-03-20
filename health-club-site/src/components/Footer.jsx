export default function Footer() {
  return (
    <footer className="bg-[#4c1d95] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌿</span>
              <span className="font-bold text-xl">Bloom Health Club</span>
            </div>
            <p className="text-[#ddd6fe] text-sm leading-relaxed">
              A community-driven platform for organizers to collaborate, plan events, and promote wellness together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-[#c4b5fd]">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[#ddd6fe]">
              {['Home', 'Events', 'Organizers', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-[#c4b5fd]">Connect</h3>
            <ul className="space-y-2 text-sm text-[#ddd6fe]">
              <li>📧 hello@bloomhealthclub.org</li>
              <li>📍 Community Center, Main St</li>
              <li>📞 (555) 123-4567</li>
            </ul>
            <div className="flex gap-3 mt-4">
              {['𝕏', 'in', 'f'].map((icon, i) => (
                <span
                  key={i}
                  className="w-8 h-8 bg-[#7c3aed] rounded-full flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-[#8b5cf6] transition-colors"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#6d28d9] mt-10 pt-6 text-center text-sm text-[#c4b5fd]">
          © {new Date().getFullYear()} Bloom Health Club. All rights reserved. Made with 💜 for the community.
        </div>
      </div>
    </footer>
  );
}
