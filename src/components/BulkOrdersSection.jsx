import React from 'react';
import { FaBirthdayCake, FaBuilding, FaTruck, FaAppleAlt } from 'react-icons/fa';
import quotebg from '../assets/leaves/quotebg.png';

const services = [
  {
    icon: <FaBirthdayCake className="text-[#F88B42] text-3xl mb-2" />,
    title: 'Birthday Parties',
    desc: 'Delight your guests with fresh fruit platters and boxes for birthdays and celebrations.'
  },
  {
    icon: <FaBuilding className="text-[#F88B42] text-3xl mb-2" />,
    title: 'Corporate Orders',
    desc: 'Bulk fruit orders for offices, events, and corporate wellness programs.'
  },
  {
    icon: <FaTruck className="text-[#F88B42] text-3xl mb-2" />,
    title: 'Raw Fruit Delivery',
    desc: 'Get premium, handpicked raw fruits delivered straight to your doorstep.'
  },
  {
    icon: <FaAppleAlt className="text-[#F88B42] text-3xl mb-2" />,
    title: 'Bulk Orders',
    desc: 'Special pricing and custom solutions for large quantity fruit orders.'
  },
];

const BulkOrdersSection = () => (
  <section id="bulk-orders" className="py-16 bg-[#FDF8E1] relative flex justify-center items-center overflow-hidden quotebg-section">
    {/* <img src={quotebg} alt="background" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none" style={{zIndex: 0}} /> */}
    <div id="bulk-orders" className="absolute -top-24 h-1 w-full pointer-events-none" />
    <div className="absolute inset-0 bg-[#FDF8E1]/55 z-0 pointer-events-none" />
    <div className="max-w-4xl w-full px-4 sm:px-8 mx-auto text-center relative z-10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-thanks-autumn" style={{ color: '#194528' }}>Bulk & Special Orders</h2>
      <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
        We cater to <span className="text-accent font-semibold">bulk orders</span> for all occasions—be it <span className="text-accent font-semibold">birthday parties</span>, <span className="text-accent font-semibold">corporate events</span>, or <span className="text-accent font-semibold">raw fruit delivery</span> to your doorstep. Enjoy premium quality, custom solutions, and timely delivery for every need.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="group bg-white/90 border border-[#f7e7d9] rounded-3xl shadow-xl p-8 flex flex-col items-center transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(248,139,66,0.15)] hover:-translate-y-2 hover:border-[#F88B42]/40 cursor-pointer min-h-[240px]"
            style={{ backdropFilter: 'blur(3px)' }}
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full mb-4 bg-gradient-to-br from-[#FDF8E1] via-[#fff7e6] to-[#F88B42]/10 border-2 border-[#F88B42]/20 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
              {service.icon}
            </div>
            <h3 className="text-xl font-extrabold text-[#194528] mb-2 tracking-wide group-hover:text-[#F88B42] transition-colors duration-300 drop-shadow-sm">{service.title}</h3>
            <p className="text-gray-700 text-base leading-relaxed mt-1 text-center font-medium">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BulkOrdersSection; 