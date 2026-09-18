import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/buyer/ProjectCard';
import {
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Clock,
  Compass,
  CreditCard,
  Building,
  ArrowRight,
  TrendingUp,
  Sparkles,
  TreePine,
  PhoneCall
} from 'lucide-react';

interface HomePageProps {
  onSearch: (locality?: string, budgetKey?: string) => void;
  onSelectProject: (projectId: string) => void;
  onOpenSitePlan: (projectId: string) => void;
  onOpenSiteVisitModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSearch,
  onSelectProject,
  onOpenSitePlan,
  onOpenSiteVisitModal
}) => {
  const { projects, plots, bookings } = useApp();

  const [selectedLocality, setSelectedLocality] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedLocality, selectedBudget);
  };

  const totalAvailable = plots.filter(p => p.status === 'AVAILABLE').length;

  return (
    <div id="home-page" className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#14532D]/10 via-white to-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* Trust eyebrow */}
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-950 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>India's First RERA-Verified Digital Plotted Land Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Discover, Verify &amp; Lock Your <br className="hidden sm:block" />
            <span className="text-[#14532D] underline decoration-emerald-400 decoration-wavy decoration-2">
              Exact Plot
            </span> in Minutes
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Browse legally vetted plotted layouts with interactive SVG master plans. Lock your chosen parcel with a guaranteed 15-minute hold and bank escrow protection.
          </p>

          {/* Quick Search Card */}
          <form
            onSubmit={handleHeroSearch}
            className="max-w-3xl mx-auto bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-3 text-xs"
          >
            {/* Locality dropdown */}
            <div className="flex-1 w-full text-left px-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Prime Corridor
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#14532D] shrink-0" />
                <select
                  value={selectedLocality}
                  onChange={e => setSelectedLocality(e.target.value)}
                  className="w-full bg-transparent font-bold text-slate-900 focus:outline-none"
                >
                  <option value="">All Lucknow Corridors</option>
                  <option value="Sultanpur Road">Sultanpur Road (Kisan Path)</option>
                  <option value="Shaheed Path">Amar Shaheed Path</option>
                  <option value="Mohan Road">Mohan Road (Agra Expressway)</option>
                </select>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200" />

            {/* Budget range */}
            <div className="flex-1 w-full text-left px-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Target Budget
              </label>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#14532D] shrink-0" />
                <select
                  value={selectedBudget}
                  onChange={e => setSelectedBudget(e.target.value)}
                  className="w-full bg-transparent font-bold text-slate-900 focus:outline-none"
                >
                  <option value="">Any Budget</option>
                  <option value="30">Under ₹30 Lakh</option>
                  <option value="50">₹30L – ₹50 Lakh</option>
                  <option value="75">₹50L – ₹75 Lakh</option>
                  <option value="100">Above ₹75 Lakh</option>
                </select>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              id="hero-search-btn"
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl sm:rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 active:scale-98"
            >
              <Search className="w-4 h-4" />
              <span>Explore Plots</span>
            </button>
          </form>

          {/* Key Metrics Strip */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-xs">
            <div className="p-2.5 bg-white/70 rounded-xl border border-slate-200/80">
              <span className="text-xl font-black text-slate-900 block">{totalAvailable}</span>
              <span className="text-slate-500 text-[11px]">Ready-to-Book Plots</span>
            </div>
            <div className="p-2.5 bg-white/70 rounded-xl border border-slate-200/80">
              <span className="text-xl font-black text-slate-900 block">100%</span>
              <span className="text-slate-500 text-[11px]">RERA &amp; Title Vetted</span>
            </div>
            <div className="p-2.5 bg-white/70 rounded-xl border border-slate-200/80">
              <span className="text-xl font-black text-slate-900 block">15 Min</span>
              <span className="text-slate-500 text-[11px]">Anti-Sniping Plot Lock</span>
            </div>
            <div className="p-2.5 bg-white/70 rounded-xl border border-slate-200/80">
              <span className="text-xl font-black text-slate-900 block">₹0</span>
              <span className="text-slate-500 text-[11px]">Hidden Brokerage Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Explainer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Transparent Acquisition Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            How PlotNest Eliminates Real Estate Uncertainty
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            From boundary stone verification to instant digital escrow allotment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">Search &amp; Demarcation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Filter by Vastu facing (North/East), internal road width (40ft/60ft), corner status, and RERA approval status.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#14532D] mt-4 block">No unverified listings →</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">Interactive Master Plan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Inspect every parcel on an SVG cadastral map. View frontage, dimensions, road junctions, and green belt buffers.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#14532D] mt-4 block">Exact unit precision →</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-lg">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">15-Min Protected Hold</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Lock your plot with 1 click. Our system blocks other buyers while you review commercial terms and complete demo KYC.
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-800 mt-4 block">Anti-sniping guarantee →</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg">
                4
              </div>
              <h3 className="font-bold text-base text-slate-900">Escrow &amp; Allotment</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pay booking token securely into developer escrow. Receive digital allotment certificate and legal audit timeline.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#14532D] mt-4 block">Instant voucher &amp; receipt →</span>
          </div>
        </div>
      </section>

      {/* Featured Plotted Projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Curated Land Communities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Featured Plotted Enclaves in Lucknow
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onSearch()}
            className="text-xs font-bold text-[#14532D] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Communities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
              onOpenSitePlan={onOpenSitePlan}
            />
          ))}
        </div>
      </section>

      {/* Live Activity Ticker & Trust Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Certified Legal Safety
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-tight">
              Ready to Inspect Your Land Parcel in Person?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Book a complimentary chauffeur-driven physical site inspection with certified surveyor guidance. We verify boundary stone demarcations right before your eyes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              id="home-schedule-visit-btn"
              type="button"
              onClick={onOpenSiteVisitModal}
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Schedule Free Site Tour</span>
            </button>

            <button
              type="button"
              onClick={() => onSearch()}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20"
            >
              <span>Explore Master Plans</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
