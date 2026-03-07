import { useState } from "react";
import { Search, Download, ChevronDown, ChevronUp, BookOpen, Filter, HelpCircle } from "lucide-react";
import { ordinanceCategories, ordinancesList } from "../../data/residentMockData";

/* ── Category icon colors per category ─────────────── */
const categoryIcon = {
  Environment: "🌿",
  "Peace & Order": "🛡️",
  "Business & Permits": "🏪",
  "Health & Safety": "🐾",
};

/* ── Ordinance Row (accordion) ──────────────────────── */
const OrdinanceRow = ({ ord }) => {
  const [open, setOpen] = useState(ord.id === "2023-01");

  return (
    <div className="border border-base-300 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-base-100 hover:bg-base-200 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${ord.iconBg} shrink-0`}>
            {categoryIcon[ord.category] || "📄"}
          </div>
          <div>
            <p className="text-sm font-bold text-base-content leading-snug">{ord.number}: {ord.title}</p>
            <p className="text-xs text-muted mt-0.5">
              Category: {ord.category} · Effective: {ord.effective}
            </p>
          </div>
        </div>
        <div className="shrink-0 ml-3">
          {open ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
        </div>
      </button>

      {/* Expanded Content */}
      {open && (
        <div className="px-5 py-4 bg-base-50 border-t border-base-300 space-y-3">
          <p className="text-sm text-base-content leading-relaxed">{ord.summary}</p>
          <ul className="space-y-1">
            {ord.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-muted">
                <span className="text-primary mt-0.5">•</span>
                {b}
              </li>
            ))}
          </ul>
          <div className="flex justify-end pt-1">
            <button className="btn btn-outline btn-primary btn-sm gap-2">
              <Download size={13} /> Download PDF ({ord.fileSize})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Main Page ──────────────────────────────────────── */
const ResidentOrdinances = () => {
  const [activeCategory, setActiveCategory] = useState("All Ordinances");
  const [search, setSearch] = useState("");

  const filtered = ordinancesList.filter((ord) => {
    const matchCat = activeCategory === "All Ordinances" || ord.category === activeCategory;
    const matchSearch =
      search === "" ||
      ord.title.toLowerCase().includes(search.toLowerCase()) ||
      ord.number.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen size={20} className="text-primary" />
          <h2 className="text-xl font-bold text-base-content">Legal Resource Library</h2>
        </div>
        <p className="text-sm text-muted max-w-xl mx-auto">
          Access and download official local ordinances, resolutions, and community guidelines for a safer and more orderly barangay.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-4 gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="input input-bordered flex items-center gap-2 flex-1">
              <Search size={15} className="text-muted shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ordinance number or keyword (e.g. curfew, pets, waste)..."
                className="grow bg-transparent outline-none text-sm"
              />
            </label>
            <button className="btn btn-outline btn-sm gap-2 shrink-0">
              <Filter size={14} /> Filter Results
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {ordinanceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm rounded-full ${
                  activeCategory === cat
                    ? "btn-primary"
                    : "btn-ghost border border-base-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ordinance List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((ord) => <OrdinanceRow key={ord.id} ord={ord} />)
        ) : (
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body items-center text-center py-12">
              <BookOpen size={40} className="text-base-300 mb-2" />
              <p className="text-sm text-muted">No ordinances found matching your search.</p>
            </div>
          </div>
        )}
      </div>

      {/* Can't find CTA */}
      <div className="card bg-primary text-primary-content shadow-sm">
        <div className="card-body p-5 flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <HelpCircle size={20} className="shrink-0" />
            <div>
              <p className="font-bold text-sm">Can't find a specific document?</p>
              <p className="text-xs opacity-80">Request a physical copy or search archives at the Barangay Hall.</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="btn btn-sm bg-white/20 hover:bg-white/30 text-primary-content border-0">Contact Support</button>
            <button className="btn btn-sm bg-white text-primary hover:bg-white/90 border-0">View Archives</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentOrdinances;
