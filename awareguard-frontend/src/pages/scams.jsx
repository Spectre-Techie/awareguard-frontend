import React from 'react';
import { Link } from 'react-router-dom';
import {
  MailWarning,
  ShoppingCart,
  Heart,
  Gift,
  Briefcase,
  ShieldAlert,
} from 'lucide-react';

const scamCategories = [
  {
    title: 'Phishing Emails',
    icon: <MailWarning size={28} className="text-blue-700" />,
    slug: 'phishing-emails',
    description: 'Phishing emails are designed to trick you into revealing personal or financial information. These messages often look legitimate and may pretend to be from banks, service providers, or even government agencies.',
    warningSigns: [
      'Unexpected emails requesting login or payment info',
      'Suspicious links or attachments',
      'Spelling or grammar errors',
    ],
    tips: [
      'Never click on suspicious links.',
      'Always verify sender addresses.',
      'Use spam filters and two-factor authentication.',
    ],
  },
  {
    title: 'Online Shopping Scams',
    icon: <ShoppingCart size={28} className="text-blue-700" />,
    slug: 'shopping-scams',
    description: 'These scams involve fake e-commerce websites or social media ads that trick users into paying for products that never arrive.',
    warningSigns: [
      'Too-good-to-be-true deals',
      'No customer service contact or reviews',
      'Requests for payment via crypto or wire transfer',
    ],
    tips: [
      'Shop from trusted websites.',
      'Use secure payment methods like credit cards.',
      'Check reviews before purchasing.',
    ],
  },
  {
    title: 'Romance Scams',
    icon: <Heart size={28} className="text-blue-700" />,
    slug: 'romance-scams',
    description: 'Scammers pretend to be romantically interested in you, often on dating sites or social platforms, to eventually ask for money.',
    warningSigns: [
      'Love bombing early in a conversation',
      'Excuses to avoid video calls or meeting in person',
      'Requests for financial help due to emergencies',
    ],
    tips: [
      'Never send money to someone you’ve never met.',
      'Be cautious with online relationships.',
      'Talk to someone you trust if you feel unsure.',
    ],
  },
  {
    title: 'Lottery & Prize Scams',
    icon: <Gift size={28} className="text-blue-700" />,
    slug: 'lottery-scams',
    description: 'These scams claim you’ve won a prize, but ask for personal info or payment before you can claim it.',
    warningSigns: [
      'Being asked to pay “processing” or “delivery” fees',
      'Unsolicited messages saying you’ve won',
      'Pressure to respond quickly',
    ],
    tips: [
      'You can’t win a contest you didn’t enter.',
      'Never pay to receive a prize.',
      'Report suspicious messages to authorities.',
    ],
  },
  {
    title: 'Job Offer Scams',
    icon: <Briefcase size={28} className="text-blue-700" />,
    slug: 'job-scams',
    description: 'Fake job offers that ask for personal information or upfront payment for training or equipment.',
    warningSigns: [
      'Promises of high pay for little work',
      'Requests for money to secure the job',
      'No interview or vague job details',
    ],
    tips: [
      'Research the company and job offer.',
      'Never pay to get hired.',
      'Verify the job posting from the official site.',
    ],
  },
  {
    title: 'Identity Theft',
    icon: <ShieldAlert size={28} className="text-blue-700" />,
    slug: 'identity-theft',
    description: 'Scammers steal your personal information to commit fraud, open accounts, or make purchases in your name.',
    warningSigns: [
      'Unfamiliar charges on your account',
      'Missing bills or denied applications',
      'Debt collectors calling for unknown accounts',
    ],
    tips: [
      'Monitor your bank and credit reports regularly.',
      'Use strong, unique passwords.',
      'Report suspected theft immediately to authorities.',
    ],
  },
];

const Scams = () => {
  return (
    <section className="pt-24 pb-16 px-4 md:px-12 bg-slate-200 min-h-screen text-gray-800">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Common Types Of Scam </h1>
        <p className="text-lg font-semibold text-gray-900">
          Each scam has its own red flags and tactics. Learn how to identify and protect yourself from them.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
        {scamCategories.map((scam, index) => (
          <div key={index} className="bg-slate-100 border border-gray-800 rounded-xl p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              {scam.icon}
              <h2 className="text-xl font-semibold text-gray-900">{scam.title}</h2>
            </div>
            <p className="mb-4 font-semibold text-gray-700">{scam.description}</p>

            <div className="mb-3">
              <h3 className="font-semibold text-blue-800">⚠️ Warning Signs:</h3> 
              <ul className="list-disc pl-5 font-semibold text-gray-700 text-sm">
                {scam.warningSigns.map((sign, i) => (
                  <li key={i}>{sign}</li>
                ))}
              </ul>
            </div> <br />

            <div className="mb-6">
              <h3 className="font-semibold text-blue-800">✅ How to Stay Safe:</h3> 
              <ul className="list-disc pl-5 font-semibold text-gray-700 text-sm">
                {scam.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>

      <div className="text-center mt-20">
        <p className="text-gray-700 font-medium mb-4">Need more help understanding scams?</p>
        <Link
          to="/ask"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Chat with AwareGuard AI
        </Link>
      </div>
    </section>
  );
};

export default Scams;
