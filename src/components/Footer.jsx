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
    <footer className="bg-[#FDF8E1] border-t border-neutral-light pt-8 pb-4 sm:pt-12 sm:pb-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              
              <span className="font-brand text-2xl font-bold text-[#13381A]">
                Fruit Delight
              </span>
            </div>
            <p className="mt-4 text-[#13381A]/80 max-w-xs">
              Healthy Bites, Happy Life. Freshly cut fruit boxes, delivered to your doorstep.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 bg-[#18492B] text-accent rounded-full flex items-center justify-center shadow-md transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-[#13381A] uppercase tracking-wider text-sm">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#13381A]/80 hover:text-accent transition-colors"
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

        <div className="mt-16 border-t border-neutral-light pt-10 flex flex-col items-center justify-center text-center gap-3">
          <p className="text-base font-semibold text-[#13381A]/90">&copy; 2025 Nihira Enterprises. All Rights Reserved.</p>
          <div className="flex gap-4 mt-2 text-sm justify-center items-center">
            <a href="#" className="text-[#13381A]/80 hover:text-accent">Privacy Policy</a>
            <span className="h-4 border-l border-[#13381A]/30"></span>
            <a href="#" className="text-[#13381A]/80 hover:text-accent">Terms of Service</a>
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