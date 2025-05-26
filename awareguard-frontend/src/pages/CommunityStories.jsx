import React from 'react';

const stories = [
  {
    title: "I Almost Lost ₦250,000",
    name: "Adaobi E.",
    content:
      "I received a WhatsApp message about a job offer from a supposed HR manager. They sent me a form and requested an ‘application fee’. Thankfully, I paused and checked the company website — the HR name didn’t exist. AwareGuard helped confirm it was a scam.",
  },
  {
    title: "Too Good to Be True",
    name: "Tolu A.",
    content:
      "I was told I won a foreign lottery and needed to pay shipping fees. I almost fell for it until I searched for similar scam stories and realized it was the same pattern.",
  },
  {
    title: "Crypto Investment Scam",
    name: "Yusuf M.",
    content:
      "A friend introduced me to a Telegram group promising double returns on crypto investments. I sent ₦50,000 and never heard from them again. Lesson learned: if it sounds too good to be true, it probably is.",
  },
  {
    title: "Fake Online Store",
    name: "Ngozi K.",
    content:
      "I saw an Instagram ad selling discounted sneakers. I paid via transfer and never got the product. The page disappeared a week later.",
  },
  {
    title: "Romance Gone Wrong",
    name: "Daniel A.",
    content:
      "I met someone on Facebook who claimed to live abroad. We chatted for weeks before she asked for money for 'medical emergencies'. That’s when I knew something was off.",
  },
  {
    title: "Fake Loan App Trap",
    name: "Bola T.",
    content:
      "I downloaded a loan app that promised instant cash. After giving them access to my contacts and photos, they started threatening messages when I delayed payment. It was a nightmare.",
  },
  {
    title: "Job Interview Scam",
    name: "Chinedu L.",
    content:
      "I got an interview invite at a fake office. They asked me to pay for registration and ID card. I left immediately and reported it on AwareGuard.",
  },
  {
    title: "Facebook Hacking Scam",
    name: "Halima D.",
    content:
      "A friend's hacked Facebook account messaged me about a grant opportunity. I applied and was asked to pay processing fees. I almost paid until I called the real friend to verify.",
  },
  {
    title: "Impersonated Bank Alert",
    name: "Kingsley I.",
    content:
      "I received a text from someone claiming to be from my bank's fraud unit. They asked for my OTP to 'secure my account'. I nearly gave it away but remembered never to share OTPs.",
  },
  {
    title: "Online Marketplace Deceit",
    name: "Uche M.",
    content:
      "I tried to buy a used laptop from someone on Jiji. The seller insisted I pay a delivery fee first. I never got the laptop.",
  },
  {
    title: "Scholarship Scam",
    name: "Fatima B.",
    content:
      "An email claimed I won a scholarship abroad. They asked for visa processing fees. I called the school directly and confirmed there was no such program.",
  },
  {
    title: "Fake NGO Donation",
    name: "Ibrahim S.",
    content:
      "A supposed NGO messaged me to help feed orphans. I donated ₦10,000. Later found out the NGO didn't exist and others were scammed too.",
  },
  {
    title: "Phishing Email",
    name: "Opeyemi F.",
    content:
      "I got an email that looked exactly like my bank’s. It asked me to 'verify my login'. I clicked the link but my instinct told me to stop. I changed my password immediately.",
  },
  {
    title: "Airtime Flipping Lie",
    name: "Zainab Y.",
    content:
      "Someone promised to flip ₦1,000 airtime into ₦5,000 in 10 minutes. I sent it and got blocked. These are everywhere on WhatsApp groups.",
  },
  {
    title: "Instagram Influencer Fraud",
    name: "Taiwo O.",
    content:
      "An influencer was advertising a cheap iPhone reseller. I ordered, paid, and never received the phone. Turns out the influencer’s account was hacked.",
  },
  {
    title: "Job Agency Scam",
    name: "Michael N.",
    content:
      "A job agency collected ₦15,000 for documentation. They kept postponing my start date for weeks. Eventually, I realized it was all fake.",
  },
  {
    title: "Medical Donation Scam",
    name: "Blessing J.",
    content:
      "I saw a viral tweet asking for urgent funds for a baby’s surgery. Something felt off. I checked AwareGuard and found it was previously reported as fake.",
  },
  {
    title: "eCommerce Scam Alert",
    name: "Joseph T.",
    content:
      "A site was offering electronics at 70% off. I made a purchase but no confirmation. Luckily, I paid using a traceable platform and got refunded later.",
  },
  {
    title: "Lost Wallet Scam",
    name: "Salma A.",
    content:
      "I got a message from someone who found my 'lost wallet' and wanted to return it — for a transport fee. But I hadn’t even lost my wallet.",
  },
  {
    title: "Scam WhatsApp Group",
    name: "David K.",
    content:
      "A group promised to teach crypto trading secrets for ₦5,000. Once I paid, they removed me. That was the end of it.",
  },
];


const CommunityStories = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-200 text-gray-900">
   

      <main className="flex-grow px-6 py-16 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary mb-4">Community Stories</h1>
        <p className="text-center font-semibold text-gray-800 max-w-xl mx-auto mb-10">
          Real experiences from people just like you. Learn from their stories and stay alert.
        </p>

        <div className="grid gap-6">
          {stories.map((story, index) => (
            <div key={index} className="bg-slate-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-primary mb-1">{story.title}</h3>
              <p className="text-gray-800 font-semibold text-sm mb-2 italic">— {story.name}</p>
              <p className=" font-semibold text-gray-700">{story.content}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            disabled
            className="bg-gray-900 text-white px-6 py-3 rounded-full opacity-60 cursor-not-allowed"
          >
            Submit Your Story (Coming Soon)
          </button>
        </div>
      </main>

     
    </div>
  );
};

export default CommunityStories;
