import { motion } from "framer-motion";
import { FaBriefcase, FaCheckCircle } from "react-icons/fa";

const experiences = [
  {
    role: "Intern Software Engineer",
    company: "Sri Lanka Ports Authority (SLPA)",
    duration: "Internship Experience",
    project: "Electronic Documents Digitization System (EDDS)",
    tech: ["Angular", "Spring Boot", "MySQL"],
    responsibilities: [
      "Frontend development for EDDS modules with Angular",
      "Backend integration with Spring Boot services",
      "UI improvements for better usability and clarity",
      "File upload features for document handling",
      "Workflow management for digitization processes",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:py-28">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Experience</p>
        <h2 className="text-4xl font-semibold text-white md:text-5xl">Professional timeline</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
          A focused internship experience at SLPA where I worked on a document digitization platform and contributed to frontend, backend, and workflow improvements.
        </p>
      </motion.div>

      <div className="relative mt-12 space-y-12 border-l border-cyan-400/20 pl-6 md:pl-10">
        {experiences.map((experience, index) => (
          <motion.div key={experience.role} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }}>
            <span className="absolute -left-[1.95rem] top-2 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 shadow-glow md:-left-[2.25rem]">
              <FaBriefcase className="text-sm" />
            </span>

            <div className="glass p-8 transition-all duration-300 hover:border-cyan-400/30">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">{experience.role}</h3>
                  <p className="mt-1 text-cyan-200">{experience.company}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300">{experience.duration}</span>
              </div>

              <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-violet-200">{experience.project}</p>

              <ul className="mb-6 space-y-3">
                {experience.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300">
                    <FaCheckCircle className="mt-1 shrink-0 text-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {experience.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}