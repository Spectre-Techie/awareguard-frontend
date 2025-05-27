// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Learn from './pages/Learn'
import AskAwareGuard from './pages/AskAwareGuard'
import Report from './pages/Report'
import AwarenessHub from './pages/AwarenessHub'
import CommunityStories from './pages/CommunityStories'
import Scams from './pages/scams'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/ask" element={<AskAwareGuard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/hub" element={<AwarenessHub />} />
          <Route path="/stories" element={<CommunityStories />} />
          <Route path="scams" element={<Scams/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
