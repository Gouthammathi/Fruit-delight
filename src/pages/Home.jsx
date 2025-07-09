import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import SubscriptionPlans from '../components/SubscriptionPlans';
import BulkOrdersSection from '../components/BulkOrdersSection';
import FruitLifecycle from '../components/FruitLifecycle';
import FruitBenefits from '../components/FruitBenefits';
import FruitGallery from '../components/FruitGallery';
import StorySection from '../components/StorySection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import QuoteSection from '../components/QuoteSection';

const Home = ({ onAddToCart }) => (
  <>
    <HeroSection />
    <FeaturesSection />
    <SubscriptionPlans />
    <BulkOrdersSection />
    <FruitLifecycle />
    <QuoteSection quote="From farm to table, we ensure every fruit tells a story of freshness and care." />
    <FruitBenefits onAddToCart={onAddToCart} />
    <FruitGallery />
    <StorySection />
    <TestimonialsSection />
    <ContactSection />
  </>
);

export default Home; 