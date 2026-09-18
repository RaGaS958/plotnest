import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuditEvent } from '../../types';

export const AdminAuditLogs: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { bookings } = useApp();

  const baseEvents: AuditEvent[] = [
    {
      id: 'EVT-101',
      action: 'UP-RERA Regulatory Sanction Audited & Approved',
      timestamp: '2026-09-18 10:30 AM',
      actor: 'Admin (Priya Verma)',
      targetId: 'PRJ001',
      details: 'Town planning certificate and 30-year non-encumbrance search verified with Lucknow District Registry.'
    },
    {
      id: 'EVT-102',
      action: 'Escrow Booking Token Confirmed',
      timestamp: '2026-09-18 11:15 AM',
      actor: 'Aarav Sharma (Buyer)',
      targetId: 'BK-2026-0001',
      details: 'Plot A-01 reservation token ₹1,00,000 confirmed in dedicated project RERA escrow depository.'
    },
    {
      id: 'EVT-103',
      action: 'Anti-Sniping Plot Hold Created',
      timestamp: '2026-09-18 01:20 PM',
      actor: 'System Engine',
      targetId: 'PLT002',
      details: '15-minute exclusive lock activated for Plot A-02 preventing simultaneous buyer collision.'
    },
    {
      id: 'EVT-104',
      action: 'Boundary Demarcation Pillars Verified',
      timestamp: '2026-09-17 04:45 PM',
      actor: 'Sr. Cadastral Surveyor',
      targetId: 'PRJ002',
      details: 'GPS coordinates for corner stones matching official Master Layout approved by LDA.'
    },
    {
      id: 'EVT-105',
      action: 'Developer Project Onboarding Dossier Submitted',
      timestamp: '2026-09-17 02:10 PM',
      actor: 'GreenField Estates',
      targetId: 'PRJ003',
      details: 'Submitted 36 plotted units for state town planning verification and escrow registration.'
    }
  ];

  // Also include booking events
  const bookingEvents: AuditEvent[] = bookings.flatMap((b, idx) =>
    (b.events || []).map((e, eIdx) => ({
      id: `BK-EVT-${idx}-${eIdx}`,
      action: e.label,
      timestamp: e.time,
      actor: e.actor || b.buyerName || 'Buyer',
      targetId: b.plotNo ? `Plot ${b.plotNo}` : b.id,
      details: e.details || `Booking ID ${b.id} status: ${b.status}`
    }))
  );

  const allEvents = [...bookingEvents, ...baseEvents];

  return (
    <div id="admin-audit-logs-view" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Console</span>
          </button>
          <h1 className="text-2xl font-black text-slate-900">Platform Audit &amp; Event Ledger</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable system audit logs tracking regulatory approvals, inventory state locks, and customer reservations.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="space-y-4 border-l-2 border-slate-200 pl-4 ml-2 text-xs">
          {allEvents.map((evt, idx) => (
            <div key={evt.id || idx} className="relative">
              <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-200" />
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-slate-900 text-sm">{evt.action}</span>
                <span className="text-[11px] text-slate-400 font-mono">{evt.timestamp}</span>
              </div>
              <div className="text-slate-600 mt-0.5">{evt.details}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Actor: <span className="font-semibold text-slate-600">{evt.actor}</span> • Target: <span className="font-mono text-emerald-800">{evt.targetId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
