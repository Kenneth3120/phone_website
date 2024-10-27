import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Model from './components/Model';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import * as Sentry from '@sentry/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <main className="bg-black">
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> Home Route */}
          {/* Add other routes if you have separate pages */}
        </Routes>
        <Hero />
        <Highlights />
        <Model />
        <Features />
        <HowItWorks />
        <Footer />
      </main>
    </Router>
  );
};

export default Sentry.withProfiler(App);
