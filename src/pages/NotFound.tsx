import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#181818] flex items-center justify-center px-4">
      <div className="text-center p-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-yellow-400/20 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
            These aren't the droids you're looking for
          </h2>
          <p className="text-gray-100 mb-8 text-lg">
            This page has vanished into hyperspace. The archives are incomplete.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold transition-all duration-200"
          >
            Return to Base
          </Link>
          <div>
            <button
              onClick={() => window.history.back()}
              className="text-yellow-400/60 hover:text-yellow-400 underline transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
        
        <div className="mt-12 text-sm text-gray-400">
          <p className="mb-4">Navigate to a known system:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { to: '/people', label: 'People' },
              { to: '/planets', label: 'Planets' },
              { to: '/films', label: 'Films' },
              { to: '/starships', label: 'Starships' },
              { to: '/vehicles', label: 'Vehicles' },
              { to: '/species', label: 'Species' }
            ].map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className="text-yellow-400/60 hover:text-yellow-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;