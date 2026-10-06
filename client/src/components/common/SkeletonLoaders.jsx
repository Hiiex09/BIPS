/**
 * Reusable Skeleton UI Components using DaisyUI and Tailwind CSS.
 * Provides granular skeleton building blocks as well as dedicated, 
 * page-specific Skeleton loaders matching the exact visual structure of each Resident UI page.
 */

// Basic single-element skeleton
export const Skeleton = ({ className = "" }) => (
  <div className={`skeleton ${className}`} />
);

// Stat cards skeleton row/grid (generic)
export const StatCardSkeleton = ({ count = 4, className = "grid grid-cols-2 lg:grid-cols-4 gap-4" }) => (
  <div className={className}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="card bg-base-100 border border-base-300 shadow-sm p-4 gap-2">
        <div className="skeleton h-4 w-24 rounded"></div>
        <div className="flex items-center justify-between pt-1">
          <div className="skeleton h-8 w-20 rounded-md"></div>
          <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
        </div>
        <div className="skeleton h-3 w-16 rounded mt-1"></div>
      </div>
    ))}
  </div>
);

// Card grid skeleton (generic)
export const CardGridSkeleton = ({ count = 6, columns = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }) => (
  <div className={columns}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
        <div className="skeleton h-40 w-full rounded-none"></div>
        <div className="card-body p-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="skeleton h-4 w-16 rounded-full"></div>
            <div className="skeleton h-3 w-20 rounded"></div>
          </div>
          <div className="skeleton h-5 w-4/5 rounded"></div>
          <div className="skeleton h-3 w-full rounded"></div>
          <div className="skeleton h-3 w-3/4 rounded"></div>
          <div className="flex justify-end pt-2">
            <div className="skeleton h-8 w-24 rounded-lg"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Table skeleton (generic)
export const TableSkeleton = ({ rows = 5, columns = 5 }) => (
  <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
    <div className="p-4 border-b border-base-200 flex justify-between items-center">
      <div className="skeleton h-6 w-36 rounded"></div>
      <div className="skeleton h-8 w-24 rounded-lg"></div>
    </div>
    <div className="overflow-x-auto p-4">
      <div className="space-y-3">
        {/* Table header */}
        <div className="flex gap-4 pb-2 border-b border-base-200">
          {Array.from({ length: columns }).map((_, idx) => (
            <div key={idx} className="skeleton h-4 flex-1 rounded"></div>
          ))}
        </div>
        {/* Table rows */}
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="flex gap-4 py-2.5 items-center border-b border-base-100 last:border-0">
            {Array.from({ length: columns }).map((_, cIdx) => (
              <div
                key={cIdx}
                className={`skeleton h-4 flex-1 rounded ${
                  cIdx === 0 ? "w-1/4" : cIdx === columns - 1 ? "w-16" : ""
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Form / Input Skeleton (generic)
export const FormSkeleton = ({ fields = 4 }) => (
  <div className="card bg-base-100 border border-base-300 shadow-sm p-6 space-y-4 max-w-xl">
    <div className="skeleton h-6 w-44 rounded mb-2"></div>
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-1.5">
        <div className="skeleton h-4 w-28 rounded"></div>
        <div className="skeleton h-10 w-full rounded-lg"></div>
      </div>
    ))}
    <div className="flex justify-end gap-3 pt-3">
      <div className="skeleton h-10 w-24 rounded-lg"></div>
      <div className="skeleton h-10 w-32 rounded-lg"></div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
 * PAGE-SPECIFIC RESIDENT SKELETON LOADERS (Matching exact UI structures)
 * ───────────────────────────────────────────────────────────────────────────── */

/**
 * 1. ResidentDashboardSkeleton
 * Structure:
 * - Hero Announcement Banner (min-h-44 rounded-2xl)
 * - 4-Column Stat Cards Row
 * - Community Updates (3 Cards: News Card, Health Schedule, Ordinances)
 * - Map Integration Card
 */
export const ResidentDashboardSkeleton = () => (
  <div className="space-y-6 max-w-6xl">
    {/* Hero Banner */}
    <div className="card bg-base-100 border border-base-300 rounded-2xl p-6 md:p-8 min-h-44 flex flex-col justify-center space-y-3">
      <div className="skeleton h-5 w-28 rounded-full"></div>
      <div className="skeleton h-7 md:h-8 w-3/4 max-w-lg rounded-md"></div>
      <div className="skeleton h-4 w-full max-w-md rounded"></div>
      <div className="skeleton h-4 w-4/5 max-w-sm rounded"></div>
      <div className="skeleton h-9 w-36 rounded-lg mt-2"></div>
    </div>

    {/* 4 Stat Cards Row */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="card bg-base-100 shadow-sm border border-base-300 p-4 space-y-2">
          <div className="skeleton h-8 w-8 rounded-md"></div>
          <div className="skeleton h-3 w-20 rounded"></div>
          <div className="skeleton h-6 w-16 rounded"></div>
          <div className="skeleton h-3 w-28 rounded"></div>
        </div>
      ))}
    </div>

    {/* Community Updates Row (3 columns) */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton h-5 w-40 rounded"></div>
        <div className="skeleton h-4 w-16 rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: News Preview */}
        <div className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden">
          <div className="skeleton h-36 w-full rounded-none"></div>
          <div className="card-body p-4 space-y-2">
            <div className="skeleton h-3 w-24 rounded"></div>
            <div className="skeleton h-5 w-4/5 rounded"></div>
            <div className="skeleton h-3 w-full rounded"></div>
            <div className="skeleton h-3 w-3/4 rounded"></div>
            <div className="skeleton h-4 w-20 rounded mt-2"></div>
          </div>
        </div>

        {/* Card 2: Health Schedule Preview */}
        <div className="card bg-base-100 shadow-sm border border-base-300 p-4 space-y-3">
          <div className="skeleton h-5 w-44 rounded"></div>
          <div className="skeleton h-3 w-32 rounded"></div>
          <div className="space-y-2 pt-1">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex justify-between items-center py-1.5 border-b border-base-200 last:border-0">
                <div className="space-y-1">
                  <div className="skeleton h-3 w-28 rounded"></div>
                  <div className="skeleton h-2.5 w-20 rounded"></div>
                </div>
                <div className="skeleton h-5 w-14 rounded-full"></div>
              </div>
            ))}
          </div>
          <div className="skeleton h-7 w-full rounded-lg mt-1"></div>
        </div>

        {/* Card 3: Ordinances Preview */}
        <div className="card bg-base-100 shadow-sm border border-base-300 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="skeleton h-5 w-5 rounded"></div>
            <div className="skeleton h-5 w-36 rounded"></div>
          </div>
          <div className="skeleton h-3 w-36 rounded"></div>
          <div className="space-y-3 pt-1">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="space-y-1.5 pb-2 border-b border-base-200 last:border-0">
                <div className="skeleton h-4 w-16 rounded-full"></div>
                <div className="skeleton h-3.5 w-full rounded"></div>
              </div>
            ))}
          </div>
          <div className="skeleton h-4 w-36 rounded mt-1"></div>
        </div>
      </div>
    </div>

    {/* Important Locations Map Skeleton */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton h-5 w-40 rounded"></div>
        <div className="skeleton h-4 w-20 rounded"></div>
      </div>
      <div className="card bg-base-100 shadow-sm border border-base-300 p-4">
        <div className="aspect-[16/6] skeleton w-full rounded-xl"></div>
      </div>
    </div>
  </div>
);

/**
 * 2. ResidentDocumentsSkeleton
 * Structure:
 * - Header (Title & subtitle)
 * - Available Documents (3 Cards Grid with icon circle, price/time pills, request button)
 * - My Active Requests List (cards with header badge, step progress tracker, details box)
 */
export const ResidentDocumentsSkeleton = () => (
  <div className="space-y-8 max-w-5xl">
    {/* Page Header */}
    <div className="space-y-2">
      <div className="skeleton h-7 w-60 rounded-md"></div>
      <div className="skeleton h-4 w-96 max-w-full rounded"></div>
    </div>

    {/* Available Documents Section */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="skeleton h-5 w-5 rounded"></div>
        <div className="skeleton h-5 w-44 rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card bg-base-100 border border-base-300 shadow-sm p-5 flex flex-col items-center text-center space-y-3">
            <div className="skeleton w-14 h-14 rounded-2xl"></div>
            <div className="skeleton h-5 w-36 rounded"></div>
            <div className="skeleton h-3 w-44 rounded"></div>
            <div className="skeleton h-3 w-32 rounded"></div>
            <div className="flex items-center justify-center gap-3 w-full py-1">
              <div className="skeleton h-4 w-12 rounded"></div>
              <div className="skeleton h-4 w-16 rounded"></div>
            </div>
            <div className="skeleton h-8 w-full rounded-lg mt-1"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Active Requests Section */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-5 rounded"></div>
          <div className="skeleton h-5 w-40 rounded"></div>
        </div>
        <div className="skeleton h-5 w-24 rounded-full"></div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <div className="skeleton h-5 w-44 rounded"></div>
                <div className="skeleton h-3 w-64 rounded"></div>
              </div>
              <div className="skeleton h-5 w-20 rounded-full"></div>
            </div>
            {/* Step progress tracker bar */}
            <div className="flex items-center justify-between px-6 py-2">
              <div className="flex flex-col items-center gap-1">
                <div className="skeleton w-7 h-7 rounded-full"></div>
                <div className="skeleton h-3 w-16 rounded"></div>
              </div>
              <div className="skeleton h-1 flex-1 mx-3 rounded"></div>
              <div className="flex flex-col items-center gap-1">
                <div className="skeleton w-7 h-7 rounded-full"></div>
                <div className="skeleton h-3 w-16 rounded"></div>
              </div>
              <div className="skeleton h-1 flex-1 mx-3 rounded"></div>
              <div className="flex flex-col items-center gap-1">
                <div className="skeleton w-7 h-7 rounded-full"></div>
                <div className="skeleton h-3 w-16 rounded"></div>
              </div>
            </div>
            {/* Info and remarks box */}
            <div className="card bg-base-200 p-3 space-y-1.5">
              <div className="skeleton h-3 w-48 rounded"></div>
              <div className="skeleton h-3 w-36 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * 3. ResidentConcernsSkeleton
 * Structure:
 * - Header (Title & subtitle)
 * - Submission Form (Category, Subject, Textarea, Upload dropzone, Location input, Submit button)
 * - Submission History Accordion List
 */
export const ResidentConcernsSkeleton = () => (
  <div className="space-y-8 max-w-3xl">
    {/* Page Header */}
    <div className="space-y-2">
      <div className="skeleton h-7 w-64 rounded-md"></div>
      <div className="skeleton h-4 w-80 max-w-full rounded"></div>
    </div>

    {/* Form Card */}
    <div className="card bg-base-100 border border-base-300 shadow-sm p-6 space-y-5">
      <div className="flex items-center gap-2">
        <div className="skeleton h-5 w-5 rounded"></div>
        <div className="skeleton h-5 w-36 rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="skeleton h-3.5 w-20 rounded"></div>
          <div className="skeleton h-10 w-full rounded-lg"></div>
        </div>
        <div className="space-y-1.5">
          <div className="skeleton h-3.5 w-16 rounded"></div>
          <div className="skeleton h-10 w-full rounded-lg"></div>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="skeleton h-3.5 w-32 rounded"></div>
        <div className="skeleton h-28 w-full rounded-xl"></div>
      </div>
      {/* Upload Dropzone */}
      <div className="space-y-1.5">
        <div className="skeleton h-3.5 w-28 rounded"></div>
        <div className="skeleton h-28 w-full rounded-xl"></div>
      </div>
      {/* Location */}
      <div className="space-y-1.5">
        <div className="skeleton h-3.5 w-32 rounded"></div>
        <div className="skeleton h-10 w-full rounded-lg"></div>
      </div>
      <div className="flex justify-end pt-2">
        <div className="skeleton h-10 w-36 rounded-lg"></div>
      </div>
    </div>

    {/* Submission History List */}
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-5 rounded"></div>
          <div className="skeleton h-5 w-40 rounded"></div>
        </div>
        <div className="skeleton h-5 w-24 rounded-full"></div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card bg-base-100 border border-base-300 p-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="skeleton w-2.5 h-2.5 rounded-full shrink-0"></div>
            <div className="space-y-1">
              <div className="skeleton h-4 w-48 rounded"></div>
              <div className="skeleton h-3 w-32 rounded"></div>
            </div>
          </div>
          <div className="skeleton h-6 w-24 rounded-full"></div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * 4. ResidentNewsSkeleton
 * Structure:
 * - Left Sidebar (Submit story button, Filter menu, Upcoming events card)
 * - Right Content (Header, Large Featured Hero Card, Sort selector, 3-Card News Grid)
 */
export const ResidentNewsSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-6 max-w-6xl">
    {/* Left Sidebar */}
    <aside className="w-full lg:w-56 shrink-0 space-y-5">
      <div className="skeleton h-9 w-full rounded-lg"></div>
      {/* Filters card */}
      <div className="card bg-base-100 border border-base-300 p-3 space-y-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="skeleton h-7 w-full rounded-lg"></div>
        ))}
      </div>
      {/* Upcoming events card */}
      <div className="card bg-base-100 border border-base-300 p-4 space-y-4">
        <div className="skeleton h-5 w-32 rounded"></div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="skeleton w-10 h-10 rounded-lg shrink-0"></div>
              <div className="space-y-1 flex-1">
                <div className="skeleton h-3.5 w-full rounded"></div>
                <div className="skeleton h-2.5 w-20 rounded"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="skeleton h-4 w-28 rounded"></div>
      </div>
    </aside>

    {/* Main Content */}
    <div className="flex-1 space-y-6 min-w-0">
      <div className="space-y-2">
        <div className="skeleton h-7 w-48 rounded-md"></div>
        <div className="skeleton h-4 w-80 max-w-full rounded"></div>
      </div>

      {/* Featured Event Card */}
      <div className="card bg-base-100 border border-base-300 overflow-hidden flex flex-col md:flex-row">
        <div className="skeleton md:w-2/5 h-52 md:h-auto rounded-none shrink-0"></div>
        <div className="card-body p-5 space-y-3 flex-1 justify-center">
          <div className="skeleton h-3 w-28 rounded-full"></div>
          <div className="skeleton h-6 w-4/5 rounded-md"></div>
          <div className="skeleton h-3.5 w-full rounded"></div>
          <div className="skeleton h-3.5 w-5/6 rounded"></div>
          <div className="skeleton h-8 w-28 rounded-lg mt-2"></div>
        </div>
      </div>

      {/* Recent Updates Header & Sort */}
      <div className="flex items-center justify-between">
        <div className="skeleton h-5 w-36 rounded"></div>
        <div className="skeleton h-8 w-32 rounded-lg"></div>
      </div>

      {/* 3-Column News Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
            <div className="skeleton h-40 w-full rounded-none"></div>
            <div className="card-body p-4 space-y-2">
              <div className="skeleton h-4 w-20 rounded-full"></div>
              <div className="skeleton h-4 w-full rounded"></div>
              <div className="skeleton h-3 w-full rounded"></div>
              <div className="skeleton h-3 w-2/3 rounded"></div>
              <div className="flex items-center justify-between pt-2">
                <div className="skeleton h-3 w-16 rounded"></div>
                <div className="skeleton h-3 w-20 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * 5. ResidentHealthSkeleton
 * Structure:
 * - Header with Book Appointment button
 * - Alert Notice bar
 * - 3 Stat Cards Row
 * - Specialized Services (3 Cards Grid)
 * - Doctor Schedule Table Card
 * - CTA Card
 */
export const ResidentHealthSkeleton = () => (
  <div className="space-y-6 max-w-5xl">
    {/* Page Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="space-y-2">
        <div className="skeleton h-7 w-64 rounded-md"></div>
        <div className="skeleton h-4 w-80 max-w-full rounded"></div>
      </div>
      <div className="skeleton h-9 w-36 rounded-lg shrink-0"></div>
    </div>

    {/* Alert Notice */}
    <div className="card bg-base-100 border border-base-300 p-4 flex flex-row items-center gap-3">
      <div className="skeleton w-5 h-5 rounded-full shrink-0"></div>
      <div className="skeleton h-4 flex-1 rounded"></div>
      <div className="skeleton h-7 w-24 rounded-lg shrink-0"></div>
    </div>

    {/* 3 Stat Cards */}
    <div className="flex flex-col sm:flex-row gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card bg-base-100 border border-base-300 shadow-sm p-4 flex-1 space-y-2">
          <div className="skeleton h-3 w-28 rounded"></div>
          <div className="flex items-center gap-2">
            <div className="skeleton w-6 h-6 rounded-md"></div>
            <div className="skeleton h-7 w-16 rounded"></div>
          </div>
          <div className="skeleton h-3 w-20 rounded"></div>
        </div>
      ))}
    </div>

    {/* Specialized Services (3 cards) */}
    <div>
      <div className="skeleton h-5 w-48 rounded mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
            <div className="skeleton h-40 w-full rounded-none"></div>
            <div className="card-body p-4 space-y-2">
              <div className="skeleton h-4 w-3/4 rounded"></div>
              <div className="skeleton h-3 w-full rounded"></div>
              <div className="skeleton h-3 w-4/5 rounded"></div>
              <div className="skeleton h-4 w-24 rounded mt-1"></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Doctor Schedule Table Card */}
    <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-3">
      <div className="skeleton h-5 w-52 rounded"></div>
      <div className="skeleton h-3 w-64 rounded"></div>
      <div className="space-y-3 pt-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-base-200 last:border-0">
            <div className="flex items-center gap-3">
              <div className="skeleton w-9 h-9 rounded-full shrink-0"></div>
              <div className="space-y-1">
                <div className="skeleton h-3.5 w-32 rounded"></div>
                <div className="skeleton h-2.5 w-20 rounded"></div>
              </div>
            </div>
            <div className="skeleton h-3.5 w-24 rounded hidden sm:block"></div>
            <div className="skeleton h-3.5 w-28 rounded hidden md:block"></div>
            <div className="skeleton h-6 w-20 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Ready to Schedule CTA */}
    <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
      <div className="space-y-3 max-w-xl">
        <div className="skeleton h-5 w-52 rounded"></div>
        <div className="skeleton h-3.5 w-full rounded"></div>
        <div className="skeleton h-9 w-36 rounded-lg mt-1"></div>
      </div>
    </div>
  </div>
);

/**
 * 6. ResidentOrdinancesSkeleton
 * Structure:
 * - Header (Title & subtitle centered)
 * - Search + Category Pills Card
 * - List of Accordion Rows
 */
export const ResidentOrdinancesSkeleton = () => (
  <div className="space-y-6 max-w-4xl">
    {/* Header */}
    <div className="text-center space-y-2 max-w-xl mx-auto flex flex-col items-center">
      <div className="skeleton h-6 w-52 rounded"></div>
      <div className="skeleton h-4 w-full rounded"></div>
      <div className="skeleton h-4 w-4/5 rounded"></div>
    </div>

    {/* Search & Category Tabs */}
    <div className="card bg-base-100 border border-base-300 shadow-sm p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="skeleton h-10 flex-1 rounded-lg"></div>
        <div className="skeleton h-10 w-32 rounded-lg shrink-0"></div>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-8 w-24 rounded-full"></div>
        ))}
      </div>
    </div>

    {/* List of Ordinance Rows */}
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border border-base-300 rounded-xl p-4 bg-base-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="skeleton w-9 h-9 rounded-lg shrink-0"></div>
            <div className="space-y-1">
              <div className="skeleton h-4 w-56 sm:w-80 rounded"></div>
              <div className="skeleton h-3 w-40 rounded"></div>
            </div>
          </div>
          <div className="skeleton w-5 h-5 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * 7. ResidentEmergencySkeleton
 * Structure:
 * - Header (Title & subtitle)
 * - Weather Warning Alert banner
 * - Two-column Grid:
 *    - Left: Call Now Hotlines (Big button cards) + Non-Emergency Contacts list
 *    - Right: Nearest Emergency Facilities (Tags + Map) + Emergency Procedures accordion list
 */
export const ResidentEmergencySkeleton = () => (
  <div className="space-y-5 max-w-5xl">
    {/* Page Header */}
    <div className="space-y-2">
      <div className="skeleton h-7 w-48 rounded-md"></div>
      <div className="skeleton h-4 w-80 max-w-full rounded"></div>
    </div>

    {/* Weather / Warning Alert */}
    <div className="card bg-base-100 border border-base-300 p-4 flex flex-row items-center gap-3">
      <div className="skeleton w-6 h-6 rounded-full shrink-0"></div>
      <div className="space-y-1 flex-1">
        <div className="skeleton h-4 w-64 rounded"></div>
        <div className="skeleton h-3 w-96 max-w-full rounded"></div>
      </div>
      <div className="skeleton h-8 w-20 rounded-lg shrink-0"></div>
    </div>

    {/* Two Column Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      {/* LEFT: Hotlines (2 cols) */}
      <div className="lg:col-span-2 space-y-4">
        <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-4">
          <div className="skeleton h-5 w-24 rounded"></div>
          {/* Big Hotline Buttons */}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-16 w-full rounded-xl"></div>
            ))}
          </div>
          {/* Non-emergency divider */}
          <div className="skeleton h-3 w-40 mx-auto rounded"></div>
          {/* Non-emergency contacts */}
          <div className="space-y-2.5 pt-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <div className="skeleton h-3.5 w-32 rounded"></div>
                <div className="skeleton h-3.5 w-24 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Map & Procedures (3 cols) */}
      <div className="lg:col-span-3 space-y-4">
        {/* Nearest Facilities */}
        <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-3">
          <div className="skeleton h-5 w-52 rounded"></div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-6 w-28 rounded-full"></div>
            ))}
          </div>
          <div className="aspect-[16/7] skeleton w-full rounded-xl mt-1"></div>
        </div>

        {/* Emergency Procedures Accordions */}
        <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-4">
          <div className="skeleton h-5 w-60 rounded"></div>
          <div className="space-y-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border border-base-300 rounded-xl p-3 bg-base-100 flex items-center justify-between">
                <div className="skeleton h-4 w-48 rounded"></div>
                <div className="skeleton w-4 h-4 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Route-Aware Resident Page Skeleton Selector
 * Dynamically renders the exact skeleton matching the current route pathname.
 */
export const ResidentPageSkeleton = ({ pathname = "" }) => {
  const normalizedPath = pathname.toLowerCase();

  if (normalizedPath === "/resident" || normalizedPath === "/resident/") {
    return <ResidentDashboardSkeleton />;
  }
  if (normalizedPath.includes("/documents")) {
    return <ResidentDocumentsSkeleton />;
  }
  if (normalizedPath.includes("/concerns")) {
    return <ResidentConcernsSkeleton />;
  }
  if (normalizedPath.includes("/news")) {
    return <ResidentNewsSkeleton />;
  }
  if (normalizedPath.includes("/health")) {
    return <ResidentHealthSkeleton />;
  }
  if (normalizedPath.includes("/ordinances")) {
    return <ResidentOrdinancesSkeleton />;
  }
  if (normalizedPath.includes("/emergency")) {
    return <ResidentEmergencySkeleton />;
  }

  // Fallback to Dashboard skeleton
  return <ResidentDashboardSkeleton />;
};

export default ResidentPageSkeleton;
