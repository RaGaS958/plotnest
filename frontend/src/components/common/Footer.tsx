import React from 'react';
import { PlotNestLogo } from '../branding/PlotNestLogo';
import { ShieldCheck, MapPin, Phone, Mail, Award, Lock, HelpCircle } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-[#152018] text-white pt-16 pb-24 lg:pb-12 border-t border-[#233528]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#243729]">
          {/* Brand description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/95 p-2 rounded-xl">
                <PlotNestLogo variant="horizontal" size="md" />
              </div>
            </div>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              India’s first transaction-first digital platform for plot and land discovery, interactive layout inventory, online reservation, and complete registration tracking.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#202E23] text-emerald-300 text-xs border border-[#2d4232]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                RERA-aligned compliance
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#202E23] text-amber-300 text-xs border border-[#2d4232]">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Real-Time Plot Holds
              </span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Explore & Book
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button type="button" onClick={() => onNavigate('search')} className="hover:text-emerald-400 transition-colors">
                  Residential Plots
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('projects')} className="hover:text-emerald-400 transition-colors">
                  Gated Communities
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('search')} className="hover:text-emerald-400 transition-colors">
                  Park-Facing Plots
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('search')} className="hover:text-emerald-400 transition-colors">
                  Corner Plots
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('search')} className="hover:text-emerald-400 transition-colors">
                  Sultanpur Road corridor
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: How it Works */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              For Stakeholders
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button type="button" onClick={() => onNavigate('developer-portal')} className="hover:text-emerald-400 transition-colors">
                  List Your Project
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('developer-inventory')} className="hover:text-emerald-400 transition-colors">
                  Developer Inventory CRM
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('admin-portal')} className="hover:text-emerald-400 transition-colors">
                  Regulatory Verification
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('buyer-dashboard')} className="hover:text-emerald-400 transition-colors">
                  Buyer Document Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Demo Operations
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 90000 10001 (Demo Desk)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@plotnest.demo</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Prototype Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
          <p className="leading-relaxed max-w-3xl">
            <strong>Demonstration Prototype Notice:</strong> PlotNest is a client-demo prototype showcasing exact-plot interactive discovery, temporary reservation holds, and transaction workflows. All PAN numbers, Aadhaar sequences, payment gateway callbacks, and land titles shown are strictly simulated for presentation safety.
          </p>
          <div className="flex items-center gap-4 text-slate-400 text-xs shrink-0">
            <span>© 2026 PlotNest Tech</span>
            <span>•</span>
            <span>RERA Registered Demo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
