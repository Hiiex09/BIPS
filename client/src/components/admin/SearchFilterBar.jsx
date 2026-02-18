import { Search } from "lucide-react";

const SearchFilterBar = ({ 
  searchPlaceholder = "Search...", 
  onSearchChange,
  filters = []
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label className="input flex items-center gap-2">
          <Search size={18} className="opacity-50" />
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="grow"
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </label>
      </div>
      
      {filters.length > 0 && (
        <div className="flex gap-3 flex-wrap md:flex-nowrap">
          {filters.map((filter, index) => (
            <select
              key={index}
              className="select select-bordered w-full md:w-48"
              onChange={(e) => filter.onChange?.(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                {filter.placeholder}
              </option>
              {filter.options.map((option, optIndex) => (
                <option key={optIndex} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
