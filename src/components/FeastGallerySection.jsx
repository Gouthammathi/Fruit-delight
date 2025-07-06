import React from 'react';
import { FaAppleAlt, FaLeaf, FaStar, FaGift, FaSmile, FaCarrot } from 'react-icons/fa';
import plan1 from '../assets/plan1.jpg';
import plan2 from '../assets/plan2.jpg';

const bentoCards = [
  {
    type: 'image',
    image: plan1,
    title: 'Fresh Fruit Platter',
    span: 'col-span-2 row-span-2',
    bg: 'bg-[#FDF8E1]'
  },
  {
    type: 'text',
    title: 'Handpicked Quality',
    icon: <FaStar className="text-[#F88B42] text-2xl" />,
    description: 'Only the best, ripest fruits make it to your box.',
    span: '',
    bg: 'bg-[#D6DC64]/30'
  },
  {
    type: 'image',
    image: plan1,
    title: 'Juicy & Sweet',
    span: '',
    bg: 'bg-[#F88B42]/10'
  },
  {
    type: 'badge',
    title: 'Eco Packaging',
    icon: <FaLeaf className="text-[#194528] text-xl" />,
    description: 'Sustainable & planet-friendly.',
    span: '',
    bg: 'bg-[#194528]/10'
  },
  {
    type: 'image',
    image: plan2,
    title: 'Colorful Variety',
    span: '',
    bg: 'bg-[#F88B42]/10'
  },
  {
    type: 'text',
    title: 'Surprise Gifts',
    icon: <FaGift className="text-[#F88B42] text-2xl" />,
    description: 'Special treats in select boxes!',
    span: 'col-span-2',
    bg: 'bg-[#FDF8E1]'
  },
  {
    type: 'image',
    image: plan2,
    title: 'Farm to Table',
    span: '',
    bg: 'bg-[#D6DC64]/20'
  },
  {
    type: 'text',
    title: 'Happy Customers',
    icon: <FaSmile className="text-[#D6DC64] text-2xl" />,
    description: 'See our 5-star reviews!',
    span: '',
    bg: 'bg-[#194528]/10'
  },
];

const FeastGallerySection = () => (
  <section id="feast-gallery" className="py-16 bg-[#EEE5BA]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="font-brand text-3xl sm:text-5xl font-bold text-[#194528] mb-2">A Feast for Your Eyes</h2>
        <p className="text-lg text-[#194528]/80 max-w-2xl mx-auto">Explore our vibrant, bento-inspired gallery of fresh fruit, fun, and flavor!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] gap-4">
        {bentoCards.map((card, idx) => (
          <div
            key={idx}
            className={`relative rounded-2xl shadow-lg flex flex-col justify-center items-center p-4 min-h-[140px] sm:min-h-[180px] ${card.bg} ${card.span} hover:scale-105 transition-transform duration-300`}
          >
            {card.type === 'image' && (
              <>
                <img src={card.image} alt={card.title} className="w-full h-full object-cover rounded-2xl" style={{minHeight: '100px', maxHeight: '220px'}} />
                <div className="absolute bottom-2 left-2 bg-[#194528]/80 text-[#FDF8E1] text-xs px-3 py-1 rounded-full font-semibold shadow">{card.title}</div>
              </>
            )}
            {card.type === 'text' && (
              <>
                <div className="mb-2">{card.icon}</div>
                <div className="font-bold text-[#194528] text-lg mb-1 text-center">{card.title}</div>
                <div className="text-[#194528]/80 text-sm text-center">{card.description}</div>
              </>
            )}
            {card.type === 'badge' && (
              <>
                <div className="mb-2">{card.icon}</div>
                <div className="font-bold text-[#194528] text-base mb-1 text-center">{card.title}</div>
                <div className="text-[#194528]/80 text-xs text-center">{card.description}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeastGallerySection; 