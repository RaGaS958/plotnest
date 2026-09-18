import {
  User,
  Project,
  Plot,
  Booking,
  PaymentRecord,
  SiteVisit,
  DocumentItem,
  VerificationCase,
  Lead,
  AppNotification,
  UserRole,
  ActiveHold
} from '../types';
import {
  SEED_USERS,
  SEED_PROJECTS,
  SEED_PLOTS,
  SEED_BOOKINGS,
  SEED_PAYMENTS,
  SEED_SITE_VISITS,
  SEED_DOCUMENTS,
  SEED_VERIFICATION_CASES,
  SEED_LEADS,
  SEED_NOTIFICATIONS
} from '../data/mockData';

const STORAGE_KEYS = {
  VERSION: 'plotnest_storage_v1',
  ROLE: 'plotnest_active_role',
  USERS: 'plotnest_users',
  PROJECTS: 'plotnest_projects',
  PLOTS: 'plotnest_plots',
  BOOKINGS: 'plotnest_bookings',
  PAYMENTS: 'plotnest_payments',
  SITE_VISITS: 'plotnest_site_visits',
  DOCUMENTS: 'plotnest_documents',
  VERIFICATION: 'plotnest_verifications',
  LEADS: 'plotnest_leads',
  NOTIFICATIONS: 'plotnest_notifications',
  FAVORITES: 'plotnest_favorites',
  COMPARE: 'plotnest_compare',
  ACTIVE_HOLD: 'plotnest_active_hold'
};

export const storageService = {
  initializeStorage(forceReset = false) {
    if (typeof window === 'undefined') return;

    const exists = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (!exists || forceReset) {
      localStorage.setItem(STORAGE_KEYS.VERSION, '1.0');
      localStorage.setItem(STORAGE_KEYS.ROLE, 'buyer');
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(SEED_PROJECTS));
      localStorage.setItem(STORAGE_KEYS.PLOTS, JSON.stringify(SEED_PLOTS));
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(SEED_BOOKINGS));
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(SEED_PAYMENTS));
      localStorage.setItem(STORAGE_KEYS.SITE_VISITS, JSON.stringify(SEED_SITE_VISITS));
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(SEED_DOCUMENTS));
      localStorage.setItem(STORAGE_KEYS.VERIFICATION, JSON.stringify(SEED_VERIFICATION_CASES));
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(SEED_LEADS));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(['P-A01', 'P-B01']));
      localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(['P-A01', 'P-B05', 'P-C02']));
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_HOLD);
    }
  },

  resetAll() {
    this.initializeStorage(true);
  },

  getRole(): UserRole {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole) || 'buyer';
  },

  setRole(role: UserRole) {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  },

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  },

  getProjects(): Project[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
  },

  saveProjects(projects: Project[]) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  getPlots(): Plot[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PLOTS) || '[]');
  },

  savePlots(plots: Plot[]) {
    localStorage.setItem(STORAGE_KEYS.PLOTS, JSON.stringify(plots));
  },

  getBookings(): Booking[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
  },

  saveBookings(bookings: Booking[]) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  getPayments(): PaymentRecord[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYMENTS) || '[]');
  },

  savePayments(payments: PaymentRecord[]) {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  },

  getSiteVisits(): SiteVisit[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SITE_VISITS) || '[]');
  },

  saveSiteVisits(visits: SiteVisit[]) {
    localStorage.setItem(STORAGE_KEYS.SITE_VISITS, JSON.stringify(visits));
  },

  getDocuments(): DocumentItem[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCUMENTS) || '[]');
  },

  saveDocuments(docs: DocumentItem[]) {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
  },

  getVerificationCases(): VerificationCase[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.VERIFICATION) || '[]');
  },

  saveVerificationCases(cases: VerificationCase[]) {
    localStorage.setItem(STORAGE_KEYS.VERIFICATION, JSON.stringify(cases));
  },

  getLeads(): Lead[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
  },

  saveLeads(leads: Lead[]) {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  },

  getNotifications(): AppNotification[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
  },

  saveNotifications(notifs: AppNotification[]) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  },

  getFavorites(): string[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
  },

  saveFavorites(favs: string[]) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
  },

  getCompare(): string[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPARE) || '[]');
  },

  saveCompare(plotIds: string[]) {
    localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(plotIds));
  },

  getActiveHold(): ActiveHold | null {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_HOLD);
    if (!raw) return null;
    try {
      const hold: ActiveHold = JSON.parse(raw);
      if (Date.now() > hold.expiresAt) {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_HOLD);
        return null;
      }
      return hold;
    } catch {
      return null;
    }
  },

  saveActiveHold(hold: ActiveHold | null) {
    if (!hold) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_HOLD);
    } else {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_HOLD, JSON.stringify(hold));
    }
  }
};
