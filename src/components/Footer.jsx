import React from 'react';
import { FaFacebook,  FaInstagram, FaWhatsapp, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/fruitdelight01?igsh=MjZuOXgwMGplc3M0' },
    { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/918712220453' },
    { name: 'Facebook', icon: FaFacebook, href: '#' },
  ];

  const footerLinks = {
    'Our Company': [
      { name: 'About Us', href: '#story' },
      { name: 'Our Process', href: '#lifecycle' },
      { name: 'Testimonials', href: '#testimonials' },
    ],
    'Services': [
      { name: 'Subscription Plans', href: '#plans' },
      { name: 'Corporate Orders', href: '#' },
      { name: 'Customized Boxes', href: '#' },
    ],
    'Support': [
      { name: 'Contact Us', href: '#contact' },
      { name: 'Delivery Areas', href: '#' },
      { name: 'Sunday Holiday', href: '#' },
    ],
  };

  return (
    <footer className="bg-[#FDF8E1] border-t border-neutral-light">
      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12">
            {/* Company Info */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="font-brand text-3xl sm:text-4xl font-bold text-[#13381A]">
                  Fruit Delight
                </span>
              </div>
              <p className="mt-6 text-[#13381A]/80 max-w-md leading-relaxed">
                Healthy Bites, Happy Life. Freshly cut fruit boxes, delivered to your doorstep with love and care.
              </p>
              <div className="mt-8 flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-12 h-12 bg-[#18492B] text-accent rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#194528]"
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-bold text-[#13381A] uppercase tracking-wider text-sm mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[#13381A]/80 hover:text-accent transition-colors duration-300 font-medium"
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            e.preventDefault();
                            document.getElementById(link.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - 100% Width */}
      <div className="w-full bg-[#194528]/5 border-t border-[#194528]/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Copyright */}
              <div className="text-center lg:text-left">
                <p className="text-base font-semibold text-[#13381A]/90">
                  &copy; 2025 Nihira Enterprises. All Rights Reserved.
                </p>
              </div>

              {/* Links and Credit */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                {/* Policy Links */}
                <div className="flex gap-6 text-sm">
                  <a href="#" className="text-[#13381A]/80 hover:text-accent transition-colors duration-300 font-medium">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-[#13381A]/80 hover:text-accent transition-colors duration-300 font-medium">
                    Terms of Service
                  </a>
                </div>

                {/* Developer Credit */}
                <div className="text-sm text-[#13381A]/70">
                  Designed and developed with ❤️ by{' '}
                  <a 
                    href="https://gouthammathi.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#F88B42] hover:text-[#194528] font-semibold transition-colors duration-300 underline decoration-2 underline-offset-2"
                  >
                    Goutham Mathi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-[#18492B] text-[#FDF8E1] p-3 rounded-full shadow-soft-lg hover:bg-[#18492B] transition-all duration-300 hover:scale-110 z-40"
      >
        <span className="inline-flex items-center justify-center bg-[#18492B] rounded-full p-2 shadow-md transition-all duration-300">
          <FaArrowUp className="h-6 w-6 text-accent" />
        </span>
      </button>
    </footer>
  );
};

export default Footer; 