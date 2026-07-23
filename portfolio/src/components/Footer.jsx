import { FaGithub,  FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="text-sm text-slate-400">
          © 2026 <span className="font-semibold text-cyan-200">Yashoda Kalhara</span>. All rights reserved.
        </p>

       

        <div className="flex gap-5 text-xl text-slate-400">
          <a href="https://github.com/Kalhara187" target="_blank" rel="noreferrer" className="transition-colors hover:text-cyan-300" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/yashoda-kalhara-bb4594306/" target="_blank" rel="noreferrer" className="transition-colors hover:text-cyan-300" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}