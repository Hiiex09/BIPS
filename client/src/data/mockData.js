// Mock data for the Barangay Management System

export const mockUsers = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    email: "juan.delacruz@email.com",
    role: "Resident",
    status: "Active",
    verified: "Verified",
    joinDate: "2024-01-15",
    address: "123 Rizal Street, Brgy. San Jose"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    role: "Resident",
    status: "Active",
    verified: "Verified",
    joinDate: "2024-02-20",
    address: "456 Bonifacio Ave, Brgy. San Jose"
  },
  {
    id: 3,
    name: "Pedro Reyes",
    email: "pedro.reyes@email.com",
    role: "Resident",
    status: "Pending",
    verified: "Pending",
    joinDate: "2024-11-10",
    address: "789 Mabini Street, Brgy. San Jose"
  },
  {
    id: 4,
    name: "Ana Garcia",
    email: "ana.garcia@email.com",
    role: "Staff",
    status: "Active",
    verified: "Verified",
    joinDate: "2023-06-01",
    address: "321 Luna Road, Brgy. San Jose"
  },
  {
    id: 5,
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    role: "Resident",
    status: "Active",
    verified: "Verified",
    joinDate: "2024-03-12",
    address: "654 Aguinaldo Street, Brgy. San Jose"
  },
  {
    id: 6,
    name: "Rosa Bautista",
    email: "rosa.bautista@email.com",
    role: "Resident",
    status: "Inactive",
    verified: "Verified",
    joinDate: "2023-08-22",
    address: "987 Del Pilar Ave, Brgy. San Jose"
  },
  {
    id: 7,
    name: "Jose Ramos",
    email: "jose.ramos@email.com",
    role: "Resident",
    status: "Suspended",
    verified: "Rejected",
    joinDate: "2024-05-30",
    address: "147 Lapu-Lapu Street, Brgy. San Jose"
  },
  {
    id: 8,
    name: "Elena Cruz",
    email: "elena.cruz@email.com",
    role: "Admin",
    status: "Active",
    verified: "Verified",
    joinDate: "2022-01-10",
    address: "258 Quezon Blvd, Brgy. San Jose"
  }
];

export const mockDocuments = [
  {
    id: 1,
    requester: "Juan Dela Cruz",
    documentType: "Barangay Clearance",
    dateRequested: "2024-02-15",
    status: "Ready",
    purpose: "Employment Requirement",
    urgent: false,
    processedBy: "Ana Garcia"
  },
  {
    id: 2,
    requester: "Maria Santos",
    documentType: "Certificate of Residency",
    dateRequested: "2024-02-16",
    status: "Processing",
    purpose: "Bank Requirements",
    urgent: true,
    processedBy: "Ana Garcia"
  },
  {
    id: 3,
    requester: "Carlos Mendoza",
    documentType: "Indigency Certificate",
    dateRequested: "2024-02-14",
    status: "Pending",
    purpose: "Medical Assistance",
    urgent: true,
    processedBy: null
  },
  {
    id: 4,
    requester: "Pedro Reyes",
    documentType: "Business Permit",
    dateRequested: "2024-02-10",
    status: "Completed",
    purpose: "Sari-Sari Store",
    urgent: false,
    processedBy: "Elena Cruz"
  },
  {
    id: 5,
    requester: "Rosa Bautista",
    documentType: "Barangay Clearance",
    dateRequested: "2024-02-13",
    status: "Pending",
    purpose: "Loan Application",
    urgent: false,
    processedBy: null
  },
  {
    id: 6,
    requester: "Juan Dela Cruz",
    documentType: "Certificate of Residency",
    dateRequested: "2024-02-11",
    status: "Rejected",
    purpose: "Invalid Documents",
    urgent: false,
    processedBy: "Ana Garcia"
  }
];

export const mockIncidents = [
  {
    id: 1,
    title: "Illegal Parking Complaint",
    category: "Traffic",
    description: "Multiple vehicles blocking the road near the market area",
    reportedBy: "Maria Santos",
    dateReported: "2024-02-17",
    status: "Open",
    priority: "Medium",
    location: "Market Street, Brgy. San Jose",
    assignedTo: "Ana Garcia"
  },
  {
    id: 2,
    title: "Noise Complaint",
    category: "Public Disturbance",
    description: "Loud music during restricted hours from a nearby establishment",
    reportedBy: "Juan Dela Cruz",
    dateReported: "2024-02-16",
    status: "In Progress",
    priority: "Low",
    location: "456 Bonifacio Ave",
    assignedTo: "Ana Garcia"
  },
  {
    id: 3,
    title: "Street Light Malfunction",
    category: "Infrastructure",
    description: "Several street lights not working on Rizal Street",
    reportedBy: "Carlos Mendoza",
    dateReported: "2024-02-15",
    status: "Resolved",
    priority: "High",
    location: "Rizal Street",
    assignedTo: "Elena Cruz"
  },
  {
    id: 4,
    title: "Stray Dogs",
    category: "Animal Control",
    description: "Pack of stray dogs roaming residential area",
    reportedBy: "Rosa Bautista",
    dateReported: "2024-02-17",
    status: "Open",
    priority: "Critical",
    location: "Luna Road area",
    assignedTo: null
  },
  {
    id: 5,
    title: "Garbage Collection Delay",
    category: "Sanitation",
    description: "Garbage not collected for 3 days in the area",
    reportedBy: "Pedro Reyes",
    dateReported: "2024-02-14",
    status: "In Progress",
    priority: "High",
    location: "Mabini Street",
    assignedTo: "Ana Garcia"
  }
];

export const mockAnnouncements = [
  {
    id: 1,
    title: "Community Clean-up Drive",
    content: "Join us this Saturday for our monthly barangay clean-up drive. Meeting point at the basketball court at 7:00 AM.",
    author: "Elena Cruz",
    dateCreated: "2024-02-15",
    publishDate: "2024-02-15",
    status: "Published",
    category: "Events"
  },
  {
    id: 2,
    title: "Water Interruption Notice",
    content: "Please be advised that water supply will be temporarily interrupted on February 20, 2024, from 9:00 AM to 3:00 PM for maintenance work.",
    author: "Ana Garcia",
    dateCreated: "2024-02-14",
    publishDate: "2024-02-18",
    status: "Scheduled",
    category: "Public Service"
  },
  {
    id: 3,
    title: "Basketball League Registration",
    content: "Registration for the annual barangay basketball league is now open. Deadline for registration is March 1, 2024.",
    author: "Elena Cruz",
    dateCreated: "2024-02-10",
    publishDate: "2024-02-10",
    status: "Published",
    category: "Sports"
  },
  {
    id: 4,
    title: "Free Medical Check-up",
    content: "Free medical check-up and consultation will be available at the barangay health center on February 25, 2024.",
    author: "Elena Cruz",
    dateCreated: "2024-02-12",
    publishDate: "2024-02-12",
    status: "Published",
    category: "Health"
  },
  {
    id: 5,
    title: "Holiday Office Hours",
    content: "The barangay office will have limited hours during the upcoming holiday. We will be open from 8:00 AM to 12:00 PM only.",
    author: "Ana Garcia",
    dateCreated: "2024-01-20",
    publishDate: "2024-01-20",
    status: "Archived",
    category: "Announcement"
  }
];

// Statistics
export const userStats = {
  totalResidents: 1284,
  verified: 1150,
  pendingVerification: 134,
  growthFromLastMonth: 12
};

export const documentStats = {
  totalPending: 24,
  urgentRequests: 8,
  completedThisMonth: 156,
  averageProcessingTime: "2.5 days"
};

export const incidentStats = {
  openIncidents: 8,
  inProgress: 5,
  resolvedThisMonth: 42,
  criticalIncidents: 1
};

export const announcementStats = {
  published: 15,
  scheduled: 3,
  drafts: 2,
  archived: 28
};
