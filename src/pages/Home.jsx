import { useNavigate } from "react-router-dom";
import {
  Brain,
  MessageSquare,
  Search,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-[#020817] text-white">

      {/* ================= ANIMATIONS ================= */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        .fade-up {
          animation: fadeUp 0.9s ease-out forwards;
        }

        .fade-left {
          animation: fadeLeft 0.9s ease-out forwards;
        }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        .glow-animation {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden">

        {/* Room image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${HERO_IMAGE}")`,
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#020817]/70" />

        {/* Left-to-right gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/90 to-[#020817]/40" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020817] to-transparent" />

        {/* Glow */}
        <div className="glow-animation absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal-500/20 blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">

          <div className="max-w-3xl">

            {/* Badge */}
            <div
              className="fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm font-semibold text-teal-300"
            >
              <Sparkles size={16} />
              AI-POWERED HOMESTAY INTELLIGENCE
            </div>

            {/* Heading */}
            <h1
              className="fade-left text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "0.15s", opacity: 0 }}
            >
              Turn Guest Reviews
              <span className="block bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Into Smart Insights.
              </span>
            </h1>

            {/* Description */}
            <p
              className="fade-up mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
              style={{ animationDelay: "0.3s", opacity: 0 }}
            >
              Homestay AI uses artificial intelligence to analyze guest
              feedback, detect sentiment, identify important themes and
              transform unstructured reviews into actionable hospitality
              insights.
            </p>

            {/* Buttons */}
            <div
              className="fade-up mt-9 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "0.45s", opacity: 0 }}
            >
              <button
                onClick={() => navigate("/analyzer")}
                className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-7 py-4 text-lg font-bold shadow-lg shadow-teal-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-teal-500/40"
              >
                <Brain size={21} />
                Analyze a Review

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-lg font-bold backdrop-blur-md transition-all duration-300 hover:border-teal-400/40 hover:bg-white/10"
              >
                <BarChart3 size={21} />
                View Dashboard
              </button>
            </div>

            {/* Trust points */}
            <div
              className="fade-up mt-10 flex flex-wrap gap-6 text-sm text-slate-300"
              style={{ animationDelay: "0.6s", opacity: 0 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-400" />
                AI-powered analysis
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-400" />
                Real MongoDB data
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-400" />
                Interactive analytics
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          WHY HOMESTAY AI
      ===================================================== */}

      <section className="bg-[#020817] py-24">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-400">
            <Sparkles size={17} />
            Why Homestay AI?
          </div>

          <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
            Understand What Your Guests
            <span className="text-teal-400"> Really Think.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
            Guest reviews contain valuable information about your property.
            Homestay AI transforms unstructured feedback into meaningful
            insights that help hospitality teams make better decisions.
          </p>

        </div>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="relative bg-gradient-to-b from-[#020817] to-[#071522] py-24">

        <div className="absolute left-1/2 top-20 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="mb-14 text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-400">
              Core Features
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Intelligent Review Analysis
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-slate-400">
              One intelligent platform for understanding, organizing and
              analyzing guest feedback.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <FeatureCard
              icon={<MessageSquare size={28} />}
              title="Sentiment Analysis"
              description="Detect positive, neutral and negative guest sentiment using AI-powered review analysis."
            />

            <FeatureCard
              icon={<Search size={28} />}
              title="Theme Detection"
              description="Identify themes such as food, cleanliness, host, location, value and experience."
            />

            <FeatureCard
              icon={<BarChart3 size={28} />}
              title="Review Analytics"
              description="Monitor review statistics and understand guest feedback through an interactive dashboard."
            />

            <FeatureCard
              icon={<Brain size={28} />}
              title="AI Classification"
              description="Automatically classify guest reviews and transform unstructured feedback into useful insights."
            />

          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="bg-[#020817] py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-16 text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-400">
              Simple Workflow
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              From Review to Insight
            </h2>

          </div>

          <div className="grid gap-8 md:grid-cols-3">

            <WorkflowCard
              number="01"
              icon={<MessageSquare size={26} />}
              title="Submit Review"
              description="Enter a guest review into the AI-powered review analyzer."
            />

            <WorkflowCard
              number="02"
              icon={<Brain size={26} />}
              title="AI Analysis"
              description="The AI analyzes sentiment, themes and important guest feedback."
            />

            <WorkflowCard
              number="03"
              icon={<BarChart3 size={26} />}
              title="Get Insights"
              description="View structured insights and review trends through your dashboard."
            />

          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY
      ===================================================== */}

      <section className="bg-[#071522] py-24">

        <div className="mx-auto max-w-6xl px-6">

          <div className="rounded-3xl border border-teal-400/20 bg-gradient-to-br from-teal-500/10 to-transparent p-10 sm:p-14">

            <div className="grid items-center gap-12 md:grid-cols-2">

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-400">
                  Built With Modern Technology
                </p>

                <h2 className="mt-5 text-4xl font-bold">
                  Intelligent.
                  <span className="text-teal-400"> Secure.</span>
                  <br />
                  Data Driven.
                </h2>

                <p className="mt-6 leading-relaxed text-slate-400">
                  Homestay AI combines a modern React frontend, Node.js
                  backend, MongoDB database and AI-powered review analysis
                  into one complete full-stack application.
                </p>

                <div className="mt-8 space-y-4">

                  <TechnologyPoint
                    icon={<Zap size={19} />}
                    text="AI-powered review classification"
                  />

                  <TechnologyPoint
                    icon={<ShieldCheck size={19} />}
                    text="Secure authentication and protected routes"
                  />

                  <TechnologyPoint
                    icon={<BarChart3 size={19} />}
                    text="Real-time review analytics"
                  />

                </div>

              </div>

              <div className="relative flex justify-center">

                <div className="absolute h-64 w-64 rounded-full bg-teal-400/20 blur-[80px]" />

                <div className="float-animation relative flex h-72 w-72 flex-col items-center justify-center rounded-3xl border border-teal-400/20 bg-slate-900/80 text-center shadow-2xl backdrop-blur-xl">

                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 shadow-lg shadow-teal-500/30">
                    <Brain size={40} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    Homestay AI
                  </h3>

                  <p className="mt-2 px-6 text-slate-400">
                    Turning guest feedback into actionable intelligence.
                  </p>

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#020817] py-28">

        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-emerald-500/10" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-teal-300">
            <Sparkles size={17} />
            Ready to understand your guests?
          </div>

          <h2 className="mt-7 text-4xl font-bold sm:text-5xl">
            Start Analyzing Guest Reviews
          </h2>

          <p className="mt-5 text-lg text-slate-400">
            Turn every review into a meaningful insight for better
            hospitality decisions.
          </p>

          <button
            onClick={() => navigate("/analyzer")}
            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-4 text-lg font-bold shadow-lg shadow-teal-500/20 transition-all duration-300 hover:scale-105"
          >
            <Brain size={21} />
            Analyze New Review
            <ArrowRight size={20} />
          </button>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/10 bg-[#01050d]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">

          <div>

            <div className="text-xl font-bold">
              🏠 Homestay AI
            </div>

            <p className="mt-1 text-sm text-slate-500">
              AI-powered guest review intelligence.
            </p>

          </div>

          <p className="text-sm text-slate-500">
            Full-Stack AI Project
          </p>

        </div>

      </footer>

    </div>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-teal-400/30 hover:bg-teal-400/[0.06]">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/10 text-teal-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-teal-400/20">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-4 leading-relaxed text-slate-400">
        {description}
      </p>

      <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

    </div>
  );
}


/* =========================================================
   WORKFLOW CARD
========================================================= */

function WorkflowCard({ number, icon, title, description }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06]">

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400">
          {icon}
        </div>

        <span className="text-5xl font-black text-white/5">
          {number}
        </span>

      </div>

      <h3 className="mt-7 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 leading-relaxed text-slate-400">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   TECHNOLOGY POINT
========================================================= */

function TechnologyPoint({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-slate-300">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/10 text-teal-400">
        {icon}
      </div>

      <span>{text}</span>

    </div>
  );
}