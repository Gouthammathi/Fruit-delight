import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaTruck, FaShieldAlt, FaUtensils, FaRecycle, FaStar } from 'react-icons/fa';
import quotebg from '../assets/leaves/quotebg.png';

const FeaturesSection = () => {
  const features = [
    {
      icon: FaUtensils,
      title: 'Ready-to-Eat',
      description: 'Perfectly cut fruit, ready to enjoy immediately. No prep work, no mess.',
    },
    {
      icon: FaLeaf,
      title: 'Peak Freshness',
      description: 'We source the highest quality fruits and cut them fresh daily for you.',
    },
    {
      icon: FaTruck,
      title: 'Convenient Delivery',
      description: 'Reliable, same-day delivery brings fresh fruit boxes right to your doorstep.',
    },
    {
      icon: FaShieldAlt,
      title: 'Hygienically Packed',
      description: 'Processed and packed in a sterile environment for your safety and peace of mind.',
    },
    {
      icon: FaRecycle,
      title: 'Sustainable Packaging',
      description: 'Our eco-friendly packaging is good for you and the planet.',
    },
    {
      icon: FaStar,
      title: 'Premium Quality',
      description: 'We are committed to providing an exceptional product and experience.',
    },
  ];

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section
      id="features"
      className="py-8 sm:py-24 bg-[#FDF8E1] relative overflow-hidden quotebg-section"
    >
      {/* Overlay for readability if needed */}
      <div className="absolute inset-0 bg-[#FDF8E1]/40 z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="font-brand text-2xl sm:text-4xl md:text-5xl font-bold text-[#13381A]">
            Why You'll Love Us
          </h2>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg text-[#13381A]/80 max-w-2xl mx-auto">
            We're passionate about making healthy eating both simple and delightful. Here's what makes our service special.
          </p>
        </div>

        <div className="mt-8 sm:mt-16 grid gap-6 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={variants}
                className="text-center px-2 sm:px-0"
              >
                <div className="flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-[#18492B] text-accent mx-auto shadow-md transition-all duration-300">
                  <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                </div>
                <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-bold text-[#13381A]">{feature.title}</h3>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-[#13381A]/80">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 