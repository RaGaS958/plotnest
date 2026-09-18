import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, Plot } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  Building2,
  Layers,
  Users,
  Calendar,
  CreditCard,
  Plus,
  ArrowUpRight,
  TrendingUp,
  CheckCircle,
  Clock,
  ChevronRight,
  Search
} from 'lucide-react';

interface DeveloperDashboardProps {
  onNavigateToInventory: () => void;
  onNavigateToLeads: () => void;
  onOpenProjectWizard: () => void;
  onSelectProject: (projectId: string) => void;
}

export const DeveloperDashboard: React.FC<DeveloperDashboardProps> = ({
  onNavigateToInventory,
  onNavigateToLeads,
  onOpenProjectWizard,
  onSelectProject
}) => {
  const { projects, plots, bookings, leads, siteVisits } = useApp();

  // Filter developer organization projects (e.g. ORG001 GreenField)
  const devProjects = projects.filter(p => p.organizationId === 'ORG001' || p.organizationId === 'ORG002');
  const devPlots = plots.filter(pl => devProjects.some(pr => pr.id === pl.projectId));

  const totalPlots = devPlots.length;
  const availablePlots = devPlots.filter(p => p.status === 'AVAILABLE').length;
  const onHoldPlots = devPlots.filter(p => p.status === 'ON_HOLD').length;
  const bookedPlots = devPlots.filter(p => p.status === 'BOOKED').length;

  const totalBookingValue = bookings
    .filter(b => devProjects.some(pr => pr.id === b.projectId))
    .reduce((acc, b) => acc + (b.totalPrice || 3250000), 0);

  return (
    <div id="developer-dashboard" className="space-y-8">
      {/* Top Header & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Developer CRM &amp; Inventory Suite</span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">GreenField Estates Pvt. Ltd.</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time plot inventory locking, lead management, and digital customer reservation oversight.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="dev-add-project-btn"
            type="button"
            onClick={onOpenProjectWizard}
            className="px-4 py-2.5 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard New Project</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Managed Plots</span>
            <Building2 className="w-4 h-4 text-[#14532D]" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{totalPlots}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-emerald-700">{devProjects.length}</span> Active Projects
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Available Inventory</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-900 mt-2">{availablePlots}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            {Math.round((availablePlots / (totalPlots || 1)) * 100)}% available for booking
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Active Plot Holds</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-900 mt-2">{onHoldPlots}</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Locked by prospective buyers
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Booking Revenue</span>
            <CreditCard className="w-4 h-4 text-[#14532D]" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            ₹{(totalBookingValue / 10000000).toFixed(2)} Cr
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            <span className="font-bold text-slate-800">{bookedPlots}</span> Confirmed Plots Booked
          </div>
        </div>
      </div>

      {/* Active Projects List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">Active Land Projects</h3>
            <p className="text-xs text-slate-500">Overview of inventory sell-through and regulatory verification</p>
          </div>
          <button
            type="button"
            onClick={onNavigateToInventory}
            className="text-xs font-bold text-[#14532D] hover:underline flex items-center gap-1"
          >
            <span>Manage All Plots</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devProjects.map(prj => {
            const prjPlots = plots.filter(p => p.projectId === prj.id);
            const prjAvail = prjPlots.filter(p => p.status === 'AVAILABLE').length;
            const prjBooked = prjPlots.filter(p => p.status === 'BOOKED').length;

            return (
              <div key={prj.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{prj.name}</h4>
                    <span className="text-xs text-slate-500">{prj.locality}, {prj.city}</span>
                  </div>
                  <StatusBadge status={prj.status} />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs bg-white p-2 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Plots</span>
                    <strong className="text-slate-900">{prjPlots.length}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Available</span>
                    <strong className="text-emerald-700">{prjAvail}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Booked</span>
                    <strong className="text-rose-700">{prjBooked}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-slate-500">RERA: <strong>{prj.reraInfo || 'Under review'}</strong></span>
                  <button
                    type="button"
                    onClick={() => onSelectProject(prj.id)}
                    className="font-bold text-[#14532D] hover:underline"
                  >
                    Customer Preview →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CRM & Leads Pipeline Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-sm text-slate-900">Recent Customer Inquiries</h3>
            </div>
            <button
              type="button"
              onClick={onNavigateToLeads}
              className="text-xs font-semibold text-[#14532D] hover:underline"
            >
              View Pipeline ({leads.length})
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {leads.slice(0, 4).map(lead => (
              <div key={lead.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{lead.name}</span>
                  <span className="text-slate-500 text-[11px]">{lead.projectName} • {lead.phone}</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {lead.stage.replace('_', ' ')}
                  </span>
                  <span className="text-slate-400 block text-[10px] mt-0.5">
                    Budget: ₹{(lead.budget / 100000).toFixed(1)}L
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Site visits summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-sm text-slate-900">Scheduled Physical Site Visits</h3>
            </div>
            <span className="text-xs text-slate-400">{siteVisits.length} upcoming</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {siteVisits.map(visit => (
              <div key={visit.id} className="py-2.5 flex items-start justify-between gap-3">
                <div>
                  <span className="font-bold text-slate-900 block">{visit.buyerName}</span>
                  <span className="text-slate-500 text-[11px] block">{visit.projectName}</span>
                  {visit.notes && (
                    <span className="text-[10px] text-slate-400 italic block mt-0.5 truncate max-w-xs">
                      {visit.notes}
                    </span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-emerald-900 block">{visit.date}</span>
                  <span className="text-slate-500 text-[11px] block">{visit.time}</span>
                  <StatusBadge status={visit.status} size="sm" className="mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
