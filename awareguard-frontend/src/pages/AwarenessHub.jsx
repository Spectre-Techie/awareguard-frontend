import React from 'react';

import { Link } from 'react-router-dom';

const AwarenessHub = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-200 text-gray-900">
      

      <main className="flex-grow px-6 py-16 max-w-7xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Awareness Hub</h1>
          <p className="mt-4 text-gray-800 font-semibold max-w-2xl mx-auto">
            Welcome to the AwareGuard Knowledge Center — your trusted space to learn, explore, and stay ahead of online scams. Empower yourself with verified knowledge.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-100 p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-primary">Common Scam Tactics</h3>
            <p className="text-gray-900 mb-4">
              Learn how fraudsters operate — from phishing emails to fake investment sites. Understand their playbook so you don’t fall victim.
            </p>
            <Link
              to="/learn"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Explore scam types →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-100 p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-primary">Real-Life Stories</h3>
            <p className="text-gray-900 mb-4">
              Read verified stories from real victims and survivors. Learn from their experiences and how they recovered or reported scams.
            </p>
            <Link to="/stories" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
              Read community stories →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-100  p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-primary">Ask Our AI Assistant</h3>
            <p className="text-gray-900 mb-4">
              Got a suspicious message or unsure about a website? Ask our AI assistant in seconds for immediate guidance and safety tips.
            </p>
            <Link
              to="/ask"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Ask AwareGuard →
            </Link>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-100 p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-primary">Protect Yourself Online</h3>
            <p className="text-gray-900 mb-4">
              Stay up-to-date with the latest protection tips — from password hygiene to detecting suspicious links, emails, and profiles.
            </p>
            <a
              href="https://staysafeonline.org" target="_blank" rel="noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              View online safety guide →
            </a>
          </div>
        </section>

        <section className="mt-16 bg-primary/5 p-6 md:p-10 rounded-2xl">
          <h2 className="text-2xl font-bold text-primary mb-4">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-6 font-semibold text-gray-900">
            <div>
              <h4 className="font-bold">How do I know if a message is a scam?</h4>
              <p>
                Look for signs like urgency, unknown senders, poor grammar, or requests for personal info. Ask our AI or check our Learn page for guidance.
              </p>
            </div>

            <div>
              <h4 className="font-bold">Is reporting scams safe and anonymous?</h4>
              <p>
                Yes. You can submit scam reports anonymously or with your contact email so we can follow up. Your data is encrypted and kept secure.
              </p>
            </div>

            <div>
              <h4 className="font-bold">Can scammers impersonate real organizations?</h4>
              <p>
                Absolutely. Scammers often copy logos, emails, and domains to trick users. Always verify sources and URLs carefully.
              </p>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
};

export default AwarenessHub;
