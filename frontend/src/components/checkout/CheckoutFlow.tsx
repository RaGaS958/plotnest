import React, { useState, useEffect } from 'react';
import { Plot, Project, Booking } from '../../types';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import confetti from 'canvas-confetti';
import {
  Check,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  AlertCircle,
  FileText,
  Clock,
  Printer,
  Download,
  ArrowLeft,
  Sparkles,
  Info,
  Calendar
} from 'lucide-react';

interface CheckoutFlowProps {
  plotId: string;
  onBackToProject: (projectId: string) => void;
  onNavigateToDashboard: () => void;
  onNavigateToExplore: () => void;
}

export const CheckoutFlow: React.FC<CheckoutFlowProps> = ({
  plotId,
  onBackToProject,
  onNavigateToDashboard,
  onNavigateToExplore
}) => {
  const {
    plots,
    projects,
    currentUser,
    holdSecondsRemaining,
    createBookingWithPayment,
    bookings
  } = useApp();

  const plot = plots.find(p => p.id === plotId);
  const project = plot ? projects.find(pr => pr.id === plot.projectId) : undefined;

  // 1: Plot, 2: Details, 3: KYC, 4: Payment, 5: Confirmation
  const [step, setStep] = useState<number>(1);

  // Form states
  const [buyerName, setBuyerName] = useState(currentUser.name || 'Aarav Sharma');
  const [buyerPhone, setBuyerPhone] = useState(currentUser.phone || '+91 90000 10001');
  const [buyerEmail, setBuyerEmail] = useState(currentUser.email || 'aarav@example.com');
  const [buyerAddress, setBuyerAddress] = useState('Flat 402, Royal Residency, Gomti Nagar Extension, Lucknow, UP 226010');
  const [panNumber, setPanNumber] = useState('ABCDE1234F');
  const [aadhaarLast4, setAadhaarLast4] = useState('9812');
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NET_BANKING'>('UPI');
  const [upiVpa, setUpiVpa] = useState('aarav@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Confirmed booking ID
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  // Price calculations
  const basePrice = plot ? plot.price : 0;
  const developmentCharges = plot ? Math.round(plot.areaSqFt * 120) : 0;
  const cornerCharges = plot?.corner ? 75000 : 0;
  const estimatedTaxes = Math.round((basePrice + developmentCharges) * 0.05);
  const totalCost = basePrice + developmentCharges + cornerCharges + estimatedTaxes;
  const bookingAmount = plot ? plot.bookingAmount : 100000;
  const balanceDue = totalCost - bookingAmount;

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSimulatePayment = (success: boolean) => {
    if (!plot) return;
    setIsProcessing(true);
    setPaymentError(null);

    setTimeout(() => {
      setIsProcessing(false);
      const res = createBookingWithPayment(
        plot.id,
        {
          fullName: buyerName,
          phone: buyerPhone,
          email: buyerEmail,
          pan: panNumber,
          aadhaarLast4,
          address: buyerAddress
        },
        paymentMethod,
        success
      );

      if (res.success && res.bookingId) {
        setConfirmedBookingId(res.bookingId);
        setStep(5);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      } else {
        setPaymentError(res.message);
      }
    }, 1200);
  };

  if (!plot) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-800">Plot not found or session expired</h2>
        <p className="text-sm text-slate-500 mt-1">Please return to the project master plan to select an active plot.</p>
        <button
          type="button"
          onClick={onNavigateToExplore}
          className="mt-6 px-6 py-2.5 bg-[#14532D] text-white rounded-xl font-semibold text-sm"
        >
          Explore Plots
        </button>
      </div>
    );
  }

  const confirmedBooking = confirmedBookingId ? bookings.find(b => b.id === confirmedBookingId) : undefined;

  return (
    <div id="checkout-flow-container" className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Breadcrumb & Hold Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={() => onBackToProject(plot.projectId)}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {project?.name || 'Project Layout'}</span>
        </button>

        {step < 5 && holdSecondsRemaining > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-900 self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span>Plot {plot.plotNo} reserved for:</span>
            <span className="font-mono font-bold text-amber-950 bg-amber-200/70 px-1.5 py-0.5 rounded">
              {formatTimer(holdSecondsRemaining)}
            </span>
          </div>
        )}
      </div>

      {/* Progressive 5-Step Indicator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 mb-8 shadow-xs">
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {[
            { num: 1, label: 'Plot' },
            { num: 2, label: 'Details' },
            { num: 3, label: 'KYC' },
            { num: 4, label: 'Payment' },
            { num: 5, label: 'Confirmed' }
          ].map(s => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all mb-1 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-[#14532D] text-white ring-4 ring-emerald-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                </div>
                <span className={`text-[11px] font-medium hidden sm:block ${isCurrent ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: PLOT SUMMARY & PRICE TRANSPARENCY */}
      {step === 1 && (
        <div id="checkout-step-1" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Step 1 of 5</span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Review Plot Inventory &amp; Commercial Terms</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Confirm plot specifications, location demarcation, and all-inclusive pricing before proceeding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plot Details Box */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-slate-900">Plot {plot.plotNo}</span>
                <StatusBadge status="ON_HOLD" />
              </div>

              <div className="text-xs text-slate-600">
                <strong>Project:</strong> {project?.name || 'Green Valley Residency'}
              </div>
              <div className="text-xs text-slate-600">
                <strong>Locality:</strong> {project?.locality || 'Sultanpur Road'}, Lucknow
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Area:</span>
                  <strong className="text-slate-900">{plot.areaSqFt} sq.ft. ({plot.dimensions})</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Facing:</span>
                  <strong className="text-slate-900">{plot.facing}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Road Width:</span>
                  <strong className="text-slate-900">{plot.roadWidthFt} ft wide</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Corner / Park:</span>
                  <strong className="text-slate-900">{plot.corner ? 'Corner ' : ''}{plot.parkFacing ? 'Park-Facing' : (plot.corner ? '' : 'Standard')}</strong>
                </div>
              </div>
            </div>

            {/* Price Transparency Table */}
            <div className="bg-emerald-50/40 rounded-xl p-5 border border-emerald-200 space-y-2.5 text-xs">
              <h4 className="font-bold text-sm text-slate-900 pb-2 border-b border-emerald-200">
                Transparent Cost Estimate
              </h4>
              <div className="flex justify-between text-slate-600">
                <span>Base Land Consideration</span>
                <span className="font-semibold text-slate-900">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Development Charges (IDC)</span>
                <span className="font-semibold text-slate-900">₹{developmentCharges.toLocaleString('en-IN')}</span>
              </div>
              {plot.corner && (
                <div className="flex justify-between text-amber-800">
                  <span>PLC Corner Charge</span>
                  <span className="font-semibold">₹{cornerCharges.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Estimated Statutory &amp; Registry Assistance</span>
                <span className="font-semibold text-slate-900">₹{estimatedTaxes.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-emerald-200 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Consideration</span>
                <span className="text-emerald-900">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-200 bg-white p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-900 text-xs block">Booking Token (Payable Today)</span>
                  <span className="text-[10px] text-slate-500">Credited directly to developer escrow</span>
                </div>
                <span className="text-base font-black text-emerald-900">
                  ₹{bookingAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              id="step1-continue-btn"
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <span>Continue to Buyer Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: BUYER DETAILS */}
      {step === 2 && (
        <div id="checkout-step-2" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Step 2 of 5</span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Buyer Allotment Details</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              These details will be registered on the formal plot allotment letter and booking voucher.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Legal Name (as on PAN)</label>
              <input
                id="input-buyer-name"
                type="text"
                value={buyerName}
                onChange={e => setBuyerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#14532D] focus:ring-1 focus:ring-[#14532D] font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Primary Mobile Number</label>
              <input
                id="input-buyer-phone"
                type="text"
                value={buyerPhone}
                onChange={e => setBuyerPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#14532D] focus:ring-1 focus:ring-[#14532D] font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email Address for Allotment Voucher</label>
              <input
                id="input-buyer-email"
                type="email"
                value={buyerEmail}
                onChange={e => setBuyerEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#14532D] focus:ring-1 focus:ring-[#14532D] font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">City / Domicile</label>
              <input
                type="text"
                defaultValue="Lucknow, Uttar Pradesh"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#14532D] focus:ring-1 focus:ring-[#14532D] font-medium text-slate-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Residential Postal Address</label>
              <textarea
                rows={2}
                value={buyerAddress}
                onChange={e => setBuyerAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#14532D] focus:ring-1 focus:ring-[#14532D] font-medium text-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-medium text-xs hover:bg-slate-50"
            >
              Back
            </button>
            <button
              id="step2-continue-btn"
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <span>Proceed to Demo KYC</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DEMO KYC */}
      {step === 3 && (
        <div id="checkout-step-3" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Step 3 of 5</span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                <ShieldCheck className="w-3 h-3 text-amber-700" />
                DEMO / SAMPLE DATA
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Identity &amp; Regulatory KYC</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulated identity verification to ensure Indian RERA compliance for plot reservation.
            </p>
          </div>

          {/* Demo disclaimer notice */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Presentation Safe Mode:</strong> No real identity or tax credentials are stored or verified against government APIs. Pre-populated mock values are provided for demonstration purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Permanent Account Number (PAN)</label>
              <div className="relative">
                <input
                  id="input-demo-pan"
                  type="text"
                  value={panNumber}
                  onChange={e => setPanNumber(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono font-bold tracking-wider text-slate-900"
                />
                <span className="absolute right-3 top-2.5 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  ✓ Valid Format
                </span>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Aadhaar (Last 4 Digits Only)</label>
              <div className="relative">
                <input
                  id="input-demo-aadhaar"
                  type="text"
                  maxLength={4}
                  value={aadhaarLast4}
                  onChange={e => setAadhaarLast4(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono font-bold tracking-wider text-slate-900"
                />
                <span className="absolute right-3 top-2.5 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  Masked
                </span>
              </div>
            </div>

            <div className="sm:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-semibold text-slate-800 block text-xs">KYC Verification Status</span>
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  Sample Documents Matched
                </span>
                <span className="text-slate-500 text-xs">Verified by Platform Verifier bot</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-medium text-xs hover:bg-slate-50"
            >
              Back
            </button>
            <button
              id="step3-continue-btn"
              type="button"
              onClick={() => setStep(4)}
              className="px-6 py-3 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <span>Proceed to Mock Payment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: MOCK PAYMENT EXPERIENCE */}
      {step === 4 && (
        <div id="checkout-step-4" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Step 4 of 5</span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold">
                <CreditCard className="w-3 h-3 text-emerald-700" />
                SIMULATED GATEWAY
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Pay Booking Token Amount</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure online token of ₹{bookingAmount.toLocaleString('en-IN')} to confirm allotment of Plot {plot.plotNo}.
            </p>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('UPI')}
              className={`p-3 rounded-xl border text-center transition-all ${
                paymentMethod === 'UPI'
                  ? 'border-[#14532D] bg-emerald-50/50 text-[#14532D] font-bold shadow-xs ring-1 ring-[#14532D]'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <QrCode className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
              <span className="text-xs block">UPI / QR</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('CARD')}
              className={`p-3 rounded-xl border text-center transition-all ${
                paymentMethod === 'CARD'
                  ? 'border-[#14532D] bg-emerald-50/50 text-[#14532D] font-bold shadow-xs ring-1 ring-[#14532D]'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
              <span className="text-xs block">Cards</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('NET_BANKING')}
              className={`p-3 rounded-xl border text-center transition-all ${
                paymentMethod === 'NET_BANKING'
                  ? 'border-[#14532D] bg-emerald-50/50 text-[#14532D] font-bold shadow-xs ring-1 ring-[#14532D]'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Building className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
              <span className="text-xs block">Net Banking</span>
            </button>
          </div>

          {/* Method Details */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs">
            {paymentMethod === 'UPI' && (
              <div className="space-y-3">
                <label className="font-semibold text-slate-700 block">UPI Virtual Payment Address (VPA)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={upiVpa}
                    onChange={e => setUpiVpa(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono text-slate-800"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                  <span>Supported apps:</span>
                  <span className="font-semibold text-slate-700">Google Pay</span> • 
                  <span className="font-semibold text-slate-700">PhonePe</span> • 
                  <span className="font-semibold text-slate-700">Paytm</span> • 
                  <span className="font-semibold text-slate-700">BHIM</span>
                </div>
              </div>
            )}

            {paymentMethod === 'CARD' && (
              <div className="space-y-2.5">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Card Number (Simulated)</label>
                  <input
                    type="text"
                    disabled
                    value="•••• •••• •••• 4242"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-500 block">Expiry</label>
                    <input type="text" disabled value="12/28" className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white" />
                  </div>
                  <div>
                    <label className="text-slate-500 block">CVV</label>
                    <input type="text" disabled value="•••" className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'NET_BANKING' && (
              <div className="space-y-2">
                <label className="font-semibold text-slate-700 block">Select Demo Bank</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800">
                  <option>HDFC Bank (Escrow partner)</option>
                  <option>State Bank of India</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2.5 text-xs text-slate-600">
            <input
              id="terms-checkbox"
              type="checkbox"
              checked={termsAgreed}
              onChange={e => setTermsAgreed(e.target.checked)}
              className="mt-0.5 rounded text-[#14532D] focus:ring-[#14532D]"
            />
            <label htmlFor="terms-checkbox" className="leading-relaxed cursor-pointer">
              I agree to the standard plot booking terms, provisional allotment rules, and acknowledge that the booking token is safely deposited in developer escrow account.
            </label>
          </div>

          {/* Payment Error message if failure was simulated */}
          {paymentError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>Payment Declined (Simulated Failure):</strong>
                <p className="mt-0.5">{paymentError}</p>
                <p className="mt-1 text-[11px] text-rose-700">Notice: Your 15-minute plot hold remains valid. You may retry payment immediately.</p>
              </div>
            </div>
          )}

          {/* Simulation Controls: Success / Failure */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Demo Gateway Execution Controls:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="simulate-payment-success-btn"
                type="button"
                disabled={isProcessing || !termsAgreed}
                onClick={() => handleSimulatePayment(true)}
                className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 stroke-[3]" />
                )}
                <span>Simulate Success (Confirm Booking)</span>
              </button>

              <button
                id="simulate-payment-failure-btn"
                type="button"
                disabled={isProcessing || !termsAgreed}
                onClick={() => handleSimulatePayment(false)}
                className="py-3 px-4 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Simulate Failure (Test Retry)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: BOOKING CONFIRMATION & RECEIPT */}
      {step === 5 && confirmedBooking && (
        <div id="checkout-step-5" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8 animate-in fade-in duration-300">
          {/* Header celebration banner */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Booking Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Congratulations, {confirmedBooking.buyerName}!
            </h1>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Your plot reservation has been locked in the master registry. The official allotment receipt has been generated.
            </p>
          </div>

          {/* Key Confirmation Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <span className="text-xs text-slate-500 font-medium">Official Booking Reference Number</span>
                <div className="text-xl font-mono font-black text-slate-900 mt-0.5">
                  {confirmedBooking.id}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>

            {/* Quick Specs table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
              <div>
                <span className="text-slate-500 block">Reserved Plot</span>
                <strong className="text-slate-900 text-sm">Plot {confirmedBooking.plotNo}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Project</span>
                <strong className="text-slate-900 text-sm">{confirmedBooking.projectName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Amount Paid</span>
                <strong className="text-emerald-800 text-sm font-black">
                  ₹{confirmedBooking.bookingAmount.toLocaleString('en-IN')}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block">Payment Status</span>
                <StatusBadge status="PAID" />
              </div>
            </div>
          </div>

          {/* Audit Timeline */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Verified Lifecycle Audit Trail</span>
            </h3>
            <div className="space-y-3 border-l-2 border-emerald-500 ml-3 pl-4">
              {confirmedBooking.events.map((evt, idx) => (
                <div key={idx} className="relative text-xs">
                  <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-200" />
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-slate-900">{evt.label}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{evt.time}</span>
                  </div>
                  {evt.details && (
                    <p className="text-slate-500 text-[11px] mt-0.5">{evt.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Next steps CTAs */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              id="confirm-go-explore-btn"
              type="button"
              onClick={onNavigateToExplore}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 text-center"
            >
              Explore Other Projects
            </button>

            <button
              id="confirm-go-dashboard-btn"
              type="button"
              onClick={onNavigateToDashboard}
              className="w-full sm:w-auto px-6 py-3 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <span>Go to My Bookings Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
