export function Services() {
  const services = [
    { title: "Barangay Clearance", desc: "Employment & local requirements" },
    { title: "Business Permit", desc: "Apply or renew permits" },
    { title: "Certificate of Indigency", desc: "Medical & financial aid" },
    { title: "Report Incident", desc: "Send reports instantly" },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Digital Services</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.title} className="card bg-base-100 shadow border">
            <div className="card-body">
              <h3 className="card-title">{s.title}</h3>
              <p className="text-sm opacity-70">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
