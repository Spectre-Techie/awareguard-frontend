import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ReportScam = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scamType: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_9ql31ve', // e.g., service_tasprints
        'template_ppsf848', // e.g., template_scamreport
        formData,
        'vrU56Nkn4gGfqc3nG'   // e.g., wOPQzEx9_hsYeEXAMPLE
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmitted(true);
        },
        (error) => {
          console.error(error.text);
          alert('❌ Failed to send: ' + error.text);
        }
      );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-200 text-gray-900">
      <main className="flex-grow px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">Report a Scam</h1>
        <p className="text-gray-800 font-semibold text-center mb-10">
          Help us protect others by reporting suspicious activity or scams you've encountered.
        </p>

        {submitted ? (
          <div className="bg-green-50 text-green-700 p-6 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-2">Thank you for reporting!</h2>
            <p>We’ve received your report and will look into it.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 border border-gray-700 p-6 rounded-xl shadow-lg space-y-5"
          >
            <div>
              <label className="block font-semibold mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder='Muhammad Galo'
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 font-semibold text-gray-800  border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder='abcd@gmail.com'
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border font-semibold text-gray-800 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Type of Scam</label>
              <select
                name="scamType"
                required
                value={formData.scamType}
                onChange={handleChange}
                className="w-full p-3 border font-semibold text-gray-800 rounded-lg bg-slate-100"
              >
                <option value="">Select...</option>
                <option value="phishing">Phishing</option>
                <option value="fake store">Fake Store</option>
                <option value="investment fraud">Investment Fraud</option>
                <option value="impersonation">Impersonation</option>
                <option value="romance scam">Romance Scam</option>
                <option value="job scam">Job Scam</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full h-32 p-3 border font-semibold text-gray-800 rounded-lg resize-none"
                placeholder="Explain how the scam happened, links involved, etc."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-semibold py-3 rounded-full hover:bg-gray-700 transition"
            >
              Submit Report
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default ReportScam;
