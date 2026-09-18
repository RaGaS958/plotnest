import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  User,
  UserRole,
  Project,
  Plot,
  Booking,
  PaymentRecord,
  SiteVisit,
  DocumentItem,
  VerificationCase,
  Lead,
  AppNotification,
  ActiveHold,
  AuditEvent
} from '../types';
import { storageService } from '../services/storageService';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: User;
  projects: Project[];
  plots: Plot[];
  bookings: Booking[];
  payments: PaymentRecord[];
  siteVisits: SiteVisit[];
  documents: DocumentItem[];
  verificationCases: VerificationCase[];
  leads: Lead[];
  notifications: AppNotification[];
  favorites: string[];
  compareList: string[];
  activeHold: ActiveHold | null;
  holdSecondsRemaining: number;
  toasts: ToastMessage[];

  // Actions
  toggleFavorite: (plotId: string) => void;
  toggleCompare: (plotId: string) => void;
  clearCompare: () => void;
  createHold: (plotId: string) => { success: boolean; message: string };
  releaseHold: (plotId: string) => void;
  createBookingWithPayment: (
    plotId: string,
    buyerDetails: { fullName: string; phone: string; email: string; pan: string; aadhaarLast4: string; address: string },
    paymentMethod: 'UPI' | 'CARD' | 'NET_BANKING',
    simulateSuccess: boolean
  ) => { success: boolean; bookingId?: string; message: string };
  scheduleSiteVisit: (projectId: string, date: string, time: string, notes?: string) => void;
  updatePlotStatus: (plotId: string, newStatus: Plot['status']) => void;
  updateProjectStatus: (projectId: string, status: Project['status'], verification: Project['verification']) => void;
  verifyCaseItem: (caseId: string, itemName: string, status: 'VERIFIED' | 'PENDING' | 'REJECTED') => void;
  resolveVerificationCase: (caseId: string, outcome: 'APPROVED' | 'CHANGES_REQUIRED' | 'REJECTED', notes: string) => void;
  updateLeadStage: (leadId: string, stage: Lead['stage']) => void;
  addProject: (newProject: Omit<Project, 'id'>) => string;
  markNotificationRead: (id: string) => void;
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize storage
  useEffect(() => {
    storageService.initializeStorage();
  }, []);

  const [role, setRoleState] = useState<UserRole>(() => storageService.getRole());
  const [users] = useState<User[]>(() => storageService.getUsers());
  const [projects, setProjects] = useState<Project[]>(() => storageService.getProjects());
  const [plots, setPlots] = useState<Plot[]>(() => storageService.getPlots());
  const [bookings, setBookings] = useState<Booking[]>(() => storageService.getBookings());
  const [payments, setPayments] = useState<PaymentRecord[]>(() => storageService.getPayments());
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>(() => storageService.getSiteVisits());
  const [documents, setDocuments] = useState<DocumentItem[]>(() => storageService.getDocuments());
  const [verificationCases, setVerificationCases] = useState<VerificationCase[]>(() => storageService.getVerificationCases());
  const [leads, setLeads] = useState<Lead[]>(() => storageService.getLeads());
  const [notifications, setNotifications] = useState<AppNotification[]>(() => storageService.getNotifications());
  const [favorites, setFavorites] = useState<string[]>(() => storageService.getFavorites());
  const [compareList, setCompareList] = useState<string[]>(() => storageService.getCompare());
  const [activeHold, setActiveHold] = useState<ActiveHold | null>(() => storageService.getActiveHold());
  const [holdSecondsRemaining, setHoldSecondsRemaining] = useState<number>(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Get current user based on active role
  const currentUser: User = users.find(u => u.role === role) || users[0] || {
    id: 'U001',
    role: 'buyer',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '+91 90000 10001',
    city: 'Lucknow',
    avatarInitials: 'AS'
  };

  const showToast = useCallback((type: ToastMessage['type'], title: string, message: string) => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    storageService.setRole(newRole);
    showToast('info', 'Demo Role Switched', `Active perspective changed to ${newRole.toUpperCase()} mode.`);
  };

  // Synchronize hold countdown timer
  useEffect(() => {
    if (!activeHold) {
      setHoldSecondsRemaining(0);
      return;
    }

    const updateRemaining = () => {
      const remainingMs = activeHold.expiresAt - Date.now();
      if (remainingMs <= 0) {
        // Hold expired: release plot
        const expiredPlotId = activeHold.plotId;
        setActiveHold(null);
        storageService.saveActiveHold(null);
        setPlots(prev => {
          const updated = prev.map(p => p.id === expiredPlotId && p.status === 'ON_HOLD' ? { ...p, status: 'AVAILABLE' as const, heldBy: undefined, heldUntil: undefined } : p);
          storageService.savePlots(updated);
          return updated;
        });
        showToast('warning', 'Hold Expired', `The 15-minute temporary reservation on Plot ${activeHold.plotNo} has expired and the unit was returned to Available.`);
        setHoldSecondsRemaining(0);
      } else {
        setHoldSecondsRemaining(Math.ceil(remainingMs / 1000));
      }
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, [activeHold, showToast]);

  const toggleFavorite = (plotId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(plotId);
      const next = exists ? prev.filter(id => id !== plotId) : [...prev, plotId];
      storageService.saveFavorites(next);
      showToast(exists ? 'info' : 'success', exists ? 'Removed from Saved' : 'Saved to Favorites', exists ? 'Plot removed from your saved list.' : 'Plot saved to your wishlist.');
      return next;
    });
  };

  const toggleCompare = (plotId: string) => {
    setCompareList(prev => {
      const exists = prev.includes(plotId);
      if (exists) {
        const next = prev.filter(id => id !== plotId);
        storageService.saveCompare(next);
        return next;
      }
      if (prev.length >= 4) {
        showToast('warning', 'Comparison Limit Reached', 'You can compare up to 4 plots simultaneously.');
        return prev;
      }
      const next = [...prev, plotId];
      storageService.saveCompare(next);
      showToast('success', 'Added to Compare', `Plot added to comparison tray (${next.length}/4).`);
      return next;
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    storageService.saveCompare([]);
  };

  const createHold = (plotId: string) => {
    const plot = plots.find(p => p.id === plotId);
    if (!plot) return { success: false, message: 'Plot not found' };

    if (plot.status !== 'AVAILABLE') {
      return { success: false, message: `Plot ${plot.plotNo} is currently ${plot.status.replace('_', ' ')}.` };
    }

    const holdDurationMinutes = 15;
    const expiresAt = Date.now() + holdDurationMinutes * 60 * 1000;
    const newHold: ActiveHold = {
      plotId: plot.id,
      projectId: plot.projectId,
      plotNo: plot.plotNo,
      expiresAt,
      createdAt: Date.now(),
      userId: currentUser.id
    };

    // Update plot
    const updatedPlots = plots.map(p => p.id === plotId ? {
      ...p,
      status: 'ON_HOLD' as const,
      heldBy: currentUser.id,
      heldUntil: new Date(expiresAt).toISOString()
    } : p);

    setPlots(updatedPlots);
    storageService.savePlots(updatedPlots);

    setActiveHold(newHold);
    storageService.saveActiveHold(newHold);

    // Add in-app notification
    const newNotif: AppNotification = {
      id: 'N-' + Date.now(),
      userId: currentUser.id,
      title: `Plot ${plot.plotNo} Reserved`,
      body: `Temporary 15-minute hold started for Plot ${plot.plotNo}. Complete checkout before the countdown expires.`,
      time: 'Just now',
      read: false,
      type: 'hold'
    };
    setNotifications(prev => {
      const next = [newNotif, ...prev];
      storageService.saveNotifications(next);
      return next;
    });

    showToast('success', `Plot ${plot.plotNo} Held for You`, `15-minute countdown initiated. The plot is temporarily locked for your purchase.`);
    return { success: true, message: `Plot ${plot.plotNo} held successfully.` };
  };

  const releaseHold = (plotId: string) => {
    const updatedPlots = plots.map(p => p.id === plotId && p.status === 'ON_HOLD' ? {
      ...p,
      status: 'AVAILABLE' as const,
      heldBy: undefined,
      heldUntil: undefined
    } : p);

    setPlots(updatedPlots);
    storageService.savePlots(updatedPlots);

    if (activeHold?.plotId === plotId) {
      setActiveHold(null);
      storageService.saveActiveHold(null);
    }
    showToast('info', 'Hold Released', 'The plot hold has been cancelled and released.');
  };

  const createBookingWithPayment = (
    plotId: string,
    buyerDetails: { fullName: string; phone: string; email: string; pan: string; aadhaarLast4: string; address: string },
    paymentMethod: 'UPI' | 'CARD' | 'NET_BANKING',
    simulateSuccess: boolean
  ) => {
    const plot = plots.find(p => p.id === plotId);
    if (!plot) return { success: false, message: 'Plot not found' };

    const project = projects.find(p => p.id === plot.projectId);
    const bookingId = `BK-2026-00${bookings.length + 43}`;
    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!simulateSuccess) {
      // Payment failed
      const paymentRec: PaymentRecord = {
        id: `PAY-${Date.now()}`,
        bookingId,
        amount: plot.bookingAmount,
        status: 'FAILED',
        method: paymentMethod,
        gatewayRef: `DEMO-${paymentMethod}-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: now.toISOString()
      };
      setPayments(prev => {
        const next = [paymentRec, ...prev];
        storageService.savePayments(next);
        return next;
      });

      // Keep plot in ON_HOLD
      showToast('error', 'Payment Failed (Simulated)', 'Transaction declined by demo gateway. Your plot hold remains active so you can retry payment.');
      return { success: false, message: 'Payment simulation indicated failure. You can retry with another method.' };
    }

    // Payment Successful
    const paymentRec: PaymentRecord = {
      id: `PAY-${Date.now()}`,
      bookingId,
      amount: plot.bookingAmount,
      status: 'SUCCESS',
      method: paymentMethod,
      gatewayRef: `DEMO-${paymentMethod}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: now.toISOString()
    };
    setPayments(prev => {
      const next = [paymentRec, ...prev];
      storageService.savePayments(next);
      return next;
    });

    // Update Plot to BOOKED
    const updatedPlots = plots.map(p => p.id === plotId ? {
      ...p,
      status: 'BOOKED' as const,
      bookedBy: currentUser.id,
      heldBy: undefined,
      heldUntil: undefined
    } : p);
    setPlots(updatedPlots);
    storageService.savePlots(updatedPlots);

    // Update Project available count
    if (project) {
      const updatedProjects = projects.map(pr => pr.id === project.id ? {
        ...pr,
        availableCount: Math.max(0, pr.availableCount - 1)
      } : pr);
      setProjects(updatedProjects);
      storageService.saveProjects(updatedProjects);
    }

    // Clear active hold
    if (activeHold?.plotId === plotId) {
      setActiveHold(null);
      storageService.saveActiveHold(null);
    }

    // Create Audit Events
    const events: AuditEvent[] = [
      {
        type: 'PLOT_SELECTED',
        label: `Plot ${plot.plotNo} selected`,
        time: `${timeFormatted}`,
        details: `Selected from interactive site plan in ${project?.name || 'Project'}`
      },
      {
        type: 'HOLD_CREATED',
        label: '15-minute hold created',
        time: `${timeFormatted}`,
        details: 'Hold token applied in inventory ledger'
      },
      {
        type: 'KYC_COMPLETED',
        label: 'Demo KYC completed',
        time: `${timeFormatted}`,
        details: `PAN: ${buyerDetails.pan} (Aadhaar Ending: ${buyerDetails.aadhaarLast4})`
      },
      {
        type: 'PAYMENT_SUCCESS',
        label: `Booking payment received (₹${plot.bookingAmount.toLocaleString('en-IN')})`,
        time: `${timeFormatted}`,
        details: `Method: ${paymentMethod}, Gateway Ref: ${paymentRec.gatewayRef}`
      },
      {
        type: 'BOOKING_CONFIRMED',
        label: 'Booking confirmed',
        time: `${timeFormatted}`,
        details: 'Official booking voucher & receipt generated in digital vault'
      }
    ];

    const newBooking: Booking = {
      id: bookingId,
      buyerId: currentUser.id,
      buyerName: buyerDetails.fullName,
      buyerPhone: buyerDetails.phone,
      buyerEmail: buyerDetails.email,
      projectId: plot.projectId,
      projectName: project?.name || 'Project',
      plotId: plot.id,
      plotNo: plot.plotNo,
      status: 'BOOKED',
      paymentStatus: 'PAID',
      bookingAmount: plot.bookingAmount,
      totalPrice: plot.price,
      createdAt: now.toISOString(),
      receiptUrl: `#receipt-${bookingId}`,
      kycData: {
        pan: buyerDetails.pan,
        aadhaarLast4: buyerDetails.aadhaarLast4,
        fullName: buyerDetails.fullName,
        address: buyerDetails.address
      },
      events
    };

    setBookings(prev => {
      const next = [newBooking, ...prev];
      storageService.saveBookings(next);
      return next;
    });

    // Create digital receipt document
    const newDoc: DocumentItem = {
      id: `DOC-${Date.now()}`,
      bookingId,
      name: `Booking Receipt #${bookingId}`,
      type: 'RECEIPT',
      status: 'AVAILABLE',
      label: 'DEMO',
      fileSize: '390 KB',
      updatedAt: now.toISOString().split('T')[0]
    };
    setDocuments(prev => {
      const next = [newDoc, ...prev];
      storageService.saveDocuments(next);
      return next;
    });

    // Add notification
    const newNotif: AppNotification = {
      id: 'N-' + Date.now(),
      userId: currentUser.id,
      title: 'Booking Confirmed!',
      body: `Congratulations! Booking ${bookingId} for Plot ${plot.plotNo} is confirmed.`,
      time: 'Just now',
      read: false,
      type: 'booking'
    };
    setNotifications(prev => {
      const next = [newNotif, ...prev];
      storageService.saveNotifications(next);
      return next;
    });

    showToast('success', 'Booking Confirmed!', `Plot ${plot.plotNo} booked successfully with ID: ${bookingId}.`);
    return { success: true, bookingId, message: 'Booking confirmed successfully.' };
  };

  const scheduleSiteVisit = (projectId: string, date: string, time: string, notes?: string) => {
    const project = projects.find(p => p.id === projectId);
    const visitId = `SV-${Date.now().toString().slice(-4)}`;
    const newVisit: SiteVisit = {
      id: visitId,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      projectId,
      projectName: project?.name || 'Project',
      date,
      time,
      status: 'CONFIRMED',
      agent: 'Rohan Sharma (+91 99000 88776)',
      notes: notes || 'Site boundary inspection requested.'
    };

    setSiteVisits(prev => {
      const next = [newVisit, ...prev];
      storageService.saveSiteVisits(next);
      return next;
    });

    // Notification
    const notif: AppNotification = {
      id: 'N-' + Date.now(),
      userId: currentUser.id,
      title: 'Site Visit Confirmed',
      body: `Your visit to ${project?.name} is scheduled for ${date} at ${time}. Assigned agent: Rohan Sharma.`,
      time: 'Just now',
      read: false,
      type: 'visit'
    };
    setNotifications(prev => {
      const next = [notif, ...prev];
      storageService.saveNotifications(next);
      return next;
    });

    showToast('success', 'Site Visit Scheduled', `Visit confirmed for ${date} at ${time}. We will send you directions and contact details.`);
  };

  const updatePlotStatus = (plotId: string, newStatus: Plot['status']) => {
    const updatedPlots = plots.map(p => p.id === plotId ? { ...p, status: newStatus } : p);
    setPlots(updatedPlots);
    storageService.savePlots(updatedPlots);

    // Update project available count
    const targetPlot = plots.find(p => p.id === plotId);
    if (targetPlot) {
      const prjPlots = updatedPlots.filter(p => p.projectId === targetPlot.projectId);
      const availCount = prjPlots.filter(p => p.status === 'AVAILABLE').length;
      const updatedProjects = projects.map(pr => pr.id === targetPlot.projectId ? { ...pr, availableCount: availCount } : pr);
      setProjects(updatedProjects);
      storageService.saveProjects(updatedProjects);
    }

    showToast('info', 'Inventory Status Updated', `Plot ${plotId} status changed to ${newStatus}.`);
  };

  const updateProjectStatus = (projectId: string, status: Project['status'], verification: Project['verification']) => {
    const updatedProjects = projects.map(p => p.id === projectId ? { ...p, status, verification } : p);
    setProjects(updatedProjects);
    storageService.saveProjects(updatedProjects);
    showToast('success', 'Project Updated', `Project status set to ${status} (${verification}).`);
  };

  const verifyCaseItem = (caseId: string, itemName: string, status: 'VERIFIED' | 'PENDING' | 'REJECTED') => {
    const updatedCases = verificationCases.map(vc => {
      if (vc.id !== caseId) return vc;
      const updatedItems = vc.items.map(it => it.name === itemName ? { ...it, status } : it);
      const verifiedCount = updatedItems.filter(i => i.status === 'VERIFIED').length;
      const completeness = Math.round((verifiedCount / updatedItems.length) * 100);
      return { ...vc, items: updatedItems, completeness };
    });
    setVerificationCases(updatedCases);
    storageService.saveVerificationCases(updatedCases);
    showToast('info', 'Checklist Item Updated', `${itemName} set to ${status}.`);
  };

  const resolveVerificationCase = (caseId: string, outcome: 'APPROVED' | 'CHANGES_REQUIRED' | 'REJECTED', notes: string) => {
    const vc = verificationCases.find(c => c.id === caseId);
    if (!vc) return;

    const updatedCases = verificationCases.map(c => c.id === caseId ? {
      ...c,
      status: outcome,
      reviewerNotes: notes
    } : c);
    setVerificationCases(updatedCases);
    storageService.saveVerificationCases(updatedCases);

    // Also update project
    let projectStatus: Project['status'] = 'UNDER_REVIEW';
    let verifStatus: Project['verification'] = 'UNDER_REVIEW';
    if (outcome === 'APPROVED') {
      projectStatus = 'PUBLISHED';
      verifStatus = 'VERIFIED';
    } else if (outcome === 'CHANGES_REQUIRED') {
      projectStatus = 'CHANGES_REQUIRED';
      verifStatus = 'CHANGES_REQUIRED';
    } else {
      projectStatus = 'REJECTED';
      verifStatus = 'REJECTED';
    }

    updateProjectStatus(vc.projectId, projectStatus, verifStatus);

    showToast(outcome === 'APPROVED' ? 'success' : 'warning', `Verification ${outcome}`, `Case ${caseId} resolved as ${outcome}. Project status updated.`);
  };

  const updateLeadStage = (leadId: string, stage: Lead['stage']) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, stage } : l);
    setLeads(updated);
    storageService.saveLeads(updated);
    showToast('info', 'Lead Stage Updated', `Lead status updated to ${stage}.`);
  };

  const addProject = (newPrj: Omit<Project, 'id'>) => {
    const id = `PRJ00${projects.length + 1}`;
    const fullProject: Project = { ...newPrj, id };
    const nextProjects = [...projects, fullProject];
    setProjects(nextProjects);
    storageService.saveProjects(nextProjects);
    showToast('success', 'Project Submitted', `${fullProject.name} created and submitted for verification.`);
    return id;
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => {
      const next = prev.map(n => n.id === id ? { ...n, read: true } : n);
      storageService.saveNotifications(next);
      return next;
    });
  };

  const resetDemoData = () => {
    storageService.resetAll();
    setRoleState('buyer');
    setProjects(storageService.getProjects());
    setPlots(storageService.getPlots());
    setBookings(storageService.getBookings());
    setPayments(storageService.getPayments());
    setSiteVisits(storageService.getSiteVisits());
    setDocuments(storageService.getDocuments());
    setVerificationCases(storageService.getVerificationCases());
    setLeads(storageService.getLeads());
    setNotifications(storageService.getNotifications());
    setFavorites(storageService.getFavorites());
    setCompareList(storageService.getCompare());
    setActiveHold(null);
    setHoldSecondsRemaining(0);
    showToast('success', 'Demo Reset Complete', 'All seed data, plots, holds, and bookings have been restored to default.');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        projects,
        plots,
        bookings,
        payments,
        siteVisits,
        documents,
        verificationCases,
        leads,
        notifications,
        favorites,
        compareList,
        activeHold,
        holdSecondsRemaining,
        toasts,
        toggleFavorite,
        toggleCompare,
        clearCompare,
        createHold,
        releaseHold,
        createBookingWithPayment,
        scheduleSiteVisit,
        updatePlotStatus,
        updateProjectStatus,
        verifyCaseItem,
        resolveVerificationCase,
        updateLeadStage,
        addProject,
        markNotificationRead,
        showToast,
        removeToast,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
