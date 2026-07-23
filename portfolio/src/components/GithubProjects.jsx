import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch, FaCode, FaExclamationTriangle } from "react-icons/fa";

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

// 🔧 Add repo names here to pin them at the top with a "Featured" badge
const FEATURED = ["money-handle", "researchcon", "retail-management-system", "edds-system"];

const LANGUAGE_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python:     "#3572A5",
  Java:       "#b07219",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  Go:         "#00ADD8",
  Rust:       "#dea584",
  PHP:        "#4F5D95",
  Ruby:       "#701516",
  "C++":      "#f34b7d",
  C:          "#555555",
  Shell:      "#89e051",
  Kotlin:     "#A97BFF",
  Swift:      "#F05138",
  Dart:       "#00B4AB",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-6 animate-pulse">
      <div className="h-4 w-2/3 rounded bg-white/10 mb-3" />
      <div className="h-3 w-full rounded bg-white/5 mb-2" />
      <div className="h-3 w-4/5 rounded bg-white/5 mb-6" />
      <div className="flex gap-3">
        <div className="h-3 w-16 rounded bg-white/10" />
        <div className="h-3 w-12 rounded bg-white/10" />
        <div className="h-3 w-12 rounded bg-white/10" />
      </div>
    </div>
  );
}

function RepoCard({ repo, index, featured }) {
  const langColor = LANGUAGE_COLORS[repo.language] ?? "#22d3ee";

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="glass group flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_24px_rgba(34,211,238,0.07)] cursor-pointer"
    >
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <FaGithub className="shrink-0 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            <h3 className="truncate font-semibold text-white group-hover:text-cyan-300 transition-colors capitalize">
              {repo.name.replace(/-/g, " ")}
            </h3>
          </div>
          {featured && (
            <span className="shrink-0 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-cyan-400">
              Featured
            </span>
          )}
        </div>

        <p className="text-sm leading-6 text-gray-400 line-clamp-2 mb-5">
          {repo.description || "No description provided."}
        </p>
      </div>

      {/* Bottom row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: langColor }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <FaStar className="text-yellow-500/70" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <FaCodeBranch className="text-gray-500" /> {repo.forks_count}
        </span>
        <span className="ml-auto text-gray-600">Updated {formatDate(repo.updated_at)}</span>
      </div>
    </motion.a>
  );
}

export default function GithubProjects() {
  const [repos, setRepos]     = useState([]);
  const [status, setStatus]   = useState(USERNAME ? "loading" : "error"); // loading | error | empty | done
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!USERNAME) { return; }

    const controller = new AbortController();

    fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&direction=desc`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // filter out forks, sort: featured first then by updated_at
        const filtered = data
          .filter((r) => !r.fork)
          .sort((a, b) => {
            const aFeat = FEATURED.includes(a.name.toLowerCase());
            const bFeat = FEATURED.includes(b.name.toLowerCase());
            if (aFeat && !bFeat) return -1;
            if (!aFeat && bFeat) return  1;
            return new Date(b.updated_at) - new Date(a.updated_at);
          });

        setRepos(filtered);
        setStatus(filtered.length === 0 ? "empty" : "done");
      })
      .catch((err) => {
        if (err.name !== "AbortError") setStatus("error");
      });

    return () => controller.abort();
  }, []);

  const visible = showAll ? repos : repos.slice(0, 6);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="text-cyan-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
          Open source
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            GitHub <span className="text-cyan-400">Projects</span>
          </h2>
          {status === "done" && (
            <a
              href={`https://github.com/${USERNAME}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <FaGithub /> View all on GitHub
            </a>
          )}
        </div>
      </motion.div>

      {/* Loading */}
      {status === "loading" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-10 text-center"
        >
          <FaExclamationTriangle className="text-3xl text-yellow-400/70 mx-auto mb-4" />
          <p className="text-white font-semibold mb-1">Could not load repositories</p>
          <p className="text-gray-400 text-sm">
            Check that <span className="text-cyan-400">VITE_GITHUB_USERNAME</span> in{" "}
            <span className="text-cyan-400">.env</span> is set to a valid public GitHub username.
          </p>
        </motion.div>
      )}

      {/* Empty */}
      {status === "empty" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-10 text-center"
        >
          <FaCode className="text-3xl text-cyan-400/40 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">No public repositories found for @{USERNAME}.</p>
        </motion.div>
      )}

      {/* Grid */}
      {status === "done" && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((repo, i) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                index={i}
                featured={FEATURED.includes(repo.name.toLowerCase())}
              />
            ))}
          </div>

          {repos.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <button
                onClick={() => setShowAll((v) => !v)}
                className="glass px-8 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200"
              >
                {showAll ? "Show less" : `Show all ${repos.length} repositories`}
              </button>
            </motion.div>
          )}
        </>
      )}
    </section>
  );
}
