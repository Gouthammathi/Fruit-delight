import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaApple, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [contentBgColor, setContentBgColor] = useState('#194E2E');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Debounced scroll handler
  const debouncedScrollHandler = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Always show header at the top
    if (currentScrollY <= 0) {
      setIsVisible(true);
      setLastScrollY(currentScrollY);
      return;
    }
    
    // Determine scroll direction and show/hide header
    const isScrollingDown = currentScrollY > lastScrollY;
    const isScrollingUp = currentScrollY < lastScrollY;
    
    if (isScrollingDown && isVisible) {
      setIsVisible(false);
    } else if (isScrollingUp && !isVisible) {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      // Only update background color, not visibility
      const scrollPosition = window.scrollY;
      let newContentBgColor = '#194E2E'; // Default dark green
      if (isHomePage) {
        const sections = ['home', 'features', 'plans', 'lifecycle', 'benefits', 'gallery', 'story', 'testimonials', 'contact'];
        const lightSections = ['contact'];
        const darkTextSections = ['features', 'lifecycle', 'benefits', 'testimonials'];
        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i]);
          if (element && element.offsetTop <= scrollPosition + 100) {
            if (lightSections.includes(sections[i])) {
              newContentBgColor = '#FDF8E1';
            } else if (darkTextSections.includes(sections[i])) {
              newContentBgColor = '#194528';
            } else {
              newContentBgColor = '#194E2E';
            }
            break;
          }
        }
      } else {
        newContentBgColor = '#FDF8E1';
      }
      setContentBgColor(newContentBgColor);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  // Determine text color based on content background
  const getTextColor = () => {
    if (contentBgColor === '#13381A' || contentBgColor === '#194E2E') {
      return 'text-[#FDF8E1]'; // Beige text on dark content backgrounds
    } else if (contentBgColor === '#194528') {
      return 'text-[#194528]'; // Dark green text on sections with dark text
    } else {
      return 'text-[#13381A]'; // Dark green text on light content backgrounds
    }
  };

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'Plans', id: 'plans' },
    { name: 'Our Story', id: 'story' },
    { name: 'Testimonials', id: 'testimonials' },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const navClasses = `
    fixed top-3 left-1/2 z-50 w-4/5 max-w-8xl -translate-x-1/2
    rounded-2xl px-3 py-1
    border transition-all duration-300 ease-in-out bg-transparent
    backdrop-blur-lg border-white/20 shadow-lg
  `;

  const mobileMenuClasses = `
    md:hidden absolute left-0 right-0 top-full mt-2 mx-auto w-full 
    rounded-2xl shadow-glass backdrop-blur-lg border pb-4 z-40
    ${isHomePage ? 'bg-black/30 border-white/10' : 'bg-[#FDF8E1]/95 border-neutral-light'}
  `;

  const textColor = getTextColor();

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      className={navClasses}
    >
      <div className="flex items-center justify-between h-12">
        {/* Logo */}
        <div
          className="flex-shrink-0 flex items-center gap-2 cursor-pointer select-none hover:scale-105 transition-transform duration-200"
          onClick={() => scrollToSection('home')}
        >
          <img src={logo} alt="Fruit Delight Logo" className="h-8 w-8 object-contain" style={{marginRight: '0.5rem'}} />
          <span
            className={`font-brand text-xl font-bold drop-shadow-sm transition-colors duration-500 ${textColor}`}
            style={{ fontFamily: "'Thesla Ohago', Magilio, Pacifico, Quicksand, Poppins, cursive, sans-serif" }}
          >
            Fruit Delight
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className={`font-semibold hover:text-[#D7E455] transition-all duration-500 hover:scale-110 focus:outline-none ${textColor}`}
            >
              {link.name}
            </button>
          ))}
          <button
            className="bg-[#F88A42] shadow-lg text-[#FDF8E1] font-bold px-6 py-2 rounded-full hover:bg-[#E0793A] hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F88A42]"
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`hover:text-[#D7E455] focus:outline-none transition-colors duration-500 ${textColor}`}
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25, type: 'spring', stiffness: 120, damping: 18 }}
            className={mobileMenuClasses}
            style={{ maxWidth: 'calc(100vw - 1.5rem)' }}
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={`font-semibold hover:text-[#D7E455] transition-all duration-500 hover:scale-110 ${textColor}`}
                  variants={menuItemVariants}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                variants={menuItemVariants}
                className="bg-[#F88A42] text-[#FDF8E1] font-bold px-6 py-2 rounded-full hover:bg-[#E0793A] hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F88A42]"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 