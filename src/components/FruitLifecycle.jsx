import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import sourcingAnim from '../assets/lottie/sourcing.json';
import inspectionAnim from '../assets/lottie/inspection.json';
import cuttingAnim from '../assets/lottie/cutting.json';
import packingAnim from '../assets/lottie/packing.json';
import deliveryAnim from '../assets/lottie/delivery.json';
import enjoymentAnim from '../assets/lottie/enjoyment.json';
import bgImg from '../assets/bg.jpg';

const steps = [
  {
    anim: sourcingAnim,
    title: 'Sourcing',
    subtitle: 'Partnering with Trusted Farms',
    description: 'We carefully select fruits from local orchards and sustainable farms, ensuring only the freshest and most flavorful produce makes it into your box. Our partners share our passion for quality and ethical farming.'
  },
  {
    anim: inspectionAnim,
    title: 'Inspection',
    subtitle: 'Rigorous Quality Checks',
    description: 'Every fruit is hand-inspected for ripeness, color, and safety. Our team uses strict standards to guarantee that only the best fruits are chosen, so you get premium quality every time.'
  },
  {
    anim: cuttingAnim,
    title: 'Cutting',
    subtitle: 'Expert Preparation',
    description: 'Our skilled team prepares and cuts the fruit with precision, maintaining hygiene and preserving natural flavors. Each piece is handled with care to ensure freshness and taste.'
  },
  {
    anim: packingAnim,
    title: 'Packing',
    subtitle: 'Eco-Friendly & Secure',
    description: 'Fruits are packed in eco-friendly, insulated boxes that keep them safe and fresh during transit. We use minimal plastic and focus on sustainability at every step.'
  },
  {
    anim: deliveryAnim,
    title: 'Delivery',
    subtitle: 'Fast & Reliable',
    description: 'Our logistics partners ensure your fruit box is delivered quickly and safely to your doorstep, maintaining the cold chain and freshness throughout the journey.'
  },
  {
    anim: enjoymentAnim,
    title: 'Enjoyment',
    subtitle: 'Unbox & Savor',
    description: 'Open your box to a burst of color and flavor! Enjoy your ready-to-eat, nutritious fruit selection with family and friends, knowing every bite is packed with care and goodness.'
  },
];

const FruitLifecycle = () => (
  <section
    id="lifecycle"
    className="relative py-6 bg-gradient-to-b from-[#FDF8E1] to-[#EEE5BA]"
    style={{
      backgroundImage: `url(${bgImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Blurred overlay */}
    <div className="absolute inset-0 w-full h-full z-0 backdrop-blur-sm bg-white/30 pointer-events-none"></div>
    <div className="max-w-3xl mx-auto px-4 relative z-10">
      <h2 className="font-brand text-3xl sm:text-5xl font-bold text-center text-[#194528] mb-4">
        Our Journey to Your Door 🍇🍊
      </h2>
      <p className="text-xl font-magilio  text-[#194528]/80 text-center mb-4 max-w-2xl mx-auto">
        From the sun-kissed orchards to your family's table, every fruit box is a story of freshness, care, and delight. We partner with passionate farmers, use sustainable practices, and ensure every step is handled with love and expertise. Discover how your fruit box is crafted for maximum taste, nutrition, and joy!
      </p>
      <h3 className="text-xl font-semibold text-[#194528] text-center mb-10">Step-by-Step: The Fruit Delight Experience</h3>
      <div className="relative flex flex-col gap-16">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-10 ${idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} group`}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white flex items-center justify-center shadow-2xl ring-4 ring-[#FDF8E1] ring-offset-2 ring-offset-[#EEE5BA]">
                <Lottie animationData={step.anim} loop={true} className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-lg" />
              </div>
            </div>
            <div className="flex-1 bg-white/80 rounded-xl p-4 shadow group-hover:shadow-lg transition">
              <h3 className="font-semibold text-lg text-[#194528]">{step.title}</h3>
              <div className="text-[#194528] text-sm font-medium mb-1">{step.subtitle}</div>
              <p className="text-[#194528]/80 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center text-[#194528] text-lg font-medium mb-4">
        Every box is a promise: farm-fresh, hand-checked, and delivered with a smile. Taste the difference in every bite!
      </div>
      <div className="flex justify-center mt-2">
        <a
          href="/how-we-do-it"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#194528] text-[#FDF8E1] rounded-full font-semibold shadow hover:bg-[#2a6a3b] transition"
        >
          👉 See How We Do It
        </a>
      </div>
    </div>
  </section>
);

export default FruitLifecycle; 