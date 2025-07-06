import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaUsers, FaStar } from 'react-icons/fa';
import quotebggg from '../assets/leaves/quotebggg.png';

// Import a high-quality, relevant image for the story section

const StorySection = () => {
  return (
    <section id="story" className="py-24 bg-background relative overflow-hidden quotebggg-section">
      {/* Overlay for readability if needed */}
      <div className="absolute inset-0 bg-background/90 z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 lg:gap-24 lg:items-center">
          {/* Left Side: Image */}
          {/* Removed image container */}

          {/* Right Side: Content */}
          <motion.div
            className="mt-12 lg:mt-0 lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-brand text-4xl md:text-5xl font-bold text-primary" style={{ color: '#FDF8E1' }}>
              Our Passion for Freshness
            </h2>
            <p className="mt-4 text-lg text-[#FDF8E1] leading-relaxed">
              It all began with a simple idea: make healthy eating easy and delightful. We saw that people loved fresh fruit but lacked the time for the daily chore of washing, cutting, and preparing.
            </p>
            <p className="mt-4 text-lg text-[#FDF8E1] leading-relaxed">
              Today, we're a passionate team dedicated to delivering that "just-cut" freshness right to your door, making nutritious choices an effortless part of your day.
            </p>

            {/* Values */}
            <div className="mt-8 grid grid-cols-2 gap-6 text-[#FDF8E1]">
              <div className="flex items-center gap-3">
                <FaLeaf className="h-6 w-6 text-[#FDF8E1]" />
                <span className="font-bold text-primary">Quality First</span>
              </div>
              <div className="flex items-center gap-3">
                <FaHeart className="h-6 w-6 text-accent" />
                <span className="font-bold text-primary">Customer Love</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers className="h-6 w-6 text-accent" />
                <span className="font-bold text-primary">Community Focused</span>
              </div>
              <div className="flex items-center gap-3">
                <FaStar className="h-6 w-6 text-accent" />
                <span className="font-bold text-primary">Daily Excellence</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection; 