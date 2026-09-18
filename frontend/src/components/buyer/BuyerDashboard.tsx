import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { PlotCard } from './PlotCard';
import {
  Building,
  Bookmark,
  Calendar,
  Clock,
  Printer,
  Download,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Booking, Plot } from '../../types';

interface BuyerDashboardProps {
  onSelectPlot: (plot: Plot) => void;
  onExploreProjects: () => void;
  onContinueCheckout: (plotId: string) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  onSelectPlot,
  onExploreProjects,
  onContinueCheckout
}) => {
  const {
    currentUser,
    bookings,
    favorites,
    plots,
    projects,
    siteVisits,
    activeHold,
    holdSecondsRemaining
  } = useApp();

  const [activeTab, setActiveTab] = useState<'BOOKINGS' | 'FAVORITES' | 'VISITS'>('BOOKINGS');
  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState<Booking | null>(null);

  const favoritePlots = plots.filter(p => favorites.includes(p.id));

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div id="buyer-dashboard-view" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Active Hold Alert Banner if any */}
      {activeHold && holdSecondsRemaining > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5 text-amber-700 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">
                  Temporary Reservation Active: Plot {activeHold.plotId}
                </span>
                <span className="text-xs font-mono font-bold text-amber-950 bg-amber-200 px-2 py-0.5 rounded">
                  {formatTimer(holdSecondsRemaining)} left
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Complete your allotment token payment before timer expires to prevent the plot from being released to other buyers.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onContinueCheckout(activeHold.plotId)}
            className="px-5 py-2.5 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shrink-0"
          >
            <span>Complete Booking Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-xl">
            {currentUser.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">{currentUser.name}</h1>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Buyer
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentUser.phone} • {currentUser.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onExploreProjects}
          className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#14532D] border border-emerald-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Explore More Projects</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('BOOKINGS')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'BOOKINGS'
              ? 'border-[#14532D] text-[#14532D]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>My Reserved &amp; Booked Plots ({bookings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('FAVORITES')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'FAVORITES'
              ? 'border-[#14532D] text-[#14532D]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Favorites ({favoritePlots.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('VISITS')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'VISITS'
              ? 'border-[#14532D] text-[#14532D]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Site Visits ({siteVisits.length})</span>
        </button>
      </div>

      {/* TAB 1: BOOKINGS */}
      {activeTab === 'BOOKINGS' && (
        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-base text-slate-800">No active bookings yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Explore verified plotted layouts and use our interactive site plan to lock your preferred unit.
              </p>
              <button
                type="button"
                onClick={onExploreProjects}
                className="mt-6 px-6 py-2.5 bg-[#14532D] text-white rounded-xl font-bold text-xs shadow-md"
              >
                Browse Available Plots
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map(b => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6"
                >
                  {/* Card top */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-mono">ID: {b.id}</span>
                        <StatusBadge status={b.status} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mt-0.5">
                        Plot {b.plotNo} • {b.projectName}
                      </h3>
                      <span className="text-xs text-slate-500">
                        Booked on {b.bookingDate || (b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'Recent')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedReceiptBooking(b)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-800" />
                        <span>Allotment Voucher</span>
                      </button>
                    </div>
                  </div>

                  {/* Lifecycle Stepper */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                      Plot Allotment &amp; Registration Lifecycle
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                      {[
                        { title: '1. Plot Reserved', sub: 'Completed', state: 'done' },
                        { title: '2. Escrow Token', sub: `₹${(b.bookingAmount/100000).toFixed(1)}L Paid`, state: 'done' },
                        { title: '3. Allotment Letter', sub: 'Digitally Signed', state: 'done' },
                        { title: '4. Agreement for Sale', sub: 'Draft in Review', state: 'active' },
                        { title: '5. Sub-Registrar Deed', sub: 'Scheduled', state: 'pending' }
                      ].map((stepItem, idx) => (
                        <div key={idx} className="p-3 rounded-xl border bg-slate-50 flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 text-xs font-bold ${
                            stepItem.state === 'done'
                              ? 'bg-emerald-600 text-white'
                              : stepItem.state === 'active'
                              ? 'bg-amber-500 text-white ring-2 ring-amber-100'
                              : 'bg-slate-200 text-slate-400'
                          }`}>
                            {stepItem.state === 'done' ? '✓' : idx + 1}
                          </div>
                          <span className="font-bold text-slate-900 text-[11px] block">{stepItem.title}</span>
                          <span className="text-[10px] text-slate-500 block">{stepItem.sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Key Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100 text-xs">
                    <div>
                      <span className="text-slate-500 block">Total Agreed Price</span>
                      <strong className="text-slate-900 text-sm">₹{b.totalPrice ? (b.totalPrice / 100000).toFixed(2) : '35.00'} Lakh</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Token Paid (Escrow)</span>
                      <strong className="text-emerald-900 text-sm">₹{b.bookingAmount.toLocaleString('en-IN')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Balance Due for Registry</span>
                      <strong className="text-slate-900 text-sm">₹{b.totalPrice ? ((b.totalPrice - b.bookingAmount) / 100000).toFixed(2) : '34.00'} Lakh</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Buyer PAN / Tax ID</span>
                      <strong className="font-mono text-slate-800">{b.kycData?.pan || b.buyerPan || 'ABCDE1234F'}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FAVORITES */}
      {activeTab === 'FAVORITES' && (
        <div className="space-y-4">
          {favoritePlots.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-base text-slate-800">No saved plots</h3>
              <p className="text-xs text-slate-400 mt-1">
                Click the bookmark icon on any plot in the site plan or listing to save it here for quick access.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoritePlots.map(plot => (
                <PlotCard
                  key={plot.id}
                  plot={plot}
                  project={projects.find(p => p.id === plot.projectId)}
                  onSelectPlot={onSelectPlot}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SITE VISITS */}
      {activeTab === 'VISITS' && (
        <div className="space-y-4">
          {siteVisits.map(visit => (
            <div
              key={visit.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{visit.projectName}</span>
                  <StatusBadge status={visit.status} size="sm" />
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="flex items-center gap-1 font-semibold text-emerald-900">
                    <Calendar className="w-3.5 h-3.5" />
                    {visit.date} at {visit.time}
                  </span>
                  <span>•</span>
                  <span>Advisor: Rohan Sharma</span>
                </div>
                {visit.notes && (
                  <p className="text-slate-400 text-[11px] italic mt-1">{visit.notes}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  Complimentary Cab Pickup Arranged
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Digital Receipt Modal */}
      {selectedReceiptBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="text-center pb-3 border-b border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">
                Official Digital Allotment Voucher
              </span>
              <h3 className="font-black text-lg text-slate-900 mt-1">PlotNest Land Marketplace</h3>
              <p className="text-xs text-slate-500">RERA Escrow Depository Partner: HDFC Bank</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-mono font-bold text-slate-900">{selectedReceiptBooking.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Buyer Legal Name:</span>
                <span className="font-bold text-slate-900">{selectedReceiptBooking.buyerName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Allotted Inventory:</span>
                <span className="font-bold text-slate-900">Plot {selectedReceiptBooking.plotNo} ({selectedReceiptBooking.projectName})</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Token Amount Paid:</span>
                <span className="font-black text-emerald-900">₹{selectedReceiptBooking.bookingAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Payment Gateway Reference:</span>
                <span className="font-mono text-slate-700">UPI/TXN-9988220194</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedReceiptBooking(null)}
                className="px-5 py-2 rounded-xl bg-[#14532D] hover:bg-[#0F4022] text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
