import React from 'react';
import { Plot, Project } from '../../types';
import { StatusBadge, VerificationBadge } from '../common/StatusBadge';
import { useApp } from '../../context/AppContext';
import {
  X,
  Compass,
  Maximize2,
  Bookmark,
  Scale,
  Calendar,
  ShieldCheck,
  CreditCard,
  Clock,
  Sparkles,
  ArrowRight,
  Info,
  Calculator
} from 'lucide-react';

interface PlotDetailDrawerProps {
  plot: Plot | null;
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: (plotId: string) => void;
  onOpenSiteVisitModal: (projectId: string, plotNo: string) => void;
  onOpenCalculator?: (plot: Plot) => void;
}

export const PlotDetailDrawer: React.FC<PlotDetailDrawerProps> = ({
  plot,
  project,
  isOpen,
  onClose,
  onProceedToCheckout,
  onOpenSiteVisitModal,
  onOpenCalculator
}) => {
  const {
    favorites,
    toggleFavorite,
    compareList,
    toggleCompare,
    createHold,
    activeHold
  } = useApp();

  if (!isOpen || !plot) return null;

  const isFav = favorites.includes(plot.id);
  const isCompared = compareList.includes(plot.id);
  const isHeldByMe = activeHold?.plotId === plot.id;

  // Breakdown calculations
  const basePrice = plot.price;
  const developmentCharges = Math.round(plot.areaSqFt * 120); // ~₹120/sqft
  const cornerPlcCharges = plot.corner ? 75000 : 0;
  const estimatedTaxes = Math.round((basePrice + developmentCharges) * 0.05); // 5% GST/duty
  const totalEstimated = basePrice + developmentCharges + cornerPlcCharges + estimatedTaxes;

  const handleReserve = () => {
    if (plot.status === 'AVAILABLE') {
      const result = createHold(plot.id);
      if (result.success) {
        onProceedToCheckout(plot.id);
      }
    } else if (isHeldByMe) {
      onProceedToCheckout(plot.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/50 backdrop-blur-2xs transition-opacity">
      <div
        id="plot-detail-drawer"
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900">Plot {plot.plotNo}</span>
            <StatusBadge status={isHeldByMe ? 'ON_HOLD' : plot.status} />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(plot.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isFav
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
              title={isFav ? 'Remove from saved' : 'Save plot'}
            >
              <Bookmark className={`w-4 h-4 ${isFav ? 'fill-rose-600' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => toggleCompare(plot.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isCompared
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
              title="Compare with other plots"
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              id="close-plot-drawer-btn"
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Project & Trust summary */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {project?.locality || 'Sultanpur Road corridor'}, Lucknow
              </span>
              <VerificationBadge label="RERA Registered" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mt-1">
              {project?.name || 'Green Valley Residency'}
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Gated plotted layout with 40ft/60ft internal avenues and underground storm drainage.
            </p>
          </div>

          {/* Key Specifications Grid */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Plot Specifications
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-500 block">Total Area</span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">
                  {plot.areaSqFt.toLocaleString('en-IN')} sq.ft.
                </span>
                <span className="text-[10px] text-slate-400">({Math.round(plot.areaSqFt / 9)} sq.yd)</span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-500 block">Dimensions</span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">
                  {plot.dimensions}
                </span>
                <span className="text-[10px] text-slate-400">Front × Depth</span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-500 block">Facing</span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-emerald-600" />
                  {plot.facing}
                </span>
                <span className="text-[10px] text-slate-400">Vastu Compliant</span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-500 block">Road Width</span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">
                  {plot.roadWidthFt} ft wide
                </span>
                <span className="text-[10px] text-slate-400">Concrete paved</span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-500 block">Corner Plot</span>
                <span className={`text-sm font-bold block mt-0.5 ${plot.corner ? 'text-amber-700' : 'text-slate-700'}`}>
                  {plot.corner ? 'Yes (2-side open)' : 'Standard'}
                </span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-500 block">Park Facing</span>
                <span className={`text-sm font-bold block mt-0.5 ${plot.parkFacing ? 'text-emerald-700' : 'text-slate-700'}`}>
                  {plot.parkFacing ? 'Yes (Green view)' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing & Full Breakdown */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-emerald-50/30">
            <div className="flex items-baseline justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs text-slate-500 font-medium">Base Plot Value</span>
                <div className="text-2xl font-black text-slate-900">
                  ₹{(plot.price / 100000).toFixed(2)} Lakh
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">Rate / Sq.Ft.</span>
                <div className="text-sm font-bold text-emerald-800">
                  ₹{plot.pricePerSqFt.toLocaleString('en-IN')}/sq.ft.
                </div>
              </div>
            </div>

            {/* Price breakdown table */}
            <div className="pt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Base Plot Consideration</span>
                <span className="font-semibold text-slate-900">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Internal Development Charges (IDC)</span>
                <span className="font-semibold text-slate-900">₹{developmentCharges.toLocaleString('en-IN')}</span>
              </div>
              {plot.corner && (
                <div className="flex items-center justify-between text-amber-800">
                  <span>Preferential Location Charge (PLC Corner)</span>
                  <span className="font-semibold">₹{cornerPlcCharges.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-600">
                <span>Estimated Statutory &amp; Registry Assistance</span>
                <span className="font-semibold text-slate-900">₹{estimatedTaxes.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Estimated All-Inclusive Cost</span>
                <span className="text-base text-emerald-900">₹{totalEstimated.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Booking amount due today */}
            <div className="mt-4 p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                  Booking Amount Due Today
                </span>
                <span className="text-xs text-slate-500">
                  100% refundable as per project policy
                </span>
              </div>
              <div className="text-lg font-black text-emerald-900">
                ₹{plot.bookingAmount.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Quick Calculate Stamp Duty & EMI Action */}
            {onOpenCalculator && (
              <button
                type="button"
                onClick={() => onOpenCalculator(plot)}
                className="w-full mt-3 py-2.5 px-3 bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span>Calculate Stamp Duty, Registry &amp; Plot Loan EMI</span>
              </button>
            )}
          </div>

          {/* Verification & Legal documents preview */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Verified Documentation
            </h5>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">Competent Authority Layout Sanction</span>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Verified</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">30-Year Title Search &amp; Non-Encumbrance</span>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 space-y-2 shadow-lg">
          {plot.status === 'AVAILABLE' || isHeldByMe ? (
            <button
              id="reserve-plot-action-btn"
              type="button"
              onClick={handleReserve}
              className="w-full py-3.5 px-4 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-98"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isHeldByMe ? 'Continue to Checkout (Held)' : 'Reserve This Plot (15-min Hold)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="p-3 bg-slate-100 rounded-xl text-center text-xs font-semibold text-slate-600">
              This plot is currently {plot.status.replace('_', ' ')}. Please choose another available unit.
            </div>
          )}

          <button
            id="schedule-visit-from-drawer-btn"
            type="button"
            onClick={() => onOpenSiteVisitModal(plot.projectId, plot.plotNo)}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Schedule In-Person Site Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
