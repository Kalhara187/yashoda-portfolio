import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Kalhara187", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yashoda-kalhara-bb4594306/", icon: FaLinkedin },
];

export default function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Invalid email";
    if (!formData.message.trim()) nextErrors.message = "Message is required";

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "error",
        message: "Failed to send message. Try again.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Sending..." });

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey,
      })
      .then(() => {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
        form.current?.reset();
      })
      .catch(() => {
        setStatus({ type: "error", message: "Failed to send message. Try again." });
      });
  };

  const inputClass = (field) =>
    `w-full rounded-2xl border ${errors[field] ? "border-red-500/60" : "border-white/10"} bg-white/5 p-4 text-white placeholder:text-slate-500 outline-none transition-colors focus:border-cyan-300/60`;

  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:py-28">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</p>
        <h2 className="text-4xl font-semibold text-white md:text-5xl">Let’s build something</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
          Open to opportunities, collaborations, and project discussions. Use the form below to send a message directly.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass p-8">
          <p className="text-slate-300 leading-8">
            I am currently available for full stack opportunities and collaborations. Whether you have a product idea, a project to discuss, or simply want to connect, feel free to send a message.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Email</p>
            <p className="mt-2 text-lg font-semibold text-white">yashodakalhara187@gmail.com</p>
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Location</p>
            <p className="mt-2 text-lg font-semibold text-white">Sri Lanka</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors hover:border-cyan-300/40 hover:text-cyan-200">
                <Icon /> {label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form ref={form} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} onSubmit={handleSubmit} className="glass space-y-5 p-8">
          {status.type !== "idle" && (
            <div className={`rounded-2xl border p-4 text-sm ${status.type === "success" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : status.type === "error" ? "border-red-400/30 bg-red-400/10 text-red-200" : "border-cyan-400/30 bg-cyan-400/10 text-cyan-100"}`}>
              {status.message}
            </div>
          )}

          <div>
            <input name="name" className={inputClass("name")} placeholder="Your Name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
          </div>

          <div>
            <input name="email" className={inputClass("email")} placeholder="Your Email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </div>

          <div>
            <textarea name="message" className={`${inputClass("message")} h-40 resize-none`} placeholder="Your Message" value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} />
            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
          </div>

          <motion.button
            whileHover={status.type === "loading" ? undefined : { scale: 1.02 }}
            whileTap={status.type === "loading" ? undefined : { scale: 0.98 }}
            type="submit"
            disabled={status.type === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 py-4 font-semibold text-slate-950 transition-transform duration-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FaPaperPlane /> {status.type === "loading" ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}