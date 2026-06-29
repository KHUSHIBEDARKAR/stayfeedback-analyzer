export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-teal-900 via-teal-700 to-emerald-500 text-white py-24">
      <div className="max-w-6xl mx-auto text-center px-6">

        <h1 className="text-6xl font-bold mb-6">
          AI-Powered Guest Review Classifier
        </h1>

        <p className="text-2xl max-w-4xl mx-auto mb-10">
          Analyze homestay guest reviews, identify sentiments, classify review
          themes, and generate AI-powered management responses to improve guest
          satisfaction.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-white text-teal-700 px-8 py-4 rounded-xl text-xl font-semibold shadow-lg hover:scale-105 transition">
            Analyze Reviews →
          </button>

          <button className="border-2 border-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-white hover:text-teal-700 transition">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}