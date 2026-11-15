import TeamCard from "../components/public/TeamCard";

const teamMembers = [
  {
    name: "Elena Cruz",
    position: "Barangay Captain",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    description: "Leading the barangay since 2022.",
  },
  {
    name: "Ana Garcia",
    position: "Barangay Secretary",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    description: "Keeps the barangay's records and signs off on documents.",
  },
  {
    name: "Carlos Mendoza",
    position: "Barangay Treasurer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    description: "Manages barangay funds and fees.",
  },
  {
    name: "Maria Santos",
    position: "Health Officer",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    description: "Runs the health center and its programs.",
  },
];

const values = [
  { title: "Service", description: "We serve every resident with care, whoever they are." },
  { title: "Unity", description: "Tejero is stronger when neighbors work together." },
  { title: "Progress", description: "We keep improving how the hall serves you." },
  { title: "Excellence", description: "We hold our work to a high standard." },
];

const milestones = [
  { year: "1985", event: "Barangay Tejero established" },
  { year: "2010", event: "New barangay hall inaugurated" },
  { year: "2018", event: "First digital services launched" },
  { year: "2022", event: "Current administration began" },
  { year: "2024", event: "Document requests moved online" },
];

const About = () => (
  <main>
    <header className="border-b border-base-300">
      <div className="page-wrap py-12 sm:py-16">
        <h1 className="type-display">About Barangay Tejero</h1>
        <p className="type-lede mt-5">
          A community in Cebu City, served from the barangay hall by elected
          officials and staff.
        </p>
      </div>
    </header>

    {/* Vision & mission as plain prose */}
    <section className="page-section">
      <div className="page-wrap grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="type-title">Our vision</h2>
          <p className="mt-5 text-lg leading-relaxed text-base-content/80 max-w-prose">
            A model barangay where every resident enjoys a good quality of life,
            where services are accessible, efficient and responsive, and where
            peace, progress and prosperity prevail.
          </p>
        </div>
        <div>
          <h2 className="type-title">Our mission</h2>
          <p className="mt-5 text-lg leading-relaxed text-base-content/80 max-w-prose">
            To provide excellent public service through good programs,
            transparent governance and active community participation, caring
            for the welfare of every resident while keeping our culture and
            values alive.
          </p>
        </div>
      </div>
    </section>

    <section className="page-section pt-0">
      <div className="page-wrap">
        <h2 className="type-title">What we stand for</h2>
        <dl className="mt-8 grid gap-x-16 gap-y-6 border-t border-base-300 pt-8 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title}>
              <dt className="type-heading">{v.title}</dt>
              <dd className="mt-1 text-base-content/70">{v.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* Officials */}
    <section className="page-section bg-base-200 border-y border-base-300">
      <div className="page-wrap">
        <h2 className="type-title">Barangay officials</h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>

    {/* History — a real timeline */}
    <section className="page-section">
      <div className="page-wrap grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <h2 className="type-title">Our history</h2>
        <ol className="ruled border-y border-base-300">
          {milestones.map((m) => (
            <li key={m.year} className="grid grid-cols-[5rem_1fr] items-baseline gap-6 py-4">
              <span className="type-condensed text-2xl font-bold text-primary">{m.year}</span>
              <span className="text-lg">{m.event}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>

  </main>
);

export default About;
