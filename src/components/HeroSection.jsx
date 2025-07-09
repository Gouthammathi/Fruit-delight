import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

// Import a high-quality, relevant image for the hero section
import heroImage from '../assets/bowl.png';
import leaff from '../assets/leaves/leaff.png';
import farmFresh from '../assets/hero/Farm-Fresh.png';
import healthyFood from '../assets/hero/Healthy Food.png';
import quickDelivery from '../assets/hero/Quick Delivery.png';
import group2 from '../assets/hero/Group 2.png';

const leafVariants = {
  hidden: (custom) => ({
    opacity: 0,
    scale: 0.7,
    rotate: custom.rotate - 30,
    y: custom.y || 0,
    x: custom.x || 0,
  }),
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    rotate: custom.rotate,
    y: 0,
    x: 0,
    transition: { duration: 0.9, delay: custom.delay || 0, type: 'spring', stiffness: 60 }
  })
};

const leaves = [
  { className: "top-4 left-8 w-16 h-16 rotate-12 z-10 opacity-80", rotate: 12, delay: 0.1 },
  { className: "top-10 right-10 w-24 h-24 -rotate-45 z-10 opacity-70", rotate: -45, delay: 0.2 },
  { className: "bottom-10 left-20 w-32 h-32 rotate-45 z-10 opacity-75", rotate: 45, delay: 0.3 },
  { className: "top-1/2 right-12 w-28 h-28 rotate-60 z-10 opacity-100", rotate: 60, delay: 0.4 },
  { className: "bottom-8 left-1/2 w-16 h-16 rotate-24 z-10", rotate: 24, delay: 0.5 },
];

const textContainer = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

const textItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-background flex flex-col items-center justify-center pt-16 pb-4 overflow-hidden">
      <div className="w-full flex justify-center items-center min-h-screen">
        <div className="w-[900px] max-w-3xl min-h-[700px] rounded-2xl overflow-hidden shadow-lg bg-background flex flex-col justify-center mx-auto">
      {/* Noise Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/noise.png)'}} />
      {/* Spiral Burst Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "repeating-conic-gradient(#388e3c 0deg 10deg, #7ed957 10deg 20deg)",
          opacity: 0.70,
          WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)",
          maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)",
          filter: "blur(.8px)"
        }}
      />
      {/* Animated Decorative Leaves - only leaff.png */}
      {leaves.map((leafProps, idx) => (
        <motion.img
          key={idx}
          src={leaff}
          alt="Leaf"
          className={`absolute ${leafProps.className} hidden xs:block`}
          custom={leafProps}
          variants={leafVariants}
          initial="hidden"
          animate="visible"
        />
      ))}
      {/* Centered Hero Image */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        {/* <img src={heroImage} alt="Fruit Box" className="w-60 h-60 sm:w-80 sm:h-80 object-contain opacity-95" /> */}
      </div>
      {/* Background Shapes */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-accent/10 rounded-full filter blur-3xl opacity-50"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Badges/Assets */}
      <img src={healthyFood} alt="Healthy Food" className="absolute top-100 left-1/4 w-16 sm:w-28 rotate-[-20deg] z-30 transition-transform duration-300 hover:-translate-y-3 hover:scale-105 hover:drop-shadow-2xl" style={{filter:'drop-shadow(0 2px 8px #0002)'}} />
      {/* <img src={farmFresh} alt="Farm Fresh" className="absolute top-[30%] left-[20%] w-16 sm:w-32 rotate-[-8deg] z-30 transition-transform duration-300 hover:-translate-y-3 hover:scale-105 hover:drop-shadow-2xl" style={{filter:'drop-shadow(0 2px 8px #0002)'}} /> */}
      <img src={quickDelivery} alt="Quick Delivery" className="absolute top-1/2 right-1/4 w-16 sm:w-28 rotate-[10deg] z-30 transition-transform duration-300 hover:-translate-y-3 hover:scale-105 hover:drop-shadow-2xl" style={{filter:'drop-shadow(0 2px 8px #0002)'}} />

      <div className="max-w-3xl mx-auto px-8 z-10 w-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          {/* Left Column: Text Content */}
          <motion.div
            className="flex flex-col items-center justify-center col-span-2 relative"
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Large Fresh text above the image */}
            <motion.h1
              className="text-6xl font-extrabold text-center mt-4 font-thanks-autumn relative inline-block"
              style={{ color: '#D7E455', zIndex: 30 }}
              variants={textItem}
            >
              Health
              <span className="relative inline-block align-baseline" style={{ width: '1em', height: '1em' }}>
                y
                <img 
                  src={group2} 
                  alt="Group 2" 
                  className="absolute right-[-0.1em] -top-2 w-[.5em] h-auto rotate-12 pointer-events-none select-none z-50 transition-transform duration-300 hover:-translate-y-3 hover:scale-110 hover:drop-shadow-2xl"
                  style={{ pointerEvents: 'none' }}
                />
              </span>
            </motion.h1>
            <motion.p
              className="text-4xl font-semibold text-center text-[#FDF8E1] mt-2 mb-2 font-sunshine text-outline-orange"
              variants={textItem}
            >
              Starts  Here
            </motion.p>
            {/* Maximized Hero Image */}
            <div className="relative flex items-center justify-center w-full">
              <motion.img
                src={heroImage}
                alt="Fruit Bowl"
                className="w-[22rem] h-auto object-contain z-20 drop-shadow-2xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              />
            </div>
            {/* Subheading below everything */}
            <p className="mt-8 text-4xl font-thanks-autumn text-[#D6DC64] tracking-wide drop-shadow-lg max-w-xl mx-auto text-center">
              Enjoy a healthier life with <br/><span className="font-magilio text-[#F88B42] drop-shadow-md text-outline-cream">Nutrient-Rich, Freshly-Cut</span> <br/>Fruit Boxes.
            </p>
            <div className="mt-8 flex justify-center">
              <a 
                href="#plans" 
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-[#FDF8E1] font-semibold px-8 py-3 rounded-full shadow-md border border-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 group text-base"
              >
                Order Now
                <span className="inline-flex items-center justify-center bg-[#FDF8E1] rounded-full p-1 ml-1 shadow-sm transition-all duration-300 group-hover:bg-orange-100">
                  <FaArrowRight className="h-5 w-5 text-orange-500 group-hover:text-orange-600 transition-all duration-300" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 