import React from 'react';
import { motion } from 'motion/react';
import { Plot, Project } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { useApp } from '../../context/AppContext';
import {
  Bookmark,
  Scale,
  Compass,
  Maximize2,
  TreePine,
  ShieldCheck,
  ChevronRight,
  Clock
} from 'lucide-react';

interface PlotCardProps {
  plot: Plot;
  project?: Project;
  onSelectPlot: (plot: Plot) => void;
  onReservePlot?: (plot: Plot) => void;
  layout?: 'grid' | 'list';
}

export const PlotCard: React.FC<PlotCardProps> = ({
  plot,
  project,
  onSelectPlot,
  onReservePlot,
  layout = 'grid'
}) => {
  const { favorites, toggleFavorite, compareList, toggleCompare, activeHold } = useApp();

  const isFav = favorites.includes(plot.id);
  const isCompared = compareList.includes(plot.id);
  const isHeldByMe = activeHold?.plotId === plot.id;

  if (layout === 'list') {
    return (
      <div
        id={`plot-card-${plot.id}`}
        className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center shrink-0">
            <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Plot</span>
            <span className="text-base font-black text-emerald-950 -mt-0.5">{plot.plotNo}</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 text-sm">{project?.name || 'Green Valley Residency'}</span>
              <StatusBadge status={isHeldByMe ? 'ON_HOLD' : plot.status} />
              {plot.corner && (
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                  Corner
                </span>
              )}
              {plot.parkFacing && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  Park Facing
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
              <span>{plot.areaSqFt} sq.ft. ({plot.dimensions})</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-emerald-600" />
                {plot.facing} Facing
              </span>
              <span>•</span>
              <span>{plot.roadWidthFt} ft Road</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
          <div className="text-left sm:text-right">
            <div className="text-lg font-black text-slate-900">
              ₹{(plot.price / 100000).toFixed(2)} L
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              ₹{plot.pricePerSqFt.toLocaleString('en-IN')}/sq.ft.
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFavorite(plot.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isFav ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-slate-200 text-slate-400 hover:bg-slate-50'
              }`}
            >
              <motion.div animate={{ scale: isFav ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.2 }}>
                <Bookmark className={`w-4 h-4 ${isFav ? 'fill-rose-600' : ''}`} />
              </motion.div>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleCompare(plot.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isCompared ? 'bg-amber-50 border-amber-200 text-amber-700' : 'border-slate-200 text-slate-400 hover:bg-slate-50'
              }`}
            >
              <motion.div animate={{ scale: isCompared ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.2 }}>
                <Scale className="w-4 h-4" />
              </motion.div>
            </motion.button>

            <button
              type="button"
              onClick={() => onSelectPlot(plot)}
              className="px-3.5 py-2 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <span>Inspect</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout
  return (
    <div
      id={`plot-card-${plot.id}`}
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
    >
      <div>
        {/* Top Header with Plot Number and Status */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <span className="text-sm font-black text-emerald-950">{plot.plotNo}</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block truncate max-w-[140px]">
                {project?.name || 'Green Valley Residency'}
              </span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                {project?.locality || 'Sultanpur Rd'}
              </span>
            </div>
          </div>

          <StatusBadge status={isHeldByMe ? 'ON_HOLD' : plot.status} />
        </div>

        {/* Badges for corner & park */}
        <div className="flex items-center gap-1.5 my-3">
          {plot.corner && (
            <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
              Corner Plot
            </span>
          )}
          {plot.parkFacing && (
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
              Park Facing
            </span>
          )}
          {!plot.corner && !plot.parkFacing && (
            <span className="text-[10px] text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
              Standard Plot
            </span>
          )}
        </div>

        {/* Specs Table */}
        <div className="grid grid-cols-2 gap-2 text-xs py-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Area</span>
            <span className="font-bold text-slate-800">{plot.areaSqFt} sq.ft.</span>
            <span className="text-[10px] text-slate-400 block">{plot.dimensions}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Facing & Road</span>
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <Compass className="w-3 h-3 text-emerald-600" />
              {plot.facing}
            </span>
            <span className="text-[10px] text-slate-500 block">{plot.roadWidthFt} ft wide road</span>
          </div>
        </div>
      </div>

      {/* Pricing & Footer Actions */}
      <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] text-slate-400">Total Price</span>
            <div className="text-xl font-black text-slate-900">
              ₹{(plot.price / 100000).toFixed(2)} Lakh
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400">Booking Token</span>
            <div className="text-xs font-bold text-emerald-800">
              ₹{plot.bookingAmount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(plot.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isFav ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-slate-200 text-slate-400 hover:bg-slate-50'
            }`}
            title="Save plot"
          >
            <motion.div animate={{ scale: isFav ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.2 }}>
              <Bookmark className={`w-4 h-4 ${isFav ? 'fill-rose-600' : ''}`} />
            </motion.div>
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleCompare(plot.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isCompared ? 'bg-amber-50 border-amber-200 text-amber-700' : 'border-slate-200 text-slate-400 hover:bg-slate-50'
            }`}
            title="Compare plot"
          >
            <motion.div animate={{ scale: isCompared ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.2 }}>
              <Scale className="w-4 h-4" />
            </motion.div>
          </motion.button>

          <button
            id={`inspect-plot-${plot.plotNo}`}
            type="button"
            onClick={() => onSelectPlot(plot)}
            className="flex-1 py-2.5 px-3 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-colors"
          >
            <span>Inspect &amp; Reserve</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
