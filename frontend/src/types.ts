export type UserRole = 'buyer' | 'developer' | 'admin';

export type PlotStatus = 'AVAILABLE' | 'ON_HOLD' | 'PAYMENT_PENDING' | 'BOOKED' | 'BLOCKED';

export type ProjectStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'CHANGES_REQUIRED'
  | 'CHANGES_REQUESTED'
  | 'PENDING_VERIFICATION'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'REJECTED'
  | 'SUSPENDED';

export type VerificationStatus =
  | 'UNVERIFIED'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'CHANGES_REQUIRED'
  | 'REJECTED'
  | 'DOCUMENT_REVIEW';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED' | 'PAID';

export type BookingStatus =
  | 'HOLD'
  | 'PAYMENT_PENDING'
  | 'BOOKED'
  | 'AGREEMENT_PENDING'
  | 'REGISTRATION_PENDING'
  | 'COMPLETED'
  | 'CANCELLED';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  city: string;
  avatarInitials: string;
  organizationId?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'developer' | 'landowner' | 'promoter';
  verified: boolean;
  registrationNo?: string;
}

export interface Project {
  id: string;
  name: string;
  slug?: string;
  organizationId: string;
  city: string;
  locality: string;
  status: ProjectStatus;
  verification?: VerificationStatus;
  verificationStage?: string;
  reraInfo: string;
  priceFrom: number;
  priceTo: number;
  plotCount: number;
  availableCount: number;
  developmentStage: string;
  possession: string;
  rating: number;
  amenities: string[];
  roadWidths?: string[];
  badges?: string[];
  description?: string;
  images: string[];
  lat?: number;
  lng?: number;
  developerName?: string;
  tagline?: string;
  highlights?: string[];
}

export interface Plot {
  id: string;
  projectId: string;
  plotNo: string;
  areaSqFt: number;
  dimensions: string;
  facing: 'East' | 'North' | 'North-East' | 'West' | 'South' | 'South-East' | 'North-West';
  roadWidthFt: number;
  corner: boolean;
  parkFacing: boolean;
  price: number;
  pricePerSqFt: number;
  bookingAmount: number;
  status: PlotStatus;
  heldBy?: string;
  heldUntil?: string; // ISO string
  bookedBy?: string;
}

export interface AuditEvent {
  id?: string;
  type?: string;
  label?: string;
  time?: string;
  timestamp?: string;
  actor?: string;
  action?: string;
  targetId?: string;
  details?: string;
}

export interface Booking {
  id: string;
  buyerId: string;
  buyerName?: string;
  buyerPhone?: string;
  buyerEmail?: string;
  buyerPan?: string;
  bookingDate?: string;
  projectId: string;
  projectName?: string;
  plotId: string;
  plotNo?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  bookingAmount: number;
  totalPrice?: number;
  createdAt: string;
  events: AuditEvent[];
  receiptUrl?: string;
  kycData?: {
    pan: string;
    aadhaarLast4: string;
    fullName: string;
    address: string;
  };
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  method: 'UPI' | 'CARD' | 'NET_BANKING';
  gatewayRef: string;
  createdAt: string;
}

export interface SiteVisit {
  id: string;
  buyerId: string;
  buyerName?: string;
  projectId: string;
  projectName?: string;
  date: string;
  time: string;
  status: 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  agent: string;
  notes?: string;
}

export interface DocumentItem {
  id: string;
  projectId?: string;
  bookingId?: string;
  name: string;
  type: 'APPROVAL' | 'TITLE' | 'LAYOUT' | 'RECEIPT' | 'AGREEMENT' | 'KYC';
  status: 'UPLOADED' | 'UNDER_REVIEW' | 'VERIFIED' | 'AVAILABLE' | 'PENDING_REVIEW' | 'REJECTED';
  label: string;
  fileSize?: string;
  updatedAt?: string;
}

export interface VerificationCheckItem {
  name: string;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  notes?: string;
}

export interface VerificationCase {
  id: string;
  projectId: string;
  projectName?: string;
  submittedBy: string;
  status: 'UNDER_REVIEW' | 'APPROVED' | 'CHANGES_REQUIRED' | 'REJECTED';
  completeness: number;
  submittedAt: string;
  items: VerificationCheckItem[];
  reviewerNotes?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  projectId: string;
  projectName?: string;
  stage: 'NEW' | 'CONTACTED' | 'SITE_VISIT' | 'SITE_VISIT_SCHEDULED' | 'NEGOTIATION' | 'BOOKED' | 'LOST';
  source: string;
  budget: number;
  createdAt?: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type?: 'booking' | 'hold' | 'visit' | 'lead' | 'verification' | 'system';
  link?: string;
}

export interface ActiveHold {
  plotId: string;
  projectId: string;
  plotNo: string;
  expiresAt: number; // timestamp ms
  createdAt: number;
  userId: string;
}
