import {
  User,
  Organization,
  Project,
  Plot,
  Booking,
  PaymentRecord,
  SiteVisit,
  DocumentItem,
  VerificationCase,
  Lead,
  AppNotification
} from '../types';

export const SEED_USERS: User[] = [
  {
    id: "U001",
    role: "buyer",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 90000 10001",
    city: "Lucknow",
    avatarInitials: "AS"
  },
  {
    id: "U002",
    role: "buyer",
    name: "Meera Verma",
    email: "meera@example.com",
    phone: "+91 90000 10002",
    city: "Lucknow",
    avatarInitials: "MV"
  },
  {
    id: "U100",
    role: "developer",
    name: "Rohan Mehta",
    email: "rohan@greenfield.example",
    phone: "+91 90000 10100",
    city: "Lucknow",
    organizationId: "ORG001",
    avatarInitials: "RM"
  },
  {
    id: "U900",
    role: "admin",
    name: "Platform Operations",
    email: "admin@plotnest.demo",
    phone: "+91 90000 10900",
    city: "Lucknow",
    avatarInitials: "PO"
  }
];

export const SEED_ORGANIZATIONS: Organization[] = [
  {
    id: "ORG001",
    name: "GreenField Estates Pvt. Ltd.",
    type: "developer",
    verified: true,
    registrationNo: "CIN-U45200UP2018PTC104523"
  },
  {
    id: "ORG002",
    name: "Riverstone Lands",
    type: "developer",
    verified: true,
    registrationNo: "CIN-U70102UP2020PTC128490"
  },
  {
    id: "ORG003",
    name: "UrbanLeaf Properties",
    type: "landowner",
    verified: false,
    registrationNo: "REG-PROP-2024-8841"
  }
];

export const SEED_PROJECTS: Project[] = [
  {
    id: "PRJ001",
    name: "Green Valley Residency",
    slug: "green-valley-residency",
    organizationId: "ORG001",
    city: "Lucknow",
    locality: "Sultanpur Road",
    status: "PUBLISHED",
    verification: "VERIFIED",
    reraInfo: "UPRERAPRJ123456",
    priceFrom: 2450000,
    priceTo: 7850000,
    plotCount: 48,
    availableCount: 18,
    developmentStage: "60% developed",
    possession: "Dec 2027",
    rating: 4.7,
    amenities: [
      "Gated Entry",
      "Street Lighting",
      "24×7 Security",
      "Children's Park",
      "Clubhouse",
      "Underground Drainage",
      "Wide Concrete Roads"
    ],
    roadWidths: ["30 ft", "40 ft", "60 ft"],
    badges: ["Identity Verified", "Project Reviewed", "Site Plan Verified", "RERA Registered"],
    description: "A premium plotted residential gated community on the Sultanpur Road growth corridor. Features 100% underground cabling, landscaped avenues, and prompt registry assistance.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
    ],
    lat: 26.7902,
    lng: 81.0023
  },
  {
    id: "PRJ002",
    name: "Riverstone Enclave",
    slug: "riverstone-enclave",
    organizationId: "ORG002",
    city: "Lucknow",
    locality: "Shaheed Path",
    status: "PUBLISHED",
    verification: "VERIFIED",
    reraInfo: "UPRERAPRJ234567",
    priceFrom: 3150000,
    priceTo: 9800000,
    plotCount: 72,
    availableCount: 26,
    developmentStage: "45% developed",
    possession: "Mar 2028",
    rating: 4.5,
    amenities: [
      "Gated Entry",
      "Central Park",
      "Jogging Track",
      "Underground Utilities",
      "Solar Street Lights"
    ],
    roadWidths: ["30 ft", "40 ft", "60 ft"],
    badges: ["Identity Verified", "Project Reviewed", "RERA Registered"],
    description: "A mid-premium plotted development with broad internal roads, park-facing inventory, and rapid connectivity to international cricket stadium and IT hub.",
    images: [
      "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80"
    ],
    lat: 26.8124,
    lng: 81.021
  },
  {
    id: "PRJ003",
    name: "UrbanLeaf Farm Plots",
    slug: "urbanleaf-farm-plots",
    organizationId: "ORG003",
    city: "Lucknow",
    locality: "Mohan Road",
    status: "SUBMITTED",
    verification: "UNDER_REVIEW",
    reraInfo: "UNDER APPLICATION",
    priceFrom: 1850000,
    priceTo: 4200000,
    plotCount: 36,
    availableCount: 36,
    developmentStage: "Pre-launch / review",
    possession: "TBD",
    rating: 4.2,
    amenities: [
      "Boundary Fencing",
      "Water Connection",
      "Organic Soil Assessment",
      "Perimeter Tree Line"
    ],
    roadWidths: ["20 ft", "30 ft"],
    badges: ["Identity Submitted", "Under Legal Review"],
    description: "Serene agro-residential country estates awaiting administrative compliance verification. Perfect for eco-living and weekend retreats.",
    images: [
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80"
    ],
    lat: 26.742,
    lng: 80.865
  }
];

export const SEED_PLOTS: Plot[] = [
  {
    id: "P-A01",
    projectId: "PRJ001",
    plotNo: "A-01",
    areaSqFt: 1200,
    dimensions: "24×50 ft",
    facing: "East",
    roadWidthFt: 30,
    corner: false,
    parkFacing: true,
    price: 3120000,
    pricePerSqFt: 2600,
    bookingAmount: 100000,
    status: "AVAILABLE"
  },
  {
    id: "P-A02",
    projectId: "PRJ001",
    plotNo: "A-02",
    areaSqFt: 1250,
    dimensions: "25×50 ft",
    facing: "East",
    roadWidthFt: 30,
    corner: false,
    parkFacing: true,
    price: 3250000,
    pricePerSqFt: 2600,
    bookingAmount: 100000,
    status: "AVAILABLE"
  },
  {
    id: "P-A03",
    projectId: "PRJ001",
    plotNo: "A-03",
    areaSqFt: 1350,
    dimensions: "27×50 ft",
    facing: "North-East",
    roadWidthFt: 40,
    corner: true,
    parkFacing: false,
    price: 3915000,
    pricePerSqFt: 2900,
    bookingAmount: 150000,
    status: "BOOKED",
    bookedBy: "U002"
  },
  {
    id: "P-A04",
    projectId: "PRJ001",
    plotNo: "A-04",
    areaSqFt: 1400,
    dimensions: "28×50 ft",
    facing: "North",
    roadWidthFt: 40,
    corner: false,
    parkFacing: false,
    price: 3780000,
    pricePerSqFt: 2700,
    bookingAmount: 150000,
    status: "ON_HOLD",
    heldBy: "U001"
  },
  {
    id: "P-A05",
    projectId: "PRJ001",
    plotNo: "A-05",
    areaSqFt: 1500,
    dimensions: "30×50 ft",
    facing: "West",
    roadWidthFt: 30,
    corner: true,
    parkFacing: false,
    price: 4500000,
    pricePerSqFt: 3000,
    bookingAmount: 200000,
    status: "AVAILABLE"
  },
  {
    id: "P-A06",
    projectId: "PRJ001",
    plotNo: "A-06",
    areaSqFt: 1100,
    dimensions: "22×50 ft",
    facing: "East",
    roadWidthFt: 30,
    corner: false,
    parkFacing: false,
    price: 2860000,
    pricePerSqFt: 2600,
    bookingAmount: 100000,
    status: "AVAILABLE"
  },
  {
    id: "P-A07",
    projectId: "PRJ001",
    plotNo: "A-07",
    areaSqFt: 1600,
    dimensions: "32×50 ft",
    facing: "North",
    roadWidthFt: 60,
    corner: true,
    parkFacing: true,
    price: 4960000,
    pricePerSqFt: 3100,
    bookingAmount: 200000,
    status: "AVAILABLE"
  },
  {
    id: "P-A08",
    projectId: "PRJ001",
    plotNo: "A-08",
    areaSqFt: 1000,
    dimensions: "20×50 ft",
    facing: "South",
    roadWidthFt: 30,
    corner: false,
    parkFacing: false,
    price: 2500000,
    pricePerSqFt: 2500,
    bookingAmount: 100000,
    status: "AVAILABLE"
  },
  {
    id: "P-A09",
    projectId: "PRJ001",
    plotNo: "A-09",
    areaSqFt: 1250,
    dimensions: "25×50 ft",
    facing: "East",
    roadWidthFt: 40,
    corner: false,
    parkFacing: true,
    price: 3375000,
    pricePerSqFt: 2700,
    bookingAmount: 100000,
    status: "AVAILABLE"
  },
  {
    id: "P-A10",
    projectId: "PRJ001",
    plotNo: "A-10",
    areaSqFt: 1300,
    dimensions: "26×50 ft",
    facing: "West",
    roadWidthFt: 30,
    corner: false,
    parkFacing: false,
    price: 3510000,
    pricePerSqFt: 2700,
    bookingAmount: 100000,
    status: "AVAILABLE"
  },
  {
    id: "P-B01",
    projectId: "PRJ002",
    plotNo: "B-01",
    areaSqFt: 1400,
    dimensions: "28×50 ft",
    facing: "East",
    roadWidthFt: 40,
    corner: true,
    parkFacing: true,
    price: 4200000,
    pricePerSqFt: 3000,
    bookingAmount: 150000,
    status: "AVAILABLE"
  },
  {
    id: "P-B02",
    projectId: "PRJ002",
    plotNo: "B-02",
    areaSqFt: 1200,
    dimensions: "24×50 ft",
    facing: "North",
    roadWidthFt: 30,
    corner: false,
    parkFacing: false,
    price: 3360000,
    pricePerSqFt: 2800,
    bookingAmount: 100000,
    status: "AVAILABLE"
  },
  {
    id: "P-B03",
    projectId: "PRJ002",
    plotNo: "B-03",
    areaSqFt: 1500,
    dimensions: "30×50 ft",
    facing: "North-East",
    roadWidthFt: 40,
    corner: false,
    parkFacing: true,
    price: 4350000,
    pricePerSqFt: 2900,
    bookingAmount: 150000,
    status: "AVAILABLE"
  },
  {
    id: "P-B04",
    projectId: "PRJ002",
    plotNo: "B-04",
    areaSqFt: 1250,
    dimensions: "25×50 ft",
    facing: "West",
    roadWidthFt: 30,
    corner: false,
    parkFacing: false,
    price: 3375000,
    pricePerSqFt: 2700,
    bookingAmount: 100000,
    status: "BOOKED",
    bookedBy: "U002"
  },
  {
    id: "P-B05",
    projectId: "PRJ002",
    plotNo: "B-05",
    areaSqFt: 1750,
    dimensions: "35×50 ft",
    facing: "North",
    roadWidthFt: 60,
    corner: true,
    parkFacing: true,
    price: 5600000,
    pricePerSqFt: 3200,
    bookingAmount: 200000,
    status: "AVAILABLE"
  },
  {
    id: "P-C01",
    projectId: "PRJ003",
    plotNo: "C-01",
    areaSqFt: 1800,
    dimensions: "36×50 ft",
    facing: "East",
    roadWidthFt: 30,
    corner: false,
    parkFacing: false,
    price: 3240000,
    pricePerSqFt: 1800,
    bookingAmount: 100000,
    status: "AVAILABLE"
  },
  {
    id: "P-C02",
    projectId: "PRJ003",
    plotNo: "C-02",
    areaSqFt: 2000,
    dimensions: "40×50 ft",
    facing: "North",
    roadWidthFt: 30,
    corner: true,
    parkFacing: true,
    price: 3800000,
    pricePerSqFt: 1900,
    bookingAmount: 100000,
    status: "AVAILABLE"
  }
];

export const SEED_BOOKINGS: Booking[] = [
  {
    id: "BK-2026-0042",
    buyerId: "U001",
    buyerName: "Aarav Sharma",
    buyerPhone: "+91 90000 10001",
    buyerEmail: "aarav@example.com",
    projectId: "PRJ001",
    projectName: "Green Valley Residency",
    plotId: "P-A02",
    plotNo: "A-02",
    status: "BOOKED",
    paymentStatus: "PAID",
    bookingAmount: 100000,
    totalPrice: 3250000,
    createdAt: "2026-09-18T10:07:00+05:30",
    receiptUrl: "#receipt-BK-2026-0042",
    kycData: {
      pan: "ABCDE1234F",
      aadhaarLast4: "9812",
      fullName: "Aarav Sharma",
      address: "House 14B, Gomti Nagar, Lucknow, UP 226010"
    },
    events: [
      {
        type: "PLOT_SELECTED",
        label: "Plot A-02 selected",
        time: "18 Sep, 09:58 AM",
        details: "Buyer initiated exact plot selection on interactive site plan"
      },
      {
        type: "HOLD_CREATED",
        label: "15-minute hold created",
        time: "18 Sep, 09:59 AM",
        details: "Hold token lock applied in inventory state"
      },
      {
        type: "KYC_COMPLETED",
        label: "Demo KYC verified",
        time: "18 Sep, 10:03 AM",
        details: "Sample PAN ABCDE1234F acknowledged"
      },
      {
        type: "PAYMENT_SUCCESS",
        label: "Booking payment received (₹1,00,000 via UPI)",
        time: "18 Sep, 10:06 AM",
        details: "Gateway Ref: DEMO-UPI-4421"
      },
      {
        type: "BOOKING_CONFIRMED",
        label: "Booking confirmed & receipt generated",
        time: "18 Sep, 10:07 AM",
        details: "Plot status switched to BOOKED; developer notified"
      }
    ]
  },
  {
    id: "BK-2026-0043",
    buyerId: "U002",
    buyerName: "Meera Verma",
    buyerPhone: "+91 90000 10002",
    buyerEmail: "meera@example.com",
    projectId: "PRJ002",
    projectName: "Riverstone Enclave",
    plotId: "P-B04",
    plotNo: "B-04",
    status: "PENDING_PAYMENT",
    paymentStatus: "PENDING",
    bookingAmount: 100000,
    totalPrice: 3375000,
    createdAt: "2026-09-18T11:20:00+05:30",
    receiptUrl: "#",
    kycData: {
      pan: "DFGHI5678J",
      aadhaarLast4: "4321",
      fullName: "Meera Verma",
      address: "Sector 14, Indira Nagar, Lucknow, UP 226016"
    },
    events: [
      {
        type: "PLOT_SELECTED",
        label: "Plot B-04 selected",
        time: "18 Sep, 11:15 AM",
        details: "Buyer initiated exact plot selection on interactive site plan"
      },
      {
        type: "KYC_COMPLETED",
        label: "Demo KYC verified",
        time: "18 Sep, 11:18 AM",
        details: "Sample PAN DFGHI5678J acknowledged"
      }
    ]
  },
  {
    id: "BK-2026-0041",
    buyerId: "U003",
    buyerName: "Rakesh Singh",
    buyerPhone: "+91 90000 10003",
    buyerEmail: "rakesh@example.com",
    projectId: "PRJ001",
    projectName: "Green Valley Residency",
    plotId: "P-A03",
    plotNo: "A-03",
    status: "BOOKED",
    paymentStatus: "PAID",
    bookingAmount: 150000,
    totalPrice: 3915000,
    createdAt: "2026-09-17T16:30:00+05:30",
    receiptUrl: "#receipt-BK-2026-0041",
    kycData: {
      pan: "JKLMN9012O",
      aadhaarLast4: "1122",
      fullName: "Rakesh Singh",
      address: "Aliganj, Lucknow, UP 226024"
    },
    events: [
      {
        type: "PAYMENT_SUCCESS",
        label: "Booking payment received (₹1,50,000 via Net Banking)",
        time: "17 Sep, 04:45 PM",
        details: "Gateway Ref: DEMO-NB-9988"
      },
      {
        type: "BOOKING_CONFIRMED",
        label: "Booking confirmed & receipt generated",
        time: "17 Sep, 04:46 PM",
        details: "Plot status switched to BOOKED; developer notified"
      }
    ]
  },
  {
    id: "BK-2026-0040",
    buyerId: "U004",
    buyerName: "Sanjay Dutta",
    buyerPhone: "+91 90000 10004",
    buyerEmail: "sanjay@example.com",
    projectId: "PRJ002",
    projectName: "Riverstone Enclave",
    plotId: "P-B05",
    plotNo: "B-05",
    status: "CANCELLED",
    paymentStatus: "REFUNDED",
    bookingAmount: 200000,
    totalPrice: 5600000,
    createdAt: "2026-09-10T10:00:00+05:30",
    receiptUrl: "#",
    kycData: {
      pan: "PQRST3456U",
      aadhaarLast4: "5566",
      fullName: "Sanjay Dutta",
      address: "Mahanagar, Lucknow, UP 226006"
    },
    events: [
      {
        type: "BOOKING_CONFIRMED",
        label: "Booking confirmed",
        time: "10 Sep, 10:15 AM",
        details: "Plot status switched to BOOKED"
      },
      {
        type: "CANCELLED",
        label: "Booking cancelled by buyer",
        time: "15 Sep, 02:00 PM",
        details: "Refund initiated"
      }
    ]
  }
];

export const SEED_PAYMENTS: PaymentRecord[] = [
  {
    id: "PAY-0001",
    bookingId: "BK-2026-0042",
    amount: 100000,
    status: "SUCCESS",
    method: "UPI",
    gatewayRef: "DEMO-UPI-4421",
    createdAt: "2026-09-18T10:06:30+05:30"
  },
  {
    id: "PAY-0002",
    bookingId: "BK-2026-0043",
    amount: 150000,
    status: "PENDING",
    method: "CARD",
    gatewayRef: "DEMO-CARD-7781",
    createdAt: "2026-09-18T11:30:00+05:30"
  },
  {
    id: "PAY-0003",
    bookingId: "BK-2026-0041",
    amount: 100000,
    status: "FAILED",
    method: "UPI",
    gatewayRef: "DEMO-UPI-3901",
    createdAt: "2026-09-17T16:40:00+05:30"
  },
  {
    id: "PAY-0004",
    bookingId: "BK-2026-0040",
    amount: 200000,
    status: "REFUNDED",
    method: "CARD",
    gatewayRef: "DEMO-CARD-1122",
    createdAt: "2026-09-10T10:05:00+05:30"
  },
  {
    id: "PAY-0005",
    bookingId: "BK-2026-0038",
    amount: 150000,
    status: "SUCCESS",
    method: "NET_BANKING",
    gatewayRef: "DEMO-NB-4455",
    createdAt: "2026-09-15T09:20:00+05:30"
  },
  {
    id: "PAY-0006",
    bookingId: "BK-2026-0039",
    amount: 100000,
    status: "SUCCESS",
    method: "UPI",
    gatewayRef: "DEMO-UPI-8899",
    createdAt: "2026-09-14T14:45:00+05:30"
  }
];

export const SEED_SITE_VISITS: SiteVisit[] = [
  {
    id: "SV-001",
    buyerId: "U001",
    buyerName: "Aarav Sharma",
    projectId: "PRJ001",
    projectName: "Green Valley Residency",
    date: "2026-09-20",
    time: "11:00 AM",
    status: "CONFIRMED",
    agent: "Neha Kapoor (+91 98888 12345)",
    notes: "Visitor requested boundary stone inspection for Plot A-02 and clubhouse progress check."
  },
  {
    id: "SV-002",
    buyerId: "U002",
    buyerName: "Meera Verma",
    projectId: "PRJ002",
    projectName: "Riverstone Enclave",
    date: "2026-09-21",
    time: "04:30 PM",
    status: "REQUESTED",
    agent: "Amit Singh (+91 97777 54321)",
    notes: "Corner plot inspection near central green promenade."
  },
  {
    id: "SV-003",
    buyerId: "U003",
    buyerName: "Rakesh Singh",
    projectId: "PRJ001",
    projectName: "Green Valley Residency",
    date: "2026-09-22",
    time: "10:00 AM",
    status: "COMPLETED",
    agent: "Neha Kapoor (+91 98888 12345)",
    notes: "Showed multiple plots, client booked A-03 on site."
  },
  {
    id: "SV-004",
    buyerId: "U004",
    buyerName: "Sanjay Dutta",
    projectId: "PRJ002",
    projectName: "Riverstone Enclave",
    date: "2026-09-23",
    time: "02:00 PM",
    status: "CANCELLED",
    agent: "Amit Singh (+91 97777 54321)",
    notes: "Client postponed due to personal reasons."
  },
  {
    id: "SV-005",
    buyerId: "U005",
    buyerName: "Kavita Rao",
    projectId: "PRJ003",
    projectName: "UrbanLeaf Farm Plots",
    date: "2026-09-25",
    time: "11:30 AM",
    status: "REQUESTED",
    agent: "Priya Sharma (+91 99999 11111)",
    notes: "Interested in large farm plots for weekend home."
  }
];

export const SEED_DOCUMENTS: DocumentItem[] = [
  {
    id: "DOC-001",
    projectId: "PRJ001",
    name: "Project Approval & Sanction Summary",
    type: "APPROVAL",
    status: "VERIFIED",
    label: "DEMO",
    fileSize: "1.4 MB",
    updatedAt: "2026-08-14"
  },
  {
    id: "DOC-002",
    projectId: "PRJ001",
    name: "Ownership & 30-Year Title Search Report",
    type: "TITLE",
    status: "VERIFIED",
    label: "DEMO",
    fileSize: "3.2 MB",
    updatedAt: "2026-08-10"
  },
  {
    id: "DOC-003",
    projectId: "PRJ001",
    name: "Master Site Layout Plan (Competent Authority Approved)",
    type: "LAYOUT",
    status: "VERIFIED",
    label: "DEMO",
    fileSize: "4.8 MB",
    updatedAt: "2026-08-20"
  },
  {
    id: "DOC-004",
    bookingId: "BK-2026-0042",
    name: "Official Booking Receipt #BK-2026-0042",
    type: "RECEIPT",
    status: "AVAILABLE",
    label: "DEMO",
    fileSize: "420 KB",
    updatedAt: "2026-09-18"
  },
  {
    id: "DOC-005",
    bookingId: "BK-2026-0042",
    name: "Draft Agreement for Sale (RERA Model)",
    type: "AGREEMENT",
    status: "PENDING_REVIEW",
    label: "DEMO",
    fileSize: "2.1 MB",
    updatedAt: "2026-09-18"
  }
];

export const SEED_VERIFICATION_CASES: VerificationCase[] = [
  {
    id: "VC-001",
    projectId: "PRJ003",
    projectName: "UrbanLeaf Farm Plots",
    submittedBy: "UrbanLeaf Properties (ORG003)",
    status: "UNDER_REVIEW",
    completeness: 78,
    submittedAt: "2026-09-17",
    reviewerNotes: "Awaiting final clearance on agricultural-to-residential land conversion certificate and setback boundary verification.",
    items: [
      { name: "Promoter identity & KYC", status: "VERIFIED" },
      { name: "Basic project details & demarcation", status: "VERIFIED" },
      { name: "Digital site layout plan mapping", status: "VERIFIED" },
      { name: "Competent authority layout approval", status: "PENDING", notes: "Authority receipt provided; final sanction order awaited." },
      { name: "Ownership title & 30-year non-encumbrance certificate", status: "PENDING", notes: "Law firm vetting in progress." },
      { name: "GPS coordinates & road access survey", status: "VERIFIED" }
    ]
  },
  {
    id: "VC-002",
    projectId: "PRJ004",
    projectName: "Sunrise Meadows",
    submittedBy: "Sunrise Developers (ORG004)",
    status: "APPROVED",
    completeness: 100,
    submittedAt: "2026-09-10",
    reviewerNotes: "All documents verified and approved. Project is now live on the marketplace.",
    items: [
      { name: "Promoter identity & KYC", status: "VERIFIED" },
      { name: "Basic project details & demarcation", status: "VERIFIED" },
      { name: "Digital site layout plan mapping", status: "VERIFIED" },
      { name: "Competent authority layout approval", status: "VERIFIED" },
      { name: "Ownership title & 30-year non-encumbrance certificate", status: "VERIFIED" },
      { name: "GPS coordinates & road access survey", status: "VERIFIED" }
    ]
  },
  {
    id: "VC-003",
    projectId: "PRJ005",
    projectName: "Omaxe City Extension",
    submittedBy: "Omaxe Ltd (ORG005)",
    status: "REJECTED",
    completeness: 45,
    submittedAt: "2026-09-15",
    reviewerNotes: "Title documents are incomplete. Missing the latest encumbrance certificate. Please re-submit with proper documentation.",
    items: [
      { name: "Promoter identity & KYC", status: "VERIFIED" },
      { name: "Basic project details & demarcation", status: "VERIFIED" },
      { name: "Digital site layout plan mapping", status: "PENDING", notes: "Awaiting CAD files." },
      { name: "Competent authority layout approval", status: "PENDING" },
      { name: "Ownership title & 30-year non-encumbrance certificate", status: "REJECTED", notes: "Missing EC." },
      { name: "GPS coordinates & road access survey", status: "PENDING" }
    ]
  }
];

export const SEED_LEADS: Lead[] = [
  {
    id: "L-001",
    name: "Kabir Singh",
    phone: "+91 90000 20101",
    projectId: "PRJ001",
    projectName: "Green Valley Residency",
    stage: "SITE_VISIT",
    source: "Website Direct",
    budget: 4000000,
    createdAt: "2026-09-18T08:30:00"
  },
  {
    id: "L-002",
    name: "Ananya Rao",
    phone: "+91 90000 20102",
    projectId: "PRJ002",
    projectName: "Riverstone Enclave",
    stage: "CONTACTED",
    source: "Google Search",
    budget: 5000000,
    createdAt: "2026-09-17T14:15:00"
  },
  {
    id: "L-003",
    name: "Dev Malhotra",
    phone: "+91 90000 20103",
    projectId: "PRJ001",
    projectName: "Green Valley Residency",
    stage: "NEW",
    source: "Social Ad",
    budget: 3500000,
    createdAt: "2026-09-18T09:10:00"
  },
  {
    id: "L-004",
    name: "Riya Jain",
    phone: "+91 90000 20104",
    projectId: "PRJ002",
    projectName: "Riverstone Enclave",
    stage: "NEGOTIATION",
    source: "Channel Partner",
    budget: 6000000,
    createdAt: "2026-09-16T18:00:00"
  },
  {
    id: "L-005",
    name: "Vikram Desai",
    phone: "+91 90000 20105",
    projectId: "PRJ001",
    projectName: "Green Valley Residency",
    stage: "NEW",
    source: "Instagram Ad",
    budget: 2800000,
    createdAt: "2026-09-18T10:15:00"
  },
  {
    id: "L-006",
    name: "Pooja Hegde",
    phone: "+91 90000 20106",
    projectId: "PRJ002",
    projectName: "Riverstone Enclave",
    stage: "SITE_VISIT",
    source: "Website Direct",
    budget: 4500000,
    createdAt: "2026-09-17T09:30:00"
  },
  {
    id: "L-007",
    name: "Rajesh Kumar",
    phone: "+91 90000 20107",
    projectId: "PRJ003",
    projectName: "UrbanLeaf Farm Plots",
    stage: "CONTACTED",
    source: "Organic Search",
    budget: 2000000,
    createdAt: "2026-09-15T16:45:00"
  },
  {
    id: "L-008",
    name: "Sneha Reddy",
    phone: "+91 90000 20108",
    projectId: "PRJ001",
    projectName: "Green Valley Residency",
    stage: "NEGOTIATION",
    source: "Referral",
    budget: 3200000,
    createdAt: "2026-09-14T11:20:00"
  },
  {
    id: "L-009",
    name: "Amit Patel",
    phone: "+91 90000 20109",
    projectId: "PRJ002",
    projectName: "Riverstone Enclave",
    stage: "NEW",
    source: "Facebook Ad",
    budget: 5500000,
    createdAt: "2026-09-18T12:00:00"
  },
  {
    id: "L-010",
    name: "Neha Gupta",
    phone: "+91 90000 20110",
    projectId: "PRJ003",
    projectName: "UrbanLeaf Farm Plots",
    stage: "SITE_VISIT",
    source: "Property Portal",
    budget: 2500000,
    createdAt: "2026-09-16T14:10:00"
  }
];

export const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: "N-001",
    userId: "U001",
    title: "Booking Confirmed",
    body: "Booking BK-2026-0042 for Plot A-02 at Green Valley Residency has been confirmed.",
    time: "5 min ago",
    read: false,
    type: "booking"
  },
  {
    id: "N-002",
    userId: "U001",
    title: "Site Visit Reminder",
    body: "Your site visit for Green Valley Residency is scheduled for 20 Sep at 11:00 AM.",
    time: "1 hr ago",
    read: false,
    type: "visit"
  },
  {
    id: "N-003",
    userId: "U100",
    title: "New Qualified Lead",
    body: "Kabir Singh requested a site visit for Green Valley Residency.",
    time: "25 min ago",
    read: false,
    type: "lead"
  },
  {
    id: "N-004",
    userId: "U900",
    title: "Verification Case Submitted",
    body: "UrbanLeaf Properties submitted UrbanLeaf Farm Plots for regulatory review.",
    time: "2 hrs ago",
    read: false,
    type: "verification"
  },
  {
    id: "N-005",
    userId: "U100",
    title: "Payment Received",
    body: "Payment of ₹1,50,000 received for booking BK-2026-0041.",
    time: "4 hrs ago",
    read: true,
    type: "booking"
  },
  {
    id: "N-006",
    userId: "U900",
    title: "New Project Published",
    body: "Sunrise Meadows is now live on the marketplace.",
    time: "1 day ago",
    read: true,
    type: "system"
  },
  {
    id: "N-007",
    userId: "U001",
    title: "Document Verified",
    body: "Your submitted ID proof for KYC has been verified.",
    time: "2 days ago",
    read: true,
    type: "system"
  }
];
