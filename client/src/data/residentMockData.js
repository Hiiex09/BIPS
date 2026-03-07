// Mock data for Resident UI

export const residentStats = [
  {
    id: "population",
    label: "Barangay Population",
    value: "12,450",
    detail: "-2.6% from last year",
    detailColor: "text-error",
    emoji: "👥",
  },
  {
    id: "weather",
    label: "Today's Weather",
    value: "31°C Sunny",
    detail: "Humidity 55%",
    detailColor: "text-muted",
    emoji: "☀️",
  },
  {
    id: "programs",
    label: "Active Programs",
    value: "8",
    detail: "3 Ongoing this week",
    detailColor: "text-muted",
    emoji: "🏃",
  },
  {
    id: "volunteers",
    label: "Volunteers Joined",
    value: "156",
    detail: "New this month: 20",
    detailColor: "text-success",
    emoji: "🤝",
  },
];

export const latestAnnouncement = {
  badge: "LATEST ANNOUNCEMENT",
  title: "Quarterly Community Assembly: Planning for 2024",
  description:
    "Join your neighbors this Saturday at 2:00 PM at the Multipurpose Hall to discuss infrastructure projects and security updates.",
  image:
    "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=900",
};

export const communityNewsArticle = {
  category: "COMMUNITY",
  date: "Oct 24, 2023",
  image:
    "https://images.pexels.com/photos/1550346/pexels-photo-1550346.jpeg?auto=compress&cs=tinysrgb&w=600",
  title: "Barangay Clean-up Drive: Success and Next Schedule",
  excerpt:
    "Over 100 residents participated in last Sunday's coastal clean-up drive. We collected 500kgs of waste. The next drive is scheduled for next Sunday.",
};

export const healthSchedule = [
  { service: "Vaccination Day", detail: "Pedia K & Adult", days: "Mon & Wed" },
  { service: "Dental Services", detail: "Free Check-up", days: "Tuesday" },
  { service: "Maternal Health", detail: "Prenatal Care", days: "Friday" },
];

export const localOrdinances = [
  {
    id: "ORDINANCE 2023-014",
    title: "Mandatory Waste Segregation at Source Regulation",
    tag: "Recent Implementations",
  },
  {
    id: "ORDINANCE 2023-012",
    title: "Regulation of Plastic Use in Local Markets",
    tag: "",
  },
];

export const availableDocuments = [
  {
    id: 1,
    iconType: "clearance",
    title: "Barangay Clearance",
    description:
      "Required for employment, bank transactions, and legal identification...",
    fee: "₱50.00",
    processing: "1 DAY",
  },
  {
    id: 2,
    iconType: "residency",
    title: "Residency Certificate",
    description:
      "Proof of official residence in the barangay for at least 6 months.",
    fee: "₱20.00",
    processing: "1 DAY",
  },
  {
    id: 3,
    iconType: "indigency",
    title: "Indigency Certificate",
    description:
      "For financial assistance, scholarships, or medical subsidies from government.",
    fee: "FREE",
    processing: "1-2 DAYS",
  },
];

export const activeRequests = [
  {
    id: "BBG-2023-0892",
    type: "Barangay Clearance",
    requestedOn: "Oct 24, 2023",
    status: "IN PROGRESS",
    currentStep: 1,
    steps: ["Submitted", "Processing", "For Pickup"],
    requiredItems: [
      "Valid Government ID (Original)",
      "Application Fee (₱50.00)",
    ],
    note: "Your document is being reviewed by the Barangay Secretary. Estimated completion is tomorrow, 2:00 PM.",
  },
];

export const concernCategories = [
  "Road / Infrastructure",
  "Waste Management",
  "Public Safety",
  "Noise Complaint",
  "Flooding",
  "Street Lighting",
  "Other",
];

export const submissionHistory = [
  {
    id: 1,
    title: "Uncollected Waste - St. Mary Ave",
    submittedDate: "Oct 24, 2023",
    status: "RESOLVED",
  },
  {
    id: 2,
    title: "Broken Street Light - Corner 4th",
    submittedDate: "Nov 03, 2023",
    status: "IN PROGRESS",
  },
  {
    id: 3,
    title: "Suspicious Vehicle - Block 7",
    submittedDate: "Today, 9:26 AM",
    status: "UNDER REVIEW",
  },
];

// ── Community News ────────────────────────────────────
export const newsFilters = ["All News", "Local Events", "Project Updates", "Highlights"];

export const upcomingEvents = [
  { month: "OCT", day: "12", title: "Town Hall Meeting", time: "6:00 PM", location: "Plaza Hall" },
  { month: "OCT", day: "15", title: "Health Mission", time: "8:00 AM", location: "Health Center" },
  { month: "OCT", day: "20", title: "Waste Segregation Seminar", time: "2:00 PM", location: "Covered Court" },
];

export const featuredNewsEvent = {
  badge: "Featured Event",
  category: "LOCAL EVENTS",
  image: "https://images.unsplash.com/photo-1758599667729-a6f0f8bd213b?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
  title: "Annual Clean-up Drive 2024",
  description:
    "Join us this Saturday for our community-wide environmental initiative. Volunteers will meet at the Plaza at 7:00 AM. Free breakfast and cleaning kits will be provided to all participants.",
  action: "Read Full Story",
};

export const newsArticles = [
  {
    id: 1,
    category: "PROJECT UPDATE",
    badgeClass: "badge-warning",
    image: "https://images.pexels.com/photos/8961133/pexels-photo-8961133.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "New CCTV System Installation",
    excerpt: "Phase 1 of our 'Safe Neighborhood' initiative is complete. Cameras are now deployed in key intersections.",
    timestamp: "2 hours ago",
    action: "Details",
  },
  {
    id: 2,
    category: "HIGHLIGHT",
    badgeClass: "badge-success",
    image: "https://images.unsplash.com/photo-1758275557330-cfd545444dc3?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
    title: "Outstanding Resident Award",
    excerpt: "Congratulations to Mrs. Maria Santos for her 10 years of dedicated service at our community center.",
    timestamp: "Yesterday",
    action: "Read Story",
  },
  {
    id: 3,
    category: "ANNOUNCEMENT",
    badgeClass: "badge-info",
    image: "https://images.unsplash.com/photo-1683516435482-f3cea544ee95?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
    title: "New Waste Collection Schedule",
    excerpt: "Starting next week, please follow the updated schedule for dry and wet waste collection in all zones.",
    timestamp: "Oct 08, 2024",
    action: "View PDF",
  },
  {
    id: 4,
    category: "PROJECT UPDATE",
    badgeClass: "badge-warning",
    image: "https://images.pexels.com/photos/19336565/pexels-photo-19336565.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Kid's Park Refurbishment",
    excerpt: "The renovation of our community park is now 80% complete. New swings and playground equipment installed.",
    timestamp: "Oct 05, 2024",
    action: "Full Report",
  },
];

// ── Health Center ─────────────────────────────────────
export const healthCenterStats = [
  { label: "Monthly Patients", value: "1,200+", trend: "+12% from last month", icon: "👥" },
  { label: "Vaccinations", value: "850", trend: "-3% from last month", icon: "💉" },
  { label: "On-duty Staff", value: "14", trend: "2 new doctors joined", icon: "🩺" },
];

export const healthServices = [
  {
    id: 1,
    name: "Vaccinations",
    description: "Flu shots, COVID boosters, and childhood immunizations provided by certified nurses.",
    image: "https://images.unsplash.com/photo-1576765608622-067973a79f53?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
    link: "See Pricing",
  },
  {
    id: 2,
    name: "Dental Care",
    description: "Routine checkups, professional cleanings, and emergency dental procedures.",
    image: "https://images.unsplash.com/photo-1758205307804-097f5437189f?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
    link: "See Pricing",
  },
  {
    id: 3,
    name: "Prenatal Support",
    description: "Comprehensive care for expecting mothers, ultrasound services, and newborn health.",
    image: "https://images.pexels.com/photos/7088531/pexels-photo-7088531.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "See Pricing",
  },
];

export const doctorSchedule = [
  {
    avatar: "https://i.pravatar.cc/40?u=sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    title: "General Physician",
    specialty: "Primary Care",
    days: "Mon, Wed, Fri",
    hours: "08:00–18:00",
    status: "available",
  },
  {
    avatar: "https://i.pravatar.cc/40?u=michael-chen",
    name: "Dr. Michael Chen",
    title: "DDS, MD",
    specialty: "Dentistry",
    days: "Tue, Thu",
    hours: "09:00–17:00",
    status: "limited",
  },
  {
    avatar: "https://i.pravatar.cc/40?u=elena-rodriguez",
    name: "Elena Rodriguez",
    title: "RN, Midwife",
    specialty: "Prenatal Care",
    days: "Mon–Fri",
    hours: "08:00–14:00",
    status: "available",
  },
  {
    avatar: "https://i.pravatar.cc/40?u=james-wilson",
    name: "Dr. James Wilson",
    title: "Pediatrician",
    specialty: "Pediatrics",
    days: "Mon, Thu",
    hours: "10:00–18:00",
    status: "full",
  },
];

// ── Ordinances ────────────────────────────────────────
export const ordinanceCategories = [
  "All Ordinances",
  "Environment",
  "Peace & Order",
  "Business & Permits",
  "Health & Safety",
];

export const ordinancesList = [
  {
    id: "2023-01",
    number: "Ordinance No. 2023-01",
    title: "Zero Waste Initiative",
    category: "Environment",
    effective: "Jan 15, 2023",
    summary:
      "This ordinance mandates the strict implementation of ecological solid waste management within the barangay. It prohibits the use of single-use plastics in commercial establishments and establishes a 'No Segregation, No Collection' policy.",
    bullets: [
      "Mandatory segregation into biodegradable and non-biodegradable.",
      "Fine of ₱500 for first offense.",
      "Community service for repeated violations.",
    ],
    fileSize: "1.2 MB",
    iconColor: "text-success",
    iconBg: "bg-success/10",
  },
  {
    id: "2022-14",
    number: "Ordinance No. 2022-14",
    title: "Curfew for Minors",
    category: "Peace & Order",
    effective: "Oct 10, 2022",
    summary:
      "Establishes a curfew for minors under 18 years of age from 10:00 PM to 5:00 AM, unless accompanied by a parent or guardian.",
    bullets: [
      "Curfew hours: 10:00 PM – 5:00 AM.",
      "Minors must be accompanied by parent or guardian after curfew.",
      "Violators will be taken to Barangay Hall for proper action.",
    ],
    fileSize: "0.8 MB",
    iconColor: "text-error",
    iconBg: "bg-error/10",
  },
  {
    id: "2023-05",
    number: "Ordinance No. 2023-05",
    title: "Sari-Sari Store Permits",
    category: "Business & Permits",
    effective: "May 20, 2023",
    summary:
      "All sari-sari store owners must register their business with the barangay and obtain the required permit to operate legally.",
    bullets: [
      "Annual renewal of business permit required.",
      "Sanitary inspection every 6 months.",
      "Operating without permit carries a ₱1,000 fine.",
    ],
    fileSize: "0.5 MB",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    id: "2021-08",
    number: "Ordinance No. 2021-08",
    title: "Responsible Pet Ownership",
    category: "Health & Safety",
    effective: "June 05, 2021",
    summary:
      "Promotes responsible pet ownership by requiring registration of all dogs and cats within the barangay.",
    bullets: [
      "Annual anti-rabies vaccination required.",
      "Pets must be leashed in public areas.",
      "Unregistered pets may be impounded.",
    ],
    fileSize: "0.6 MB",
    iconColor: "text-warning",
    iconBg: "bg-warning/10",
  },
  {
    id: "2023-10",
    number: "Ordinance No. 2023-10",
    title: "Noise Pollution Control",
    category: "Peace & Order",
    effective: "Sept 01, 2023",
    summary:
      "Regulates excessive noise in residential and commercial areas to promote peace and well-being in the community.",
    bullets: [
      "Noise levels must not exceed 65dB during daytime.",
      "No loud music or machinery after 10:00 PM.",
      "Penalties range from ₱500 to ₱5,000.",
    ],
    fileSize: "0.7 MB",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
  },
];

// ── Emergency ─────────────────────────────────────────
export const emergencyHotlines = [
  { name: "Police", subtitle: "Crime & Protection", number: "117", colorClass: "bg-error text-error-content" },
  { name: "Fire Dept", subtitle: "Fire & Rescue", number: "160", colorClass: "bg-warning text-warning-content" },
  { name: "Ambulance", subtitle: "Medical Emergencies", number: "911", colorClass: "bg-info text-info-content" },
];

export const nonEmergencyContacts = [
  { name: "Poison Control", number: "1-800-222-1222" },
  { name: "Gas Leak Hotline", number: "800-555-0199" },
  { name: "NDRRMC Hotline", number: "8911" },
  { name: "Barangay Hall", number: "555-0102" },
];

export const emergencyFacilities = [
  { name: "General Hospital", distance: "0.4mi", type: "hospital" },
  { name: "Fire Station #12", distance: "1.2mi", type: "fire" },
  { name: "Police Station 4", distance: "0.8mi", type: "police" },
];

export const emergencyProcedures = [
  {
    id: "fire",
    title: "Fire Emergency",
    steps: [
      "Sound the nearest fire alarm.",
      "Evacuate via stairs, NOT elevators.",
      "Call 160 from a safe location.",
      "Assemble at the designated safe zone.",
    ],
  },
  {
    id: "medical",
    title: "Medical Emergency",
    steps: [
      "Call 911 immediately.",
      "Keep the patient calm and still.",
      "Do not move the patient unless necessary.",
      "Provide first aid if trained to do so.",
    ],
  },
  {
    id: "power",
    title: "Power Outage",
    steps: [
      "Check your circuit breaker first.",
      "Report to Meralco hotline: 16211.",
      "Unplug major appliances.",
      "Use flashlights instead of candles.",
    ],
  },
  {
    id: "threat",
    title: "Active Threat",
    steps: [
      "Run if there is a safe escape path.",
      "Hide if you cannot run — lock doors.",
      "Fight as a last resort.",
      "Call 117 when safe.",
    ],
  },
];
