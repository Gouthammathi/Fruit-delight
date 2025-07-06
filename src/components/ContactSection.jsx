import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import quotebggg from '../assets/leaves/quotebggg.png';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
    alert('Thank you for your message!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    { icon: FaPhone, text: '+91 87122 20453 | +91 99662 84733', href: 'tel:+918712220453' },
    { icon: FaEnvelope, text: 'fruitdelight0102@gmail.com', href: 'mailto:fruitdelight0102@gmail.com' },
    { icon: FaInstagram, text: 'FruitDelight01', href: 'https://www.instagram.com/fruitdelight01?igsh=MjZuOXgwMGplc3M0' },
    { icon: FaMapMarkerAlt, text: 'Madeenaguda, Hyderabad', href: '#' },
  ];

  return (
    <section id="contact" className="py-24 bg-background relative quotebggg-section overflow-hidden">
      {/* Overlay for readability if needed */}
      <div className="absolute inset-0 bg-background/90 z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 lg:gap-16">
          {/* Left side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-brand text-4xl md:text-5xl font-bold text-[#FDF8E1]">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-[#FDF8E1] leading-relaxed">
              Have a question or a special request? We'd love to hear from you. Reach out and we'll get back to you shortly.
            </p>
            <div className="mt-8 space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-[#FDF8E1]" />
                  </div>
                  <a 
                    href={item.href} 
                    className="font-semibold text-[#FDF8E1] hover:text-accent transition-colors cursor-pointer"
                    target={item.href.startsWith('http') || item.href.startsWith('mailto') ? "_blank" : undefined}
                    rel={item.href.startsWith('http') || item.href.startsWith('mailto') ? "noopener noreferrer" : undefined}
                  >
                    {item.text}
                  </a>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/918712220453"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 bg-green-500 text-[#FDF8E1] font-bold px-6 py-3 rounded-full shadow-soft-lg hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="h-6 w-6" />
              Chat with us on WhatsApp
            </a>
          </motion.div>

          {/* Right side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12 lg:mt-0"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#FDF8E1] p-8 rounded-4xl shadow-soft-lg space-y-6"
            >
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-background rounded-full border-2 border-[#194528] focus:ring-2 focus:ring-accent focus:border-[#194528] transition placeholder-[#194528] text-[#194528]"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-background rounded-full border-2 border-[#194528] focus:ring-2 focus:ring-accent focus:border-[#194528] transition placeholder-[#194528] text-[#194528]"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone (Optional)"
                  className="w-full px-4 py-3 bg-background rounded-full border-2 border-[#194528] focus:ring-2 focus:ring-accent focus:border-[#194528] transition placeholder-[#194528] text-[#194528]"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-3 bg-background rounded-2xl border-2 border-[#194528] focus:ring-2 focus:ring-accent focus:border-[#194528] transition resize-none placeholder-[#194528] text-[#194528]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 px-8 bg-[#194528] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out border-2 border-[#194528] hover:bg-[#2d5a3a] cursor-pointer relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-[#FDF8E1]">
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 