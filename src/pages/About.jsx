export default function About() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-teal-700">
        About Homestay AI
      </h1>

      <p className="text-lg text-gray-600 leading-8">
        Homestay AI is an intelligent review analysis platform that
        uses Artificial Intelligence and Machine Learning to analyze
        guest feedback, detect sentiments, and identify key themes
        for better business decisions.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-teal-700">
          Useful Links
        </h2>

        <div className="flex flex-wrap gap-4">
          <a
            href="/dashboard"
            className="bg-teal-700 text-white px-5 py-3 rounded-lg hover:bg-teal-800 transition"
          >
            View Dashboard
          </a>

          <a
            href="/"
            className="border border-teal-700 text-teal-700 px-5 py-3 rounded-lg hover:bg-teal-700 hover:text-white transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
