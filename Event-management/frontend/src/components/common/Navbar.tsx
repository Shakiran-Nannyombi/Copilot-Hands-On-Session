import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Bell, User, Menu, X, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/events" className="flex items-center gap-2 font-bold text-primary-600 text-lg">
            <Calendar className="h-6 w-6" />
            <span>EventMS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/events" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
              Events
            </Link>
            {user && (
              <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Dashboard
              </Link>
            )}
            {user && ['ORGANIZER', 'ADMIN'].includes(user.role) && (
              <Link to="/attendance" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Attendance
              </Link>
            )}
            {user?.role === 'ADMIN' && (
              <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Bell className="h-5 w-5 text-gray-500" />
                </button>
                <div className="flex items-center gap-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.firstName}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
          <Link
            to="/events"
            className="flex items-center gap-2 py-2 text-sm text-gray-700"
            onClick={() => setMobileOpen(false)}
          >
            <Calendar className="h-4 w-4" /> Events
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 py-2 text-sm text-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
          )}
          {user?.role === 'ADMIN' && (
            <Link
              to="/admin"
              className="flex items-center gap-2 py-2 text-sm text-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              <Shield className="h-4 w-4" /> Admin
            </Link>
          )}
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 py-2 text-sm text-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                <User className="h-4 w-4" /> Profile
              </Link>
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="flex items-center gap-2 py-2 text-sm text-red-600 w-full"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="btn-secondary text-sm flex-1 text-center" onClick={() => setMobileOpen(false)}>
                Sign In
              </Link>
              <Link to="/register" className="btn-primary text-sm flex-1 text-center" onClick={() => setMobileOpen(false)}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
