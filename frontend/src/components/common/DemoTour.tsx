import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ChevronRight, ChevronLeft, Map, MousePointerClick, ShieldCheck, CreditCard, LayoutDashboard, Settings } from 'lucide-react';

const TOUR_STEPS = [
  {
    id: 'step-1-search',
    targetSelector: 'button#nav-explore',
    title: 'Buyer Marketplace',
    content: 'Start here: buyers search by location, project, budget and plot preferences.',
    icon: <Map className="w-5 h-5 text-emerald-600" />
  },
  {
    id: 'step-2-project',
    targetSelector: 'button#nav-projects',
    title: 'Project Discovery',
    content: 'Projects surface the inventory, price range and trust signals a buyer needs before engaging.',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />
  },
  {
    id: 'step-3-site-plan',
    targetSelector: 'div#interactive-site-plan-wrapper',
    title: 'Exact Plot Selection',
    content: 'This is the key workflow: buyers choose the exact inventory unit rather than making a generic enquiry. Every plot has its own area, dimensions, facing, road width, price and booking amount.',
    icon: <MousePointerClick className="w-5 h-5 text-emerald-600" />
  },
  {
    id: 'step-4-reserve',
    targetSelector: 'button#reserve-plot-action-btn',
    title: 'Hold & Reserve',
    content: 'Selecting Reserve creates a temporary hold so the chosen plot is not simultaneously offered during checkout. The buyer moves through a guided sequence: details, demo KYC and payment.',
    icon: <CreditCard className="w-5 h-5 text-emerald-600" />
  },
  {
    id: 'step-5-payment',
    targetSelector: 'div#checkout-step-4',
    title: 'Mock Payment Simulation',
    content: 'For the prototype, payment is simulated. In production this can connect to an approved payment gateway and webhook flow. The customer can continue tracking the journey after payment instead of losing visibility.',
    icon: <CreditCard className="w-5 h-5 text-emerald-600" />
  },
  {
    id: 'step-6-developer',
    targetSelector: 'button#role-switch-developer',
    title: 'Developer Portal',
    content: 'Developers manage projects, inventory, leads, site visits and bookings from one workspace.',
    icon: <LayoutDashboard className="w-5 h-5 text-emerald-600" />
  },
  {
    id: 'step-7-admin',
    targetSelector: 'button#role-switch-admin',
    title: 'Admin Console',
    content: 'Admin controls marketplace quality through project, document and workflow verification.',
    icon: <Settings className="w-5 h-5 text-emerald-600" />
  }
];

export const DemoTour: React.FC = () => {
  const { setTourCompleted } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false); // Do not start automatically
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const step = TOUR_STEPS[currentStepIndex];
    if (!step) return;

    const updatePosition = () => {
      const el = document.querySelector(step.targetSelector);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
        // Scroll into view if it's too far
        const rect = el.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        setTargetRect(null); // Element not on screen
      }
    };

    updatePosition();
    const interval = setInterval(updatePosition, 500); // Poll for dynamic elements
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isActive, currentStepIndex]);

  // Expose start tour function globally for the DemoBanner to trigger
  useEffect(() => {
    const handleStartTour = () => {
      setCurrentStepIndex(0);
      setIsActive(true);
      setTourCompleted(false);
    };
    window.addEventListener('start-demo-tour', handleStartTour);
    return () => window.removeEventListener('start-demo-tour', handleStartTour);
  }, [setTourCompleted]);

  if (!isActive) return null;

  const step = TOUR_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = () => {
    setIsActive(false);
    setTourCompleted(true);
  };

  // Determine popup position (try bottom, then top, then center if no target)
  let popupStyle: React.CSSProperties = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed'
  };

  if (targetRect) {
    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;

    if (spaceBelow > 300 || spaceBelow > spaceAbove) {
      // Show below target
      popupStyle = {
        top: Math.min(targetRect.bottom + 16, window.innerHeight - 200) + 'px',
        left: Math.max(16, Math.min(targetRect.left, window.innerWidth - 350)) + 'px',
        position: 'fixed'
      };
    } else {
      // Show above target
      popupStyle = {
        top: Math.max(16, targetRect.top - 200) + 'px',
        left: Math.max(16, Math.min(targetRect.left, window.innerWidth - 350)) + 'px',
        position: 'fixed'
      };
    }
  }

  return (
    <>
      {/* Dimmed backdrop - optional but good for focus */}
      <div className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[1px] pointer-events-none transition-opacity duration-300" />
      
      {/* Target Highlight Ring */}
      {targetRect && (
        <div 
          className="fixed z-[91] pointer-events-none rounded-lg border-2 border-emerald-500 shadow-[0_0_0_9999px_rgba(0,0,0,0.1)] transition-all duration-300"
          style={{
            top: targetRect.top - 4 + 'px',
            left: targetRect.left - 4 + 'px',
            width: targetRect.width + 8 + 'px',
            height: targetRect.height + 8 + 'px'
          }}
        />
      )}

      {/* Tooltip Card */}
      <div 
        className="z-[92] w-[340px] bg-white rounded-2xl shadow-2xl border border-emerald-100 flex flex-col animate-in fade-in zoom-in-95 duration-200"
        style={popupStyle}
      >
        <div className="p-5 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
               <div className="p-2 bg-emerald-50 rounded-xl">
                 {step.icon}
               </div>
               <div>
                 <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                    Product Tour • Step {currentStepIndex + 1} of {TOUR_STEPS.length}
                 </span>
                 <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
               </div>
            </div>
            <button 
              onClick={handleSkip}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {step.content}
          </p>
          {!targetRect && (
             <p className="text-[10px] text-amber-600 mt-2 italic">
               (Please navigate to the relevant section to see this in action)
             </p>
          )}
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            Skip Tour
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-[#14532D] hover:bg-[#0F4022] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all"
            >
              <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}</span>
              {currentStepIndex !== TOUR_STEPS.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
