import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaBrain, FaEye, FaBone, FaLeaf, FaPlus, FaStar, FaShoppingCart, FaArrowRight, FaCheck, FaThermometerHalf, FaShieldAlt, FaChevronLeft, FaChevronRight, FaArrowLeft, FaHeartbeat } from 'react-icons/fa';

const fruits = [
  {
    id: 1,
    name: 'Apple',
    emoji: '🍎',
    price: 80,
    color: 'from-red-400 to-red-600',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Rich in fiber and antioxidants that support cardiovascular health', value: 'High Fiber' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves memory and concentration with natural compounds', value: 'Antioxidants' },
      { icon: FaEye, text: 'Eye Health', description: 'Contains vitamin A and flavonoids for vision protection', value: 'Vitamin A' }
    ],
    nutrients: ['Vitamin C', 'Fiber', 'Antioxidants', 'Potassium'],
    description: 'Crisp and juicy apples packed with essential nutrients for your daily health boost. Perfect for maintaining heart health and supporting brain function.',
    rating: 4.8,
    reviews: 1247,
    calories: 52,
    protein: '0.3g',
    fiber: '2.4g',
    vitaminC: '4.6mg'
  },
  {
    id: 2,
    name: 'Banana',
    emoji: '🍌',
    price: 60,
    color: 'from-yellow-400 to-yellow-600',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'High potassium content helps regulate blood pressure', value: '422mg K' },
      { icon: FaBrain, text: 'Energy Boost', description: 'Natural sugars provide instant and sustained energy', value: 'Natural Sugars' },
      { icon: FaBone, text: 'Bone Health', description: 'Contains calcium and magnesium for strong bones', value: 'Ca + Mg' }
    ],
    nutrients: ['Potassium', 'Vitamin B6', 'Fiber', 'Vitamin C'],
    description: 'Perfect energy-packed fruit for pre and post-workout nutrition. Rich in potassium and natural sugars for sustained energy.',
    rating: 4.9,
    reviews: 2156,
    calories: 89,
    protein: '1.1g',
    fiber: '2.6g',
    vitaminC: '8.7mg'
  },
  {
    id: 3,
    name: 'Orange',
    emoji: '🍊',
    price: 70,
    color: 'from-orange-400 to-orange-600',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaShieldAlt, text: 'Immune System', description: 'High vitamin C content strengthens immune defense', value: '53.2mg C' },
      { icon: FaEye, text: 'Skin Health', description: 'Collagen production support for healthy skin', value: 'Collagen' },
      { icon: FaLeaf, text: 'Digestive Health', description: 'Natural fiber promotes healthy gut function', value: '3.1g Fiber' }
    ],
    nutrients: ['Vitamin C', 'Folate', 'Fiber', 'Potassium'],
    description: 'Zesty and refreshing oranges loaded with immune-boosting vitamin C. Perfect for maintaining skin health and digestive wellness.',
    rating: 4.7,
    reviews: 1893,
    calories: 47,
    protein: '0.9g',
    fiber: '2.4g',
    vitaminC: '53.2mg'
  },
  {
    id: 4,
    name: 'Mango',
    emoji: '🥭',
    price: 120,
    color: 'from-yellow-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaEye, text: 'Eye Health', description: 'Rich in vitamin A and beta-carotene for vision', value: '54μg A' },
      { icon: FaHeart, text: 'Skin Glow', description: 'Promotes healthy skin and hair with antioxidants', value: 'Antioxidants' },
      { icon: FaBrain, text: 'Digestive Aid', description: 'Contains digestive enzymes for better absorption', value: 'Enzymes' }
    ],
    nutrients: ['Vitamin A', 'Vitamin C', 'Fiber', 'Antioxidants'],
    description: 'Sweet and tropical mangoes, the king of fruits with royal health benefits. Rich in vitamins and natural enzymes.',
    rating: 4.9,
    reviews: 3421,
    calories: 60,
    protein: '0.8g',
    fiber: '1.6g',
    vitaminC: '36.4mg'
  },
  {
    id: 5,
    name: 'Pineapple',
    emoji: '🍍',
    price: 100,
    color: 'from-yellow-400 to-green-500',
    image: 'https://images.unsplash.com/photo-1550258987-190a62d4fa60?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaThermometerHalf, text: 'Anti-inflammatory', description: 'Contains bromelain enzyme for inflammation reduction', value: 'Bromelain' },
      { icon: FaBrain, text: 'Digestive Health', description: 'Aids in protein digestion and gut health', value: 'Digestive' },
      { icon: FaShieldAlt, text: 'Immune Support', description: 'Rich in vitamin C and manganese for immunity', value: '47.8mg C' }
    ],
    nutrients: ['Vitamin C', 'Manganese', 'Bromelain', 'Fiber'],
    description: 'Tropical pineapple with natural enzymes for better digestion and health. Contains bromelain for anti-inflammatory benefits.',
    rating: 4.6,
    reviews: 1567,
    calories: 50,
    protein: '0.5g',
    fiber: '1.4g',
    vitaminC: '47.8mg'
  },
  {
    id: 6,
    name: 'Strawberry',
    emoji: '🍓',
    price: 150,
    color: 'from-red-400 to-pink-500',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=600&fit=crop',
    benefits: [
      { icon: FaHeart, text: 'Heart Health', description: 'Antioxidants support cardiovascular health', value: 'Ellagic Acid' },
      { icon: FaBrain, text: 'Brain Function', description: 'Improves cognitive function and memory', value: 'Flavonoids' },
      { icon: FaEye, text: 'Anti-aging', description: 'Rich in ellagic acid for cellular protection', value: 'Anti-aging' }
    ],
    nutrients: ['Vitamin C', 'Antioxidants', 'Fiber', 'Folate'],
    description: 'Sweet and tangy strawberries packed with powerful antioxidants. Excellent for heart health and anti-aging benefits.',
    rating: 4.8,
    reviews: 2789,
    calories: 32,
    protein: '0.7g',
    fiber: '2.0g',
    vitaminC: '58.8mg'
  }
];

const FruitShowcase = ({ fruits, onAddToCart }) => {
  const [selectedFruit, setSelectedFruit] = useState(0);
  const [hoveredFruit, setHoveredFruit] = useState(null);
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

  const selectFruit = (index) => {
    setSelectedFruit(index);
    setIsAutoPlaying(false);
  };

  const currentFruit = fruits[selectedFruit];

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Main Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Fruit Image */}
        <div className="relative">
          <motion.div
            key={currentFruit.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Fruit Image */}
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <img
                  src={currentFruit.image}
                  alt={currentFruit.name}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Fruit Emoji Overlay */}
                <div className="absolute top-4 left-4 text-6xl bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  {currentFruit.emoji}
                </div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-accent text-[#FDF8E1] px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  ₹{currentFruit.price}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevFruit}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors z-10"
            >
              <FaChevronLeft className="text-accent text-xl" />
            </button>
            
            <button
              onClick={nextFruit}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors z-10"
            >
              <FaChevronRight className="text-accent text-xl" />
            </button>
          </motion.div>

          {/* Fruit Thumbnails */}
          <div className="flex justify-center gap-4 mt-8">
            {fruits.map((fruit, index) => (
              <motion.button
                key={fruit.id}
                onClick={() => selectFruit(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                  index === selectedFruit 
                    ? 'border-accent shadow-lg scale-110' 
                    : 'border-gray-200 hover:border-accent/50'
                }`}
              >
                <img
                  src={fruit.image}
                  alt={fruit.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Side - Benefits */}
        <motion.div
          key={currentFruit.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Fruit Info */}
          <div>
            <h2 className="text-4xl font-bold text-primary mb-4">{currentFruit.name}</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">{currentFruit.description}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold text-primary">{currentFruit.rating}</span>
                <span className="text-gray-600">({currentFruit.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Nutrition Facts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-accent/10 to-pink-50 rounded-xl p-4 border border-accent/20">
              <div className="text-2xl font-bold text-accent">{currentFruit.calories}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div className="bg-gradient-to-r from-accent/10 to-pink-50 rounded-xl p-4 border border-accent/20">
              <div className="text-2xl font-bold text-accent">{currentFruit.vitaminC}</div>
              <div className="text-sm text-gray-600">Vitamin C</div>
            </div>
            <div className="bg-gradient-to-r from-accent/10 to-pink-50 rounded-xl p-4 border border-accent/20">
              <div className="text-2xl font-bold text-accent">{currentFruit.protein}</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div className="bg-gradient-to-r from-accent/10 to-pink-50 rounded-xl p-4 border border-accent/20">
              <div className="text-2xl font-bold text-accent">{currentFruit.fiber}</div>
              <div className="text-sm text-gray-600">Fiber</div>
            </div>
          </div>

          {/* Health Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <FaHeart className="text-accent" />
              Health Benefits
            </h3>
            <div className="space-y-4">
              {currentFruit.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-[#18492B] rounded-full p-3 shadow-md transition-all duration-300 flex items-center justify-center">
                      <benefit.icon className="text-lg text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-primary text-lg">{benefit.text}</h4>
                        <span className="bg-accent text-[#FDF8E1] px-3 py-1 rounded-full text-sm font-semibold">
                          {benefit.value}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Nutrients */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Key Nutrients</h3>
            <div className="flex flex-wrap gap-3">
              {currentFruit.nutrients.map((nutrient, index) => (
                <span
                  key={index}
                  className="bg-accent/10 text-accent px-4 py-2 rounded-full font-semibold border border-accent/20"
                >
                  {nutrient}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(currentFruit)}
            className="w-full bg-gradient-to-r from-accent to-pink-600 text-[#FDF8E1] py-4 rounded-xl font-bold text-lg hover:from-accent-dark hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <FaShoppingCart className="text-xl" />
            Add {currentFruit.name} to Cart
            <FaArrowRight className="text-lg" />
          </motion.button>
        </motion.div>
      </div>

      {/* Fruit Grid for Hover Effects */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-primary mb-8 text-center">Explore All Fruits</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {fruits.map((fruit, index) => (
            <motion.div
              key={fruit.id}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative group cursor-pointer"
              onClick={() => selectFruit(index)}
            >
              <div className="relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-accent/30">
                <div className="text-4xl mb-3 text-center">{fruit.emoji}</div>
                <h4 className="font-semibold text-primary text-center text-sm">{fruit.name}</h4>
                
                {/* Hover Benefits Overlay */}
                <AnimatePresence>
                  {hoveredFruit === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 z-50"
                      onMouseEnter={() => setHoveredFruit(index)}
                      onMouseLeave={() => setHoveredFruit(null)}
                    >
                      <div className="text-center mb-3">
                        <h5 className="font-bold text-primary">{fruit.name} Benefits</h5>
                      </div>
                      <div className="space-y-2">
                        {fruit.benefits.slice(0, 2).map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="bg-[#18492B] rounded-full p-3 shadow-md transition-all duration-300 flex items-center justify-center">
                              <benefit.icon className="text-lg text-accent" />
                            </div>
                            <span className="text-gray-700">{benefit.text}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-3">
                        <span className="text-accent font-semibold">₹{fruit.price}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FruitBenefits = ({ onAddToCart }) => {
  const benefits = [
    {
      icon: FaHeartbeat,
      title: 'Boosts Immunity',
      description: 'Packed with Vitamin C and antioxidants to strengthen your natural defenses.',
    },
    {
      icon: FaLeaf,
      title: 'Rich in Nutrients',
      description: 'A natural source of essential vitamins, minerals, and fiber for overall wellness.',
    },
    {
      icon: FaBrain,
      title: 'Enhances Energy',
      description: 'Natural sugars provide a healthy and sustained energy boost without the crash.',
    },
    {
      icon: FaShieldAlt,
      title: 'Improves Digestion',
      description: 'High in dietary fiber, which aids in digestion and promotes a healthy gut.',
    },
  ];

  return (
    <section id="benefits" className="py-8 sm:py-24 bg-[#FDF8E1] quotebggg-section relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="font-brand text-2xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#18492B' }}>
            Fruit Benefits
          </h2>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg max-w-2xl mx-auto" style={{ color: '#18492B' }}>
            Discover the amazing health benefits of our fresh fruit selection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-center p-6"
            >
              <div className="flex justify-center items-center mb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <div className="bg-[#18492B] rounded-full p-3 shadow-md transition-all duration-300 flex items-center justify-center">
                    <benefit.icon className="text-lg text-accent" />
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-xl text-[#13381A] mb-2">{benefit.title}</h3>
              <p className="text-[#13381A]/80">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FruitBenefits; 