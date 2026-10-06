/**
 * Reusable Skeleton UI Components using DaisyUI and Tailwind CSS.
 * Provides granular skeleton building blocks as well as composite page-level skeletons.
 */

// Basic single-element skeleton
export const Skeleton = ({ className = "" }) => (
  <div className={`skeleton ${className}`} />
);

// Stat cards skeleton row/grid (e.g., population, active programs, requests counters)
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

// Card grid skeleton (e.g., news articles, ordinances, emergency hotlines)
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

// Table skeleton (e.g., document requests list, doctor schedules, concerns list)
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

// Form / Input Skeleton (e.g., document request or incident submission modal/form)
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

// Composite Full-Page Skeleton specifically tailored for Resident UI pages
export const ResidentPageSkeleton = ({ variant = "default" }) => {
  return (
    <div className="space-y-6 max-w-6xl animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-base-300/40">
        <div className="space-y-2">
          <div className="skeleton h-7 w-56 rounded-md"></div>
          <div className="skeleton h-4 w-80 rounded"></div>
        </div>
        <div className="skeleton h-9 w-36 rounded-lg shrink-0"></div>
      </div>

      {/* Stats Cards Row */}
      <StatCardSkeleton count={4} />

      {/* Main Content Area based on page variant */}
      {variant === "table" ? (
        <TableSkeleton rows={6} columns={5} />
      ) : variant === "cards" ? (
        <CardGridSkeleton count={6} />
      ) : (
        /* Default hybrid layout: Featured Banner + 2 Column Cards Grid */
        <div className="space-y-6">
          <div className="card bg-base-100 border border-base-300 p-6 flex flex-col md:flex-row gap-6">
            <div className="skeleton h-44 md:w-1/3 rounded-xl"></div>
            <div className="flex-1 space-y-3 justify-center flex flex-col">
              <div className="skeleton h-4 w-28 rounded-full"></div>
              <div className="skeleton h-6 w-3/4 rounded"></div>
              <div className="skeleton h-4 w-full rounded"></div>
              <div className="skeleton h-4 w-5/6 rounded"></div>
              <div className="skeleton h-9 w-32 rounded-lg mt-2"></div>
            </div>
          </div>
          <CardGridSkeleton count={3} columns="grid grid-cols-1 md:grid-cols-3 gap-4" />
        </div>
      )}
    </div>
  );
};

export default ResidentPageSkeleton;
