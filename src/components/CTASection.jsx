import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const CTASection = () => (
  <section className="py-10 bg-gradient-to-r from-primary via-secondary to-accent/20 quotebggg-section relative overflow-hidden">
    {/* Overlay for readability if needed */}
    <div className="absolute inset-0 bg-background/90 z-0 pointer-events-none" />
    <div className="max-w-3xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
      <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-6 drop-shadow-lg font-brand">
        Ready to switch to guilt-free snacking?
      </h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.a
          href="#products"
          className="px-8 py-3 rounded-full bg-accent text-[#FDF8E1] font-bold text-lg shadow hover:bg-accent-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
        >
          Order Now
        </motion.a>
        <motion.a
          href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
          className="px-8 py-3 rounded-full bg-primary text-[#FDF8E1] font-bold text-lg shadow flex items-center justify-center gap-2 hover:bg-primary-dark transition-all duration-200"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
        >
          <FaWhatsapp className="text-2xl" /> WhatsApp Us
        </motion.a>
      </div>
    </div>
  </section>
);

export default CTASection; 