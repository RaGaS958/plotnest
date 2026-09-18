import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, VerificationStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Building,
  ArrowLeft,
  Eye,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const AdminVerification: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { projects, updateProjectStatus } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects.find(p => p.status === 'UNDER_REVIEW' || p.status === 'PENDING_VERIFICATION')?.id || projects[0]?.id || ''
  );

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    reraSanction: true,
    encumbranceTitle: true,
    masterPlanCad: true,
    boundarySurvey: true,
    bankEscrowLetter: true
  });

  const [reviewerNotes, setReviewerNotes] = useState<string>(
    'All statutory documents match UP-RERA master records. Boundary survey verified by district land registrar.'
  );

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleToggleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAction = (status: Project['status']) => {
    if (!selectedProject) return;
    const verifStatus: VerificationStatus = status === 'APPROVED' ? 'VERIFIED' : status === 'REJECTED' ? 'REJECTED' : 'CHANGES_REQUIRED';
    updateProjectStatus(selectedProject.id, status, verifStatus);
  };

  return (
    <div id="admin-verification-view" className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Console</span>
          </button>
          <h1 className="text-2xl font-black text-slate-900">Project Verification Suite</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit regulatory sanctions, verify land ownership titles, and approve projects for public marketplace listing.
          </p>
        </div>
      </div>

      {/* Split-View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Queue (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800">Verification Queue</span>
            <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
              {projects.length} Total
            </span>
          </div>

          <div className="space-y-2">
            {projects.map(proj => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/60 border-[#14532D] shadow-xs ring-1 ring-[#14532D]'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{proj.name}</h4>
                    <StatusBadge status={proj.status} size="sm" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {proj.developerName || 'GreenField Estates'} • {proj.plotCount} Plots
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Locality: {proj.locality}, {proj.city}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail & Audit Checklist (8 cols) */}
        {selectedProject ? (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            {/* Project Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-900">{selectedProject.name}</h3>
                  <StatusBadge status={selectedProject.status} />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Developer: <strong className="text-slate-800">{selectedProject.developerName || 'GreenField Estates'}</strong> • RERA Reg: <strong className="font-mono text-emerald-900">{selectedProject.reraInfo || 'UPRERA-VERIFIED'}</strong>
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Inventory</span>
                <span className="text-sm font-bold text-slate-900">
                  {selectedProject.availableCount} of {selectedProject.plotCount} Available
                </span>
              </div>
            </div>

            {/* Checklist of Mandatory Verifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Statutory Regulatory Document Audit
              </h4>

              <div className="space-y-2 text-xs">
                {[
                  {
                    id: 'reraSanction',
                    title: 'RERA Registration & Gazetted Sanction Order',
                    desc: 'Verified against state RERA real estate registry database.'
                  },
                  {
                    id: 'encumbranceTitle',
                    title: '30-Year Non-Encumbrance Certificate & Search Report',
                    desc: 'Signed by certified high court land title advocate.'
                  },
                  {
                    id: 'masterPlanCad',
                    title: 'Town & Country Planning Approved Layout Plan',
                    desc: 'Boundary demarcation, 40ft/60ft roads, green buffers validated.'
                  },
                  {
                    id: 'boundarySurvey',
                    title: 'Digital Plot Demarcation & Geotagged Pillar Pillars',
                    desc: 'Physical boundary stones match platform interactive SVG layout.'
                  },
                  {
                    id: 'bankEscrowLetter',
                    title: 'Designated Escrow Account Bank Mandate',
                    desc: 'Direct account integration for 100% transparent buyer token deposits.'
                  }
                ].map(item => (
                  <label
                    key={item.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checklist[item.id] || false}
                      onChange={() => handleToggleCheck(item.id)}
                      className="mt-0.5 w-4 h-4 rounded text-[#14532D] focus:ring-[#14532D]"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 block text-xs">{item.title}</span>
                      <span className="text-[11px] text-slate-500">{item.desc}</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                      {checklist[item.id] ? 'Audited' : 'Pending'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reviewer Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Auditor Assessment Notes (Persisted to Audit Ledger)
              </label>
              <textarea
                rows={3}
                value={reviewerNotes}
                onChange={e => setReviewerNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-1 focus:ring-[#14532D]"
                placeholder="Enter regulatory notes, required modifications, or approval justification..."
              />
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
              <button
                id="admin-reject-btn"
                type="button"
                onClick={() => handleAction('REJECTED')}
                className="px-4 py-2.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Submission</span>
              </button>

              <button
                id="admin-request-changes-btn"
                type="button"
                onClick={() => handleAction('CHANGES_REQUIRED')}
                className="px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors flex items-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Request Document Rectification</span>
              </button>

              <button
                id="admin-approve-publish-btn"
                type="button"
                onClick={() => handleAction('APPROVED')}
                className="px-6 py-2.5 rounded-xl bg-[#14532D] hover:bg-[#0F4022] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve &amp; Publish to Marketplace</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
