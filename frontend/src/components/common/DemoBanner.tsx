import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, RefreshCw, AlertCircle, CheckCircle2, ChevronRight, UserCheck, ShieldAlert, PlayCircle } from 'lucide-react';

interface DemoBannerProps {
  onNavigateToCheckout?: (plotId: string) => void;
  onOpenActiveHold?: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ onNavigateToCheckout, onOpenActiveHold }) => {
  const {
    role,
    setRole,
    activeHold,
    holdSecondsRemaining,
    releaseHold,
    resetDemoData
  } = useApp();

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <div id="demo-top-banner" className="bg-[#152018] text-white border-b border-[#243528] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          {/* Left: Presentation mode notice */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-medium text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              DEMO PROTOTYPE
            </span>
            <span className="text-slate-300 hidden sm:inline">
              Client Presentation Mode • Synthetic Data & KYC
            </span>
          </div>

          {/* Center / Right: Role switch & Reset */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center bg-[#202E23] p-0.5 rounded-lg border border-[#2E4233]">
              <span className="text-[11px] text-slate-400 px-2 font-medium">Role:</span>
              <button
                id="role-switch-buyer"
                type="button"
                onClick={() => setRole('buyer')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  role === 'buyer'
                    ? 'bg-[#14532D] text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Buyer
              </button>
              <button
                id="role-switch-developer"
                type="button"
                onClick={() => setRole('developer')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  role === 'developer'
                    ? 'bg-[#14532D] text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Developer
              </button>
              <button
                id="role-switch-admin"
                type="button"
                onClick={() => setRole('admin')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  role === 'admin'
                    ? 'bg-[#14532D] text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            <button
              id="start-demo-tour-button"
              type="button"
              onClick={() => window.dispatchEvent(new Event('start-demo-tour'))}
              className="inline-flex items-center gap-1 text-[11px] text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 px-2.5 py-1 rounded-md transition-colors shadow-xs"
              title="Start guided client tour"
            >
              <ChevronRight className="w-3 h-3" />
              <span>Start Client Tour</span>
            </button>

            <button
              id="replay-intro-button"
              type="button"
              onClick={() => {
                sessionStorage.removeItem('plotnest_has_loaded');
                window.location.reload();
              }}
              className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-[#202E23] hover:bg-[#2c3e30] border border-[#2E4233] px-2.5 py-1 rounded-md transition-colors"
              title="Replay premium loading experience"
            >
              <PlayCircle className="w-3 h-3" />
              <span>Replay Intro</span>
            </button>

            <button
              id="reset-demo-button"
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-[#202E23] hover:bg-[#2c3e30] border border-[#2E4233] px-2.5 py-1 rounded-md transition-colors"
              title="Restore initial mock data"
            >
              <RefreshCw className="w-3 h-3 text-amber-400" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Active Hold Alert Bar */}
        {activeHold && holdSecondsRemaining > 0 && (
          <div
            id="active-hold-bar"
            className="bg-amber-500 text-amber-950 px-4 py-2 text-xs font-medium flex items-center justify-between shadow-inner"
          >
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 animate-spin" />
                <span>
                  <strong>Plot {activeHold.plotNo}</strong> is temporarily reserved for you!
                </span>
                <span className="inline-flex items-center bg-amber-900 text-amber-100 px-2 py-0.5 rounded font-mono font-bold text-xs tracking-wider">
                  {formatTime(holdSecondsRemaining)}
                </span>
                <span className="hidden md:inline text-amber-900/80">
                  (Completing checkout prevents release to other buyers)
                </span>
              </div>

              <div className="flex items-center gap-2">
                {(onNavigateToCheckout || onOpenActiveHold) && (
                  <button
                    id="banner-complete-checkout-btn"
                    type="button"
                    onClick={() => {
                      if (onOpenActiveHold) onOpenActiveHold();
                      else if (onNavigateToCheckout) onNavigateToCheckout(activeHold.plotId);
                    }}
                    className="bg-amber-950 text-white hover:bg-black px-3 py-1 rounded-md font-semibold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>Complete Booking</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  id="banner-release-hold-btn"
                  type="button"
                  onClick={() => releaseHold(activeHold.plotId)}
                  className="text-amber-900 hover:text-black underline text-xs px-2 py-1"
                >
                  Release
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div
            id="reset-confirm-modal"
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900">Reset Demo State?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  This will restore all projects, plots, holds, bookings, payments, and site visits to their original clean seed state from MOCK_DATA.json.
                </p>
                <div className="mt-5 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    id="confirm-reset-btn"
                    type="button"
                    onClick={() => {
                      resetDemoData();
                      setShowResetConfirm(false);
                    }}
                    className="px-4 py-2 rounded-lg text-sm bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors"
                  >
                    Yes, Reset Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
