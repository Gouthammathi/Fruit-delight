import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import avatar1 from '../assets/plan2.jpg';
import avatar2 from '../assets/plan2.jpg';
import avatar3 from '../assets/plan2.jpg';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
     
      quote: "The fruit boxes are a lifesaver! So fresh and convenient. It has completely changed my morning routine for the better.",
      rating: 5,
      image: avatar1,
    },
    {
      name: 'Rahul Kumar',
     
      quote: "Impressed with the quality and the variety. The delivery is always on time, and the fruits are delicious. Highly recommend!",
      rating: 5,
      image: avatar2,
    },
    {
      name: 'Anjali Mehta',
     
      quote: "As a busy professional, Fruit Delight is perfect for me. I get my daily dose of nutrition without any hassle. The subscription is worth every penny.",
      rating: 5,
      image: avatar3,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-[#EEE5BA] relative overflow-hidden quotebggg-section">
      {/* Overlay for readability if needed */}
      <div className="absolute inset-0 bg-[#EEE5BA]/50 z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="font-brand text-4xl md:text-5xl font-bold text-[#194528] mb-2">
            Loved by Our Customers
          </h2>
          <p className="mt-4 text-lg text-[#194528]/80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our happy customers have to say about their Fruit Delight experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:gap-10 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
              className="relative bg-white/90 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col items-center pt-0 pb-6 sm:pb-8 px-4 sm:px-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 border-t-8 border-orange-400 w-full max-w-xs sm:max-w-sm mx-auto"
            >
              {/* Gradient ring avatar */}
              <div className="relative -top-8 sm:-top-10 mb-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#F88B42] via-[#D6DC64] to-[#194528] p-1 shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img src={testimonial.image} alt={testimonial.name + ' avatar'} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              {/* Animated quote icon */}
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ type: 'spring', stiffness: 120, delay: 0.3 + index * 0.1 }}
                className="bg-[#F88B42]/90 rounded-full p-2 sm:p-3 shadow-md mb-3 sm:mb-4 -mt-4"
              >
                <FaQuoteLeft className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow" />
              </motion.div>
              {/* Quote */}
              <p className="text-base sm:text-lg text-[#194528] leading-relaxed mb-4 sm:mb-6 text-center font-medium italic">
                "{testimonial.quote}"
              </p>
              {/* Name, location, rating */}
              <div className="flex flex-col items-center gap-1 w-full mt-auto">
                <div className="font-bold text-[#F88B42] text-base sm:text-lg">{testimonial.name}</div>
                {testimonial.location && (
                  <div className="text-xs sm:text-sm text-[#194528]/70 mb-1 sm:mb-2">{testimonial.location}</div>
                )}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
                      className="inline-flex items-center justify-center bg-[#D6DC64] rounded-full p-1 shadow-md"
                    >
                      <FaStar className="h-4 w-4 sm:h-5 sm:w-5 text-[#F88B42]" />
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 