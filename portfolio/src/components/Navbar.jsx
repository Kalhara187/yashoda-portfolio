import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaGithub, FaLinkedin, FaTimes } from "react-icons/fa";

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const socials = [
  { icon: FaGithub, href: "https://github.com/Kalhara187", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/yashoda-kalhara-bb4594306/", label: "LinkedIn" },
];

const sectionOffset = 88;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const element = document.getElementById(id);

    if (!element) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const top = element.getBoundingClientRect().top + window.scrollY - sectionOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#050816]/80 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer text-xl font-semibold tracking-[0.22em] text-white"
          onClick={() => scrollTo("home")}
        >
          YASODHA<span className="text-cyan-400">.DEV</span>
        </motion.span>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              {link.id === "projects" ? (
                <a
                  href="#projects"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-cyan-300"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-cyan-300"
                >
                  {link.label}
                </button>
              )}
            </li>
          ))}
          <li className="flex items-center gap-3 pl-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-slate-300 transition-colors duration-200 hover:text-cyan-300">
                <Icon />
              </a>
            ))}
          </li>
        </ul>

        <button className="text-xl text-cyan-300 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-2 border-t border-white/10 bg-[#050816]/95 px-6 pb-6 backdrop-blur-2xl md:hidden"
          >
            {links.map((link) => (
              <li key={link.id}>
                {link.id === "projects" ? (
                  <a
                    href="#projects"
                    onClick={() => setOpen(false)}
                    className="block w-full border-b border-white/5 py-4 text-left text-sm text-slate-300 transition-colors hover:text-cyan-300"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="w-full border-b border-white/5 py-4 text-left text-sm text-slate-300 transition-colors hover:text-cyan-300"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
            <li className="flex gap-4 pt-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="rounded-full border border-white/10 p-3 text-slate-300 transition-colors hover:text-cyan-300">
                  <Icon />
                </a>
              ))}
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
