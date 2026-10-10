import { Search } from "lucide-react";

const SearchFilterBar = ({ 
  searchPlaceholder = "Search records...", 
  onSearchChange,
  filters = []
}) => {
  return (
    <div className="bg-base-100 border border-base-300 rounded-xs p-3 mb-5 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
      {/* Search Input with 1px border */}
      <div className="flex-1 relative">
        <input
          type="search"
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="input input-sm input-bordered w-full rounded-xs pl-8 text-xs focus:outline-primary bg-base-100"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-base-content/40" />
      </div>
      
      {/* Filters with Swiss Selects */}
      {filters.length > 0 && (
        <div className="flex gap-2 flex-wrap items-center">
          {filters.map((filter) => {
            const filterKey = filter.name || filter.placeholder || "filter";
            return (
              <select
                key={filterKey}
                aria-label={filter.placeholder || filterKey}
                className="select select-sm select-bordered rounded-xs text-xs font-semibold w-full sm:w-auto focus:outline-primary bg-base-100"
                onChange={(e) => filter.onChange?.(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  {filter.placeholder}
                </option>
                {filter.options.map((option) => (
                  <option key={option.value ?? option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
