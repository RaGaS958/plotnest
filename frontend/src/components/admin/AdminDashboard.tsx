import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  ShieldCheck,
  Building,
  Layers,
  CreditCard,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateToVerification: () => void;
  onNavigateToBookings: () => void;
  onNavigateToAudit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateToVerification,
  onNavigateToBookings,
  onNavigateToAudit
}) => {
  const { projects, plots, bookings, activeHold } = useApp();

  const pendingVerificationProjects = projects.filter(
    p => p.status === 'UNDER_REVIEW' || p.status === 'PENDING_VERIFICATION' || p.status === 'CHANGES_REQUIRED' || p.status === 'CHANGES_REQUESTED'
  );

  const approvedProjects = projects.filter(p => p.status === 'APPROVED');
  const totalGMV = bookings.reduce((acc, b) => acc + (b.totalPrice || 3250000), 0);
  const totalEscrowCollected = bookings.reduce((acc, b) => acc + b.bookingAmount, 0);

  return (
    <div id="admin-dashboard-view" className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Trust &amp; Platform Operations Console
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Platform Administrator Suite</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Supervise RERA legal verifications, plot release state machines, and booking escrow settlement compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="admin-open-verification-btn"
            type="button"
            onClick={onNavigateToVerification}
            className="px-4 py-2.5 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Review Pending Queue ({pendingVerificationProjects.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Pending Verifications</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-900 mt-2">
            {pendingVerificationProjects.length}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Projects awaiting deed review
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Published Communities</span>
            <Building className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {approvedProjects.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {plots.length} demarcated plots
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Platform Bookings</span>
            <CreditCard className="w-4 h-4 text-[#14532D]" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {bookings.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            All units verified &amp; allotted
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Escrow Token Volume</span>
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-emerald-900 mt-2">
            ₹{(totalEscrowCollected / 100000).toFixed(1)} Lakh
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Gross booking value: ₹{(totalGMV / 10000000).toFixed(2)} Cr
          </div>
        </div>
      </div>

      {/* Verification Queue Preview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900">Priority Verification Queue</h3>
              <p className="text-xs text-slate-500">Developer submissions requiring legal clearance</p>
            </div>
            <button
              type="button"
              onClick={onNavigateToVerification}
              className="text-xs font-bold text-[#14532D] hover:underline flex items-center gap-1"
            >
              <span>Launch Verification Suite</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {projects.map(p => (
              <div key={p.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                    <StatusBadge status={p.status} size="sm" />
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Developer: {p.developerName || 'GreenField / Avadh Group'} • {p.plotCount} Plotted Units • {p.locality}
                  </span>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={onNavigateToVerification}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-[#14532D] hover:text-white text-slate-700 font-semibold rounded-lg text-xs transition-colors"
                  >
                    Inspect Deeds
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Highlights */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
            Platform Guardrails
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="font-bold text-emerald-900 block">15-Minute Hold Enforcer</span>
              <p className="text-emerald-800 text-[11px] mt-0.5">
                Active. Automatically expires abandoned plot holds to protect market transparency.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block">Escrow Bank Integration</span>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Connected to HDFC Bank Escrow node. Automated digital allotment receipts generated on payment.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block">Audit Log Dispatcher</span>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Every reservation, status change, and payment transaction is signed in the immutable ledger.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
