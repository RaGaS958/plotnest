import React from 'react';
import { Project } from '../../types';
import { Filter, X, RotateCcw, Check, Sparkles, Compass } from 'lucide-react';

export interface SearchFilters {
  keyword: string;
  locality: string;
  projectId: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  facing: string;
  roadWidth: string;
  cornerOnly: boolean;
  parkFacingOnly: boolean;
  verifiedOnly: boolean;
  reraOnly: boolean;
  status: string;
  sortBy: string;
}

interface FilterRailProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onReset: () => void;
  projects: Project[];
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterRail: React.FC<FilterRailProps> = ({
  filters,
  onFilterChange,
  onReset,
  projects,
  isOpenMobile,
  onCloseMobile
}) => {
  const localities = ['All Localities', 'Sultanpur Road', 'Shaheed Path', 'Mohan Road'];
  const facings = ['All Facings', 'East', 'North', 'North-East', 'West', 'South'];
  const roadWidths = ['Any Road Width', '30 ft', '40 ft', '60 ft'];
  const propertyTypes = ['All Types', 'Residential Plotted Gated', 'Farm Lands', 'Commercial Plots'];

  const content = (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#14532D]" />
          <h3 className="font-bold text-sm text-slate-900">Search Filters</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Quick Verified & RERA Toggles */}
      <div className="space-y-2 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="font-semibold text-slate-800">Verified Projects Only</span>
          <input
            id="filter-verified-toggle"
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={e => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#14532D] focus:ring-[#14532D]"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="font-semibold text-slate-800">RERA Sanctioned Only</span>
          <input
            id="filter-rera-toggle"
            type="checkbox"
            checked={filters.reraOnly}
            onChange={e => onFilterChange({ ...filters, reraOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#14532D] focus:ring-[#14532D]"
          />
        </label>
      </div>

      {/* Locality */}
      <div>
        <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[10px]">
          Locality / Growth Corridor
        </label>
        <select
          id="filter-locality-select"
          value={filters.locality}
          onChange={e => onFilterChange({ ...filters, locality: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
        >
          {localities.map(loc => (
            <option key={loc} value={loc === 'All Localities' ? '' : loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Project */}
      <div>
        <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[10px]">
          Project Community
        </label>
        <select
          id="filter-project-select"
          value={filters.projectId}
          onChange={e => onFilterChange({ ...filters, projectId: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
        >
          <option value="">All Projects</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Budget Range */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
            Max Budget
          </label>
          <span className="font-bold text-emerald-800">
            ₹{(filters.maxPrice / 100000).toFixed(0)} Lakh
          </span>
        </div>
        <input
          id="filter-budget-slider"
          type="range"
          min={1500000}
          max={10000000}
          step={250000}
          value={filters.maxPrice}
          onChange={e => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#14532D]"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹15 Lakh</span>
          <span>₹1 Crore</span>
        </div>
      </div>

      {/* Facing */}
      <div>
        <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[10px]">
          Plot Orientation (Facing)
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {facings.map(f => (
            <button
              key={f}
              type="button"
              onClick={() => onFilterChange({ ...filters, facing: f === 'All Facings' ? '' : f })}
              className={`py-1.5 px-2 text-center rounded-lg border text-[11px] font-medium transition-all ${
                (filters.facing === f || (f === 'All Facings' && !filters.facing))
                  ? 'bg-[#14532D] text-white border-[#14532D]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Road Width */}
      <div>
        <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[10px]">
          Internal Road Width
        </label>
        <select
          value={filters.roadWidth}
          onChange={e => onFilterChange({ ...filters, roadWidth: e.target.value === 'Any Road Width' ? '' : e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
        >
          {roadWidths.map(rw => (
            <option key={rw} value={rw}>
              {rw}
            </option>
          ))}
        </select>
      </div>

      {/* Corner & Park Facing attributes */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
          <input
            id="filter-corner-checkbox"
            type="checkbox"
            checked={filters.cornerOnly}
            onChange={e => onFilterChange({ ...filters, cornerOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#14532D] focus:ring-[#14532D]"
          />
          <span>Corner Plots Only (2-side road)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
          <input
            id="filter-park-checkbox"
            type="checkbox"
            checked={filters.parkFacingOnly}
            onChange={e => onFilterChange({ ...filters, parkFacingOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#14532D] focus:ring-[#14532D]"
          />
          <span>Park Facing Only</span>
        </label>
      </div>

      {/* Availability Status */}
      <div className="pt-2 border-t border-slate-100">
        <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[10px]">
          Inventory Status
        </label>
        <select
          value={filters.status}
          onChange={e => onFilterChange({ ...filters, status: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
        >
          <option value="">All Statuses</option>
          <option value="AVAILABLE">Available Only</option>
          <option value="ON_HOLD">On Hold</option>
          <option value="BOOKED">Booked</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Rail */}
      <aside className="hidden lg:block w-72 shrink-0 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs h-fit sticky top-24">
        {content}
      </aside>

      {/* Mobile / Tablet Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-2xs">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <span className="font-bold text-base text-slate-900">Filter Inventory</span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
            <div className="mt-8 pt-4 border-t border-slate-200 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-full py-3 bg-[#14532D] text-white font-bold rounded-xl text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
