import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlotNestLogo } from '../branding/PlotNestLogo';
import {
  Compass,
  Bookmark,
  Scale,
  Calendar,
  Bell,
  Menu,
  X,
  Building2,
  CheckCircle,
  FileText,
  User,
  ExternalLink,
  ChevronDown,
  Calculator
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenCompare?: () => void;
  onOpenCalculator?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenCompare, onOpenCalculator }) => {
  const {
    role,
    currentUser,
    favorites,
    compareList,
    notifications,
    markNotificationRead,
    verificationCases
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);
  const pendingVerifications = verificationCases.filter(vc => vc.status === 'UNDER_REVIEW').length;

  const isViewActive = (target: string) => {
    const normCurrent = currentView.toLowerCase().replace(/_/g, '-');
    const normTarget = target.toLowerCase().replace(/_/g, '-');
    if (normCurrent === normTarget) return true;
    if ((normTarget === 'saved' || normTarget === 'bookings' || normTarget === 'buyer-dashboard') && normCurrent === 'buyer-dashboard') return true;
    if ((normTarget === 'projects' || normTarget === 'project-detail') && normCurrent === 'project-detail') return true;
    if (normTarget === 'explore' && normCurrent === 'search') return true;
    if ((normTarget === 'developer-portal' || normTarget === 'developer-dashboard') && (normCurrent === 'developer-dashboard' || normCurrent === 'developer-portal')) return true;
    if ((normTarget === 'admin-portal' || normTarget === 'admin-dashboard') && (normCurrent === 'admin-dashboard' || normCurrent === 'admin-portal')) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#DDE3DC] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Brand & Navigation */}
          <div className="flex items-center gap-8">
            {/* Brand Logo & Tagline */}
            <div className="flex items-center">
              <button
                id="brand-logo-btn"
                type="button"
                onClick={() => onNavigate('home')}
                className="flex items-center text-left group focus:outline-hidden"
              >
                <div className="hidden lg:block">
                  <PlotNestLogo variant="horizontal" size="md" className="transition-transform group-hover:scale-[1.02]" />
                </div>
                <div className="block lg:hidden">
                  <PlotNestLogo variant="horizontal" size="md" className="transition-transform group-hover:scale-[1.02]" />
                </div>
              </button>
            </div>
  
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-2">
            {role === 'buyer' && (
              <>
                <button
                  id="nav-explore"
                  type="button"
                  onClick={() => onNavigate('search')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isViewActive('search')
                      ? 'text-[#14532D] bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Explore Plots
                </button>

                <button
                  id="nav-projects"
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isViewActive('projects') || isViewActive('project-detail')
                      ? 'text-[#14532D] bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Featured Projects
                </button>

                <button
                  id="nav-saved"
                  type="button"
                  onClick={() => onNavigate('saved')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isViewActive('saved')
                      ? 'text-[#14532D] bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className="w-4 h-4 text-emerald-700" />
                  <span>Saved</span>
                  {favorites.length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                      {favorites.length}
                    </span>
                  )}
                </button>

                <button
                  id="nav-compare"
                  type="button"
                  onClick={() => onOpenCompare ? onOpenCompare() : onNavigate('compare')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isViewActive('compare')
                      ? 'text-[#14532D] bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Scale className="w-4 h-4 text-emerald-700" />
                  <span>Compare</span>
                  {compareList.length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-xs flex items-center justify-center font-bold">
                      {compareList.length}
                    </span>
                  )}
                </button>

                <button
                  id="nav-calculator"
                  type="button"
                  onClick={() => onOpenCalculator ? onOpenCalculator() : onNavigate('calculator')}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  title="Stamp Duty, Registry & Loan EMI Calculator"
                >
                  <Calculator className="w-4 h-4 text-emerald-700" />
                  <span>Land Calc</span>
                </button>

                <button
                  id="nav-buyer-dashboard"
                  type="button"
                  onClick={() => onNavigate('buyer-dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isViewActive('buyer-dashboard')
                      ? 'text-[#14532D] bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  My Bookings
                </button>
              </>
            )}

            {role === 'developer' && (
              <>
                <button
                  id="nav-dev-dashboard"
                  type="button"
                  onClick={() => onNavigate('developer-portal')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isViewActive('developer-portal') || isViewActive('developer-dashboard')
                      ? 'text-[#14532D] bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Developer Portal
                </button>
                <button
                  id="nav-dev-inventory"
                  type="button"
                  onClick={() => onNavigate('developer-inventory')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isViewActive('developer-inventory')
                      ? 'text-[#14532D] bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Plot Inventory
                </button>
                <button
                  id="nav-dev-leads"
                  type="button"
                  onClick={() => onNavigate('developer-leads')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isViewActive('developer-leads')
                      ? 'text-[#14532D] bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Leads & CRM
                </button>
              </>
            )}

            {role === 'admin' && (
              <>
                <button
                  id="nav-admin-dashboard"
                  type="button"
                  onClick={() => onNavigate('admin-portal')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isViewActive('admin-portal') || isViewActive('admin-dashboard')
                      ? 'text-[#14532D] bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Admin Console
                </button>
                <button
                  id="nav-admin-verification"
                  type="button"
                  onClick={() => onNavigate('admin-verification')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isViewActive('admin-verification')
                      ? 'text-[#14532D] bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Verification Queue</span>
                  {pendingVerifications > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                      {pendingVerifications}
                    </span>
                  )}
                </button>
              </>
            )}
          </nav>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                id="notification-bell-btn"
                type="button"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>

              {/* Notification Dropdown */}
              {notifDropdownOpen && (
                <div
                  id="notification-dropdown"
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
                    <span className="font-semibold text-sm text-slate-800">Notifications</span>
                    <span className="text-xs text-slate-500">{notifications.length} total</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 mt-1">
                    {notifications.slice(0, 5).map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-lg text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                          !n.read ? 'bg-emerald-50/50' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-slate-600 mt-0.5 text-[11px] leading-relaxed">{n.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile / Context badge */}
            <div
              id="user-profile-badge"
              onClick={() => {
                if (role === 'buyer') onNavigate('buyer-dashboard');
                else if (role === 'developer') onNavigate('developer-portal');
                else onNavigate('admin-portal');
              }}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-slate-100/80 hover:bg-slate-100 rounded-full border border-slate-200 cursor-pointer transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#14532D] text-white flex items-center justify-center text-xs font-bold">
                {currentUser.avatarInitials}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-semibold text-slate-800 block leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-slate-500 capitalize block -mt-0.5">
                  {currentUser.role}
                </span>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {role === 'buyer' && (
            <>
              <button
                type="button"
                onClick={() => {
                  onNavigate('search');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-emerald-50"
              >
                Explore Plots
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('projects');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-emerald-50"
              >
                Projects
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('saved');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-emerald-50 flex items-center justify-between"
              >
                <span>Saved Plots</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  {favorites.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('compare');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-emerald-50 flex items-center justify-between"
              >
                <span>Compare Plots</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                  {compareList.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onOpenCalculator) onOpenCalculator();
                  else onNavigate('calculator');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-emerald-50 flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span>Land &amp; Plot Calculator</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('buyer-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-emerald-50"
              >
                My Bookings & Timeline
              </button>
            </>
          )}

          {role === 'developer' && (
            <>
              <button
                type="button"
                onClick={() => {
                  onNavigate('developer-portal');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-emerald-50"
              >
                Dashboard Overview
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('developer-inventory');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-emerald-50"
              >
                Inventory Manager
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('developer-leads');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-emerald-50"
              >
                Leads & CRM
              </button>
            </>
          )}

          {role === 'admin' && (
            <>
              <button
                type="button"
                onClick={() => {
                  onNavigate('admin-portal');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-emerald-50"
              >
                Operations Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('admin-verification');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-emerald-50 flex items-center justify-between"
              >
                <span>Project Verification Queue</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                  {pendingVerifications}
                </span>
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
