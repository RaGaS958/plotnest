import React, { useState } from 'react';
import { Project, Plot } from '../types';
import { useApp } from '../context/AppContext';
import { SitePlan } from '../components/buyer/SitePlan';
import { PlotCard } from '../components/buyer/PlotCard';
import { StatusBadge, VerificationBadge } from '../components/common/StatusBadge';
import {
  MapPin,
  Star,
  ShieldCheck,
  Calendar,
  Layers,
  FileText,
  Compass,
  TreePine,
  Car,
  ChevronRight,
  Download,
  CheckCircle2,
  PhoneCall,
  Clock,
  ArrowLeft
} from 'lucide-react';

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
  onSelectPlot: (plot: Plot) => void;
  onOpenSiteVisitModal: (projectId: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onBack,
  onSelectPlot,
  onOpenSiteVisitModal
}) => {
  const { projects, plots } = useApp();

  const [activeTab, setActiveTab] = useState<'SITE_PLAN' | 'PLOTS' | 'LEGAL' | 'CONNECTIVITY'>('SITE_PLAN');

  const project = projects.find(p => p.id === projectId) || projects[0];
  const projectPlots = plots.filter(p => p.projectId === project?.id);

  if (!project) return null;

  const availableCount = projectPlots.filter(p => p.status === 'AVAILABLE').length;

  return (
    <div id="project-detail-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Top back button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Project Listings</span>
      </button>

      {/* Project Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-900">
          <img
            src={project.images[0]}
            alt={project.name}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-black/30" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <VerificationBadge label="RERA Approved Layout" />
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-xl text-xs font-bold text-slate-900 shadow-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{project.rating} Rating</span>
            </div>
          </div>

          {/* Bottom Title Bar inside hero */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                {project.locality}, {project.city}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black drop-shadow-sm">{project.name}</h1>
              <p className="text-xs sm:text-sm text-slate-200">
                Developed by <strong className="text-white">{project.developerName || 'GreenField Estates'}</strong> • RERA: <strong className="font-mono text-emerald-300">{project.reraInfo}</strong>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-4 rounded-2xl text-left md:text-right shrink-0">
              <span className="text-xs text-emerald-200 block">All-Inclusive Plots Range</span>
              <div className="text-2xl font-black text-white">
                ₹{(project.priceFrom / 100000).toFixed(1)}L – ₹{(project.priceTo / 100000).toFixed(1)}L
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Plotted Inventory</span>
            <strong className="text-slate-900 text-sm font-bold">
              {availableCount} Available / {projectPlots.length} Total
            </strong>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Development Stage</span>
            <strong className="text-slate-900 text-sm font-bold">
              {project.developmentStage}
            </strong>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Possession Timeline</span>
            <strong className="text-slate-900 text-sm font-bold">
              {project.possession}
            </strong>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Site Visit Service</span>
            <button
              type="button"
              onClick={() => onOpenSiteVisitModal(project.id)}
              className="text-[#14532D] text-sm font-bold underline flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Book Guided Tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-bold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('SITE_PLAN')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'SITE_PLAN'
              ? 'border-[#14532D] text-[#14532D]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Interactive Master Site Plan</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('PLOTS')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'PLOTS'
              ? 'border-[#14532D] text-[#14532D]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <TreePine className="w-4 h-4" />
          <span>All Plots Inventory ({projectPlots.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('LEGAL')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'LEGAL'
              ? 'border-[#14532D] text-[#14532D]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>RERA &amp; Title Verification</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('CONNECTIVITY')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'CONNECTIVITY'
              ? 'border-[#14532D] text-[#14532D]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Location &amp; Growth Corridors</span>
        </button>
      </div>

      {/* TAB CONTENT: INTERACTIVE SITE PLAN */}
      {activeTab === 'SITE_PLAN' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">Cadastral Master Plan Demarcation</h3>
                <p className="text-xs text-slate-500">
                  Select any plot parcel on the master plan to inspect dimensions, road frontage, pricing, or initiate a 15-minute hold.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <SitePlan
                projectId={project.id}
                onSelectPlot={onSelectPlot}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PLOTS INVENTORY GRID */}
      {activeTab === 'PLOTS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectPlots.map(plot => (
              <PlotCard
                key={plot.id}
                plot={plot}
                project={project}
                onSelectPlot={onSelectPlot}
                layout="grid"
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: LEGAL & RERA */}
      {activeTab === 'LEGAL' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">Legal Audit &amp; Approvals Summary</h3>
            <p className="text-xs text-slate-500">
              Verified by certified land revenue specialists before publishing to the PlotNest platform.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'UP-RERA Project Sanction Letter',
                id: project.reraInfo || 'UPRERAAGT2026/09/01',
                desc: 'Official registration ensuring escrow account compliance and development timelines.'
              },
              {
                title: '30-Year Non-Encumbrance Certificate (Bar Association)',
                id: 'ENC-LCK-2026-9912',
                desc: 'Clean legal title with zero mortgage, civil disputes, or third-party liabilities.'
              },
              {
                title: 'Lucknow Development Authority (LDA) Town Sanction',
                id: 'LDA/TP/2025/1109',
                desc: 'Approved layout specifying 40ft/60ft road corridors, underground cabling, and drainage.'
              },
              {
                title: 'Non-Agricultural (Section 143/80 UP Revenue Code)',
                id: 'REV-SDM-MOH-8821',
                desc: 'Land officially mutated to residential non-agricultural classification.'
              }
            ].map((doc, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">{doc.title}</span>
                    <span className="text-slate-500 text-[11px] block mt-0.5">{doc.desc}</span>
                    <span className="font-mono text-emerald-900 text-[10px] font-bold block mt-1">
                      Certificate No: {doc.id}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                    Audited ✓
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: CONNECTIVITY & LOCATION */}
      {activeTab === 'CONNECTIVITY' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">Corridor Connectivity &amp; Infrastructure</h3>
            <p className="text-xs text-slate-500">
              High-growth zone with direct multi-lane highway connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block text-sm">Key Transit Distances</span>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li className="flex justify-between">
                  <span>Chaudhary Charan Singh International Airport:</span>
                  <strong>18 Mins</strong>
                </li>
                <li className="flex justify-between">
                  <span>Charbagh Railway Terminal:</span>
                  <strong>24 Mins</strong>
                </li>
                <li className="flex justify-between">
                  <span>Kisan Path / Ring Road Interconnector:</span>
                  <strong>4 Mins</strong>
                </li>
                <li className="flex justify-between">
                  <span>Ekana International Cricket Stadium:</span>
                  <strong>12 Mins</strong>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block text-sm">Social Infrastructure</span>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li className="flex justify-between">
                  <span>Medanta Super-Specialty Hospital:</span>
                  <strong>10 Mins</strong>
                </li>
                <li className="flex justify-between">
                  <span>HCL IT City &amp; IIIT Lucknow:</span>
                  <strong>8 Mins</strong>
                </li>
                <li className="flex justify-between">
                  <span>Lulu Hypermarket &amp; Mall:</span>
                  <strong>11 Mins</strong>
                </li>
                <li className="flex justify-between">
                  <span>Delhi Public School (Shaheed Path):</span>
                  <strong>9 Mins</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
