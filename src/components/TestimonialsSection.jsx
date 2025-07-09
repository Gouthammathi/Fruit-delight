import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import avatar1 from '../assets/leaves/avatar1.jpg'
import avatar2 from '../assets/leaves/avatra2.jpeg';
import avatar3 from '../assets/leaves/avatar3.jpeg';
import avatar4 from '../assets/leaves/avatar4.jpg';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      quote: "The fruit boxes are a lifesaver! So fresh and convenient. It has completely changed my morning routine for the better.",
      rating: 5,
      image: avatar1,
    },
    {
      name: 'Crystine',
      location: 'Delhi, India',
      quote: "Impressed with the quality and the variety. The delivery is always on time, and the fruits are delicious. Highly recommend!",
      rating: 5,
      image: avatar2,
    },
    {
      name: 'Anjali Mehta',
      location: 'Bangalore, India',
      quote: "As a busy professional, Fruit Delight is perfect for me. I get my daily dose of nutrition without any hassle. The subscription is worth every penny.",
      rating: 5,
      image: avatar3,
    },
    {
      name: 'Sarah Johnson',
      location: 'Chennai, India',
      quote: "The organic fruits taste amazing! My kids love the variety and I love knowing they're getting healthy snacks. Great service!",
      rating: 5,
      image: avatar4,
    },
    {
      name: 'Rajesh Patel',
      location: 'Pune, India',
      quote: "Been a customer for 6 months now. The consistency in quality and the personalized recommendations are outstanding. Highly satisfied!",
      rating: 5,
      image: avatar1,
    },
    {
      name: 'Meera Singh',
      location: 'Hyderabad, India',
      quote: "The seasonal fruit selections are always perfect. I love how they introduce me to new fruits I've never tried before. Excellent experience!",
      rating: 5,
      image: avatar2,
    },
    {
      name: 'David Chen',
      location: 'Kolkata, India',
      quote: "As a fitness enthusiast, I need quality fruits daily. Fruit Delight never disappoints. Fresh, nutritious, and delivered right to my door!",
      rating: 5,
      image: avatar3,
    },
    {
      name: 'Lakshmi Devi',
      location: 'Ahmedabad, India',
      quote: "The customer service is exceptional. They always accommodate my special requests and the fruits arrive in perfect condition every time.",
      rating: 5,
      image: avatar4,
    },
  ];

  // Responsive: 1 card per view on mobile, 2 on tablet, 3 on desktop
  const getCardsPerView = () => {
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  useEffect(() => {
    const handleResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

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

        {/* Carousel Container */}
        <div className="mt-16 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/90 hover:bg-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Previous testimonials"
          >
            <FaChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-[#194528] group-hover:text-[#F88B42] transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/90 hover:bg-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Next testimonials"
          >
            <FaChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#194528] group-hover:text-[#F88B42] transition-colors" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8 sm:gap-10"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.5 }} 
                  className={`relative bg-white/95 rounded-3xl shadow-lg flex flex-col items-center pt-0 pb-12 px-4 sm:px-8 hover:scale-105 hover:shadow-2xl transition-all duration-500 w-full ${cardsPerView === 1 ? 'max-w-full' : 'max-w-xs sm:max-w-sm'} mx-auto flex-shrink-0 min-h-[400px] mt-12 mb-8 origin-center border border-[#f3e9d7]`}
                  style={{ width: cardsPerView === 1 ? '100%' : `calc((100% - ${(cardsPerView - 1) * 2}rem) / ${cardsPerView})` }}
                >
                  {/* Gradient ring avatar */}
                  <div className="relative -top-8 sm:-top-10 mb-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#FDF8E1] p-1 shadow-md border border-[#F88B42]/10">
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
                    className="bg-[#FDF8E1] rounded-full p-2 sm:p-3 shadow-sm mb-3 sm:mb-4 -mt-4 flex items-center justify-center"
                  >
                    <FaQuoteLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#F88B42] opacity-70" />
                  </motion.div>
                  {/* Quote */}
                  <p className="text-base sm:text-lg text-[#194528] leading-relaxed mb-4 sm:mb-6 text-center font-normal italic">
                    "{testimonial.quote}"
                  </p>
                  {/* Name, location, rating */}
                  <div className="flex flex-col items-center gap-1 w-full mt-auto">
                    <div className="font-bold text-[#F88B42] text-base sm:text-lg md:text-xl mb-0.5">{testimonial.name}</div>
                    {testimonial.location && (
                      <div className="text-xs sm:text-sm md:text-base text-[#194528]/70 mb-1 sm:mb-2">{testimonial.location}</div>
                    )}
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
                          className="inline-flex items-center justify-center bg-[#D6DC64] rounded-full p-1 shadow-sm"
                        >
                          <FaStar className="h-4 w-4 sm:h-5 sm:w-5 text-[#F88B42]" />
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#F88B42] scale-125' 
                    : 'bg-[#194528]/30 hover:bg-[#194528]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 