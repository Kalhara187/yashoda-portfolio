import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { FaGithub } from "react-icons/fa";

const GITHUB_USERNAME = "Kalhara187"; // 🔧 Replace with your GitHub username

const theme = {
  dark: ["#0d1117", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const tooltipStyles = `
  .react-activity-calendar__scroll-container rect:hover {
    opacity: 0.75;
    cursor: pointer;
  }
`;

export default function GithubContribution() {
  return (
    <section id="github" className="py-28 max-w-6xl mx-auto px-6">
      <style>{tooltipStyles}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-cyan-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
          My activity
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-14">
          GitHub <span className="text-cyan-400">Contributions</span>
        </h2>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="glass rounded-3xl p-8 border border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.06)]"
      >
        {/* Card header */}
        <div className="flex items-center gap-3 mb-8">
          <FaGithub className="text-cyan-400 text-2xl" />
          <div>
            <p className="text-white font-semibold">@{GITHUB_USERNAME}</p>
            <p className="text-gray-400 text-xs">Contribution activity — last 12 months</p>
          </div>
        </div>

        {/* Calendar */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[600px]">
            <GitHubCalendar
              username={GITHUB_USERNAME}
              year="last"
              theme={theme}
              colorScheme="dark"
              blockSize={14}
              blockMargin={4}
              blockRadius={3}
              fontSize={12}
              showWeekdayLabels
              errorMessage={`Could not load contributions for @${GITHUB_USERNAME}. Make sure the username is correct and the profile is public.`}
              labels={{
                totalCount: "{{count}} contributions in the last year",
              }}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-6 text-xs text-gray-500">
          <span>Less</span>
          {theme.dark.map((color, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-sm inline-block border border-white/5"
              style={{ backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </motion.div>
    </section>
  );
}
