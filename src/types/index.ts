// Common interfaces for the admin billing application

export interface Admin {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "super_admin";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: {
    _id: string;
    username: string;
    email: string;
  };
  customerResponse: "pending" | "satisfied" | "not_satisfied";
  customerFeedback?: string;
  issueSolved: boolean;
  adminNotes: AdminNote[];
  createdAt: string;
  updatedAt: string;
}

export interface Demo {
  _id: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  businessType:
    | "retail-store"
    | "restaurant"
    | "service-business"
    | "e-commerce"
    | "manufacturing"
    | "healthcare"
    | "education"
    | "real-estate"
    | "construction"
    | "consulting"
    | "other";
  currentSoftware: "none" | "excel" | "tally" | "quickbooks" | "zoho" | "other";
  preferredTime: string;
  status:
    | "pending"
    | "demo_scheduled"
    | "demo_completed"
    | "demo_accepted"
    | "on_proceed"
    | "converted"
    | "rejected";
  priority: "low" | "medium" | "high";
  demoDate?: string;
  demoNotes?: string;
  assignedTo?: {
    _id: string;
    username: string;
    email: string;
  };
  customerResponse: "pending" | "okay" | "not_okay";
  customerFeedback?: string;
  conversionValue?: number;
  followUpDate?: string;
  adminNotes: AdminNote[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminNote {
  _id: string;
  note: string;
  addedBy: {
    _id: string;
    username: string;
    email: string;
  };
  addedAt: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ContactsResponse {
  contacts: Contact[];
  pagination: PaginationInfo;
  statusCounts: { [key: string]: number };
}

export interface DemosResponse {
  demos: Demo[];
  pagination: PaginationInfo;
  statusCounts: { [key: string]: number };
  businessTypeCounts: { [key: string]: number };
}

export interface AdminsResponse {
  admins: Admin[];
  pagination: PaginationInfo;
}

export interface DashboardStats {
  contacts: {
    totalContacts: number;
    newContacts: number;
    inProgressContacts: number;
    resolvedContacts: number;
    closedContacts: number;
  };
  demos: {
    totalDemos: number;
    pendingDemos: number;
    scheduledDemos: number;
    completedDemos: number;
    acceptedDemos: number;
    convertedDemos: number;
    totalConversionValue: number;
  };
  recentActivities: {
    contacts: Array<{
      _id: string;
      name: string;
      email: string;
      subject: string;
      status: string;
      createdAt: string;
    }>;
    demos: Array<{
      _id: string;
      name: string;
      business: string;
      email: string;
      status: string;
      createdAt: string;
    }>;
  };
  businessTypeStats: Array<{
    _id: string;
    count: number;
  }>;
}

export interface PersonalDetails {
  name: string;
  fatherName: string;
  address: string;
  state: string;
  district: string;
  phoneNumber1: string;
  phoneNumber2?: string;
  nomineeName: string;
}

export interface BusinessDetails {
  businessName: string;
  address: string;
  state: string;
  district: string;
  phoneNumber: string;
  gstNumber?: string;
  businessDescription: string;
  businessSize: "Small" | "Medium" | "Large" | "Enterprise";
  yearsOfBusiness: number;
}

export interface PlanDetails {
  accessType: string;
  maintenanceFrequency: "Monthly" | "Quarterly" | "Half Yearly" | "Yearly";
  customPricing: boolean;
  pricingData: any;
}

export interface AdditionalCosts {
  constant: number;
  hosting: number;
  domain: number;
  storage: number;
  maintenance: number;
  websiteCost: number;
}

export interface PaymentDetails {
  planPrice: number;
  projectPrice: number;
  hostingYearlyPrice: number;
  additionalCosts: AdditionalCosts;
  totalAmount: number;
}

export interface Onboarding {
  _id: string;
  personalDetails: PersonalDetails;
  businessDetails: BusinessDetails;
  planDetails: PlanDetails;
  paymentDetails: PaymentDetails;
  notes?: string;
  status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Rejected";
  currentStep: number;
  completedSteps: number[];
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: {
    _id: string;
    username: string;
    email: string;
  };
  adminNotes: AdminNote[];
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingResponse {
  onboardings: Onboarding[];
  pagination: PaginationInfo;
  statusCounts: { [key: string]: number };
}

export interface OnboardingStats {
  totalOnboardings: number;
  statusCounts: {
    Draft: number;
    Submitted: number;
    "Under Review": number;
    Approved: number;
    Rejected: number;
  };
  recentOnboardings: Array<{
    _id: string;
    personalDetails: { name: string };
    businessDetails: { businessName: string };
    status: string;
    createdAt: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: Array<{
    type: string;
    msg: string;
    path: string;
    location: string;
  }>;
}

// Client Management Types (8-Step System)
export interface ClientBasicInfo {
  businessName: string;
  ownerContactName: string;
  email: string;
  phone: string;
  businessAddress: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  onboardingDate?: string;
  assignedSalesRep?: string;
}

export interface ClientBusinessInfo {
  businessType:
    | "restaurant"
    | "retail"
    | "service"
    | "ecommerce"
    | "healthcare"
    | "education"
    | "other";
  businessCategory?: string;
  businessDescription?: string;
}

export interface ClientDomainHosting {
  subdomain: string;
  dnsStatus?: "active" | "pending" | "suspended";
  frontendHostingPlatform?: "netlify" | "render";
  backendHostingPlatform?: "render" | "other";
  sslCertificateStatus?: "active" | "pending" | "expired" | "not_configured";
  websiteTheme?: string;
}

export interface ClientDatabaseSystem {
  databaseName: string;
  connectionUri: string;
  backupFrequency?: "daily" | "weekly" | "monthly";
  lastBackupDate?: string;
  serverEnvironment?: string;
  storageUsage?: string;
  backendRepoLink?: string;
}

export interface ClientBilling {
  setupCost: {
    paid?: boolean;
    amount?: number;
  };
  maintenanceFee: {
    amount: number;
    currency?: string;
  };
  billingCycle: "monthly" | "yearly";
  lastPaymentDate?: string;
  nextPaymentDate: string;
  paymentMethod: "upi" | "bank_transfer" | "card";
  pendingDues?: {
    amount?: number;
    description?: string;
  };
}

export interface ClientServiceSupport {
  supportTicketsCount?: number;
  ticketSystemLink?: string;
  lastSupportRequestDate?: string;
  serviceLevel?: "basic" | "premium" | "custom";
  customFeaturesRequested?: string;
  previousIssuesHistory?: string;
  ongoingIssues?: string;
}

export interface ClientAutomationNotifications {
  autoEmailAlerts?: boolean;
  backupCompleted?: boolean;
  paymentReminder?: boolean;
  sslExpiry?: boolean;
  domainRenewal?: boolean;
  supportSlaReminder?: boolean;
}

export interface ClientAttachmentsNotes {
  contractPdf?: string;
  customDesignFiles?: string;
  clientSpecificInstructions?: string;
  internalNotes?: string;
}

export interface Client {
  _id: string;
  clientId: string;
  // STEP 1: Basic Information
  businessName: string;
  ownerContactName: string;
  email: string;
  phone: string;
  businessAddress: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  onboardingDate: string;
  assignedSalesRep?: {
    _id: string;
    username: string;
    email: string;
  };

  // STEP 2: Business Information
  businessType:
    | "restaurant"
    | "retail"
    | "service"
    | "ecommerce"
    | "healthcare"
    | "education"
    | "other";
  businessCategory?: string;
  businessDescription?: string;

  // STEP 3: Domain & Hosting Info
  domainHosting: {
    subdomain: string;
    dnsStatus: "active" | "pending" | "suspended";
    frontendHostingPlatform?: "netlify" | "render";
    backendHostingPlatform?: "render" | "other";
    sslCertificateStatus?: "active" | "pending" | "expired" | "not_configured";
    websiteTheme?: string;
  };

  // STEP 4: Database & System Info
  databaseSystem: {
    databaseName: string;
    connectionUri: string;
    backupFrequency?: "daily" | "weekly" | "monthly";
    lastBackupDate?: string;
    serverEnvironment?: string;
    storageUsage?: string;
    backendRepoLink?: string;
  };

  // STEP 5: Billing & Payment Info
  billing: {
    setupCost: {
      paid: boolean;
      amount?: number;
    };
    maintenanceFee: {
      amount: number;
      currency: string;
    };
    billingCycle: "monthly" | "yearly";
    lastPaymentDate?: string;
    nextPaymentDate: string;
    paymentMethod: "upi" | "bank_transfer" | "card";
    pendingDues: {
      amount: number;
      description?: string;
    };
  };

  // STEP 6: Service & Support Logs
  serviceSupport: {
    supportTicketsRaised: {
      count: number;
      ticketSystemLink?: string;
    };
    lastSupportRequestDate?: string;
    serviceLevel: "basic" | "premium" | "custom";
    customFeaturesRequested: Array<{
      feature: string;
      status: "requested" | "in_progress" | "completed" | "rejected";
      requestedDate: string;
      completedDate?: string;
    }>;
    issuesHistory: Array<{
      issue: string;
      fix?: string;
      reportedDate: string;
      resolvedDate?: string;
      status: "open" | "in_progress" | "resolved";
    }>;
    ongoingIssues: Array<{
      issue: string;
      priority: "low" | "medium" | "high" | "critical";
      reportedDate: string;
      assignedTo?: {
        _id: string;
        username: string;
      };
    }>;
  };

  // STEP 7: Automation & Notifications
  automationNotifications: {
    autoEmailAlerts: boolean;
    backupCompleted: boolean;
    paymentReminder: boolean;
    sslExpiry: boolean;
    domainRenewal: boolean;
    supportSlaReminder: boolean;
  };

  // STEP 8: Attachments & Notes
  attachmentsNotes: {
    contractPdf?: {
      filename?: string;
      url?: string;
      uploadedDate?: string;
    };
    customDesignFiles: Array<{
      filename: string;
      url: string;
      fileType?: string;
      uploadedDate: string;
    }>;
    clientSpecificInstructions?: string;
    internalNotes: Array<{
      note: string;
      addedBy: {
        _id: string;
        username: string;
      };
      addedDate: string;
      isPrivate: boolean;
    }>;
  };

  status: "active" | "inactive" | "suspended" | "terminated";
  createdAt: string;
  updatedAt: string;
}

export interface ClientsResponse {
  clients: Client[];
  pagination: PaginationInfo;
  statusCounts: { [key: string]: number };
  billingCycleCounts: { [key: string]: number };
  upcomingPayments: Array<{
    _id: string;
    businessName: string;
    billing: {
      nextPaymentDate: string;
      maintenanceFee: {
        amount: number;
      };
    };
  }>;
}

export interface ClientDashboardStats {
  totalClients: number;
  activeClients: number;
  suspendedClients: number;
  overduePayments: number;
  clientsWithIssues: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  recentClients: Array<{
    _id: string;
    businessName: string;
    ownerContactName: string;
    status: string;
    createdAt: string;
  }>;
}
