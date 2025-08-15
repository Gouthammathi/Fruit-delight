import React from 'react';

const Contact = () => (
  <div className="bg-gradient-to-b from-secondary via-[#FDF8E1] to-neutral min-h-screen py-16">
    <div className="max-w-2xl mx-auto px-4 space-y-12">
      {/* Contact Form */}
      <section className="bg-glass rounded-2xl shadow-glass p-8 border border-neutral/20">
        <h2 className="text-2xl font-bold text-primary mb-4 font-brand">Contact Us</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full px-4 py-2 rounded-lg border border-neutral/30 focus:ring-accent focus:border-accent bg-[#FDF8E1]/80" />
          <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg border border-neutral/30 focus:ring-accent focus:border-accent bg-[#FDF8E1]/80" />
          <textarea placeholder="Message" rows={4} className="w-full px-4 py-2 rounded-lg border border-neutral/30 focus:ring-accent focus:border-accent bg-[#FDF8E1]/80" />
          <button type="submit" className="w-full px-4 py-2 rounded-full bg-accent text-[#FDF8E1] font-bold shadow hover:bg-accent-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent">Send Message</button>
        </form>
      </section>
      {/* WhatsApp Button */}
      <section className="flex justify-center">
        <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full bg-accent text-[#FDF8E1] font-bold shadow hover:bg-accent-dark transition-colors duration-200 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 4.97 4.03 9 9 9 1.51 0 2.94-.36 4.19-1.01l3.36.89a.75.75 0 00.92-.92l-.89-3.36A8.963 8.963 0 0021.001 12c0-4.97-4.03-9-9-9s-9 4.03-9 9z" />
          </svg>
          Chat on WhatsApp
        </a>
      </section>
      {/* Map & Socials Placeholder */}
      <section className="text-center text-primary/70">
        <div className="mb-2">(Google Map Embed Coming Soon)</div>
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors">Email</a>
        </div>
      </section>
    </div>
  </div>
);

export default Contact; 