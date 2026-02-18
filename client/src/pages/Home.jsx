import { 
  FileCheck, 
  Store, 
  Heart, 
  ShieldAlert, 
  Megaphone, 
  Users, 
  MapPin,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCard from "../components/public/ServiceCard";

const Home = () => {
  const services = [
    {
      icon: FileCheck,
      title: "Barangay Clearance",
      description: "Get your barangay clearance for employment, business, and local requirements quickly and easily.",
      color: "primary",
      link: "/services"
    },
    {
      icon: Store,
      title: "Business Permit",
      description: "Apply or renew your business permits online. Streamlined process for all types of businesses.",
      color: "secondary",
      link: "/services"
    },
    {
      icon: Heart,
      title: "Indigency Certificate",
      description: "Apply for financial and medical assistance certificates for those who need support.",
      color: "accent",
      link: "/services"
    },
    {
      icon: ShieldAlert,
      title: "Report Incident",
      description: "Report incidents and concerns instantly. Help us keep our community safe and secure.",
      color: "info",
      link: "/services"
    }
  ];

  const features = [
    "24/7 Online Access",
    "Fast Processing",
    "Track Your Requests",
    "Secure & Private",
    "Mobile Friendly",
    "Multi-language Support"
  ];

  const stats = [
    { value: "1,284", label: "Active Residents" },
    { value: "500+", label: "Monthly Services" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Available" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Asymmetric Offset Split */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="badge badge-primary badge-lg gap-2">
                <Megaphone size={16} />
                Welcome to Our Digital Portal
              </div>
              <h1 className="hero-title">
                Your Barangay,
                <span className="text-primary"> Now Digital</span>
              </h1>
              <p className="hero-subtitle">
                Access services, stay informed, and connect with your community—all from the comfort of your home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/services" className="btn btn-primary btn-lg gap-2">
                  Get Started
                  <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="btn btn-outline btn-lg">
                  Learn More
                </Link>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs lg:text-sm opacity-70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image with Floating Cards */}
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/34692362/pexels-photo-34692362.jpeg"
                  alt="Community gathering"
                  className="rounded-3xl shadow-2xl w-full"
                />
              </div>
              
              {/* Floating Feature Cards */}
              <div className="absolute -top-6 -left-6 bg-base-100 rounded-2xl shadow-lg p-4 max-w-xs z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                    <CheckCircle size={24} className="text-success" />
                  </div>
                  <div>
                    <div className="font-bold">Fast Approval</div>
                    <div className="text-sm opacity-70">2-3 days processing</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-base-100 rounded-2xl shadow-lg p-4 max-w-xs z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Users size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-bold">Trusted by Many</div>
                    <div className="text-sm opacity-70">1,200+ residents served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Feature Grid */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">Digital Services</h2>
            <p className="section-description">
              Everything you need, available at your fingertips. Fast, secure, and convenient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn btn-primary btn-lg">
              View All Services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className="py-20 bg-base-200/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">Why Choose Us</h2>
            <p className="section-description">
              Modern solutions designed for our community's needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="card-body items-center text-center">
                  <CheckCircle size={32} className="text-success mb-2" />
                  <h3 className="font-bold text-lg">{feature}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of residents already using our digital services
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup" className="btn btn-base-100 btn-lg">
              Create Account
            </Link>
            <Link to="/announcements" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              View Announcements
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-heading">Visit Us</h2>
            <p className="section-description">
              Find us at the heart of our community
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={24} className="text-primary" />
                  <div>
                    <h3 className="font-bold text-lg">Barangay Hall</h3>
                    <p className="opacity-70">San Jose, Metro Manila</p>
                  </div>
                </div>
                <div className="aspect-video bg-base-300 rounded-xl flex items-center justify-center">
                  <p className="opacity-50">Map integration placeholder</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Office Hours</h4>
                    <p className="text-sm opacity-70">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-sm opacity-70">Saturday: 8:00 AM - 12:00 PM</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Contact</h4>
                    <p className="text-sm opacity-70">Phone: (02) 8888-1234</p>
                    <p className="text-sm opacity-70">Email: info@barangaysanjose.gov.ph</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
