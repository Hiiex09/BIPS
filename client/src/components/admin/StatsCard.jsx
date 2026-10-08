const StatsCard = ({ title, value, subtitle, icon: Icon, trend }) => {
  return (
    <div className="bg-base-100 border border-base-300 rounded-xs p-4 sm:p-5 flex flex-col justify-between transition-colors hover:border-primary/50 shadow-2xs">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-black uppercase tracking-widest text-base-content/60">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-xs bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Icon size={16} />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="text-3xl sm:text-4xl font-black tracking-tight text-base-content font-mono leading-none">
          {value}
        </div>
        {subtitle && (
          <p className="text-[11px] font-semibold mt-2 text-base-content/60 flex items-center gap-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
