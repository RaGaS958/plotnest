import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import {
  X,
  Check,
  ChevronRight,
  Building,
  MapPin,
  Layers,
  FileText,
  CreditCard,
  ShieldCheck,
  UploadCloud,
  Sparkles
} from 'lucide-react';

interface ProjectOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectOnboardingModal: React.FC<ProjectOnboardingModalProps> = ({
  isOpen,
  onClose
}) => {
  const { addProject } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form states
  const [name, setName] = useState('Vrindavan Enclave Plotted Colony');
  const [locality, setLocality] = useState('Shaheed Path Extension');
  const [city, setCity] = useState('Lucknow');
  const [plotCount, setPlotCount] = useState(36);
  const [priceFrom, setPriceFrom] = useState(2800000);
  const [priceTo, setPriceTo] = useState(6200000);
  const [developmentStage, setDevelopmentStage] = useState('Early Development (35%)');
  const [possession, setPossession] = useState('Dec 2027');
  const [reraNumber, setReraNumber] = useState('UPRERAAGT998877/09/2026');
  const [amenities, setAmenities] = useState<string[]>([
    '40ft Gated Road',
    'Underground Cable Ducting',
    'Sewage Treatment Plant',
    'Clubhouse & Jogging Track'
  ]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newProj: Project = {
      id: `PRJ${Date.now().toString().slice(-3)}`,
      name,
      tagline: 'Premium plotted community with RERA regulatory protection',
      developerName: 'GreenField Estates Pvt. Ltd.',
      organizationId: 'ORG001',
      city,
      locality,
      priceFrom,
      priceTo,
      plotCount,
      availableCount: plotCount,
      status: 'UNDER_REVIEW', // Submitted to admin for review!
      verificationStage: 'DOCUMENT_REVIEW',
      reraInfo: reraNumber,
      developmentStage,
      possession,
      amenities,
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
      ],
      highlights: ['Wide 40ft Internal Avenues', 'Escrow Linked Payment Assurance', 'Fast Deed Registry'],
      rating: 4.8
    };

    addProject(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4">
      <div
        id="project-onboarding-modal"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="font-bold text-base text-slate-900">Onboard New Plotted Project</h3>
            <p className="text-xs text-slate-500">Step {step} of 4: Setup project inventory &amp; RERA compliance</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Bar */}
        <div className="px-6 pt-4 pb-2">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { num: 1, label: 'Basics' },
              { num: 2, label: 'Demarcation' },
              { num: 3, label: 'RERA & Legal' },
              { num: 4, label: 'Review' }
            ].map(s => (
              <div
                key={s.num}
                className={`py-1.5 rounded-lg border text-xs font-semibold ${
                  step === s.num
                    ? 'border-[#14532D] bg-emerald-50 text-[#14532D]'
                    : step > s.num
                    ? 'border-emerald-300 text-emerald-800 bg-white'
                    : 'border-slate-200 text-slate-400 bg-slate-50'
                }`}
              >
                {s.num}. {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Content form */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Project Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Locality / Corridor</label>
                  <input
                    type="text"
                    value={locality}
                    onChange={e => setLocality(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Development Stage</label>
                  <input
                    type="text"
                    value={developmentStage}
                    onChange={e => setDevelopmentStage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estimated Possession</label>
                  <input
                    type="text"
                    value={possession}
                    onChange={e => setPossession(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Total Plotted Units</label>
                  <input
                    type="number"
                    value={plotCount}
                    onChange={e => setPlotCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Internal Road Standard</label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900">
                    <option>40 ft &amp; 60 ft concrete avenues</option>
                    <option>30 ft paved residential street</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Price From (₹)</label>
                  <input
                    type="number"
                    step={100000}
                    value={priceFrom}
                    onChange={e => setPriceFrom(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Price To (₹)</label>
                  <input
                    type="number"
                    step={100000}
                    value={priceTo}
                    onChange={e => setPriceTo(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center">
                <UploadCloud className="w-8 h-8 text-emerald-700 mx-auto mb-1" />
                <span className="font-bold text-slate-800 block">Upload Master Site Plan (SVG / GeoJSON / CAD)</span>
                <span className="text-[11px] text-slate-400">Sample CAD layout attached automatically for demo</span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">State RERA Project Registration Number</label>
                <input
                  type="text"
                  value={reraNumber}
                  onChange={e => setReraNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono font-bold text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-700 block">Regulatory Compliance Checklist</span>
                {[
                  'Competent Authority Layout Sanction Letter (LDA / Town Planning)',
                  '30-Year Non-Encumbrance Certificate & Title Search',
                  'Developer Escrow Bank Account Letter (HDFC)',
                  'Mutation & Conversion to Non-Agricultural (NA) Land'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="text-slate-800 text-[11px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Project:</span>
                  <strong className="text-slate-900">{name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <strong className="text-slate-900">{locality}, {city}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Plotted Units:</span>
                  <strong className="text-slate-900">{plotCount} Plots</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Price Range:</span>
                  <strong className="text-slate-900">₹{(priceFrom/100000).toFixed(1)}L - ₹{(priceTo/100000).toFixed(1)}L</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">RERA:</span>
                  <strong className="text-emerald-800">{reraNumber}</strong>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                <strong>Submission Pipeline Notice:</strong> Upon submitting, this project will be queued under <em>"PENDING_VERIFICATION"</em> in the Platform Admin Verification Suite for legal deed checking and master plan signoff.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg disabled:opacity-30"
          >
            Previous
          </button>

          {step < 4 ? (
            <button
              id="wizard-next-btn"
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="submit-project-onboarding-btn"
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Submit for Admin Verification</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
