import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaLeaf, FaCarrot, FaSeedling, FaStar, FaTruck, FaClock, FaCalendarAlt, FaGift, FaShieldAlt } from 'react-icons/fa';
import plan1 from '../assets/plan1.jpg';
import plan2 from '../assets/plan2.jpg';
const SubscriptionPlans = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const plans = [
    {
      name: 'Basic Monthly Package',
      price: '₹2,300',
      dailyPrice: '₹77/day',
      originalPrice: '2500',
      savings: '200',
      image: plan1,
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
      price: '₹2,800',
      dailyPrice: '₹93/day',
      originalPrice: '3000',
      savings: '200',
      image: plan2,
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
    {
      name: 'Custom Plan',
      price: 'Custom',
      dailyPrice: '',
      originalPrice: '',
      savings: '',
      image: plan1,
      features: [
        'Choose your favorite fruits',
        'Flexible box size',
        'Personalized delivery schedule',
        'Perfect for unique preferences',
        'Free Home Delivery',
        'Morning Delivery (6-10 AM)',
      ],
      icon: FaGift,
      cta: 'Build Your Box',
      popular: false,
      color: 'bg-[#FDF8E1]',
      borderColor: 'border-[#F88B42]',
      textColor: 'text-[#194528]',
    },
    {
      name: 'Get a Demo Box',
      price: 'FREE',
      dailyPrice: 'One-time',
      originalPrice: '',
      savings: '₹200 Value',
      image: plan1,
      features: [
        'Sample of our premium fruits',
        '2-3 Types of Fresh Fruits',
        '1 Type of Organic Sprouts',
        'Perfect for first-time customers',
        'Free Home Delivery',
        'Morning Delivery (6-10 AM)',
        'No commitment required',
        'Experience our quality'
      ],
      icon: FaGift,
      cta: 'Get Free Demo',
      popular: false,
      color: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-[#194528]',
    },
  ];

  return (
    <section id="plans" className="py-12 sm:py-24 bg-background w-full relative overflow-hidden quotebggg-section-plans">
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
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 items-stretch px-4 place-items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl overflow-hidden border ring-2 ring-[#194528] shadow-xl transition-all duration-300 hover:shadow-xl flex flex-col h-full max-w-lg w-full bg-white
                ${index === 1 ? 'z-20 scale-105 shadow-2xl ring-4 ring-[#F88B42] md:-translate-y-4' : 'z-10'}
              `}
              style={index === 1 ? { position: 'relative' } : {}}
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
                    {plan.price !== 'FREE' && plan.price !== 'Custom' && (
                      <span className="text-[#194528]/70">/month</span>
                    )}
                  </div>
                  
                  {plan.dailyPrice && plan.dailyPrice !== 'One-time' && (
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <span className="text-[#194528]/80">Just {plan.dailyPrice}</span>
                      {plan.savings && plan.savings !== '₹200 Value' && (
                        <span className="text-green-600 font-semibold">Save ₹{plan.savings}</span>
                      )}
                    </div>
                  )}
                  
                  {plan.originalPrice && plan.originalPrice !== '' && (
                    <div className="text-sm mb-2">
                      <span className="text-[#194528]/60">Original Price: </span>
                      <span className="text-[#194528]/60 line-through">₹{plan.originalPrice}</span>
                    </div>
                  )}
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
                <a
                  href={`https://wa.me/918712220453?text=${encodeURIComponent(
                    plan.name === 'Get a Demo Box' 
                      ? `🍎 *Fruit Delight - Demo Box Request* 🍎

Hi! I'm interested in trying your demo box.

📦 *Demo Box Details:*
• Sample of premium fruits
• 2-3 Types of Fresh Fruits
• 1 Type of Organic Sprouts
• Perfect for first-time customers
• Free Home Delivery
• Morning Delivery (6-10 AM)
• No commitment required
• Experience your quality

💰 *Value:* ₹200 (FREE for demo)

📍 *Delivery:* Madeenaguda, Hyderabad area

Please let me know how to proceed with the demo box order.

---
*Sent from Fruit Delight Website*
*Time:* ${new Date().toLocaleString('en-IN', { 
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}`
                      : `Plan Details\n` +
                        `Name: ${plan.name}\n` +
                        `Description: Select a plan that fits your lifestyle. Freshness delivered daily, with a holiday on Sundays.\n` +
                        `Price: ${plan.price}/month\n` +
                        `Daily Price: ${plan.dailyPrice}\n` +
                        `Savings: ${plan.savings}\n` +
                        `Original Price: ${plan.originalPrice}\n` +
                        `Features:\n${plan.features.map(f => '- ' + f).join('\n')}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-6 font-semibold rounded-lg transition-all duration-300 mt-auto flex items-center justify-center text-center ${
                    plan.name === 'Get a Demo Box' 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-[#194528] hover:bg-[#13381A] text-[#FDF8E1]'
                  }`}
                  style={{ textDecoration: 'none' }}
                >
                  {plan.cta}
                </a>
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