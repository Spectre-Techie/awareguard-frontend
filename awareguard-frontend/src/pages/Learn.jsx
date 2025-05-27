import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  MailWarning,
  ShoppingCart,
  Heart,
  Gift,
  Briefcase,
  X,
  Menu
} from 'lucide-react';

const scamTypes = [
  {
    title: 'Phishing Emails',
    icon: <MailWarning size={28} className="text-blue-600" />,
    description: 'Tricks you into revealing personal or financial information.',
  },
  {
    title: 'Online Shopping Scams',
    icon: <ShoppingCart size={28} className="text-blue-600" />,
    description: 'Fake e-commerce sites that take your money and vanish.',
  },
  {
    title: 'Romance Scams',
    icon: <Heart size={28} className="text-blue-600" />,
    description: 'Scammers pretending to love you to steal money.',
  },
  {
    title: 'Lottery & Prize Scams',
    icon: <Gift size={28} className="text-blue-600" />,
    description: '“You’ve won!” — but they want your money first.',
  },
  {
    title: 'Job Offer Scams',
    icon: <Briefcase size={28} className="text-blue-600" />,
    description: 'Too-good-to-be-true job offers asking for payment upfront.',
  },
  {
    title: 'Identity Theft',
    icon: <ShieldAlert size={28} className="text-blue-600" />,
    description: 'Scammers steal your personal info for malicious purposes.',
  },
];

const Learn = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      

      {/* Main Content */}
      <section className="pt-24 pb-12 px-4 md:px-10 bg-slate-200 min-h-screen text-gray-800">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Understand How Scams Work</h1>
          <p className="mt-4 text-gray-800 font-semibold text-lg">
            Learn the tactics scammers use so you can spot the red flags and protect yourself.
          </p>
          <Link
            to="/scams"
            className="mt-6 inline-block bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Explore Scam Types
          </Link>
        </div>

        {/* Scam Types Section */}
        <div id="scams" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {scamTypes.map((scam, index) => (
            <div
              key={index}
              className="bg-slate-100 border border-gray-800 rounded-xl p-6 hover:shadow-md transition"
            >
              <div className="mb-4">{scam.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{scam.title}</h3>
              <p className="text-gray-900 text-sm">{scam.description}</p>
              <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">
               <Link to="/scams">
                 Learn More →
                 </Link>
              </button>
            </div>
          ))}
        </div>

        {/* Red Flags Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Common Scam Red Flags</h2>
          <ul className="list-disc pl-6 text-gray-800 font-semibold space-y-2">
            <li>Urgency or threats to act immediately</li>
            <li>Requests for sensitive info via email or message</li>
            <li>Payment requests via gift cards or cryptocurrency</li>
            <li>Spelling errors or suspicious links</li>
            <li>Offers that are too good to be true</li>
          </ul>
        </div>

        {/* What to Do Section */}
        <div className="mt-20 bg-blue-50 rounded-xl p-8 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">If You Suspect a Scam</h2>
          <div className="space-y-3 font-semibold text-gray-750">
            <p><strong>1.</strong> Do not engage — avoid replying or clicking any links.</p>
            <p><strong>2.</strong> Collect evidence — take screenshots, save emails/messages.</p>
            <p><strong>3.</strong> Report the scam to <Link to="/report" className="text-blue-600 hover:underline">AwareGuard</Link>.</p>
          </div>
        </div>
        {/* Learn More Call to Action */}
          <div className="text-center bg-slate-200 p-6  rounded-xl">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Want to Learn More?
            </h2>
            <p className="text-gray-700 font-semibold mb-4">
              Visit our Awareness Hub or try our AI Assistant to get
              personalized guidance.
            </p>
            <div className="flex justify-center gap-4 ">
              <a
                href="/hub"
                className="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                Visit Awareness Hub
              </a>
              <a
                href="/ask"
                className="border border-gray-900 text-gray-800 font-semibold px-6 py-2 rounded hover:bg-gray-900 hover:text-white transition"
              >
                Chat with AwareGuard AI
              </a>
            </div>
          </div>
      </section>
    </>
  );
};

export default Learn;
