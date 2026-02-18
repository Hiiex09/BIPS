import { Users, Heart, Target, Award, MapPin, Phone, Mail } from "lucide-react";
import TeamCard from "../components/public/TeamCard";

const About = () => {
  const teamMembers = [
    {
      name: "Elena Cruz",
      position: "Barangay Captain",
      description: "Leading our community towards progress and unity since 2022"
    },
    {
      name: "Ana Garcia",
      position: "Barangay Secretary",
      description: "Ensuring efficient administration and record-keeping"
    },
    {
      name: "Carlos Mendoza",
      position: "Barangay Treasurer",
      description: "Managing community resources with transparency"
    },
    {
      name: "Maria Santos",
      position: "Health Officer",
      description: "Dedicated to community health and wellness programs"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Service",
      description: "We serve our community with dedication and compassion"
    },
    {
      icon: Users,
      title: "Unity",
      description: "We believe in the strength of our community working together"
    },
    {
      icon: Target,
      title: "Progress",
      description: "We continuously improve our services for better quality of life"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do"
    }
  ];

  const milestones = [
    { year: "1985", event: "Barangay San Jose established" },
    { year: "2010", event: "New barangay hall inaugurated" },
    { year: "2018", event: "First digital services launched" },
    { year: "2022", event: "Current administration began" },
    { year: "2024", event: "Full digital transformation completed" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-primary">Barangay San Jose</span>
            </h1>
            <p className="text-xl opacity-80 mb-8">
              A thriving community committed to progress, unity, and service to all residents
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="card bg-primary/5 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-3xl mb-4 text-primary">Our Vision</h2>
                <p className="text-lg leading-relaxed">
                  To be a model barangay where every resident enjoys a high quality of life, 
                  where services are accessible, efficient, and responsive to the needs of the community, 
                  and where peace, progress, and prosperity prevail.
                </p>
              </div>
            </div>

            <div className="card bg-secondary/5 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-3xl mb-4 text-secondary">Our Mission</h2>
                <p className="text-lg leading-relaxed">
                  To provide excellent public service through innovative programs, transparent governance, 
                  and active community participation, ensuring the welfare and development of all residents 
                  while preserving our cultural heritage and values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-base-200/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg opacity-70">The principles that guide our work</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon size={32} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                    <p className="opacity-70">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg opacity-70">Key milestones in our history</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary text-primary-content rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-primary/20 my-2"></div>
                    )}
                  </div>
                  <div className="card bg-base-200 shadow-md flex-1 group-hover:shadow-lg transition-shadow">
                    <div className="card-body">
                      <p className="text-lg">{milestone.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-base-200/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-lg opacity-70">
              Dedicated leaders serving our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin size={32} />
                </div>
                <h3 className="font-bold text-xl mb-2">Visit Us</h3>
                <p className="opacity-90">
                  Barangay Hall, San Jose<br />
                  Metro Manila, Philippines
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={32} />
                </div>
                <h3 className="font-bold text-xl mb-2">Call Us</h3>
                <p className="opacity-90">
                  (02) 8888-1234<br />
                  Mon-Fri: 8AM-5PM
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={32} />
                </div>
                <h3 className="font-bold text-xl mb-2">Email Us</h3>
                <p className="opacity-90">
                  info@barangaysanjose.gov.ph<br />
                  24/7 Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
