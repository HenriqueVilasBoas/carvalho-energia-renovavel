import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import Services from '../components/Services';
import NewsSection from '../components/NewsSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // Delay to ensure sections are rendered
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
    }
  }, [location]);
  return (
    <div className="min-h-screen bg-[#FAFFEE]">
      <Header />
      <Hero />
      <FeaturedProjects />
      <Services />
      <NewsSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default HomePage;