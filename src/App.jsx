import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import FeastGallerySection from './components/FeastGallerySection';
import { Analytics } from "@vercel/analytics/react"

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const containerClasses = isHomePage
    ? 'bg-[#194E2E] text-white'
    : 'bg-[#FDF8E1] text-[#13381A]';

  const mainClasses = isHomePage
    ? '' // No padding for home page so hero can extend to top
    : 'pt-24'; // Padding for other pages

  return (
    <div className={`font-sans text-base antialiased overflow-x-hidden ${containerClasses}`}>
      <Navbar />
      <Analytics/>
      <main className={mainClasses}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;