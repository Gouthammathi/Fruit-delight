import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaLeaf, FaCarrot, FaSeedling, FaStar, FaTruck, FaClock, FaCalendarAlt, FaGift, FaShieldAlt } from 'react-icons/fa';
import quotebggg from '../assets/leaves/quotebggg.png';

const SubscriptionPlans = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const plans = [
    {
      name: 'Basic Monthly Package',
      price: '₹2499',
      dailyPrice: '₹83/day',
      originalPrice: '₹3000',
      savings: '₹501',
      image: 'src/assets/plan1.jpg', // Placeholder for image
      features: [
        '4 Types of Fresh Fruits',
        '2 Types of Organic Sprouts', 
        '1 Premium Vegetable Item',
        'Free Home Delivery',
        'Morning Delivery (6-10 AM)',
        'Sunday Holiday'
      ],
      icon: FaLeaf,
      cta: 'Choose Basic',
      popular: false,
      color: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-[#FDF8E1]',
    },
    {
      name: 'Premium Monthly Package',
      price: '₹2999',
      dailyPrice: '₹100/day',
      originalPrice: '₹3600',
      savings: '₹601',
      image: 'src/assets/plan2.jpg', // Placeholder for image
      features: [
        '4 Types of Fresh Fruits',
        '2 Types of Organic Sprouts',
        '2 Types of Premium Dry Fruits',
        '1 Premium Vegetable Item',
        'Customized Box Available',
        'Free Home Delivery',
        'Priority Customer Support',
        'Morning Delivery (6-10 AM)',
        'Sunday Holiday'
      ],
      icon: FaStar,
      cta: 'Choose Premium',
      popular: true,
      color: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  return (
    <section id="plans" className="py-12 sm:py-24 bg-background w-full relative overflow-hidden quotebggg-section">
      {/* Overlay for readability if needed */}
      <div className="absolute inset-0 bg-background/90 z-0 pointer-events-none" />
      <div className="px-0 sm:px-0 lg:px-0 w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-bold text-[#FEF8DE] mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-[#FEF8DE]/80 max-w-2xl mx-auto">
            Select a plan that fits your lifestyle. Freshness delivered daily, with a holiday on Sundays.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-stretch px-4 place-items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border ring-2 ring-[#194528] shadow-xl transition-all duration-300 hover:shadow-xl flex flex-col h-full max-w-lg w-full bg-white"
            >
              {/* Image Section */}
              <div className="h-48 bg-gradient-to-br from-[#194528]/10 to-[#194528]/5 relative">
                <img 
                  src={plan.image} 
                  alt={plan.name + ' image'} 
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-t-2xl" 
                />
                {/* Consistent Badge for all plans */}
                <div className="absolute top-4 right-4">
                  <span className="bg-[#194528] text-[#FDF8E1] px-3 py-1 rounded-full text-xs font-bold">
                    {plan.name}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className={`${plan.color} p-6 flex flex-col flex-1`}>
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#194528] mb-2">
                    {plan.name}
                  </h3>
                  
                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-[#194528]">{plan.price}</span>
                    <span className="text-[#194528]/70">/month</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm mb-2">
                    <span className="text-[#194528]/80">Just {plan.dailyPrice}</span>
                    <span className="text-green-600 font-semibold">Save ₹{plan.savings}</span>
                  </div>
                  
                  <span className="text-[#194528]/60 line-through text-sm">₹{plan.originalPrice}</span>
                </div>

                {/* Features */}
                <div className="mb-6 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-[#194528] rounded-full flex items-center justify-center flex-shrink-0">
                          <FaCheckCircle className="h-3 w-3 text-[#FDF8E1]" />
                        </div>
                        <span className="text-[#194528] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 bg-[#194528] text-[#FDF8E1] font-semibold rounded-lg transition-all duration-300 hover:bg-[#13381A] mt-auto"
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 w-full"
        >
          <div className="bg-[#194528]/10 rounded-xl p-6 w-full">
            
            <p className="text-[#FDF8E1] text-sm">
              Have questions? <a href="#contact" className="font-semibold text-[#FDF8E1] hover:underline">Contact us</a> for custom orders.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubscriptionPlans; 