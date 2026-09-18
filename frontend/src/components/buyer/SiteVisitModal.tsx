import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import { Calendar, Clock, MapPin, User, Check, X, ShieldCheck, Car } from 'lucide-react';

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectId?: string;
  defaultPlotNo?: string;
}

export const SiteVisitModal: React.FC<SiteVisitModalProps> = ({
  isOpen,
  onClose,
  defaultProjectId,
  defaultPlotNo
}) => {
  const { projects, scheduleSiteVisit, currentUser } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    defaultProjectId || (projects[0]?.id || 'PRJ001')
  );
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-22');
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [plotFocus, setPlotFocus] = useState<string>(defaultPlotNo || 'A-02');
  const [cabAssistance, setCabAssistance] = useState<boolean>(true);
  const [specialNotes, setSpecialNotes] = useState<string>(
    'Requesting boundary stone marker verification and master plan physical orientation.'
  );

  React.useEffect(() => {
    if (isOpen) {
      if (defaultProjectId) setSelectedProjectId(defaultProjectId);
      if (defaultPlotNo) setPlotFocus(defaultPlotNo);
    }
  }, [isOpen, defaultProjectId, defaultPlotNo]);

  if (!isOpen) return null;

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleConfirm = () => {
    scheduleSiteVisit(
      selectedProjectId,
      selectedDate,
      selectedTime,
      `Plot focus: ${plotFocus}. Cab pickup requested: ${cabAssistance ? 'Yes' : 'No'}. Notes: ${specialNotes}`
    );
    onClose();
  };

  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4">
      <div
        id="site-visit-modal"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Schedule Physical Site Visit</h3>
              <p className="text-xs text-slate-500">Free guided tour with certified land advisor</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Project select */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Target Project</label>
            <select
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium"
            >
              {projects.map(pr => (
                <option key={pr.id} value={pr.id}>
                  {pr.name} ({pr.locality}, {pr.city})
                </option>
              ))}
            </select>
          </div>

          {/* Plot number & Date in 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Specific Plot to Inspect</label>
              <input
                type="text"
                value={plotFocus}
                onChange={e => setPlotFocus(e.target.value)}
                placeholder="e.g. A-02"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Visit Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Time Slot Selector */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Select Time Window</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {timeSlots.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all ${
                    selectedTime === t
                      ? 'bg-[#14532D] text-white border-[#14532D] shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Transportation / Cab pickup checkbox */}
          <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Car className="w-4 h-4 text-emerald-700" />
              <div>
                <span className="font-bold text-slate-800 block text-xs">Complimentary Site Pickup</span>
                <span className="text-[11px] text-slate-500">Within Lucknow municipal limits</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={cabAssistance}
              onChange={e => setCabAssistance(e.target.checked)}
              className="w-4 h-4 rounded text-[#14532D] focus:ring-[#14532D]"
            />
          </div>

          {/* Dedicated Advisor Preview */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
              RS
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-900 block">Assigned Land Specialist: Rohan Sharma</span>
              <span className="text-[11px] text-slate-500 block">Senior Property Advisor • 8+ Years Experience</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 font-semibold text-xs hover:bg-slate-200 rounded-xl"
          >
            Cancel
          </button>
          <button
            id="confirm-schedule-visit-btn"
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2.5 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Site Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
