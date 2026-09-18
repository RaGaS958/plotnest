import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './components/common/SplashScreen';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { DemoBanner } from './components/common/DemoBanner';
import { DemoTour } from './components/common/DemoTour';
import { ToastContainer } from './components/common/ToastContainer';
import { MobileBottomNav } from './components/common/MobileBottomNav';

// Lazy loaded page components
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const SearchPage = lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage })));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const CheckoutFlow = lazy(() => import('./components/checkout/CheckoutFlow').then(m => ({ default: m.CheckoutFlow })));
const BuyerDashboard = lazy(() => import('./components/buyer/BuyerDashboard').then(m => ({ default: m.BuyerDashboard })));
const DeveloperDashboard = lazy(() => import('./components/developer/DeveloperDashboard').then(m => ({ default: m.DeveloperDashboard })));
const DeveloperInventory = lazy(() => import('./components/developer/DeveloperInventory').then(m => ({ default: m.DeveloperInventory })));
const DeveloperLeads = lazy(() => import('./components/developer/DeveloperLeads').then(m => ({ default: m.DeveloperLeads })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminVerification = lazy(() => import('./components/admin/AdminVerification').then(m => ({ default: m.AdminVerification })));
const AdminBookings = lazy(() => import('./components/admin/AdminBookings').then(m => ({ default: m.AdminBookings })));
const AdminAuditLogs = lazy(() => import('./components/admin/AdminAuditLogs').then(m => ({ default: m.AdminAuditLogs })));

import { PlotDetailDrawer } from './components/buyer/PlotDetailDrawer';
import { PlotCompareDrawer } from './components/buyer/PlotCompareDrawer';
import { SiteVisitModal } from './components/buyer/SiteVisitModal';
import { PlotFinancialCalculatorModal } from './components/tools/PlotFinancialCalculatorModal';
import { ProjectOnboardingModal } from './components/developer/ProjectOnboardingModal';
import { Plot } from './types';

function MainApp() {
  const { role, plots, projects, activeHold } = useApp();

  // Navigation view state
  const [currentView, setCurrentView] = useState<string>('HOME');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('PRJ001');
  const [checkoutPlotId, setCheckoutPlotId] = useState<string>('');
  const [searchInitialLocality, setSearchInitialLocality] = useState<string>('');
  const [searchInitialMaxPrice, setSearchInitialMaxPrice] = useState<number | undefined>(undefined);

  // Modals & Drawers state
  const [inspectedPlot, setInspectedPlot] = useState<Plot | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [siteVisitDefaultPlot, setSiteVisitDefaultPlot] = useState<string | undefined>(undefined);
  const [isProjectWizardOpen, setIsProjectWizardOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorPlot, setCalculatorPlot] = useState<Plot | null>(null);

  // Sync role view defaults if user switches roles
  useEffect(() => {
    if (role === 'buyer') {
      if (currentView.startsWith('DEVELOPER') || currentView.startsWith('ADMIN')) {
        setCurrentView('HOME');
      }
    } else if (role === 'developer') {
      if (!currentView.startsWith('DEVELOPER')) {
        setCurrentView('DEVELOPER_DASHBOARD');
      }
    } else if (role === 'admin') {
      if (!currentView.startsWith('ADMIN')) {
        setCurrentView('ADMIN_DASHBOARD');
      }
    }
  }, [role]);

  const handleOpenCalculator = (plot?: Plot | null) => {
    setCalculatorPlot(plot || inspectedPlot || plots[0] || null);
    setIsCalculatorOpen(true);
  };

  const handleNavigate = (rawView: string, param?: string) => {
    const v = rawView.toLowerCase().replace(/-/g, '_');
    if (v === 'home') {
      setCurrentView('HOME');
    } else if (v === 'search') {
      if (param) setSearchInitialLocality(param);
      setCurrentView('SEARCH');
    } else if (v === 'projects' || v === 'project_detail') {
      if (param) setSelectedProjectId(param);
      setCurrentView('PROJECT_DETAIL');
    } else if (v === 'saved') {
      setCurrentView('BUYER_DASHBOARD');
    } else if (v === 'compare') {
      setIsCompareOpen(true);
    } else if (v === 'calculator') {
      handleOpenCalculator();
    } else if (v === 'buyer_dashboard') {
      setCurrentView('BUYER_DASHBOARD');
    } else if (v === 'checkout') {
      if (param) setCheckoutPlotId(param);
      setCurrentView('CHECKOUT');
    } else if (v === 'developer_portal' || v === 'developer_dashboard') {
      setCurrentView('DEVELOPER_DASHBOARD');
    } else if (v === 'developer_inventory') {
      setCurrentView('DEVELOPER_INVENTORY');
    } else if (v === 'developer_leads') {
      setCurrentView('DEVELOPER_LEADS');
    } else if (v === 'admin_portal' || v === 'admin_dashboard') {
      setCurrentView('ADMIN_DASHBOARD');
    } else if (v === 'admin_verification') {
      setCurrentView('ADMIN_VERIFICATION');
    } else if (v === 'admin_bookings') {
      setCurrentView('ADMIN_BOOKINGS');
    } else if (v === 'admin_audit') {
      setCurrentView('ADMIN_AUDIT');
    } else {
      setCurrentView(rawView.toUpperCase());
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlotToInspect = (plot: Plot) => {
    setInspectedPlot(plot);
  };

  const handleProceedToCheckout = (plotId: string) => {
    setInspectedPlot(null);
    setCheckoutPlotId(plotId);
    setCurrentView('CHECKOUT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSiteVisit = (prjId?: string, plotNo?: string) => {
    if (prjId) setSelectedProjectId(prjId);
    setSiteVisitDefaultPlot(plotNo);
    setIsSiteVisitOpen(true);
  };

  const handleOpenSitePlanForProject = (prjId: string) => {
    setSelectedProjectId(prjId);
    setCurrentView('PROJECT_DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (prjId: string) => {
    setSelectedProjectId(prjId);
    setCurrentView('PROJECT_DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchFromHome = (locality?: string, budgetKey?: string) => {
    setSearchInitialLocality(locality || '');
    if (budgetKey === '30') setSearchInitialMaxPrice(3000000);
    else if (budgetKey === '50') setSearchInitialMaxPrice(5000000);
    else if (budgetKey === '75') setSearchInitialMaxPrice(7500000);
    else if (budgetKey === '100') setSearchInitialMaxPrice(15000000);
    else setSearchInitialMaxPrice(undefined);
    setCurrentView('SEARCH');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-950 pb-16 md:pb-0">
      {/* Interactive Demo Banner & Role Switcher */}
      <DemoBanner
        onOpenActiveHold={() => {
          if (activeHold) {
            handleProceedToCheckout(activeHold.plotId);
          }
        }}
      />

      {/* Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenCalculator={() => handleOpenCalculator()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Suspense fallback={
          <div className="flex-1 flex items-center justify-center min-h-[50vh]">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin shadow-xs"></div>
          </div>
        }>
          {/* BUYER VIEWS */}
          {currentView === 'HOME' && (
            <HomePage
              onSearch={handleSearchFromHome}
              onSelectProject={handleSelectProject}
              onOpenSitePlan={handleOpenSitePlanForProject}
              onOpenSiteVisitModal={() => handleOpenSiteVisit(selectedProjectId)}
            />
          )}

          {currentView === 'SEARCH' && (
            <SearchPage
              initialLocality={searchInitialLocality}
              initialMaxPrice={searchInitialMaxPrice}
              onSelectPlot={handleSelectPlotToInspect}
              onSelectProject={handleSelectProject}
              onOpenSitePlan={handleOpenSitePlanForProject}
              onOpenCompare={() => setIsCompareOpen(true)}
            />
          )}

          {currentView === 'PROJECT_DETAIL' && (
            <ProjectDetailPage
              projectId={selectedProjectId}
              onBack={() => setCurrentView('SEARCH')}
              onSelectPlot={handleSelectPlotToInspect}
              onOpenSiteVisitModal={prjId => handleOpenSiteVisit(prjId)}
            />
          )}

          {currentView === 'CHECKOUT' && (
            <CheckoutFlow
              plotId={checkoutPlotId || (activeHold?.plotId || 'PLT002')}
              onBackToProject={prjId => {
                setSelectedProjectId(prjId);
                setCurrentView('PROJECT_DETAIL');
              }}
              onNavigateToDashboard={() => setCurrentView('BUYER_DASHBOARD')}
              onNavigateToExplore={() => setCurrentView('SEARCH')}
            />
          )}

          {currentView === 'BUYER_DASHBOARD' && (
            <BuyerDashboard
              onSelectPlot={handleSelectPlotToInspect}
              onExploreProjects={() => setCurrentView('SEARCH')}
              onContinueCheckout={plotId => handleProceedToCheckout(plotId)}
            />
          )}

          {/* DEVELOPER VIEWS */}
          {currentView === 'DEVELOPER_DASHBOARD' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <DeveloperDashboard
                onNavigateToInventory={() => setCurrentView('DEVELOPER_INVENTORY')}
                onNavigateToLeads={() => setCurrentView('DEVELOPER_LEADS')}
                onOpenProjectWizard={() => setIsProjectWizardOpen(true)}
                onSelectProject={handleSelectProject}
              />
            </div>
          )}

          {currentView === 'DEVELOPER_INVENTORY' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <DeveloperInventory
                onBack={() => setCurrentView('DEVELOPER_DASHBOARD')}
              />
            </div>
          )}

          {currentView === 'DEVELOPER_LEADS' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <DeveloperLeads
                onBack={() => setCurrentView('DEVELOPER_DASHBOARD')}
              />
            </div>
          )}

          {/* ADMIN VIEWS */}
          {currentView === 'ADMIN_DASHBOARD' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <AdminDashboard
                onNavigateToVerification={() => setCurrentView('ADMIN_VERIFICATION')}
                onNavigateToBookings={() => setCurrentView('ADMIN_BOOKINGS')}
                onNavigateToAudit={() => setCurrentView('ADMIN_AUDIT')}
              />
            </div>
          )}

          {currentView === 'ADMIN_VERIFICATION' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <AdminVerification
                onBack={() => setCurrentView('ADMIN_DASHBOARD')}
              />
            </div>
          )}

          {currentView === 'ADMIN_BOOKINGS' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <AdminBookings
                onBack={() => setCurrentView('ADMIN_DASHBOARD')}
              />
            </div>
          )}

          {currentView === 'ADMIN_AUDIT' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <AdminAuditLogs
                onBack={() => setCurrentView('ADMIN_DASHBOARD')}
              />
            </div>
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Sticky Bottom Nav */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Modals & Drawers */}
      <PlotDetailDrawer
        plot={inspectedPlot}
        project={inspectedPlot ? projects.find(p => p.id === inspectedPlot.projectId) : undefined}
        isOpen={!!inspectedPlot}
        onClose={() => setInspectedPlot(null)}
        onProceedToCheckout={plotId => handleProceedToCheckout(plotId)}
        onOpenSiteVisitModal={(prjId, plotNo) => handleOpenSiteVisit(prjId, plotNo)}
        onOpenCalculator={plot => handleOpenCalculator(plot)}
      />

      <PlotCompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelectPlot={plot => {
          setIsCompareOpen(false);
          setInspectedPlot(plot);
        }}
      />

      <SiteVisitModal
        isOpen={isSiteVisitOpen}
        onClose={() => setIsSiteVisitOpen(false)}
        defaultProjectId={selectedProjectId}
        defaultPlotNo={siteVisitDefaultPlot}
      />

      <ProjectOnboardingModal
        isOpen={isProjectWizardOpen}
        onClose={() => setIsProjectWizardOpen(false)}
      />

      <PlotFinancialCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        initialPlot={calculatorPlot}
      />

      {/* Global Toast Notifications Container */}
      <ToastContainer />
      
      {/* Demo Interactive Tour */}
      <DemoTour />
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('plotnest_has_loaded');
    if (!hasLoaded) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('plotnest_has_loaded', 'true');
  };

  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" onComplete={handleSplashComplete} />}
      </AnimatePresence>
      
      {!showSplash && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full min-h-screen"
        >
          <MainApp />
        </motion.div>
      )}
    </AppProvider>
  );
}
