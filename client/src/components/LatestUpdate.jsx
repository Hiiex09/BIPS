import { getAnnouncement } from "../hooks/UseAnnouncementRouteHooks";

export const LatestUpdate = () => {
  const { data = [], isLoading, error } = getAnnouncement();

  return (
    <div className="lg:col-span-8 mx-2 text-2xl font-semibold py-4">
      <h3 className="font-bold mb-4">Latest Updates</h3>
      <div className="bg-base-200 rounded-2xl p-6">
        <div className="space-y-4 text-sm">
          {data.map((d) => (
            <div className="bg-base-300 rounded-2xl" key={d._id}>
              <div className="p-3 rounded-lg">
                <span
                  className={`badge badge-sm ${
                    d.priority === "Normal"
                      ? "badge badge-primary"
                      : d.priority === "Important"
                        ? "badge badge-secondary"
                        : "badge badge-error"
                  } text-xs float-end`}
                >
                  {d.priority}
                </span>
                <h2 className="text-lg">{d.title}</h2>
                <p className="">{d.content}</p>
                <p className="text-xs"> {d.author.fullname}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
