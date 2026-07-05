import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Download,
  Monitor,
  Apple,
  Terminal,
  Heart,
  ArrowRight,
  Check,
  ExternalLink,
  FileText,
  Cpu,
  Lock,
  GitBranch,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

// lucide-react 1.0 dropped all trademarked brand marks (Github included),
// so the GitHub logo is inlined here to match the lucide icon sizing API.
function Github({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const CARD =
  "bg-surface rounded-3xl border border-line shadow-[0_1px_2px_rgba(24,24,27,0.04),0_12px_32px_rgba(24,24,27,0.05)]";
const VERSION = "v1.4.2";

/* Scroll-reveal wrapper */
function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-line">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/eloy2.png" alt="Eloy Browser logo" className="w-7 h-7 logo-glow" />
          <span className="font-extrabold tracking-tight">Eloy Browser</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent-soft rounded-full px-2.5 py-1">
            <Github className="w-3 h-3" />
            Open Source
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#support" className="hidden md:block text-sm font-medium text-ink-soft hover:text-ink transition-colors">
            Support
          </a>
          <a href="#download" className="hidden md:block text-sm font-medium text-ink-soft hover:text-ink transition-colors">
            Download
          </a>
          <a
            href="#download"
            className="inline-flex items-center gap-2 bg-ink text-paper text-sm font-semibold rounded-full px-4 py-2 hover:opacity-85 transition-opacity"
          >
            Get Eloy
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — Poison Mode interactive demo                                */
/* ------------------------------------------------------------------ */

const NOISE_QUERIES = [
  "best youth football tactics for U10",
  "minivan trunk space comparison 2026",
  "healthy after-school snack recipes",
  "weekend camping spots near me",
  "how to remove grass stains from jerseys",
  "local farmers market opening hours",
];

function PoisonDemo() {
  const [on, setOn] = useState(false);
  const [index, setIndex] = useState(0);
  const [sent, setSent] = useState(0);

  useEffect(() => {
    if (!on) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % NOISE_QUERIES.length);
      setSent((c) => c + 1);
    }, 2400);
    return () => clearInterval(id);
  }, [on]);

  return (
    <FadeIn delay={0.15}>
      <div
        className={`mx-auto max-w-md p-7 ${CARD} transition-shadow duration-700 ${
          on ? "shadow-[0_0_45px_rgba(23,113,74,0.22)]" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="text-left">
            <p className="text-sm font-bold">Poison Mode</p>
            <p className="text-xs text-ink-faint mt-0.5">Profile: Soccer Mom</p>
          </div>

          {/* Spring toggle */}
          <button
            role="switch"
            aria-checked={on}
            aria-label="Toggle Poison Mode"
            onClick={() => setOn(!on)}
            className={`flex w-14 h-8 p-1 rounded-full transition-all duration-300 ${
              on
                ? "bg-accent justify-end shadow-[0_0_14px_rgba(23,113,74,0.45)]"
                : "bg-line justify-start"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 520, damping: 32 }}
              className="w-6 h-6 rounded-full bg-surface shadow-sm"
            />
          </button>
        </div>

        <div className="rounded-2xl bg-paper border border-line py-4 px-5">
          <div className="h-6 flex items-center justify-center gap-2 overflow-hidden">
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                on ? "bg-accent animate-pulse" : "bg-ink-faint"
              }`}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={on ? index : "off"}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -7 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-mono text-ink-soft truncate"
              >
                {on
                  ? `searching: ${NOISE_QUERIES[index]}...`
                  : "poison mode is off"}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-3 text-xs text-ink-faint text-center">
          {sent === 0
            ? "Flip the switch to start feeding trackers junk."
            : `${sent} decoy ${sent === 1 ? "query" : "queries"} sent this session`}
        </p>
      </div>
    </FadeIn>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 text-center">
      {/* ambient light bloom behind the hero */}
      <div
        aria-hidden
        className="absolute left-1/2 top-4 -translate-x-1/2 w-[520px] h-[420px] max-w-full rounded-full bg-accent/15 blur-[110px] pointer-events-none"
      />
      <FadeIn>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-ink-soft border border-line bg-surface rounded-full px-3.5 py-1.5 mb-8">
          <Lock className="w-3 h-3 text-accent" />
          Privacy-first · MIT licensed · No telemetry
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-3xl mx-auto">
          Don't just block trackers.{" "}
          <span className="text-accent">Confuse them.</span>
        </h1>

        <p className="mt-6 text-lg text-ink-soft max-w-xl mx-auto leading-relaxed">
          Eloy's Active Data Poisoning runs quiet, automated background
          searches from customizable Noise Profiles — flooding trackers with
          plausible nonsense until your real profile disappears in the static.
        </p>
      </FadeIn>

      <div className="mt-12">
        <PoisonDemo />
      </div>

      <FadeIn delay={0.25}>
        <div className="mt-12 flex items-center justify-center gap-3">
          <a
            href="#download"
            className="inline-flex items-center gap-2 bg-ink text-paper font-semibold rounded-full px-7 py-3.5 hover:opacity-85 hover:shadow-[0_8px_30px_rgba(24,24,27,0.3)] transition-all"
          >
            <Download className="w-4 h-4" />
            Download Eloy
          </a>
          <a
            href="https://github.com/eloy-browser/eloy"
            className="inline-flex items-center gap-2 font-semibold text-ink border border-line bg-surface rounded-full px-6 py-3.5 hover:border-ink-faint transition-colors"
          >
            <Github className="w-4 h-4" />
            Star on GitHub
          </a>
        </div>
      </FadeIn>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Open-source support section                                        */
/* ------------------------------------------------------------------ */

const TIERS = [
  { id: "5", label: "$5", period: "/mo", note: "Buys the CI servers coffee" },
  { id: "10", label: "$10", period: "/mo", note: "Funds a day of development" },
  { id: "custom", label: "Custom", period: "", note: "Whatever feels right" },
];

function OpenSource() {
  const [selected, setSelected] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  return (
    <section id="support" className="scroll-mt-20 border-y border-line bg-surface/50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Built in the open. Funded by people, not ads.
          </h2>
          <p className="mt-4 text-ink-soft max-w-lg mx-auto">
            Eloy has no pricing page because privacy isn't a premium feature.
            If it earns a place in your dock, consider chipping in.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* GitHub card */}
          <FadeIn>
            <div className={`p-8 h-full ${CARD}`}>
              <div className="w-11 h-11 rounded-2xl bg-accent-soft flex items-center justify-center mb-5">
                <GitBranch className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold">Contribute code</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                Every line is public. Review the poisoning engine, file
                issues, or ship a Noise Profile of your own.
              </p>
              <div className="mt-6 space-y-2">
                {[
                  ["eloy-browser/eloy", "Core browser"],
                  ["eloy-browser/noise-profiles", "Community profiles"],
                  ["eloy-browser/site", "This website"],
                ].map(([repo, desc]) => (
                  <a
                    key={repo}
                    href={`https://github.com/${repo}`}
                    className="flex items-center justify-between rounded-xl border border-line px-4 py-3 hover:bg-paper transition-colors group"
                  >
                    <div>
                      <span className="text-sm font-mono">{repo}</span>
                      <span className="block text-xs text-ink-faint">{desc}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-ink-faint group-hover:text-ink-soft transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Donation card */}
          <FadeIn delay={0.1}>
            <div className={`p-8 h-full ${CARD}`}>
              <div className="w-11 h-11 rounded-2xl bg-accent-soft flex items-center justify-center mb-5">
                <Heart className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold">Support the project</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                Recurring donations keep the maintainers independent — no
                investors, no data deals.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelected(tier.id)}
                    className={`rounded-2xl border px-3 py-4 text-center transition-colors duration-200 ${
                      selected === tier.id
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-line hover:border-ink-faint"
                    }`}
                  >
                    <span className="block text-lg font-extrabold">
                      {tier.label}
                      <span className="text-xs font-medium opacity-60">
                        {tier.period}
                      </span>
                    </span>
                    <span className="block mt-1 text-[11px] leading-tight opacity-60">
                      {tier.note}
                    </span>
                  </button>
                ))}
              </div>
              {selected === "custom" && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  type="number"
                  min="1"
                  placeholder="Amount in USD"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm placeholder:text-ink-faint focus:outline-none focus:border-accent transition-colors"
                />
              )}
              <button
                disabled={!selected || (selected === "custom" && !customAmount)}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white text-sm font-semibold py-3.5 hover:opacity-90 hover:shadow-[0_6px_24px_rgba(23,113,74,0.35)] transition-all disabled:bg-line disabled:text-ink-faint disabled:shadow-none"
              >
                <Heart className="w-3.5 h-3.5" />
                Donate
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Download picker                                                    */
/* ------------------------------------------------------------------ */

const DOWNLOADS = [
  { icon: Monitor, os: "Windows", detail: "Windows 10 / 11 · 64-bit", file: ".exe installer" },
  { icon: Apple, os: "macOS", detail: "Apple Silicon", file: ".dmg · arm64" },
  { icon: Apple, os: "macOS", detail: "Intel", file: ".dmg · x86_64" },
  { icon: Terminal, os: "Linux", detail: "Debian / Ubuntu", file: ".deb package" },
  { icon: Cpu, os: "Linux", detail: "Fedora / openSUSE", file: ".rpm package" },
];

function DownloadCard({ icon: Icon, os, detail, file }) {
  return (
    <motion.a
      href="#"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`p-6 ${CARD} flex flex-col group`}
    >
      <div className="w-11 h-11 rounded-2xl bg-accent-soft flex items-center justify-center mb-5">
        <Icon className="w-5 h-5 text-accent" strokeWidth={1.75} />
      </div>
      <span className="font-bold">{os}</span>
      <span className="text-sm text-ink-soft">{detail}</span>
      <span className="mt-3 text-xs font-mono text-ink-faint">{file}</span>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
        <Download className="w-3.5 h-3.5" />
        Download
        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
      </span>
    </motion.a>
  );
}

function Downloads() {
  return (
    <section id="download" className="scroll-mt-20 mx-auto max-w-6xl px-6 py-24">
      <FadeIn className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Pick your platform
        </h2>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-accent" />
            Stable {VERSION}
          </span>
          <a
            href="https://github.com/eloy-browser/eloy/releases"
            className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            Release notes
          </a>
          <a
            href="https://github.com/eloy-browser/eloy"
            aria-label="View source on GitHub"
            className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            View source
          </a>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {DOWNLOADS.map((d, i) => (
          <FadeIn key={`${d.os}-${d.detail}`} delay={i * 0.06}>
            <DownloadCard {...d} />
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <p className="mt-8 text-center text-xs text-ink-faint">
          All builds are reproducible and signed. Checksums published with
          every release.
        </p>
      </FadeIn>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-ink-faint">
          <Shield className="w-4 h-4" />
          © 2026 Eloy Browser · MIT licensed
        </div>
        <div className="flex items-center gap-6 text-sm text-ink-faint">
          <a href="https://github.com/eloy-browser/eloy" className="hover:text-ink transition-colors">
            GitHub
          </a>
          <a href="#support" className="hover:text-ink transition-colors">
            Donate
          </a>
          <a href="#download" className="hover:text-ink transition-colors">
            Download
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <OpenSource />
        <Downloads />
      </main>
      <Footer />
    </div>
  );
}
