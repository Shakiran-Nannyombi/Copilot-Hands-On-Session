import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-amber-100 mb-4">
          <AlertTriangle className="h-10 w-10 text-amber-500" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl text-gray-500 mb-6">Page not found</p>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/events" className="btn-primary inline-flex items-center gap-2">
          <Home className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
