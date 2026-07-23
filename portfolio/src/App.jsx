import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import GithubContribution from "./components/GithubContribution";
import GithubProjects from "./components/GithubProjects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThreeBackground from "./components/ThreeBackground";

export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <ThreeBackground />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:120px_120px]" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <GithubContribution />
        <GithubProjects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
