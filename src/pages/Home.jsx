import Hero from "../components/Hero";
import Card from "../components/Card";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <Card
              icon="😊"
              title="Sentiment Analysis"
              description="Detect positive, neutral and negative reviews using advanced AI models."
            />

            <Card
              icon="🔍"
              title="Theme Detection"
              description="Identify key themes like food, cleanliness, host behavior and location."
            />

            <Card
              icon="📊"
              title="Review Analytics"
              description="Visualize customer feedback trends and performance metrics."
            />

            <Card
              icon="🤖"
              title="AI Classification"
              description="Automatically classify guest reviews for better decision making."
            />

          </div>

        </div>
      </section>
    </>
  );
}