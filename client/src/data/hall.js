// Single source for Barangay Tejero Hall details used across the public site.
// Edit contact details here once instead of in every page.

export const HALL = {
  name: "Barangay Tejero",
  address: "Barangay Hall, Tejero, Cebu City, 6000 Cebu",
  mapQuery: "8W25+PGJ, Cebu City, 6000 Cebu",
  email: "barangay.tejero@gmail.com",
  phone: "(02) 8888-1234",
  hours: [
    { days: "Monday to Friday", short: "Mon–Fri", time: "8:00 AM – 5:00 PM" },
    { days: "Saturday", short: "Sat", time: "8:00 AM – 12:00 NN" },
  ],
};

export const HOTLINES = [
  { number: "911", name: "Emergency" },
  { number: "117", name: "Police" },
  { number: "160", name: "Fire" },
];

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(HALL.mapQuery)}&output=embed`;
export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(HALL.mapQuery)}`;

// Documents residents can request. `online` marks the ones the resident portal can file today.
export const DOCUMENTS = [
  {
    title: "Barangay Clearance",
    use: "For employment, IDs, loans and postal transactions.",
    bring: "Valid government ID, proof of residency",
    online: true,
  },
  {
    title: "Certificate of Indigency",
    use: "For medical, legal, burial or scholarship assistance.",
    bring: "Valid ID, letter stating the purpose",
    online: true,
  },
  {
    title: "Certificate of Residency",
    use: "Proof that you live in Tejero, for schools, banks and agencies.",
    bring: "Valid ID, utility bill or lease in your name",
    online: true,
  },
  {
    title: "Business Clearance",
    use: "Needed before the city issues or renews a business permit.",
    bring: "DTI or SEC registration, lease or proof of ownership",
    online: false,
  },
  {
    title: "Good Moral Certificate",
    use: "Character reference for work and school applications.",
    bring: "Valid ID",
    online: false,
  },
  {
    title: "Barangay ID",
    use: "Official ID for registered residents of Tejero.",
    bring: "Valid ID, 1x1 photo",
    online: false,
  },
  {
    title: "Building Permit Endorsement",
    use: "Endorsement for construction or renovation work.",
    bring: "Building plans, proof of ownership",
    online: false,
  },
];

// The path a request takes inside the hall. A real sequence, so it is numbered where shown.
export const REQUEST_STEPS = [
  { title: "Requested", detail: "You file the request online or at the counter." },
  { title: "Checked", detail: "Staff check your details and requirements." },
  { title: "Approved", detail: "The hall signs and stamps your document." },
  { title: "Ready for pickup", detail: "We notify you. Bring your ID to the hall." },
];
