import { Link } from "react-router-dom";
import { ShieldAlert, MessageSquareText, Flag } from "lucide-react";
import aiShield from '../assets/aiShield.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <section className="bg-slate-100 py-16 px-4 text-center relative">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Stay Safe Online  <br />with AwareGuard <br /> 
        </h1>
        <p className="text-lg text-blue-800 font-semibold mb-6">
          Your AI-powered guide to scam awareness and online safety
        </p> <br />
        <Link
          to="/learn"
          className="bg-blue-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Get Started
        </Link>
        <div className="flex justify-center items-center p-4">
  <img src={aiShield} alt="AI Shield" className="max-w-sm w-full h-auto" />
</div>

      </section>

      {/* Scam Education Section */}
      <section className="py-16 px-4 bg-slate-100 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Learn How Scams Work</h2>
        <p className="text-gray-900 font-semibold mb-10">
          Explore different types of online scams and how to recognize
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Link
            to="/learn"
            className="bg-gray-800  p-6 rounded-lg hover:shadow-xl transition flex flex-col items-center"
          >
            <ShieldAlert className="h-10 w-10 text-blue-700 mb-2" />
            <h3 className="font-bold text-white mb-1">Learn How Scams Work</h3>
            <p className="text-sm  text-white">
              Explore different types of online scams and how to recognize them
            </p>
          </Link>

          <Link
            to="/ask"
            className="bg-gray-800 p-6 rounded-lg hover:shadow-xl transition flex flex-col items-center"
          >
            <MessageSquareText className="h-10 w-10 text-blue-700 mb-2" />
            <h3 className="font-bold text-white mb-1">Chat with AwareGuard AI</h3>
            <p className="text-sm  text-white">
              Get instant help and advice on potential scams with our AI assistant
            </p>
          </Link>

          <Link
            to="/report"
            className="bg-gray-800 p-6 rounded-lg hover:shadow-xl transition flex flex-col items-center"
          >
            <Flag className="h-10 w-10 text-blue-700 mb-2" />
            <h3 className="font-bold text-white mb-1">Report a Suspicious Activity</h3>
            <p className="text-sm text-white">
              Submit suspicious messages or websites for review
            </p>
          </Link>
        </div>
      </section>

      {/* Community Stories Section */}
      <section className="py-16 px-4 bg-blue-50 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Community Stories</h2>
        <p className="text-blue-700 font-semibold mb-10">
          Read real-life experiences and insights from others
        </p>
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-10 shadow-md text-left">
          <p className="text-gray-900 font-semibold italic">
      "I got an email that looked exactly like my bank’s. It asked me to 'verify my login'. I clicked the link but my instinct told me to stop. I changed my password immediately.",
          </p>
          <p className="mt-4 font-semibold text-blue-900">– Muhammad Galo.</p>
        </div>
         <Link to="/stories" className="text-blue-900 hover:underline mb-4 font-bold font-medium ">
                    Read more community stories →
                  </Link>
      </section>
     


      {/* Floating AI Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-blue-800 font-semibold text-white p-4 rounded-full shadow-lg hover:bg-blue-900 transition duration-300"
        >
         <Link to="/ask">
          💬 AI Assistant
         </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;