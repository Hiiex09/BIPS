const StatsCard = ({ title, value, subtitle, icon: Icon, iconColor, iconBg, trend }) => {
  return (
    <div className="stats-card">
      <div className="card-body">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h2 className="text-sm font-medium text-muted mb-2">{title}</h2>
            <p className="text-3xl font-bold text-base-content">{value}</p>
            {subtitle && (
              <p className={`text-sm mt-2 ${trend ? 'text-success' : 'text-muted'}`}>
                {subtitle}
              </p>
            )}
          </div>
          {Icon && (
            <div className={`icon-badge ${iconBg || 'bg-primary/10'}`}>
              <Icon size={24} className={iconColor || 'text-primary'} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
