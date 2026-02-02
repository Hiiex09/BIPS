import { Megaphone } from "lucide-react";

const AlertBar = () => {
  return (
    <div className="w-screen">
      <div className="alert bg-blue-300 shadow flex justify-start">
        <Megaphone size={20} />
        <span>Vaccination Drive this Saturday – 8:00 AM</span>
        <span>Vaccination Drive this Saturday – 8:00 AM</span>
        <span>Vaccination Drive this Saturday – 8:00 AM</span>
        <span>Vaccination Drive this Saturday – 8:00 AM</span>
        <span>Vaccination Drive this Saturday – 8:00 AM</span>
        <span>Vaccination Drive this Saturday – 8:00 AM</span>
        <button className="btn btn-sm btn-primary">Details</button>
      </div>
    </div>
  );
};

export default AlertBar;
