import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { CreditCard, FileText, ArrowLeft, RefreshCw, CheckCircle2, Clock, Printer } from 'lucide-react';

export const AdminBookings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { bookings, plots, projects } = useApp();

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  return (
    <div id="admin-bookings-view" className="space-y-6">
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
          <h1 className="text-2xl font-black text-slate-900">Platform Bookings &amp; Escrow Ledger</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit buyer plot reservations, verify escrow payments, and track digital allotment certificates.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Buyer Details</th>
                <th className="py-3.5 px-4">Project &amp; Plot</th>
                <th className="py-3.5 px-4">Escrow Token</th>
                <th className="py-3.5 px-4">Total Consideration</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {b.id}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{b.buyerName}</span>
                    <span className="text-slate-500 text-[11px] block">{b.buyerPhone}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-emerald-950 block">Plot {b.plotNo}</span>
                    <span className="text-slate-500 text-[11px] block">{b.projectName}</span>
                  </td>
                  <td className="py-3 px-4 font-black text-slate-900">
                    ₹{b.bookingAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    ₹{b.totalPrice ? (b.totalPrice / 100000).toFixed(2) : '35.00'}L
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(b)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs inline-flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Audit Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400">Transaction Certificate</span>
                <h3 className="font-black text-base text-slate-900">{selectedBooking.id}</h3>
              </div>
              <StatusBadge status={selectedBooking.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block">Buyer Name</span>
                <strong className="text-slate-900">{selectedBooking.buyerName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">PAN / Aadhaar</span>
                <strong className="text-slate-900">{selectedBooking.kycData?.pan || selectedBooking.buyerPan || 'ABCDE1234F'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Plot Allotment</span>
                <strong className="text-slate-900">Plot {selectedBooking.plotNo} ({selectedBooking.projectName})</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Token Paid</span>
                <strong className="text-emerald-800 font-bold">₹{selectedBooking.bookingAmount.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="text-xs">
              <span className="font-bold text-slate-700 block mb-2">Audit Ledger Events:</span>
              <div className="space-y-2 border-l-2 border-emerald-500 pl-3 ml-2">
                {selectedBooking.events.map((e, idx) => (
                  <div key={idx}>
                    <span className="font-bold text-slate-900 block">{e.label}</span>
                    <span className="text-slate-400 text-[10px]">{e.time} • {e.details}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Allotment Voucher</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-lg text-xs font-bold"
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
