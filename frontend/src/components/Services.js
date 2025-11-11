import React, { useState, useEffect } from 'react';
import { Construction, Hammer, Settings, Zap, Truck, Wrench, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations, mockServices } from '../data/mockData';

const iconMap = {
  Construction,
  Hammer,
  Settings,
  Zap,
  Truck,
  Wrench
};

const Services = () => {
  const [currentService, setCurrentService] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % mockServices.length);
  };

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + mockServices.length) % mockServices.length);
  };

  const getVisibleServices = () => {
    const services = [];
    // Mobile: 1 card, Desktop/Tablet: 3 cards
    const cardsToShow = isMobile ? 1 : 3;
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentService + i) % mockServices.length;
      services.push(mockServices[index]);
    }
    return services;
  };

  return (
    <section id="services" className="py-16 bg-[#EDEDFE]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="display-medium text-[#004534] mb-4">
            {t.servicesTitle}
          </h2>
          <p className="body-large text-[#0C6951] max-w-2xl mx-auto">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* Services Carousel */}
        <div className="relative">
          <div className={`grid gap-8 max-w-6xl mx-auto ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {getVisibleServices().map((service, index) => {
              const IconComponent = iconMap[service.icon];
              const isCenter = isMobile ? true : index === 1;
              
              return (
                <div
                  key={service.id}
                  className={`network-card text-center transition-all duration-500 ${
                    isCenter ? 'scale-105 shadow-2xl border-2 border-[#004534]' : 'opacity-80'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title[language]}
                      className="w-full h-48 object-cover rounded-xl mb-6"
                    />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#004534] p-4 rounded-full shadow-lg">
                      <IconComponent className="text-[#D3FF62]" size={32} />
                    </div>
                  </div>
                  
                  <div className="pt-8">
                    <h3 className="network-card-title text-xl mb-4">
                      {service.title[language]}
                    </h3>
                    <p className="network-card-content">
                      {service.description[language]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevService}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#004534] hover:bg-[#0C6951] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 -ml-6"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextService}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#004534] hover:bg-[#0C6951] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 -mr-6"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {mockServices.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentService(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentService
                  ? 'bg-[#004534] scale-125'
                  : 'bg-[#CACAFC] hover:bg-[#004534]/50'
              }`}
            />
          ))}
        </div>

        {/* Removed All Services Grid as requested */}
      </div>
    </section>
  );
};

export default Services;