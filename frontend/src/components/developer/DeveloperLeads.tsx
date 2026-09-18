import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Users, Phone, Mail, Calendar, MessageSquare, ArrowLeft, ChevronRight, Check } from 'lucide-react';

export const DeveloperLeads: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { leads, updateLeadStage } = useApp();

  const [activeTab, setActiveTab] = useState<string>('ALL');

  const stages: Lead['stage'][] = ['NEW', 'CONTACTED', 'SITE_VISIT_SCHEDULED', 'NEGOTIATION', 'BOOKED'];

  const filteredLeads = activeTab === 'ALL'
    ? leads
    : leads.filter(l => l.stage === activeTab);

  return (
    <div id="developer-leads-view" className="space-y-6">
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
          <h1 className="text-2xl font-black text-slate-900">Buyer Lead Pipeline &amp; CRM</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track inquiries, update sales progression stages, and schedule on-ground inspections.
          </p>
        </div>
      </div>

      {/* Stage Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('ALL')}
          className={`py-2 px-3.5 rounded-xl font-bold transition-all shrink-0 ${
            activeTab === 'ALL'
              ? 'bg-[#14532D] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Inquiries ({leads.length})
        </button>
        {stages.map(st => {
          const count = leads.filter(l => l.stage === st).length;
          return (
            <button
              key={st}
              type="button"
              onClick={() => setActiveTab(st)}
              className={`py-2 px-3.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === st
                  ? 'bg-[#14532D] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{st.replace('_', ' ')}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === st ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map(lead => (
          <div
            key={lead.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{lead.name}</h4>
                  <span className="text-[11px] text-slate-500">{lead.projectName}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {lead.stage.replace('_', ' ')}
                </span>
              </div>

              <div className="space-y-2 mt-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono text-slate-800">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-800">{lead.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Budget:</span>
                  <strong className="text-slate-900">₹{(lead.budget / 100000).toFixed(1)} Lakh</strong>
                </div>
                {lead.notes && (
                  <div className="p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-100">
                    "{lead.notes}"
                  </div>
                )}
              </div>
            </div>

            {/* Advance stage dropdown */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Move Stage:</span>
              <select
                value={lead.stage}
                onChange={e => updateLeadStage(lead.id, e.target.value as Lead['stage'])}
                className="px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold"
              >
                {stages.map(st => (
                  <option key={st} value={st}>
                    {st.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
