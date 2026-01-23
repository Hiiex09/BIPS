const Footer = () => {
  return (
    <>
      <footer className="bg-base-100 border-t border-base-300">
        <div className="max-w-8xl mx-auto px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Branding */}
            <aside className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary rounded-lg" />
                <h2 className="font-bold text-lg">Barangay San Jose</h2>
              </div>
              <p className="font-medium text-sm mb-2">
                Digital Governance Portal
              </p>
              <p className="text-sm opacity-70 max-w-sm">
                The digital official portal of our community, committed to
                providing efficient and accessible government services for every
                resident.
              </p>
            </aside>

            {/* Quick Access */}
            <nav>
              <h6 className="footer-title">Quick Access</h6>
              <a className="link link-hover">E-Services</a>
              <a className="link link-hover">Voters Registration</a>
              <a className="link link-hover">Local Ordinances</a>
              <a className="link link-hover">Job Opportunities</a>
            </nav>

            {/* Government Links */}
            <nav>
              <h6 className="footer-title">Government Links</h6>
              <a className="link link-hover">City Hall Website</a>
              <a className="link link-hover">Department of Interior</a>
              <a className="link link-hover">PhilHealth</a>
              <a className="link link-hover">SSS Philippines</a>
            </nav>

            {/* Contact */}
            <nav>
              <h6 className="footer-title">Contact Us</h6>
              <div className="flex flex-col gap-2 text-sm">
                <span>📧 support@brgysanjose.ph</span>
                <span>📞 (02) 8000-0000</span>
                <div className="flex gap-3 mt-3">
                  <button className="btn btn-sm btn-circle btn-ghost">
                    🌐
                  </button>
                  <button className="btn btn-sm btn-circle btn-ghost">
                    📘
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <footer className="bg-base-100 border-t border-base-300">
        <div className="max-w-[1280px] mx-auto px-10 py-4 text-center">
          <p className="text-xs opacity-50">
            © 2024 Barangay Information Portal. Built for the citizens of the
            Republic of the Philippines.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
