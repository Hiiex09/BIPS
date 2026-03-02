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
