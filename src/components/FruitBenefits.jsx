import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaBrain, FaEye, FaBone, FaLeaf, FaPlus, FaStar, FaShoppingCart, FaArrowRight, FaCheck, FaThermometerHalf, FaShieldAlt, FaChevronLeft, FaChevronRight, FaArrowLeft, FaHeartbeat, FaWater, FaFire, FaSeedling, FaSun, FaMoon } from 'react-icons/fa';

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
    emoji: '🍎',
    price: 80,
    color: 'from-red-400 to-red-600',
    bgColor: 'bg-red-50',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Rich in fiber and antioxidants that support cardiovascular health', value: 'High Fiber' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves memory and concentration with natural compounds', value: 'Antioxidants' },
      { icon: FaEye, text: 'Eye Health', description: 'Contains vitamin A and flavonoids for vision protection', value: 'Vitamin A' }
    ],
    nutrients: ['Vitamin C', 'Fiber', 'Antioxidants', 'Potassium'],
    description: 'Crisp and juicy apples packed with essential nutrients for your daily health boost.',
    rating: 4.8,
    reviews: 1247,
    calories: 52,
    protein: '0.3g',
    fiber: '2.4g',
    vitaminC: '4.6mg',
    vitaminA: '54 IU',
    potassium: '107mg'
  },
  {
    id: 2,
    name: 'Banana',
    emoji: '🍌',
    price: 60,
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-50',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'High potassium content helps regulate blood pressure', value: '422mg K' },
      { icon: FaBrain, text: 'Energy Boost', description: 'Natural sugars provide instant and sustained energy', value: 'Natural Sugars' },
      { icon: FaBone, text: 'Bone Health', description: 'Contains calcium and magnesium for strong bones', value: 'Ca + Mg' }
    ],
    nutrients: ['Potassium', 'Vitamin B6', 'Fiber', 'Vitamin C'],
    description: 'Perfect energy-packed fruit for pre and post-workout nutrition.',
    rating: 4.9,
    reviews: 2156,
    calories: 89,
    protein: '1.1g',
    fiber: '2.6g',
    vitaminC: '8.7mg',
    vitaminB6: '0.4mg',
    potassium: '358mg'
  },
  {
    id: 3,
    name: 'Orange',
    emoji: '🍊',
    price: 70,
    color: 'from-orange-400 to-orange-600',
    bgColor: 'bg-orange-50',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaShieldAlt, text: 'Immune System', description: 'High vitamin C content strengthens immune defense', value: '53.2mg C' },
      { icon: FaEye, text: 'Skin Health', description: 'Collagen production support for healthy skin', value: 'Collagen' },
      { icon: FaLeaf, text: 'Digestive Health', description: 'Natural fiber promotes healthy gut function', value: '3.1g Fiber' }
    ],
    nutrients: ['Vitamin C', 'Folate', 'Fiber', 'Potassium'],
    description: 'Zesty and refreshing oranges loaded with immune-boosting vitamin C.',
    rating: 4.7,
    reviews: 1893,
    calories: 47,
    protein: '0.9g',
    fiber: '2.4g',
    vitaminC: '53.2mg',
    folate: '30μg',
    potassium: '181mg'
  },
  {
    id: 4,
    name: 'Dragon Fruit',
    emoji: '🐉',
    price: 200,
    color: 'from-pink-400 to-purple-600',
    bgColor: 'bg-pink-50',
    image: dragonFruit,
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Rich in antioxidants and healthy fats', value: 'Antioxidants' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves cognitive function and memory', value: 'Omega-3' },
      { icon: FaEye, text: 'Eye Health', description: 'Contains vitamin A and carotenoids', value: 'Vitamin A' }
    ],
    nutrients: ['Antioxidants', 'Vitamin C', 'Fiber', 'Iron'],
    description: 'Exotic dragon fruit with unique appearance and powerful health benefits.',
    rating: 4.6,
    reviews: 892,
    calories: 60,
    protein: '1.2g',
    fiber: '1.1g',
    vitaminC: '8.0mg',
    iron: '0.7mg',
    magnesium: '18mg'
  },
  {
    id: 5,
    name: 'Kiwi',
    emoji: '🥝',
    price: 120,
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-50',
    image: kiwi,
    benefits: [
      { icon: FaShieldAlt, text: 'Immune Boost', description: 'Twice the vitamin C of oranges', value: '64mg C' },
      { icon: FaHeart, text: 'Heart Health', description: 'Potassium and fiber for cardiovascular health', value: '312mg K' },
      { icon: FaBrain, text: 'Digestive Aid', description: 'Natural enzymes aid digestion', value: 'Actinidin' }
    ],
    nutrients: ['Vitamin C', 'Vitamin K', 'Fiber', 'Potassium'],
    description: 'Tangy kiwi with exceptional vitamin C content and digestive enzymes.',
    rating: 4.8,
    reviews: 1456,
    calories: 61,
    protein: '1.1g',
    fiber: '3.0g',
    vitaminC: '64.0mg',
    vitaminK: '40.3μg',
    potassium: '312mg'
  },
  {
    id: 6,
    name: 'Avocado',
    emoji: '🥑',
    price: 150,
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-100',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Healthy monounsaturated fats', value: '15g Fat' },
      { icon: FaBrain, text: 'Brain Function', description: 'Rich in folate and vitamin E', value: '81μg Folate' },
      { icon: FaEye, text: 'Eye Health', description: 'Lutein and zeaxanthin for vision', value: 'Lutein' }
    ],
    nutrients: ['Healthy Fats', 'Fiber', 'Vitamin E', 'Folate'],
    description: 'Creamy avocado packed with healthy fats and essential nutrients.',
    rating: 4.9,
    reviews: 2341,
    calories: 160,
    protein: '2.0g',
    fiber: '6.7g',
    vitaminE: '2.1mg',
    folate: '81μg',
    potassium: '485mg'
  },
  {
    id: 7,
    name: 'Mango',
    emoji: '🥭',
    price: 120,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-100',
    image: mango,
    benefits: [
      { icon: FaEye, text: 'Eye Health', description: 'Rich in vitamin A and beta-carotene', value: '54μg A' },
      { icon: FaHeart, text: 'Skin Glow', description: 'Promotes healthy skin and hair', value: 'Antioxidants' },
      { icon: FaBrain, text: 'Digestive Aid', description: 'Contains digestive enzymes', value: 'Enzymes' }
    ],
    nutrients: ['Vitamin A', 'Vitamin C', 'Fiber', 'Antioxidants'],
    description: 'Sweet and tropical mangoes, the king of fruits with royal health benefits.',
    rating: 4.9,
    reviews: 3421,
    calories: 60,
    protein: '0.8g',
    fiber: '1.6g',
    vitaminC: '36.4mg',
    vitaminA: '54μg',
    potassium: '168mg'
  },
  {
    id: 8,
    name: 'Strawberry',
    emoji: '🍓',
    price: 150,
    color: 'from-red-400 to-pink-500',
    bgColor: 'bg-red-100',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Antioxidants support cardiovascular health', value: 'Ellagic Acid' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves cognitive function', value: 'Flavonoids' },
      { icon: FaEye, text: 'Anti-aging', description: 'Rich in ellagic acid', value: 'Anti-aging' }
    ],
    nutrients: ['Vitamin C', 'Antioxidants', 'Fiber', 'Folate'],
    description: 'Sweet and tangy strawberries packed with powerful antioxidants.',
    rating: 4.8,
    reviews: 2789,
    calories: 32,
    protein: '0.7g',
    fiber: '2.0g',
    vitaminC: '58.8mg',
    folate: '24μg',
    manganese: '0.4mg'
  },
  {
    id: 9,
    name: 'Beetroot',
    emoji: '🫘',
    price: 40,
    color: 'from-red-600 to-purple-700',
    bgColor: 'bg-red-100',
    image: beetroot,
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Nitrates improve blood flow', value: 'Nitrates' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves cognitive performance', value: 'Nitric Oxide' },
      { icon: FaFire, text: 'Energy Boost', description: 'Natural nitrates for endurance', value: 'Endurance' }
    ],
    nutrients: ['Nitrates', 'Fiber', 'Folate', 'Iron'],
    description: 'Vibrant beetroot with natural nitrates for heart and brain health.',
    rating: 4.5,
    reviews: 987,
    calories: 43,
    protein: '1.6g',
    fiber: '2.8g',
    folate: '109μg',
    iron: '0.8mg',
    potassium: '325mg'
  },
  {
    id: 10,
    name: 'Grapes',
    emoji: '🍇',
    price: 100,
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50',
    image: grapes,
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Resveratrol supports heart health', value: 'Resveratrol' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves memory and cognition', value: 'Polyphenols' },
      { icon: FaEye, text: 'Eye Health', description: 'Antioxidants protect vision', value: 'Antioxidants' }
    ],
    nutrients: ['Resveratrol', 'Vitamin C', 'Fiber', 'Potassium'],
    description: 'Juicy grapes rich in resveratrol and heart-healthy compounds.',
    rating: 4.7,
    reviews: 1892,
    calories: 62,
    protein: '0.6g',
    fiber: '0.9g',
    vitaminC: '3.2mg',
    potassium: '191mg',
    vitaminK: '14.6μg'
  },
  {
    id: 11,
    name: 'Papaya',
    emoji: '🥭',
    price: 80,
    color: 'from-orange-400 to-yellow-500',
    bgColor: 'bg-orange-50',
    image: papaya,
    benefits: [
      { icon: FaLeaf, text: 'Digestive Health', description: 'Papain enzyme aids digestion', value: 'Papain' },
      { icon: FaEye, text: 'Eye Health', description: 'Rich in vitamin A and carotenoids', value: 'Vitamin A' },
      { icon: FaShieldAlt, text: 'Immune Support', description: 'High vitamin C content', value: '88.3mg C' }
    ],
    nutrients: ['Vitamin C', 'Vitamin A', 'Papain', 'Fiber'],
    description: 'Tropical papaya with digestive enzymes and immune-boosting vitamins.',
    rating: 4.6,
    reviews: 1234,
    calories: 43,
    protein: '0.5g',
    fiber: '1.7g',
    vitaminC: '88.3mg',
    vitaminA: '950 IU',
    potassium: '182mg'
  },
  {
    id: 12,
    name: 'Muskmelon',
    emoji: '🍈',
    price: 90,
    color: 'from-green-400 to-yellow-500',
    bgColor: 'bg-green-50',
    image: muskmelon,
    benefits: [
      { icon: FaWater, text: 'Hydration', description: 'High water content for hydration', value: '90% Water' },
      { icon: FaEye, text: 'Eye Health', description: 'Beta-carotene for vision', value: 'Beta-carotene' },
      { icon: FaHeart, text: 'Heart Health', description: 'Potassium for blood pressure', value: '267mg K' }
    ],
    nutrients: ['Vitamin C', 'Beta-carotene', 'Potassium', 'Water'],
    description: 'Refreshing muskmelon with high water content and essential vitamins.',
    rating: 4.5,
    reviews: 1567,
    calories: 34,
    protein: '0.8g',
    fiber: '0.9g',
    vitaminC: '36.7mg',
    vitaminA: '3382 IU',
    potassium: '267mg'
  },
  {
    id: 13,
    name: 'Watermelon',
    emoji: '🍉',
    price: 70,
    color: 'from-red-400 to-pink-500',
    bgColor: 'bg-red-50',
    image: watermelon,
    benefits: [
      { icon: FaWater, text: 'Hydration', description: '92% water content for hydration', value: '92% Water' },
      { icon: FaHeart, text: 'Heart Health', description: 'Lycopene supports heart health', value: 'Lycopene' },
      { icon: FaFire, text: 'Energy', description: 'Natural sugars for energy', value: 'Natural Sugars' }
    ],
    nutrients: ['Lycopene', 'Vitamin C', 'Water', 'Potassium'],
    description: 'Juicy watermelon perfect for hydration and heart health.',
    rating: 4.8,
    reviews: 2341,
    calories: 30,
    protein: '0.6g',
    fiber: '0.4g',
    vitaminC: '8.1mg',
    lycopene: '4532μg',
    potassium: '112mg'
  },
  {
    id: 14,
    name: 'Pomegranate',
    emoji: '🍎',
    price: 180,
    color: 'from-red-500 to-purple-600',
    bgColor: 'bg-red-100',
    image: pomegranate,
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Punicalagins support heart health', value: 'Punicalagins' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves memory and cognition', value: 'Antioxidants' },
      { icon: FaShieldAlt, text: 'Anti-inflammatory', description: 'Reduces inflammation', value: 'Anti-inflammatory' }
    ],
    nutrients: ['Antioxidants', 'Vitamin C', 'Fiber', 'Punicalagins'],
    description: 'Powerful pomegranate with exceptional antioxidant properties.',
    rating: 4.9,
    reviews: 1892,
    calories: 83,
    protein: '1.7g',
    fiber: '4.0g',
    vitaminC: '10.2mg',
    vitaminK: '16.4μg',
    potassium: '236mg'
  },
  {
    id: 15,
    name: 'Carrot',
    emoji: '🥕',
    price: 50,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    image: carrot,
    benefits: [
      { icon: FaEye, text: 'Eye Health', description: 'Beta-carotene for vision', value: 'Beta-carotene' },
      { icon: FaHeart, text: 'Heart Health', description: 'Fiber and potassium', value: 'Fiber' },
      { icon: FaShieldAlt, text: 'Immune Support', description: 'Vitamin A for immunity', value: 'Vitamin A' }
    ],
    nutrients: ['Beta-carotene', 'Fiber', 'Vitamin A', 'Potassium'],
    description: 'Crunchy carrots rich in beta-carotene for eye and immune health.',
    rating: 4.7,
    reviews: 1456,
    calories: 41,
    protein: '0.9g',
    fiber: '2.8g',
    vitaminA: '835μg',
    vitaminC: '5.9mg',
    potassium: '320mg'
  }
];

const FruitBenefits = () => {
  const [selectedFruit, setSelectedFruit] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setSelectedFruit((prev) => (prev + 1) % fruits.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, fruits.length]);

  const nextFruit = () => {
    setSelectedFruit((prev) => (prev + 1) % fruits.length);
    setIsAutoPlaying(false);
  };

  const prevFruit = () => {
    setSelectedFruit((prev) => (prev - 1 + fruits.length) % fruits.length);
    setIsAutoPlaying(false);
  };

  const currentFruit = fruits[selectedFruit];

  return (
    <section id="benefits" className="py-8 sm:py-24 bg-[#FDF8E1] quotebggg-section relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23194928' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-brand text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#194528] mb-4"
          >
            Fruit Benefits & Nutrition
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#194528]/80 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the incredible health benefits and nutritional values of our premium fruit selection. 
            Each fruit is carefully sourced and packed with essential nutrients for your wellness journey.
          </motion.p>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
            <motion.div
              key="carousel"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
                              {/* Carousel View */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Side - Fruit Image */}
                  <div className="relative">
                    <motion.div
                      key={currentFruit.id}
                      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      className="relative"
                    >
                    <div className={`relative ${currentFruit.bgColor} rounded-3xl p-8 shadow-2xl border-2 border-white/50`}>
                      <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden">
                <img
                  src={currentFruit.image}
                  alt={currentFruit.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                
              </div>
            </div>

                    {/* Navigation */}
            <button
              onClick={prevFruit}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors z-10"
            >
                      <FaChevronLeft className="text-[#194528] text-xl" />
            </button>
            
            <button
              onClick={nextFruit}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors z-10"
            >
                      <FaChevronRight className="text-[#194528] text-xl" />
            </button>
          </motion.div>

                                      {/* Thumbnails with Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                      {/* Left Arrow */}
                      <button
                        onClick={prevFruit}
                        className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors z-10"
                      >
                        <FaChevronLeft className="text-[#194528] text-lg" />
                      </button>

                      {/* Thumbnails */}
                      <div className="flex gap-3 overflow-x-auto pb-2 max-w-xs">
                        {fruits.map((fruit, index) => (
                          <motion.button
                            key={fruit.id}
                            onClick={() => setSelectedFruit(index)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative w-12 h-12 rounded-full overflow-hidden border-3 transition-all duration-300 flex-shrink-0 ${
                              index === selectedFruit 
                                ? 'border-[#F88B42] shadow-lg scale-110' 
                                : 'border-gray-200 hover:border-[#F88B42]/50'
                            }`}
                          >
                            <img
                              src={fruit.image}
                              alt={fruit.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.button>
                        ))}
                      </div>

                      {/* Right Arrow */}
                      <button
                        onClick={nextFruit}
                        className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors z-10"
                      >
                        <FaChevronRight className="text-[#194528] text-lg" />
                      </button>
                    </div>
        </div>

                          {/* Right Side - Benefits */}
                  <motion.div
                    key={currentFruit.id}
                    initial={{ opacity: 0, x: 50, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 80,
                      damping: 12
                    }}
                    className="space-y-6"
                  >
          {/* Fruit Info */}
          <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#194528] mb-3">{currentFruit.name}</h3>
                    <p className="text-lg text-[#194528]/80 leading-relaxed mb-4">{currentFruit.description}</p>
            
            {/* Rating */}
                    <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400 text-xl" />
                        <span className="font-semibold text-[#194528] text-lg">{currentFruit.rating}</span>
                        <span className="text-[#194528]/60">({currentFruit.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Nutrition Facts */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg"
                    >
                      <div className="text-2xl font-bold text-[#F88B42]">{currentFruit.calories}</div>
                      <div className="text-sm text-[#194528]/70">Calories</div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg"
                    >
                      <div className="text-2xl font-bold text-[#F88B42]">{currentFruit.vitaminC}</div>
                      <div className="text-sm text-[#194528]/70">Vitamin C</div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg"
                    >
                      <div className="text-2xl font-bold text-[#F88B42]">{currentFruit.protein}</div>
                      <div className="text-sm text-[#194528]/70">Protein</div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg"
                    >
                      <div className="text-2xl font-bold text-[#F88B42]">{currentFruit.fiber}</div>
                      <div className="text-sm text-[#194528]/70">Fiber</div>
                    </motion.div>
                  </div>

          {/* Health Benefits */}
          <div>
                    <h4 className="text-xl font-bold text-[#194528] mb-4 flex items-center gap-2">
                      <FaHeart className="text-[#F88B42]" />
              Health Benefits
                    </h4>
                    <div className="space-y-3">
                                      {currentFruit.benefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30, y: 10 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ 
                              delay: 0.5 + index * 0.15,
                              duration: 0.6,
                              ease: [0.25, 0.46, 0.45, 0.94],
                              type: "spring",
                              stiffness: 120,
                              damping: 15
                            }}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 hover:shadow-xl transition-shadow"
                          >
                  <div className="flex items-start gap-4">
                            <div className="bg-[#194528] rounded-full p-3 shadow-md flex items-center justify-center">
                              <benefit.icon className="text-lg text-[#F88B42]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold text-[#194528] text-lg">{benefit.text}</h5>
                                <span className="bg-[#F88B42] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {benefit.value}
                        </span>
                      </div>
                              <p className="text-[#194528]/80 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Nutrients */}
          <div>
                    <h4 className="text-lg font-bold text-[#194528] mb-3">Key Nutrients</h4>
                                        <div className="flex flex-wrap gap-2">
                      {currentFruit.nutrients.map((nutrient, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ 
                            delay: 0.8 + index * 0.1, 
                            duration: 0.5,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            type: "spring",
                            stiffness: 150,
                            damping: 12
                          }}
                          className="bg-[#F88B42]/10 text-[#194528] px-3 py-1 rounded-full text-sm font-semibold border border-[#F88B42]/20"
                        >
                          {nutrient}
                        </motion.span>
                      ))}
                    </div>
                      </div>
                    </motion.div>
              </div>
            </motion.div>

        </AnimatePresence>
      </div>
    </section>
  );
};

export default FruitBenefits; 