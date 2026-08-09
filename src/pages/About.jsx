import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white md:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Main Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 md:p-12">

          {/* Heading */}
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              About
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              About{" "}
              <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                Homestay AI
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-400">
            Homestay AI is an intelligent review analysis platform that
            uses Artificial Intelligence and Machine Learning to analyze
            guest feedback, detect sentiments, and identify key themes
            for better business decisions.
          </p>

          {/* Highlights */}
          <div className="mt-8 grid gap-5 sm:grid-cols-3">

            {/* AI Analysis */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-2xl dark:bg-teal-500/10">
                🤖
              </div>

              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                AI Analysis
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Intelligent review classification using AI and Machine
                Learning.
              </p>
            </div>

            {/* Analytics */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl dark:bg-emerald-500/10">
                📊
              </div>

              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                Analytics
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Understand guest feedback through meaningful analytics.
              </p>
            </div>

            {/* Smart Insights */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-2xl dark:bg-cyan-500/10">
                💡
              </div>

              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                Smart Insights
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Discover patterns and insights to support better decisions.
              </p>
            </div>

          </div>

          {/* How It Works */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/40">
            <h2 className="text-2xl font-bold">
              How Homestay AI Works
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-3">

              <div>
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                  01
                </span>

                <h3 className="mt-2 font-semibold">
                  Collect Reviews
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Collect guest reviews and feedback from different sources.
                </p>
              </div>

              <div>
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                  02
                </span>

                <h3 className="mt-2 font-semibold">
                  Analyze with AI
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  AI analyzes sentiment and identifies important themes.
                </p>
              </div>

              <div>
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                  03
                </span>

                <h3 className="mt-2 font-semibold">
                  Get Insights
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Convert feedback into useful business insights.
                </p>
              </div>

            </div>
          </div>

          {/* Useful Links */}
          <div className="mt-10">

            <h2 className="mb-2 text-2xl font-semibold text-teal-600 dark:text-teal-400">
              Useful Links
            </h2>

            <p className="mb-5 text-slate-500 dark:text-slate-400">
              Explore your analytics or return to the Homestay AI homepage.
            </p>

            <div className="flex flex-wrap gap-4">

              {/* Dashboard */}
              <Link
                to="/dashboard"
                className="rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-3 font-semibold text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-teal-500/40"
              >
                View Dashboard →
              </Link>

              {/* Home */}
              <Link
                to="/"
                className="rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:text-teal-400"
              >
                ← Back to Home
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Making guest feedback smarter with AI.
        </p>

      </div>
    </main>
  );
}