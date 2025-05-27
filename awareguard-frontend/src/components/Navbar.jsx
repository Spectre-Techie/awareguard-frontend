// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-700">
              AwareGuard
            </Link>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-900 font-semibold font-medium hover:text-blue-600">Home</Link>
            <Link to="/learn" className="text-gray-900 font-semibold hover:text-blue-600">Learn</Link>
            <Link to="/ask" className="text-gray-900 font-semibold hover:text-blue-600">Ask AI</Link>
            <Link to="/report" className="text-gray-900 font-semibold hover:text-blue-600">Report Scam</Link>
            <Link to="/hub" className="text-gray-900 font-semibold hover:text-blue-600">Awareness Hub</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 font-semibold focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" className="block py-2 font-semibold text-gray-900 hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/learn" className="block py-2 font-semibold text-gray-900 hover:text-blue-600" onClick={() => setIsOpen(false)}>Learn</Link>
          <Link to="/ask" className="block py-2 font-semibold text-gray-900 hover:text-blue-600" onClick={() => setIsOpen(false)}>Ask AI</Link>
          <Link to="/report" className="block py-2 font-semibold text-gray-900 hover:text-blue-600" onClick={() => setIsOpen(false)}>Report Scam</Link>
          <Link to="/hub" className="block py-2 font-semibold text-gray-900 hover:text-blue-600" onClick={() => setIsOpen(false)}>Awareness Hub</Link>
        </div>
      )}
    </nav>
  );
}
