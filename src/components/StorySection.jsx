import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaUsers, FaStar } from 'react-icons/fa';
import avatar from '../assets/avatar.jpg';

// Import a high-quality, relevant image for the story section

const StorySection = () => {
  return (
    <section id="story" className="py-24 bg-background relative overflow-hidden quotebggg-section">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ color: '#FDF8E1' }}>
        A note from our founder.
      </h2>
      {/* Overlay for readability if needed */}
      <div className="absolute inset-0 bg-background/90 z-0 pointer-events-none" />
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 rounded-3xl border border-white/40 backdrop-blur-md bg-white/10 p-6 sm:p-10 lg:p-16">
          {/* Left Side: Image Card */}
          <div className="flex-shrink-0 w-full max-w-sm flex justify-center items-center">
            <div className="bg-white rounded-2xl p-2 flex items-center justify-center" style={{ boxShadow: '0 2px 24px 0 rgba(0,0,0,0.04)' }}>
              <img
                src={avatar}
                alt="Anjaneyulu - Founder"
                className="rounded-2xl w-full h-auto object-cover"
                style={{ aspectRatio: '3/4', maxHeight: '420px' }}
              />
            </div>
          </div>
          {/* Right Side: Content */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#FDF8E1' }}>
              Meet Mr. Anjaneyulu, founder
            </h3>
            <p className="text-base md:text-lg mb-6" style={{ color: '#FDF8E1' }}>
              Hi, I'm Anjaneyulu, a working software engineer at a top MNC. My journey with fruits began out of pure passion and a deep understanding of their nutritional values. Inspired by the desire to make healthy living accessible, I started Fruit Delight to deliver the freshest, most hygienic fruit experiences to your doorstep.<br/><br/>
              Every box is packed with care, ensuring quality and cleanliness at every step. Join me in celebrating the joy of fresh fruits, and let’s make healthy choices simple, delightful, and part of every day!
            </p>
            <div className="mt-6">
              <div className="font-bold" style={{ color: '#FDF8E1' }}>Anjaneyulu, Founder & CEO</div>
              {/* Optionally, add a signature image or stylized signature font here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection; 