import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import textBg from '../assets/textbg.jpg';
import leafss from '../assets/leaves/leafss.png';
import quotebg from '../assets/leaves/quotebg.png';
import plan1 from '../assets/plan1.jpg';

const QUOTES = [
  "From farm to table, we ensure every fruit tells a story of freshness and care.",
  "A box of fruit, a box of happiness—delivered fresh to your door.",
  "Nature's best, handpicked for you every single day.",
  "Healthy living starts with a single bite of something fresh.",
  "Experience the joy of vibrant, juicy, and delicious fruit feasts.",
  "Every box is a promise: quality, nutrition, and delight in every bite."
];

const QuoteSection = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative py-0 bg-background overflow-hidden h-[20rem] flex items-center px-2 sm:px-0 quotebg-section"
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-background/80 z-0 pointer-events-none" />
      {/* Decorative leaves left (centered vertically) */}
      <img src={leafss} alt="leaves left" className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 h-80 z-0 pointer-events-none select-none" style={{objectFit: 'contain'}} />
      {/* Decorative leaves right (mirrored, centered vertically) */}
      <img src={leafss} alt="leaves right" className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-80 z-0 pointer-events-none select-none transform scale-x-[-1]" style={{objectFit: 'contain'}} />
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-2">
          <span
            className="font-thanks-autumn text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-[#D6DC64] drop-shadow-lg tracking-wide text-outline-white"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}
          >
            Fruit Delight
          </span>
        </div>
        <div className="text-center flex flex-col justify-center h-full w-full">
          <span
            className="inline-block text-4xl xs:text-5xl md:text-6xl mb-4 sm:mb-6 font-bold bg-clip-text text-transparent text-outline-cream drop-shadow-lg"
            style={{
              backgroundImage: `url(${textBg})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}
          >
            “
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIdx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="font-brand text-xl xs:text-2xl sm:text-3xl md:text-4xl font-medium leading-tight bg-clip-text text-transparent text-outline-cream drop-shadow-lg mx-auto max-w-xs sm:max-w-2xl"
              style={{
                backgroundImage: `url(${textBg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 8px rgba(0,0,0,0.18)',
              }}
            >
              "{QUOTES[quoteIdx]}"
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection; 