import React, { useState, useEffect } from 'react';
import { Plot } from '../../types';
import {
  Calculator,
  X,
  CreditCard,
  Scale,
  Compass,
  Building,
  CheckCircle2,
  Info,
  ArrowRight,
  ShieldCheck,
  Percent
} from 'lucide-react';

interface PlotFinancialCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlot?: Plot | null;
}

export const PlotFinancialCalculatorModal: React.FC<PlotFinancialCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialPlot
}) => {
  const [activeTab, setActiveTab] = useState<'STAMP_DUTY' | 'LOAN_EMI' | 'UNIT_CONVERTER' | 'VASTU'>('STAMP_DUTY');

  // --- STAMP DUTY STATE ---
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPlot?.price || 3500000);
  const [buyerGender, setBuyerGender] = useState<'MALE' | 'FEMALE' | 'JOINT'>('MALE');

  // --- LOAN EMI STATE ---
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25); // 25% down
  const [interestRate, setInterestRate] = useState<number>(8.75); // 8.75%
  const [tenureYears, setTenureYears] = useState<number>(10); // 10 years

  // --- UNIT CONVERTER STATE ---
  // Base unit is sqft
  const [baseSqFt, setBaseSqFt] = useState<number>(initialPlot?.areaSqFt || 1500);

  // Sync with initialPlot if passed
  useEffect(() => {
    if (initialPlot) {
      setPropertyPrice(initialPlot.price);
      setBaseSqFt(initialPlot.areaSqFt);
    }
  }, [initialPlot]);

  if (!isOpen) return null;

  // --- CALCULATIONS: STAMP DUTY (UP / Lucknow) ---
  // In UP: Male = 7%, Female = 6%, Joint = 6.5%
  const stampRate = buyerGender === 'MALE' ? 0.07 : buyerGender === 'FEMALE' ? 0.06 : 0.065;
  const stampDutyAmount = Math.round(propertyPrice * stampRate);
  // Registration fee in UP is 1% or capped at ₹20,000 for residential plots
  const regFee = Math.min(20000, Math.round(propertyPrice * 0.01));
  const mutationCharges = 10000; // Revenue court mutation & tehsil record fee
  const lawyerDraftCharges = 12000; // Title verification draft & sub-registrar deed execution
  const totalRegistrationExpenses = stampDutyAmount + regFee + mutationCharges + lawyerDraftCharges;
  const totalAcquisitionOutlay = propertyPrice + totalRegistrationExpenses;

  // --- CALCULATIONS: LOAN EMI ---
  const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
  const loanPrincipal = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const monthlyEmi = loanPrincipal > 0 && monthlyRate > 0
    ? Math.round(
        (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      )
    : 0;

  const totalRepayment = monthlyEmi * totalMonths;
  const totalInterest = totalRepayment - loanPrincipal;

  // --- UNIT CONVERSIONS ---
  const sqYards = (baseSqFt / 9).toFixed(2); // 1 Gaj = 9 sqft
  const bighaUP = (baseSqFt / 27000).toFixed(4); // 1 UP Pucca Bigha = 27,000 sqft
  const biswaUP = (baseSqFt / 1350).toFixed(3); // 1 Biswa = 1,350 sqft
  const katha = (baseSqFt / 1361.25).toFixed(3); // 1 Katha ≈ 1,361.25 sqft
  const acre = (baseSqFt / 43560).toFixed(4); // 1 Acre = 43,560 sqft
  const cent = (baseSqFt / 435.6).toFixed(2); // 1 Cent = 435.6 sqft

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/60 backdrop-blur-2xs p-3 sm:p-4">
      <div
        id="land-calculator-modal"
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Land &amp; Plot Financial Toolkit</h2>
              <p className="text-xs text-slate-500">
                Official UP stamp duty, plot loan EMI amortization, and Indian land unit conversions
              </p>
            </div>
          </div>

          <button
            id="close-calculator-modal-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/40 gap-4 text-xs font-bold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('STAMP_DUTY')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'STAMP_DUTY'
                ? 'border-[#14532D] text-[#14532D]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Stamp Duty &amp; Registry (UP)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('LOAN_EMI')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'LOAN_EMI'
                ? 'border-[#14532D] text-[#14532D]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Plot Loan &amp; Land EMI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('UNIT_CONVERTER')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'UNIT_CONVERTER'
                ? 'border-[#14532D] text-[#14532D]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Land Unit Converter (Gaj / Bigha)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('VASTU')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'VASTU'
                ? 'border-[#14532D] text-[#14532D]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Vastu &amp; Shape Guide</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: STAMP DUTY */}
          {activeTab === 'STAMP_DUTY' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Agreed Plot Price / Circle Rate Value (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">₹</span>
                      <input
                        id="calc-stamp-price-input"
                        type="number"
                        step={50000}
                        value={propertyPrice}
                        onChange={e => setPropertyPrice(Math.max(100000, Number(e.target.value)))}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:ring-1 focus:ring-[#14532D]"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Equivalent to ₹{(propertyPrice / 100000).toFixed(2)} Lakh
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Buyer Ownership Category (UP Revenue Concessions)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setBuyerGender('MALE')}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                          buyerGender === 'MALE'
                            ? 'bg-emerald-50 border-[#14532D] text-[#14532D] shadow-xs'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-sm font-black">Male (7%)</div>
                        <span className="text-[10px] text-slate-500 font-normal">Standard Stamp Duty</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBuyerGender('FEMALE')}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                          buyerGender === 'FEMALE'
                            ? 'bg-emerald-50 border-[#14532D] text-[#14532D] shadow-xs'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-sm font-black">Female (6%)</div>
                        <span className="text-[10px] text-emerald-700 font-medium">1% UP Rebate</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBuyerGender('JOINT')}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                          buyerGender === 'JOINT'
                            ? 'bg-emerald-50 border-[#14532D] text-[#14532D] shadow-xs'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-sm font-black">Joint (6.5%)</div>
                        <span className="text-[10px] text-slate-500 font-normal">Co-Owner Male + Female</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                    <span className="font-bold text-amber-950 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-amber-700" />
                      UP Stamp &amp; Registration Act Rule
                    </span>
                    <p className="text-amber-900 leading-relaxed text-[11px]">
                      Stamp duty in Lucknow is payable on the higher of the Actual Agreement Value or the District Magistrate Circle Rate demarcated by LDA / Tehsil.
                    </p>
                  </div>
                </div>

                {/* Breakdown Summary Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                  <h3 className="font-black text-sm text-slate-900 pb-2 border-b border-slate-200">
                    Sub-Registrar Cost Breakdown (Lucknow, UP)
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Base Stamp Duty ({(stampRate * 100).toFixed(1)}%):</span>
                      <strong className="text-slate-900 font-mono text-sm">
                        ₹{stampDutyAmount.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Sub-Registrar Digital Record Fee:</span>
                      <strong className="text-slate-900 font-mono text-sm">
                        ₹{regFee.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Tehsil Revenue Mutation (Dakhil Kharij):</span>
                      <strong className="text-slate-900 font-mono text-sm">
                        ₹{mutationCharges.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Advocate Title Deed Draft &amp; Stamping:</span>
                      <strong className="text-slate-900 font-mono text-sm">
                        ₹{lawyerDraftCharges.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                      <span className="font-bold text-slate-800">Total Statutory Registration Expenses:</span>
                      <strong className="text-emerald-900 font-black text-base font-mono">
                        ₹{totalRegistrationExpenses.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>

                  <div className="bg-emerald-900 text-white p-4 rounded-xl space-y-1">
                    <span className="text-[11px] text-emerald-200 uppercase font-bold tracking-wider">
                      Net Total Capital Required (Plot + Registry)
                    </span>
                    <div className="text-2xl font-black font-mono">
                      ₹{totalAcquisitionOutlay.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-emerald-200/80 block">
                      Effective registry overhead is ~{((totalRegistrationExpenses / propertyPrice) * 100).toFixed(2)}% of plot value
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PLOT LOAN EMI */}
          {activeTab === 'LOAN_EMI' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sliders */}
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <label className="font-bold text-slate-700 uppercase tracking-wider">
                        Plot Value
                      </label>
                      <strong className="font-mono text-sm text-slate-900">
                        ₹{(propertyPrice / 100000).toFixed(2)} Lakh
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={1000000}
                      max={15000000}
                      step={100000}
                      value={propertyPrice}
                      onChange={e => setPropertyPrice(Number(e.target.value))}
                      className="w-full accent-[#14532D]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <label className="font-bold text-slate-700 uppercase tracking-wider">
                        Down Payment Contribution ({downPaymentPercent}%)
                      </label>
                      <strong className="font-mono text-emerald-800 text-sm">
                        ₹{(downPaymentAmount / 100000).toFixed(2)} Lakh
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={60}
                      step={5}
                      value={downPaymentPercent}
                      onChange={e => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#14532D]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>20% (Max LTV 80%)</span>
                      <span>60%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <label className="font-bold text-slate-700 uppercase tracking-wider">
                        Bank Interest Rate ({interestRate}% p.a.)
                      </label>
                      <strong className="font-mono text-slate-800 text-sm">
                        {interestRate}%
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={7.5}
                      max={12.0}
                      step={0.25}
                      value={interestRate}
                      onChange={e => setInterestRate(Number(e.target.value))}
                      className="w-full accent-[#14532D]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>7.5% (Prime Tier-1 Bank)</span>
                      <span>12.0% (NBFC)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <label className="font-bold text-slate-700 uppercase tracking-wider">
                        Loan Tenure ({tenureYears} Years)
                      </label>
                      <strong className="font-mono text-slate-800 text-sm">
                        {tenureYears} Years ({totalMonths} Months)
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={15}
                      step={1}
                      value={tenureYears}
                      onChange={e => setTenureYears(Number(e.target.value))}
                      className="w-full accent-[#14532D]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>3 Years</span>
                      <span>15 Years (Land Loan Limit)</span>
                    </div>
                  </div>
                </div>

                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Estimated Monthly Land Loan Installment
                    </span>
                    <div className="text-3xl font-black text-[#14532D] font-mono mt-1">
                      ₹{monthlyEmi.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-sans text-slate-500 font-normal">/ month</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-200 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Loan Principal Sanction:</span>
                      <strong className="font-mono text-slate-900">₹{loanPrincipal.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Upfront Down Payment:</span>
                      <strong className="font-mono text-slate-900">₹{downPaymentAmount.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Interest Payable:</span>
                      <strong className="font-mono text-amber-800">₹{totalInterest.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200">
                      <span className="font-bold text-slate-800">Total Repayment Over {tenureYears} Years:</span>
                      <strong className="font-mono font-black text-slate-900">₹{totalRepayment.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-950 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>SBI Realty &amp; HDFC Land Loan Clause:</strong> In India, plotted land loans require house construction to commence within 3 to 5 years from loan disbursement.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: UNIT CONVERTER */}
          {activeTab === 'UNIT_CONVERTER' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Enter Plot Area in Square Feet (Sq. Ft.)
                  </label>
                  <input
                    type="number"
                    step={50}
                    value={baseSqFt}
                    onChange={e => setBaseSqFt(Math.max(1, Number(e.target.value)))}
                    className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-900 text-sm focus:ring-1 focus:ring-[#14532D]"
                  />
                </div>
                <div className="text-xs text-slate-500">
                  <span>Common Lucknow Plot Sizes:</span>
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    {[800, 1000, 1200, 1500, 1800, 2400].map(sz => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setBaseSqFt(sz)}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${
                          baseSqFt === sz
                            ? 'bg-[#14532D] text-white border-[#14532D]'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {sz} sqft
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Conversion Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Square Yards / Gaj</span>
                  <div className="text-2xl font-black text-emerald-950 font-mono">{sqYards}</div>
                  <span className="text-[10px] text-emerald-700 block">1 Gaj = 9 Sq. Ft.</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">UP Pucca Bigha</span>
                  <div className="text-2xl font-black text-slate-900 font-mono">{bighaUP}</div>
                  <span className="text-[10px] text-slate-400 block">1 Bigha (UP) = 27,000 Sq. Ft.</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Biswa (UP)</span>
                  <div className="text-2xl font-black text-slate-900 font-mono">{biswaUP}</div>
                  <span className="text-[10px] text-slate-400 block">1/20th of Bigha = 1,350 Sq. Ft.</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Katha</span>
                  <div className="text-2xl font-black text-slate-900 font-mono">{katha}</div>
                  <span className="text-[10px] text-slate-400 block">1 Katha ≈ 1,361.25 Sq. Ft.</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Acre</span>
                  <div className="text-2xl font-black text-slate-900 font-mono">{acre}</div>
                  <span className="text-[10px] text-slate-400 block">1 Acre = 43,560 Sq. Ft.</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Cent</span>
                  <div className="text-2xl font-black text-slate-900 font-mono">{cent}</div>
                  <span className="text-[10px] text-slate-400 block">1 Cent = 435.6 Sq. Ft.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VASTU & SHAPE */}
          {activeTab === 'VASTU' && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-emerald-800" />
                    <h3 className="font-bold text-sm text-slate-900">Vastu Directional Principles for Land</h3>
                  </div>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0">✦ North-East (Ishanya):</span>
                      <span>The most sacred quadrant. Ideal for open lawns, water borewells, and entrances.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0">✦ East (Purva):</span>
                      <span>Brings vitality and morning solar light. Highly favored for main entrance gates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0">✦ North (Uttar):</span>
                      <span>Governed by Kubera (wealth). Promotes financial growth and business vitality.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-800 font-bold shrink-0">✦ South-West (Nairutya):</span>
                      <span>Should be the highest elevated ground. Perfect for master bedroom construction.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-emerald-800" />
                    <h3 className="font-bold text-sm text-slate-900">Plot Geometry &amp; Proportions</h3>
                  </div>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <strong className="text-slate-900 shrink-0">Gaumukhi (Cow Face):</strong>
                      <span>Narrow at the front entrance road and wider at the back. Most auspicious for residential homes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <strong className="text-slate-900 shrink-0">Shermukhi (Lion Face):</strong>
                      <span>Wide front and narrower back. Best suited for commercial buildings and retail showrooms.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <strong className="text-slate-900 shrink-0">Aspect Ratio:</strong>
                      <span>The ideal plot dimension ratio is between 1:1.5 and 1:2. Avoid narrow long strips exceeding 1:3.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 7-Point Legal Checklist */}
              <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-3">
                <span className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] block">
                  PlotNest 7-Point Regulatory Verification Protocol
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-slate-700">
                  <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>UP-RERA Project Sanction</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>30-Year Non-Encumbrance</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Section 143/80 Mutation</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>LDA / Town Plan Sanction</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Escrow Bank Designated</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Physical Boundary Pillars</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom CTA */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Calculations are based on 2026 Uttar Pradesh Registration Rules &amp; Bank Lending Guidelines.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#14532D] hover:bg-[#0F4022] text-white font-bold rounded-xl shadow-xs transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
