import { Megaphone } from "lucide-react";
import { getAnnouncement } from "../hooks/UseAnnouncementRouteHooks";

const AlertBar = () => {
  const { data, isLoading, error } = getAnnouncement();

  if (isLoading) {
    return <p>Loading please wait</p>;
  }

  if (error) {
    return <p>Error no data</p>;
  }

  console.log(data);

  return (
    <div className="w-screen">
      <div className="alert bg-blue-300 shadow flex justify-start">
        <Megaphone size={20} />
        {data.map((d) => (
          <div key={d._id}>
            <h2>{d.title}</h2>
          </div>
        ))}
        <button className="btn btn-sm btn-primary">Details</button>
      </div>
    </div>
  );
};

export default AlertBar;
