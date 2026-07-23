import { motion } from "framer-motion";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import cv from "../assets/Yashoda_Kalhara_CV.pdf";
import profileImage from "../assets/kalhara.jpeg";

const links = [
  { label: "GitHub",   href: "https://github.com/Kalhara187" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yashoda-kalhara-bb4594306/" },
];

const stats = [
  { value: "3+", label: "Stack areas" },
  { value: "4",  label: "Featured projects" },
  { value: "1",  label: "Internship experience" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pb-24 pt-28 md:pt-32 lg:min-h-screen lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

        {/* ── Left: text ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-cyan-200">
            Full stack portfolio
          </p>

          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
            Yashoda Kalhara
          </h1>

          <p className="mt-4 text-lg text-cyan-200 sm:text-xl">Full Stack Developer</p>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            I build modern, scalable web applications with a focus on clean architecture,
            responsive interfaces, and polished user experiences. My toolkit spans React,
            Angular, Node.js, Spring Boot, and databases like MongoDB and MySQL.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={cv}
              download="Yashoda_Kalhara_CV.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <FaDownload /> Download CV
            </a>
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-cyan-300/40 hover:text-cyan-200"
              >
                {label === "GitHub" ? <FaGithub /> : <FaLinkedin />}
                {label}
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 * index }}
                className="glass p-5"
              >
                <div className="text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: profile photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex justify-center lg:justify-end order-first lg:order-last"
        >
          {/* Outer glow ring */}
          <div className="relative">
            {/* Blurred background glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/40 via-violet-500/20 to-cyan-400/30 blur-2xl scale-110 -z-10" />

            {/* Rotating dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/20 scale-[1.12]"
            />

            {/* Static solid ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/30 scale-[1.06]" />

            {/* Floating wrapper */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04 }}
              className="relative"
            >
              {/* Glass border frame */}
              <div className="rounded-full p-[3px] bg-gradient-to-br from-cyan-400/60 via-violet-500/40 to-cyan-400/60 shadow-[0_0_40px_rgba(34,211,238,0.25),0_0_80px_rgba(34,211,238,0.1)]">
                <div className="rounded-full p-[3px] bg-[#050816]">
                  <img
                    src={profileImage}
                    alt="Yashoda Kalhara Profile Photo"
                    className="h-64 w-64 rounded-full object-cover object-top sm:h-72 sm:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-emerald-300 shadow-lg"
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
                Available for opportunities
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-16 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-xl transition-colors hover:text-cyan-300"
        aria-label="Scroll to about section"
      >
        ↓
      </motion.a>
    </section>
  );
}
