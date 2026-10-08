import { motion } from "framer-motion";
import { FaBrain, FaCode, FaServer } from "react-icons/fa";

const highlights = [
  { icon: <FaCode />, label: "Frontend-first thinking", value: "Interfaces shaped for responsiveness and clarity" },
  { icon: <FaServer />, label: "Backend awareness", value: "REST APIs, workflows, and data handling" },
  { icon: <FaBrain />, label: "Problem solving", value: "Turning requirements into practical delivery" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:py-28">
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">About me</p>
        <h2 className="mb-6 text-4xl font-semibold text-white md:text-5xl">Professional introductions</h2>
        <p className="max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
          I am a full stack developer with hands-on experience across modern web technologies and a strong interest in building clean, reliable systems. My work combines frontend detail, backend logic, and practical delivery.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-200">Background</p>
          <div className="mt-5 space-y-5 text-slate-300">
            <p className="leading-8">
              I focus on building production-ready applications with clean UI structure, maintainable code, and thoughtful user flows. My development approach values clarity, consistency, and performance.
            </p>
            <p className="leading-8">
              During my internship at <span className="font-semibold text-cyan-200">Sri Lanka Ports Authority</span>, I contributed to the <span className="font-semibold text-cyan-200">Electronic Documents Digitization System (EDDS)</span>. That experience exposed me to real project delivery, frontend implementation in Angular, backend integration with Spring Boot, MySQL data handling, and workflow-based business requirements.
            </p>
            <p className="leading-8">
              I enjoy working across the stack, learning new systems quickly, and refining interfaces to be more usable, accessible, and efficient.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
              className="glass flex items-start gap-4 p-5"
            >
              <div className="mt-1 text-xl text-cyan-300">{item.icon}</div>
              <div>
                <p className="font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-sm leading-7 text-slate-400">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}