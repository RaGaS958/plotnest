import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Compass, Bookmark, Clock, User, Building2, Shield } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onNavigate }) => {
  const { role, favorites, activeHold } = useApp();

  const isViewActive = (target: string) => {
    const normCurrent = currentView.toUpperCase();
    if (target === 'home') return normCurrent === 'HOME';
    if (target === 'search' || target === 'explore') return normCurrent === 'SEARCH';
    if (target === 'saved' || target === 'buyer-dashboard' || target === 'bookings') return normCurrent === 'BUYER_DASHBOARD';
    if (target === 'developer-portal' || target === 'developer-dashboard') return normCurrent === 'DEVELOPER_DASHBOARD';
    if (target === 'developer-inventory') return normCurrent === 'DEVELOPER_INVENTORY';
    if (target === 'admin-portal' || target === 'admin-dashboard') return normCurrent === 'ADMIN_DASHBOARD';
    return false;
  };

  return (
    <nav
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around"
    >
      <button
        id="mob-nav-home"
        type="button"
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
          isViewActive('home') ? 'text-[#14532D] font-bold' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>Home</span>
      </button>

      <button
        id="mob-nav-explore"
        type="button"
        onClick={() => onNavigate('search')}
        className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
          isViewActive('search') ? 'text-[#14532D] font-bold' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Compass className="w-5 h-5 mb-0.5" />
        <span>Explore</span>
      </button>

      {role === 'buyer' && (
        <>
          <button
            id="mob-nav-saved"
            type="button"
            onClick={() => onNavigate('saved')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 px-2 rounded-lg text-[10px] font-medium transition-colors relative ${
              isViewActive('saved') ? 'text-[#14532D] font-bold' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Bookmark className="w-5 h-5 mb-0.5" />
            <span>Saved</span>
            {favorites.length > 0 && (
              <span className="absolute top-1 right-2 w-4 h-4 bg-emerald-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            id="mob-nav-bookings"
            type="button"
            onClick={() => onNavigate('buyer-dashboard')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 px-2 rounded-lg text-[10px] font-medium transition-colors relative ${
              isViewActive('buyer-dashboard') ? 'text-[#14532D] font-bold' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clock className="w-5 h-5 mb-0.5" />
            <span>Bookings</span>
            {activeHold && (
              <span className="absolute top-1 right-2 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
            )}
          </button>
        </>
      )}

      {role === 'developer' && (
        <>
          <button
            id="mob-nav-dev-portal"
            type="button"
            onClick={() => onNavigate('developer-portal')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
              isViewActive('developer-portal') ? 'text-[#14532D] font-bold' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Building2 className="w-5 h-5 mb-0.5" />
            <span>Console</span>
          </button>
          <button
            id="mob-nav-dev-inventory"
            type="button"
            onClick={() => onNavigate('developer-inventory')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
              isViewActive('developer-inventory') ? 'text-[#14532D] font-bold' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span>Plots</span>
          </button>
        </>
      )}

      {role === 'admin' && (
        <button
          id="mob-nav-admin"
          type="button"
          onClick={() => onNavigate('admin-portal')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            isViewActive('admin-portal') ? 'text-[#14532D] font-bold' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Shield className="w-5 h-5 mb-0.5" />
          <span>Admin</span>
        </button>
      )}
    </nav>
  );
};
