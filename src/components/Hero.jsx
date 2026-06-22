export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-teal-900 via-teal-700 to-emerald-500 text-white py-24">

      <div className="max-w-6xl mx-auto text-center px-6">

        <h1 className="text-6xl font-bold mb-6">
          AI-Powered Guest Review Classifier
        </h1>

        <p className="text-2xl max-w-4xl mx-auto mb-10">
          Analyze guest reviews, detect sentiments, and discover valuable
          insights to improve customer satisfaction using Artificial Intelligence.
        </p>

        <button className="bg-white text-teal-700 px-8 py-4 rounded-xl text-xl font-semibold shadow-lg hover:scale-105 transition">
          Get Started →
        </button>

      </div>

    </section>
  );
}