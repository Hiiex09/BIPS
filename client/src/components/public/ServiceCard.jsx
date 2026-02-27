import { ArrowRight } from "lucide-react";

const ServiceCard = ({ icon: Icon, title, description, color = "primary", link }) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
    info: "bg-info/10 text-info border-info/20"
  };

  return (
    <div className="service-card group">
      <div className="card-body">
        <div className={`w-16 h-16 rounded-2xl ${colorClasses[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon size={32} />
        </div>
        <h3 className="card-title text-2xl mb-3">{title}</h3>
        <p className="opacity-80 mb-4">{description}</p>
        <button className="btn btn-ghost btn-sm gap-2 group-hover:gap-4 transition-all">
          Learn More
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
