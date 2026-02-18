import {
  FileCheck,
  Store,
  Heart,
  ShieldAlert,
  FileText,
  BadgeCheck,
  Building,
  ClipboardList,
  Clock,
  CheckCircle2
} from "lucide-react";
import ServiceCard from "../components/public/ServiceCard";

const Services = () => {
  const primaryServices = [
    {
      icon: FileCheck,
      title: "Barangay Clearance",
      description: "Required for employment, travel, and various legal transactions. Get yours in 2-3 business days.",
      color: "primary"
    },
    {
      icon: Building,
      title: "Business Permit",
      description: "Start or renew your business with our streamlined permit application process.",
      color: "secondary"
    },
    {
      icon: Heart,
      title: "Certificate of Indigency",
      description: "For medical, educational, and financial assistance. Supporting our community members in need.",
      color: "accent"
    },
    {
      icon: ShieldAlert,
      title: "Incident Report",
      description: "Report concerns and incidents 24/7. Help us maintain a safe and secure community.",
      color: "info"
    }
  ];

  const additionalServices = [
    {
      icon: FileText,
      title: "Certificate of Residency",
      description: "Proof of residency for various requirements",
      color: "primary"
    },
    {
      icon: BadgeCheck,
      title: "Good Moral Certificate",
      description: "Character reference for employment and education",
      color: "secondary"
    },
    {
      icon: ClipboardList,
      title: "Barangay ID Application",
      description: "Official identification for residents",
      color: "accent"
    },
    {
      icon: Building,
      title: "Building Permit Endorsement",
      description: "Construction and renovation permits",
      color: "info"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Submit Requirements",
      description: "Fill out the online form with required documents"
    },
    {
      step: "2",
      title: "Verification",
      description: "Our staff verifies your information and documents"
    },
    {
      step: "3",
      title: "Processing",
      description: "Your request is processed within 2-3 business days"
    },
    {
      step: "4",
      title: "Ready for Pickup",
      description: "Get notified when your document is ready"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge badge-primary badge-lg mb-6">Digital Services</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              All Services in <span className="text-primary">One Place</span>
            </h1>
            <p className="text-xl opacity-80 mb-8">
              Access barangay services anytime, anywhere. Fast, secure, and convenient online processing.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Services */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Most Requested Services</h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Quick access to our most popular services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {primaryServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-base-200/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg opacity-70">Simple 4-step process to get your documents</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="card bg-base-100 shadow-lg h-full">
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 bg-primary text-primary-content rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="opacity-70">{item.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 text-primary">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Other Services</h2>
            <p className="text-lg opacity-70">More ways we can help you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">General Requirements</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">For All Services</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-success flex-shrink-0 mt-1" />
                      <span>Valid Government ID</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-success flex-shrink-0 mt-1" />
                      <span>Proof of Residency</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 size={20} className="text-success flex-shrink-0 mt-1" />
                      <span>Completed Application Form</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Processing Time</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock size={24} className="text-primary" />
                      <div>
                        <div className="font-semibold">Regular Processing</div>
                        <div className="text-sm opacity-70">2-3 business days</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={24} className="text-secondary" />
                      <div>
                        <div className="font-semibold">Rush Processing</div>
                        <div className="text-sm opacity-70">1 business day (additional fee)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need Help with Your Request?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Our staff is ready to assist you with your document requests
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn btn-base-100 btn-lg">
              Contact Us
            </button>
            <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              View FAQs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
