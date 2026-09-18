import React, { useState } from 'react';
import { Plot } from '../../types';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { ZoomIn, ZoomOut, RotateCcw, Info, Check, ShieldCheck, TreePine, Navigation } from 'lucide-react';

interface SitePlanProps {
  plots?: Plot[];
  selectedPlotId?: string | null;
  onSelectPlot: (plot: Plot) => void;
  projectName?: string;
  projectId?: string;
}

export const SitePlan: React.FC<SitePlanProps> = ({
  plots: propPlots,
  selectedPlotId = null,
  onSelectPlot,
  projectName = "Green Valley Residency",
  projectId
}) => {
  const { plots: contextPlots } = useApp();
  const plots = propPlots || (projectId ? contextPlots.filter(p => p.projectId === projectId) : contextPlots);

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredPlot, setHoveredPlot] = useState<Plot | null>(null);
  const [highlightFilter, setHighlightFilter] = useState<'ALL' | 'AVAILABLE' | 'CORNER' | 'PARK' | 'NORTH_EAST' | 'UNDER_35L'>('ALL');

  // Group plots or look up by plotNo
  const getPlotByNo = (plotNo: string): Plot | undefined => {
    return plots.find(p => p.plotNo.toLowerCase() === plotNo.toLowerCase() || p.id.toLowerCase() === plotNo.toLowerCase());
  };

  const isPlotHighlighted = (plot: Plot | undefined): boolean => {
    if (!plot) return true;
    if (highlightFilter === 'ALL') return true;
    if (highlightFilter === 'AVAILABLE') return plot.status === 'AVAILABLE';
    if (highlightFilter === 'CORNER') return !!plot.corner;
    if (highlightFilter === 'PARK') return !!plot.parkFacing;
    if (highlightFilter === 'NORTH_EAST') return plot.facing === 'North' || plot.facing === 'East' || plot.facing === 'North-East';
    if (highlightFilter === 'UNDER_35L') return plot.price <= 3500000;
    return true;
  };

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(1.5, Math.max(0.75, prev + delta)));
  };

  const resetZoom = () => setZoomLevel(1);

  // Status color helpers
  const getStatusStyles = (status: Plot['status'], isSelected: boolean) => {
    if (isSelected) {
      return {
        fill: '#FEF3C7',
        stroke: '#D97706',
        strokeWidth: '3',
        textColor: '#78350F',
        badgeBg: 'bg-amber-500 text-white'
      };
    }
    switch (status) {
      case 'AVAILABLE':
        return {
          fill: '#ECFDF5',
          stroke: '#10B981',
          strokeWidth: '1.5',
          textColor: '#064E3B',
          badgeBg: 'bg-emerald-600 text-white'
        };
      case 'ON_HOLD':
        return {
          fill: '#FFFBEB',
          stroke: '#F59E0B',
          strokeWidth: '2',
          textColor: '#78350F',
          badgeBg: 'bg-amber-500 text-white'
        };
      case 'BOOKED':
        return {
          fill: '#FFF1F2',
          stroke: '#F43F5E',
          strokeWidth: '1.5',
          textColor: '#881337',
          badgeBg: 'bg-rose-500 text-white'
        };
      case 'BLOCKED':
      default:
        return {
          fill: '#F1F5F9',
          stroke: '#94A3B8',
          strokeWidth: '1.5',
          textColor: '#334155',
          badgeBg: 'bg-slate-500 text-white'
        };
    }
  };

  // SVG Plot positions matching SITE_PLAN.svg architecture
  // Layout has Top Row (y: 110), Central Park (x: 410, y: 130), Bottom Row (y: 260)
  const plotCoordinates: Record<string, { x: number; y: number; width: number; height: number }> = {
    'A-01': { x: 50, y: 110, width: 80, height: 110 },
    'A-02': { x: 140, y: 110, width: 80, height: 110 },
    'A-03': { x: 230, y: 110, width: 80, height: 110 },
    'A-04': { x: 320, y: 110, width: 80, height: 110 },
    // Central Park is between x: 410 and 560
    'A-05': { x: 580, y: 110, width: 80, height: 110 },
    'A-06': { x: 670, y: 110, width: 80, height: 110 },
    'A-07': { x: 760, y: 110, width: 80, height: 110 },
    'A-08': { x: 850, y: 110, width: 80, height: 110 },

    // Bottom Row
    'A-09': { x: 50, y: 260, width: 80, height: 110 },
    'A-10': { x: 140, y: 260, width: 80, height: 110 },
    'B-01': { x: 230, y: 260, width: 80, height: 110 },
    'B-02': { x: 320, y: 260, width: 80, height: 110 },
    // Pathway below central park
    'B-03': { x: 580, y: 260, width: 80, height: 110 },
    'B-04': { x: 670, y: 260, width: 80, height: 110 },
    'B-05': { x: 760, y: 260, width: 80, height: 110 },
    'C-01': { x: 850, y: 260, width: 80, height: 110 },
  };

  return (
    <div id="interactive-site-plan-wrapper" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Top Header bar inside the card */}
      <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900">{projectName} — Master Layout Plan</h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
              Interactive
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any plot below to inspect dimensions, road width, price breakdown, and lock a 15-minute hold.
          </p>
        </div>

        {/* Zoom controls & quick info */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => handleZoom(-0.15)}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono font-medium text-slate-600">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => handleZoom(0.15)}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={resetZoom}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md ml-1"
              title="Reset view"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Visual Highlighting Filters */}
      <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0">
          Highlight:
        </span>
        <button
          type="button"
          onClick={() => setHighlightFilter('ALL')}
          className={`px-3 py-1 rounded-lg font-semibold transition-all shrink-0 ${
            highlightFilter === 'ALL'
              ? 'bg-[#14532D] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Plots ({plots.length})
        </button>
        <button
          type="button"
          onClick={() => setHighlightFilter('AVAILABLE')}
          className={`px-3 py-1 rounded-lg font-semibold transition-all shrink-0 ${
            highlightFilter === 'AVAILABLE'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          Available Only ({plots.filter(p => p.status === 'AVAILABLE').length})
        </button>
        <button
          type="button"
          onClick={() => setHighlightFilter('CORNER')}
          className={`px-3 py-1 rounded-lg font-semibold transition-all shrink-0 ${
            highlightFilter === 'CORNER'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
          }`}
        >
          Corner Units (2-Side Road)
        </button>
        <button
          type="button"
          onClick={() => setHighlightFilter('PARK')}
          className={`px-3 py-1 rounded-lg font-semibold transition-all shrink-0 ${
            highlightFilter === 'PARK'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          Park Facing
        </button>
        <button
          type="button"
          onClick={() => setHighlightFilter('NORTH_EAST')}
          className={`px-3 py-1 rounded-lg font-semibold transition-all shrink-0 ${
            highlightFilter === 'NORTH_EAST'
              ? 'bg-[#14532D] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          North / East Vastu Facing
        </button>
        <button
          type="button"
          onClick={() => setHighlightFilter('UNDER_35L')}
          className={`px-3 py-1 rounded-lg font-semibold transition-all shrink-0 ${
            highlightFilter === 'UNDER_35L'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Under ₹35 Lakh
        </button>
      </div>

      {/* Interactive SVG Canvas viewport */}
      <div className="relative overflow-x-auto overflow-y-hidden p-4 md:p-6 bg-[#F8FAF7] flex justify-center min-h-[460px]">
        <div
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }}
          className="w-[980px] shrink-0"
        >
          <svg
            viewBox="0 0 980 470"
            className="w-full h-auto drop-shadow-sm select-none"
            aria-label="Interactive Master Site Plan"
          >
            {/* Background container */}
            <rect x="0" y="0" width="980" height="470" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

            {/* Top Road: 60 FT MAIN ROAD */}
            <g id="road-top">
              <rect x="30" y="30" width="920" height="50" rx="8" fill="#E2E8F0" />
              {/* Road Dash lines */}
              <line x1="40" y1="55" x2="940" y2="55" stroke="#94A3B8" strokeWidth="2" strokeDasharray="12 12" />
              <text x="490" y="45" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700" letterSpacing="2">
                60 FT MAIN ARTERIAL ROAD
              </text>
              <text x="490" y="70" textAnchor="middle" fill="#64748B" fontSize="10">
                Direct Highway Connectivity • 4-Lane Access
              </text>
            </g>

            {/* Bottom Road: 40 FT INTERNAL ROAD */}
            <g id="road-bottom">
              <rect x="30" y="390" width="920" height="50" rx="8" fill="#E2E8F0" />
              <line x1="40" y1="415" x2="940" y2="415" stroke="#94A3B8" strokeWidth="2" strokeDasharray="10 10" />
              <text x="490" y="415" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700" letterSpacing="1.5">
                40 FT INTERNAL BOULEVARD (CONCRETE PAVED)
              </text>
            </g>

            {/* CENTRAL PARK AMENITY ZONE */}
            <g id="amenity-central-park">
              <rect
                x="420"
                y="110"
                width="140"
                height="260"
                rx="16"
                fill="#DCFCE7"
                stroke="#86EFAC"
                strokeWidth="2"
              />
              {/* Decorative grass / landscape patterns */}
              <circle cx="490" cy="180" r="34" fill="#BBF7D0" opacity="0.6" />
              <circle cx="490" cy="300" r="30" fill="#BBF7D0" opacity="0.6" />
              <text x="490" y="225" textAnchor="middle" fill="#14532D" fontSize="14" fontWeight="800">
                CENTRAL PARK
              </text>
              <text x="490" y="244" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="500">
                Landscaped Gardens
              </text>
              <text x="490" y="259" textAnchor="middle" fill="#166534" fontSize="9">
                &amp; Children Jogging Track
              </text>
            </g>

            {/* RENDER PLOTS */}
            {Object.entries(plotCoordinates).map(([plotNo, coords]) => {
              const plot = getPlotByNo(plotNo);
              const status: Plot['status'] = plot ? plot.status : 'AVAILABLE';
              const isSelected = selectedPlotId === (plot ? plot.id : plotNo);
              const styles = getStatusStyles(status, isSelected);
              const isHighlighted = isPlotHighlighted(plot);

              return (
                <g
                  key={plotNo}
                  id={`svg-plot-${plotNo}`}
                  className="cursor-pointer transition-all duration-150"
                  style={{
                    opacity: isHighlighted ? 1 : 0.22,
                    transition: 'opacity 0.25s ease'
                  }}
                  onClick={() => {
                    if (plot) onSelectPlot(plot);
                  }}
                  onMouseEnter={() => plot && setHoveredPlot(plot)}
                  onMouseLeave={() => setHoveredPlot(null)}
                >
                  {/* Plot Box */}
                  <rect
                    x={coords.x}
                    y={coords.y}
                    width={coords.width}
                    height={coords.height}
                    rx="10"
                    fill={styles.fill}
                    stroke={styles.stroke}
                    strokeWidth={styles.strokeWidth}
                    className="hover:filter hover:brightness-95 transition-all"
                  />

                  {/* Corner or Park Badge indicator */}
                  {plot?.corner && (
                    <rect
                      x={coords.x + 5}
                      y={coords.y + 6}
                      width="18"
                      height="14"
                      rx="3"
                      fill="#D97706"
                    />
                  )}
                  {plot?.corner && (
                    <text
                      x={coords.x + 14}
                      y={coords.y + 17}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      C
                    </text>
                  )}

                  {plot?.parkFacing && (
                    <rect
                      x={coords.x + coords.width - 23}
                      y={coords.y + 6}
                      width="18"
                      height="14"
                      rx="3"
                      fill="#059669"
                    />
                  )}
                  {plot?.parkFacing && (
                    <text
                      x={coords.x + coords.width - 14}
                      y={coords.y + 17}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      P
                    </text>
                  )}

                  {/* Plot Number */}
                  <text
                    x={coords.x + coords.width / 2}
                    y={coords.y + 44}
                    textAnchor="middle"
                    fill={styles.textColor}
                    fontSize="16"
                    fontWeight="800"
                    fontFamily="Inter, sans-serif"
                  >
                    {plotNo}
                  </text>

                  {/* Area */}
                  <text
                    x={coords.x + coords.width / 2}
                    y={coords.y + 64}
                    textAnchor="middle"
                    fill="#475569"
                    fontSize="10"
                    fontWeight="500"
                  >
                    {plot ? `${plot.areaSqFt} sq.ft.` : '1,200 sq.ft.'}
                  </text>

                  {/* Price */}
                  <text
                    x={coords.x + coords.width / 2}
                    y={coords.y + 80}
                    textAnchor="middle"
                    fill="#152018"
                    fontSize="11"
                    fontWeight="700"
                  >
                    {plot ? `₹${(plot.price / 100000).toFixed(1)}L` : '₹32L'}
                  </text>

                  {/* Status Capsule pill */}
                  <rect
                    x={coords.x + 8}
                    y={coords.y + 88}
                    width={coords.width - 16}
                    height="15"
                    rx="7.5"
                    fill={status === 'AVAILABLE' ? '#10B981' : status === 'ON_HOLD' ? '#F59E0B' : status === 'BOOKED' ? '#EF4444' : '#64748B'}
                  />
                  <text
                    x={coords.x + coords.width / 2}
                    y={coords.y + 99}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="8.5"
                    fontWeight="700"
                    letterSpacing="0.3"
                  >
                    {status === 'AVAILABLE' ? 'AVAILABLE' : status === 'ON_HOLD' ? 'ON HOLD' : status === 'BOOKED' ? 'BOOKED' : 'BLOCKED'}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating Plot Hover Quick Preview Card */}
        {hoveredPlot && (
          <div className="hidden sm:block absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200 text-xs w-72 z-20 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-black text-sm text-slate-900">Plot {hoveredPlot.plotNo}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  hoveredPlot.status === 'AVAILABLE'
                    ? 'bg-emerald-100 text-emerald-800'
                    : hoveredPlot.status === 'ON_HOLD'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {hoveredPlot.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 py-2 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">Area</span>
                <strong className="text-slate-800">{hoveredPlot.areaSqFt} sq.ft. ({(hoveredPlot.areaSqFt / 9).toFixed(0)} Gaj)</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Facing</span>
                <strong className="text-slate-800">{hoveredPlot.facing}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Dimensions</span>
                <strong className="text-slate-800">{hoveredPlot.dimensions}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Road Width</span>
                <strong className="text-slate-800">{hoveredPlot.roadWidthFt} Ft.</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Total Price</span>
                <strong className="text-emerald-900 font-bold text-sm">
                  ₹{(hoveredPlot.price / 100000).toFixed(2)} Lakh
                </strong>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md">
                Click to inspect &amp; hold
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Legend & Quick Attributes Strip */}
      <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-slate-700">Inventory Key:</span>
          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <span className="w-3 h-3 rounded-sm bg-emerald-500 border border-emerald-600" />
            <span>Available</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <span className="w-3 h-3 rounded-sm bg-amber-500 border border-amber-600" />
            <span>On Hold (15-min lock)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <span className="w-3 h-3 rounded-sm bg-rose-500 border border-rose-600" />
            <span>Booked</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <span className="w-3 h-3 rounded-sm bg-slate-400 border border-slate-500" />
            <span>Blocked / Reserved</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <span className="inline-flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-amber-600 text-white text-[9px] flex items-center justify-center font-bold">C</span>
            <span>Corner Plot</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold">P</span>
            <span>Park Facing</span>
          </span>
        </div>
      </div>
    </div>
  );
};
