import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 font-semibold text-white py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AwareGuard. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-blue-400 text-sm">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 text-sm">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 text-sm">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
