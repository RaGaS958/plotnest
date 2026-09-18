import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Plot, Project } from '../types';
import { PlotCard } from '../components/buyer/PlotCard';
import { ProjectCard } from '../components/buyer/ProjectCard';
import { FilterRail, SearchFilters } from '../components/buyer/FilterRail';
import {
  Search,
  Filter,
  Grid,
  List,
  Layers,
  SlidersHorizontal,
  Scale,
  Sparkles,
  ArrowUpDown,
  X
} from 'lucide-react';

interface SearchPageProps {
  initialLocality?: string;
  initialMaxPrice?: number;
  onSelectPlot: (plot: Plot) => void;
  onSelectProject: (projectId: string) => void;
  onOpenSitePlan: (projectId: string) => void;
  onOpenCompare: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  initialLocality = '',
  initialMaxPrice,
  onSelectPlot,
  onSelectProject,
  onOpenSitePlan,
  onOpenCompare
}) => {
  const { plots, projects, compareList } = useApp();

  const [viewMode, setViewMode] = useState<'plots-grid' | 'plots-list' | 'projects'>('plots-grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Search & Filter state
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    locality: initialLocality,
    projectId: '',
    propertyType: '',
    minPrice: 0,
    maxPrice: initialMaxPrice || 10000000,
    minArea: 0,
    maxArea: 10000,
    facing: '',
    roadWidth: '',
    cornerOnly: false,
    parkFacingOnly: false,
    verifiedOnly: false,
    reraOnly: false,
    status: '',
    sortBy: 'PRICE_ASC'
  });

  const [isSearching, setIsSearching] = useState(false);
  const [deferredFilters, setDeferredFilters] = useState(filters);

  // Artificial delay + deferred filter application to simulate search skeleton and protect main thread
  React.useEffect(() => {
    setIsSearching(true);
    const timeout = setTimeout(() => {
      setDeferredFilters(filters);
      setIsSearching(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [filters]);

  React.useEffect(() => {
    if (initialLocality !== undefined) {
      setFilters(prev => ({ ...prev, locality: initialLocality }));
    }
  }, [initialLocality]);

  React.useEffect(() => {
    if (initialMaxPrice !== undefined && initialMaxPrice > 0) {
      setFilters(prev => ({ ...prev, maxPrice: initialMaxPrice }));
    }
  }, [initialMaxPrice]);

  const handleResetFilters = () => {
    setFilters({
      keyword: '',
      locality: '',
      projectId: '',
      propertyType: '',
      minPrice: 0,
      maxPrice: 10000000,
      minArea: 0,
      maxArea: 10000,
      facing: '',
      roadWidth: '',
      cornerOnly: false,
      parkFacingOnly: false,
      verifiedOnly: false,
      reraOnly: false,
      status: '',
      sortBy: 'PRICE_ASC'
    });
  };

  // Filtered plots
  const filteredPlots = useMemo(() => {
    return plots.filter(plot => {
      const prj = projects.find(p => p.id === plot.projectId);

      if (deferredFilters.keyword) {
        const kw = deferredFilters.keyword.toLowerCase();
        const matchesPlot = plot.plotNo.toLowerCase().includes(kw);
        const matchesPrj = prj?.name.toLowerCase().includes(kw);
        const matchesLoc = prj?.locality.toLowerCase().includes(kw);
        if (!matchesPlot && !matchesPrj && !matchesLoc) return false;
      }

      if (deferredFilters.locality && prj?.locality.toLowerCase() !== deferredFilters.locality.toLowerCase()) {
        return false;
      }

      if (deferredFilters.projectId && plot.projectId !== deferredFilters.projectId) {
        return false;
      }

      if (plot.price > deferredFilters.maxPrice) {
        return false;
      }

      if (deferredFilters.facing && plot.facing !== deferredFilters.facing) {
        return false;
      }

      if (deferredFilters.roadWidth) {
        const widthNum = parseInt(deferredFilters.roadWidth, 10);
        if (plot.roadWidthFt !== widthNum) return false;
      }

      if (deferredFilters.cornerOnly && !plot.corner) {
        return false;
      }

      if (deferredFilters.parkFacingOnly && !plot.parkFacing) {
        return false;
      }

      if (deferredFilters.status && plot.status !== deferredFilters.status) {
        return false;
      }

      if (deferredFilters.reraOnly && (!prj || !prj.reraInfo)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (deferredFilters.sortBy === 'PRICE_ASC') return a.price - b.price;
      if (deferredFilters.sortBy === 'PRICE_DESC') return b.price - a.price;
      if (deferredFilters.sortBy === 'AREA_DESC') return b.areaSqFt - a.areaSqFt;
      return 0;
    });
  }, [plots, projects, deferredFilters]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(prj => {
      if (deferredFilters.keyword && !prj.name.toLowerCase().includes(deferredFilters.keyword.toLowerCase()) && !prj.locality.toLowerCase().includes(deferredFilters.keyword.toLowerCase())) {
        return false;
      }
      if (deferredFilters.locality && prj.locality.toLowerCase() !== deferredFilters.locality.toLowerCase()) {
        return false;
      }
      if (deferredFilters.reraOnly && !prj.reraInfo) {
        return false;
      }
      return true;
    });
  }, [projects, deferredFilters]);

  return (
    <div id="search-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Search bar & quick toggles */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            id="search-main-input"
            type="text"
            placeholder="Search by plot number (e.g. A-02), locality, or project name..."
            value={filters.keyword}
            onChange={e => setFilters({ ...filters, keyword: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-1 focus:ring-[#14532D]"
          />
          {filters.keyword && (
            <button
              type="button"
              onClick={() => setFilters({ ...filters, keyword: '' })}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View mode buttons & Filter toggle for mobile */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filters.sortBy}
              onChange={e => setFilters({ ...filters, sortBy: e.target.value })}
              className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800"
            >
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
              <option value="AREA_DESC">Area: Largest First</option>
            </select>
          </div>

          {/* View switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('plots-grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'plots-grid' ? 'bg-white shadow-2xs text-[#14532D]' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Plots Grid"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('plots-list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'plots-list' ? 'bg-white shadow-2xs text-[#14532D]' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Plots List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('projects')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'projects' ? 'bg-white shadow-2xs text-[#14532D]' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Projects"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Filter Rail + Results */}
      <div className="flex gap-6 items-start">
        {/* Left Filter Rail (Desktop) */}
        <FilterRail
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          projects={projects}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Right Content Area */}
        <main className="flex-1 w-full space-y-4">
          {/* Results count header */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <span>
              Showing{' '}
              <strong className="text-slate-900">
                {viewMode === 'projects' ? filteredProjects.length : filteredPlots.length}
              </strong>{' '}
              {viewMode === 'projects' ? 'land communities' : 'individual plots'}
            </span>

            {filters.locality && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-md">
                Locality: {filters.locality}
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, locality: '' })}
                  className="hover:text-rose-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Render content based on viewMode */}
          {isSearching ? (
            <div className={`grid gap-4 ${viewMode === 'projects' ? 'grid-cols-1 md:grid-cols-2' : viewMode === 'plots-list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'}`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col bg-slate-100 rounded-2xl h-[320px] p-4 gap-4">
                  <div className="w-full h-[180px] bg-slate-200 rounded-xl"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="mt-auto h-8 bg-slate-200 rounded-lg w-full"></div>
                </div>
              ))}
            </div>
          ) : viewMode === 'projects' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelectProject={onSelectProject}
                  onOpenSitePlan={onOpenSitePlan}
                />
              ))}
            </div>
          ) : viewMode === 'plots-list' ? (
            <div className="space-y-3">
              {filteredPlots.map(plot => (
                <PlotCard
                  key={plot.id}
                  plot={plot}
                  project={projects.find(p => p.id === plot.projectId)}
                  onSelectPlot={onSelectPlot}
                  layout="list"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPlots.map(plot => (
                <PlotCard
                  key={plot.id}
                  plot={plot}
                  project={projects.find(p => p.id === plot.projectId)}
                  onSelectPlot={onSelectPlot}
                  layout="grid"
                />
              ))}
            </div>
          )}

          {/* Zero results state */}
          {!isSearching && ((viewMode === 'projects' && filteredProjects.length === 0) ||
            (viewMode !== 'projects' && filteredPlots.length === 0)) && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-base text-slate-800">No matching plots found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Try widening your budget range or clearing orientation filters to see all available inventory.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-[#14532D] font-bold text-xs rounded-xl transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Floating Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom duration-200 border border-slate-700">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold">
              {compareList.length} Plot{compareList.length !== 1 ? 's' : ''} Selected
            </span>
          </div>

          <button
            id="floating-compare-btn"
            type="button"
            onClick={onOpenCompare}
            className="px-4 py-1.5 bg-[#14532D] hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Compare Side-by-Side
          </button>
        </div>
      )}
    </div>
  );
};
