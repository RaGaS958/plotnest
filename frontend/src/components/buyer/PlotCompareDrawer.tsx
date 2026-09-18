import React from 'react';
import { Plot, Project } from '../../types';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { X, Scale, Check, Trash2, ArrowRight, Compass } from 'lucide-react';

interface PlotCompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlot: (plot: Plot) => void;
}

export const PlotCompareDrawer: React.FC<PlotCompareDrawerProps> = ({
  isOpen,
  onClose,
  onSelectPlot
}) => {
  const { compareList, clearCompare, plots, projects, toggleCompare } = useApp();

  if (!isOpen) return null;

  const comparedPlots = plots.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-end sm:items-center bg-black/60 backdrop-blur-2xs p-2 sm:p-4">
      <div
        id="plot-compare-modal"
        className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Compare Selected Plots</h3>
              <p className="text-xs text-slate-500">
                Evaluating {comparedPlots.length} unit{comparedPlots.length !== 1 ? 's' : ''} side-by-side
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparedPlots.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium px-2 py-1 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content table */}
        <div className="p-6 overflow-x-auto flex-1">
          {comparedPlots.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              <Scale className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-slate-800">No plots selected for comparison</p>
              <p className="text-xs text-slate-400 mt-1">
                Browse the site plan or plot listing and click the compare icon on any 2–4 plots.
              </p>
            </div>
          ) : (
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-3 text-slate-400 uppercase font-bold text-[10px] w-40">
                    Feature
                  </th>
                  {comparedPlots.map(p => {
                    const prj = projects.find(pr => pr.id === p.projectId);
                    return (
                      <th key={p.id} className="py-3 px-4 min-w-[200px] text-slate-900 font-bold bg-slate-50/50 rounded-t-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-[#14532D]">Plot {p.plotNo}</span>
                          <button
                            type="button"
                            onClick={() => toggleCompare(p.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Remove from compare"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-slate-500 font-normal block truncate">
                          {prj?.name}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-600">Total Price</td>
                  {comparedPlots.map(p => (
                    <td key={p.id} className="py-2.5 px-4 font-black text-slate-900 text-sm">
                      ₹{(p.price / 100000).toFixed(2)} Lakh
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-600">Price / Sq.Ft.</td>
                  {comparedPlots.map(p => (
                    <td key={p.id} className="py-2.5 px-4 font-bold text-emerald-800">
                      ₹{p.pricePerSqFt.toLocaleString('en-IN')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-600">Plot Area</td>
                  {comparedPlots.map(p => (
                    <td key={p.id} className="py-2.5 px-4 text-slate-800 font-semibold">
                      {p.areaSqFt} sq.ft.
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-600">Dimensions</td>
                  {comparedPlots.map(p => (
                    <td key={p.id} className="py-2.5 px-4 text-slate-700">
                      {p.dimensions}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-600">Facing</td>
                  {comparedPlots.map(p => (
                    <td key={p.id} className="py-2.5 px-4 text-slate-800 font-medium">
                      {p.facing} Facing
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-600">Road Width</td>
                  {comparedPlots.map(p => (
                    <td key={p.id} className="py-2.5 px-4 text-slate-800">
                      {p.roadWidthFt} ft wide
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-600">Corner Plot</td>
                  {comparedPlots.map(p => (
                    <td key={p.id} className="py-2.5 px-4">
                      {p.corner ? (
                        <span className="font-bold text-amber-700">✓ Yes (2-Side Open)</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-600">Park Facing</td>
                  {comparedPlots.map(p => (
                    <td key={p.id} className="py-2.5 px-4">
                      {p.parkFacing ? (
                        <span className="font-bold text-emerald-700">✓ Yes (Green View)</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-600">Booking Token</td>
                  {comparedPlots.map(p => (
                    <td key={p.id} className="py-2.5 px-4 font-bold text-slate-900">
                      ₹{p.bookingAmount.toLocaleString('en-IN')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-600">Current Status</td>
                  {comparedPlots.map(p => (
                    <td key={p.id} className="py-2.5 px-4">
                      <StatusBadge status={p.status} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3"></td>
                  {comparedPlots.map(p => (
                    <td key={p.id} className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectPlot(p);
                        }}
                        className="w-full py-2 px-3 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Inspect Plot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
