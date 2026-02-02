export const DigitalServices = () => {
  return (
    <div className="lg:col-span-8">
      <h2 className="mx-2 text-2xl font-semibold py-4">Digital Services</h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          "Barangay Clearance",
          "Business Permit",
          "Certificate of Indigency",
          "Report Incident",
        ].map((service) => (
          <div
            key={service}
            className="bg-base-200 rounded-2xl p-5 hover:shadow transition"
          >
            <h3 className="font-semibold">{service}</h3>
            <p className="text-sm opacity-70 mt-2">Fast and easy processing.</p>
          </div>
        ))}
      </div>
    </div>
  );
};
