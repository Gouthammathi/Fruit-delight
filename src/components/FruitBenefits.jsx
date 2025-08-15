import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaBrain, FaEye, FaBone, FaLeaf, FaStar, FaShieldAlt, FaChevronLeft, FaChevronRight, FaWater, FaFire, FaSeedling } from 'react-icons/fa';

// Import fruit images
import dragonFruit from '../assets/fruits/dragon fruit.jpg';
import kiwi from '../assets/fruits/kiwi.jpg';
import mango from '../assets/fruits/mango.jpg';
import beetroot from '../assets/fruits/beetroot.jpg';
import grapes from '../assets/fruits/grapes.jpg';
import papaya from '../assets/fruits/papaya.jpg';
import muskmelon from '../assets/fruits/muskmelon.jpg';
import watermelon from '../assets/fruits/watermealon.jpg';
import pomegranate from '../assets/fruits/pomogranate.jpg';
import carrot from '../assets/fruits/carrot.jpg';

const fruits = [
  {
    id: 1,
    name: 'Apple',
    price: 80,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Rich in fiber and antioxidants that support cardiovascular health' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves memory and concentration with natural compounds' },
      { icon: FaEye, text: 'Eye Health', description: 'Contains vitamin A and flavonoids for vision protection' }
    ],
    nutrients: ['Vitamin C', 'Fiber', 'Antioxidants', 'Potassium'],
    description: 'Crisp and juicy apples packed with essential nutrients for your daily health boost.',
    rating: 4.8,
    calories: 52,
    protein: '0.3g',
    fiber: '2.4g',
    vitaminC: '4.6mg'
  },
  {
    id: 2,
    name: 'Banana',
    price: 60,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'High potassium content helps regulate blood pressure' },
      { icon: FaBrain, text: 'Energy Boost', description: 'Natural sugars provide instant and sustained energy' },
      { icon: FaBone, text: 'Bone Health', description: 'Contains calcium and magnesium for strong bones' }
    ],
    nutrients: ['Potassium', 'Vitamin B6', 'Fiber', 'Vitamin C'],
    description: 'Perfect energy-packed fruit for pre and post-workout nutrition.',
    rating: 4.9,
    calories: 89,
    protein: '1.1g',
    fiber: '2.6g',
    vitaminC: '8.7mg'
  },
  {
    id: 3,
    name: 'Orange',
    price: 70,
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaShieldAlt, text: 'Immune System', description: 'High vitamin C content strengthens immune defense' },
      { icon: FaEye, text: 'Skin Health', description: 'Collagen production support for healthy skin' },
      { icon: FaLeaf, text: 'Digestive Health', description: 'Natural fiber promotes healthy gut function' }
    ],
    nutrients: ['Vitamin C', 'Folate', 'Fiber', 'Potassium'],
    description: 'Zesty and refreshing oranges loaded with immune-boosting vitamin C.',
    rating: 4.7,
    calories: 47,
    protein: '0.9g',
    fiber: '2.4g',
    vitaminC: '53.2mg'
  },
  {
    id: 4,
    name: 'Dragon Fruit',
    price: 200,
    image: dragonFruit,
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Rich in antioxidants and healthy fats' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves cognitive function and memory' },
      { icon: FaEye, text: 'Eye Health', description: 'Contains vitamin A and carotenoids' }
    ],
    nutrients: ['Antioxidants', 'Vitamin C', 'Fiber', 'Iron'],
    description: 'Exotic dragon fruit with unique appearance and powerful health benefits.',
    rating: 4.6,
    calories: 60,
    protein: '1.2g',
    fiber: '1.1g',
    vitaminC: '8.0mg'
  },
  {
    id: 5,
    name: 'Kiwi',
    price: 120,
    image: kiwi,
    benefits: [
      { icon: FaShieldAlt, text: 'Immune Boost', description: 'Twice the vitamin C of oranges' },
      { icon: FaHeart, text: 'Heart Health', description: 'Potassium and fiber for cardiovascular health' },
      { icon: FaBrain, text: 'Digestive Aid', description: 'Natural enzymes aid digestion' }
    ],
    nutrients: ['Vitamin C', 'Vitamin K', 'Fiber', 'Potassium'],
    description: 'Tangy kiwi with exceptional vitamin C content and digestive enzymes.',
    rating: 4.8,
    calories: 61,
    protein: '1.1g',
    fiber: '3.0g',
    vitaminC: '64.0mg'
  },
  {
    id: 6,
    name: 'Avocado',
    price: 150,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Healthy monounsaturated fats' },
      { icon: FaBrain, text: 'Brain Function', description: 'Rich in folate and vitamin E' },
      { icon: FaEye, text: 'Eye Health', description: 'Lutein and zeaxanthin for vision' }
    ],
    nutrients: ['Healthy Fats', 'Fiber', 'Vitamin E', 'Folate'],
    description: 'Creamy avocado packed with healthy fats and essential nutrients.',
    rating: 4.9,
    calories: 160,
    protein: '2.0g',
    fiber: '6.7g',
    vitaminC: '10.0mg'
  },
  {
    id: 7,
    name: 'Mango',
    price: 120,
    image: mango,
    benefits: [
      { icon: FaEye, text: 'Eye Health', description: 'Rich in vitamin A and beta-carotene' },
      { icon: FaHeart, text: 'Skin Glow', description: 'Promotes healthy skin and hair' },
      { icon: FaBrain, text: 'Digestive Aid', description: 'Contains digestive enzymes' }
    ],
    nutrients: ['Vitamin A', 'Vitamin C', 'Fiber', 'Antioxidants'],
    description: 'Sweet and tropical mangoes, the king of fruits with royal health benefits.',
    rating: 4.9,
    calories: 60,
    protein: '0.8g',
    fiber: '1.6g',
    vitaminC: '36.4mg'
  },
  {
    id: 8,
    name: 'Strawberry',
    price: 150,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Antioxidants support cardiovascular health' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves cognitive function' },
      { icon: FaEye, text: 'Anti-aging', description: 'Rich in ellagic acid' }
    ],
    nutrients: ['Vitamin C', 'Antioxidants', 'Fiber', 'Folate'],
    description: 'Sweet and tangy strawberries packed with powerful antioxidants.',
    rating: 4.8,
    calories: 32,
    protein: '0.7g',
    fiber: '2.0g',
    vitaminC: '58.8mg'
  },
  {
    id: 9,
    name: 'Beetroot',
    price: 40,
    image: beetroot,
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Nitrates improve blood flow' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves cognitive performance' },
      { icon: FaFire, text: 'Energy Boost', description: 'Natural nitrates for endurance' }
    ],
    nutrients: ['Nitrates', 'Fiber', 'Folate', 'Iron'],
    description: 'Vibrant beetroot with natural nitrates for heart and brain health.',
    rating: 4.5,
    calories: 43,
    protein: '1.6g',
    fiber: '2.8g',
    vitaminC: '4.9mg'
  },
  {
    id: 10,
    name: 'Grapes',
    price: 100,
    image: grapes,
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Resveratrol supports heart health' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves memory and cognition' },
      { icon: FaEye, text: 'Eye Health', description: 'Antioxidants protect vision' }
    ],
    nutrients: ['Resveratrol', 'Vitamin C', 'Fiber', 'Potassium'],
    description: 'Juicy grapes rich in resveratrol and heart-healthy compounds.',
    rating: 4.7,
    calories: 62,
    protein: '0.6g',
    fiber: '0.9g',
    vitaminC: '3.2mg'
  },
  {
    id: 11,
    name: 'Papaya',
    price: 80,
    image: papaya,
    benefits: [
      { icon: FaLeaf, text: 'Digestive Health', description: 'Papain enzyme aids digestion' },
      { icon: FaEye, text: 'Eye Health', description: 'Rich in vitamin A and carotenoids' },
      { icon: FaShieldAlt, text: 'Immune Support', description: 'High vitamin C content' }
    ],
    nutrients: ['Vitamin C', 'Vitamin A', 'Papain', 'Fiber'],
    description: 'Tropical papaya with digestive enzymes and immune-boosting vitamins.',
    rating: 4.6,
    calories: 43,
    protein: '0.5g',
    fiber: '1.7g',
    vitaminC: '88.3mg'
  },
  {
    id: 12,
    name: 'Muskmelon',
    price: 90,
    image: muskmelon,
    benefits: [
      { icon: FaWater, text: 'Hydration', description: 'High water content for hydration' },
      { icon: FaEye, text: 'Eye Health', description: 'Beta-carotene for vision' },
      { icon: FaHeart, text: 'Heart Health', description: 'Potassium for blood pressure' }
    ],
    nutrients: ['Vitamin C', 'Beta-carotene', 'Potassium', 'Water'],
    description: 'Refreshing muskmelon with high water content and essential vitamins.',
    rating: 4.5,
    calories: 34,
    protein: '0.8g',
    fiber: '0.9g',
    vitaminC: '36.7mg'
  },
  {
    id: 13,
    name: 'Watermelon',
    price: 70,
    image: watermelon,
    benefits: [
      { icon: FaWater, text: 'Hydration', description: '92% water content for hydration' },
      { icon: FaHeart, text: 'Heart Health', description: 'Lycopene supports heart health' },
      { icon: FaFire, text: 'Energy', description: 'Natural sugars for energy' }
    ],
    nutrients: ['Lycopene', 'Vitamin C', 'Water', 'Potassium'],
    description: 'Juicy watermelon perfect for hydration and heart health.',
    rating: 4.8,
    calories: 30,
    protein: '0.6g',
    fiber: '0.4g',
    vitaminC: '8.1mg'
  },
  {
    id: 14,
    name: 'Pomegranate',
    price: 180,
    image: pomegranate,
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Punicalagins support heart health' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves memory and cognition' },
      { icon: FaShieldAlt, text: 'Anti-inflammatory', description: 'Reduces inflammation' }
    ],
    nutrients: ['Antioxidants', 'Vitamin C', 'Fiber', 'Punicalagins'],
    description: 'Powerful pomegranate with exceptional antioxidant properties.',
    rating: 4.9,
    calories: 83,
    protein: '1.7g',
    fiber: '4.0g',
    vitaminC: '10.2mg'
  },
  {
    id: 15,
    name: 'Carrot',
    price: 50,
    image: carrot,
    benefits: [
      { icon: FaEye, text: 'Eye Health', description: 'Beta-carotene for vision' },
      { icon: FaHeart, text: 'Heart Health', description: 'Fiber and potassium' },
      { icon: FaShieldAlt, text: 'Immune Support', description: 'Vitamin A for immunity' }
    ],
    nutrients: ['Beta-carotene', 'Fiber', 'Vitamin A', 'Potassium'],
    description: 'Crunchy carrots rich in beta-carotene for eye and immune health.',
    rating: 4.7,
    calories: 41,
    protein: '0.9g',
    fiber: '2.8g',
    vitaminC: '5.9mg'
  }
];

const FruitBenefits = () => {
  const [selectedFruit, setSelectedFruit] = useState(0);
  
  // Memoize current fruit to prevent unnecessary re-renders
  const currentFruit = useMemo(() => fruits[selectedFruit], [selectedFruit]);

  const nextFruit = () => {
    setSelectedFruit((prev) => (prev + 1) % fruits.length);
  };

  const prevFruit = () => {
    setSelectedFruit((prev) => (prev - 1 + fruits.length) % fruits.length);
  };

  return (
    <section id="benefits" className="py-16 bg-[#FDF8E1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-brand text-4xl md:text-5xl font-bold text-[#194528] mb-4">
            Fruit Benefits & Nutrition
          </h2>
          <p className="text-lg text-[#194528]/80 max-w-2xl mx-auto">
            Discover the incredible health benefits and nutritional values of our premium fruit selection.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Fruit Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="relative h-80 rounded-xl overflow-hidden mb-4">
                <img
                  src={currentFruit.image}
                  alt={currentFruit.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevFruit}
                  className="bg-[#194528] text-white rounded-full p-2 hover:bg-[#194528]/80 transition-colors"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex gap-2">
                  {fruits.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFruit(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedFruit ? 'bg-[#F88B42]' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextFruit}
                  className="bg-[#194528] text-white rounded-full p-2 hover:bg-[#194528]/80 transition-colors"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="space-y-6">
            {/* Fruit Info */}
            <div>
              <h3 className="text-3xl font-bold text-[#194528] mb-2">{currentFruit.name}</h3>
              <p className="text-[#194528]/80 mb-4">{currentFruit.description}</p>
              

            </div>

            {/* Nutrition Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="text-xl font-bold text-[#F88B42]">{currentFruit.calories}</div>
                <div className="text-xs text-[#194528]/70">Calories</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="text-xl font-bold text-[#F88B42]">{currentFruit.vitaminC}</div>
                <div className="text-xs text-[#194528]/70">Vitamin C</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="text-xl font-bold text-[#F88B42]">{currentFruit.protein}</div>
                <div className="text-xs text-[#194528]/70">Protein</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="text-xl font-bold text-[#F88B42]">{currentFruit.fiber}</div>
                <div className="text-xs text-[#194528]/70">Fiber</div>
              </div>
            </div>

            {/* Health Benefits */}
            <div>
              <h4 className="text-lg font-bold text-[#194528] mb-3 flex items-center gap-2">
                <FaHeart className="text-[#F88B42]" />
                Health Benefits
              </h4>
              <div className="space-y-3">
                {currentFruit.benefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#194528] rounded-full p-2">
                        <benefit.icon className="text-[#F88B42] w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-[#194528] mb-1">{benefit.text}</h5>
                        <p className="text-sm text-[#194528]/70">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Nutrients */}
            <div>
              <h4 className="text-lg font-bold text-[#194528] mb-3">Key Nutrients</h4>
              <div className="flex flex-wrap gap-2">
                {currentFruit.nutrients.map((nutrient, index) => (
                  <span
                    key={index}
                    className="bg-[#F88B42]/10 text-[#194528] px-3 py-1 rounded-full text-sm font-medium border border-[#F88B42]/20"
                  >
                    {nutrient}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FruitBenefits;