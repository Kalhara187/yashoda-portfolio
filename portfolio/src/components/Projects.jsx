import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "EDDS System",
    desc: "Electronic Document Digitization System developed during the SLPA internship to streamline document handling and workflow management.",
    tech: ["Angular", "Spring Boot", "MySQL"],
    github: "https://github.com/Kalhara187",
    accent: "from-cyan-400/25 via-sky-500/20 to-violet-500/25",
  },
  {
    title: "Money Handle",
    desc: "Personal finance management application for tracking expenses, budgeting, and financial visibility.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Kalhara187",
    accent: "from-violet-500/25 via-fuchsia-500/20 to-cyan-500/20",
  },
  {
    title: "ResearchCon",
    desc: "Conference management system that supports paper submissions, reviews, and event coordination.",
    tech: ["React", "Express", "MongoDB"],
    github: "https://github.com/Kalhara187",
    accent: "from-emerald-500/25 via-cyan-500/15 to-sky-500/20",
  },
  {
    title: "Retail Management System",
    desc: "Role-based retail automation system designed to manage inventory, sales, and reporting workflows.",
    tech: ["React", "Node.js", "MySQL"],
    github: "https://github.com/Kalhara187",
    accent: "from-orange-500/25 via-amber-500/20 to-violet-500/15",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:py-28">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Projects</p>
        <h2 className="text-4xl font-semibold text-white md:text-5xl">Featured work</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
          Selected work across enterprise systems and personal applications, each card using a modern layout with hover motion and clear technology tags.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="glass group overflow-hidden p-6 transition-all duration-300 hover:border-cyan-400/30"
          >
            <div className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${project.accent}`}>
              <div className="aspect-[16/9] overflow-hidden bg-slate-950/80">
                <div className="flex h-full items-center justify-center border-b border-white/10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_55%)] text-center">
                  <div>
                    <div className="mx-auto h-16 w-16 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm" />
                    <p className="mt-4 text-sm uppercase tracking-[0.28em] text-slate-200/80">Project Preview</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">UI / API / DB</span>
                </div>

                <p className="text-sm leading-7 text-slate-300">{project.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                      {tech}
                    </span>
                  ))}
                </div>

                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-300/40 hover:text-cyan-200">
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}