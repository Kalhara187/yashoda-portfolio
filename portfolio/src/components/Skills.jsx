import { motion } from "framer-motion";
import { FaCss3Alt, FaHtml5, FaJava, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { SiAngular, SiExpress, SiMongodb, SiMysql, SiSpringboot, SiTailwindcss } from "react-icons/si";

const categories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: <FaReact />, level: 92 },
      { name: "Angular", icon: <SiAngular />, level: 84 },
      { name: "HTML", icon: <FaHtml5 />, level: 95 },
      { name: "CSS", icon: <FaCss3Alt />, level: 93 },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 91 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, level: 86 },
      { name: "Express", icon: <SiExpress />, level: 83 },
      { name: "Spring Boot", icon: <SiSpringboot />, level: 76 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: <SiMongodb />, level: 82 },
      { name: "MySQL", icon: <SiMysql />, level: 87 },
      { name: "Java", icon: <FaJava />, level: 82 },
      { name: "Python", icon: <FaPython />, level: 74 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:py-28">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Skills</p>
        <h2 className="text-4xl font-semibold text-white md:text-5xl">Technical toolkit</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
          A balanced stack across frontend, backend, databases, and programming languages. Each skill is represented with a progress bar to show current confidence and focus.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.15, duration: 0.6 }}
            className="glass p-7"
          >
            <h3 className="mb-6 text-lg font-semibold tracking-wide text-cyan-200">{category.title}</h3>
            <div className="space-y-5">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-slate-200">
                      <span className="text-cyan-300">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-xs text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}