import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/mockData';
import indexImage from '../images_projetos/indeximage.png';
import logoCarvalho from '../images_projetos/LOGO carvalho.png';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-cover bg-bottom pt-32 pb-16" style={{ backgroundImage: `url(${indexImage})` }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 border border-[#CACAFC] rounded-[24px] md:rounded-[32px] shadow-xl p-6 md:p-10" style={{ backgroundColor: '#FFFEFE' }}>
          {/* Logo Icon */}
          <div className="flex justify-center mb-8">
            <img 
              src={logoCarvalho}
              alt="Carvalho Logo" 
              className="w-48 h-48"
            />
          </div>
          
          {/* Main Heading */}
          <h1 className="display-medium text-[#004534] mb-6">
            {t.heroTitle}
          </h1>
          
          {/* Subtitle */}
          <p className="body-large text-[#0C6951] max-w-3xl mx-auto mb-4 md:mb-8">
            {t.heroSubtitle}
          </p>
          
          {/* Removed CTA Button as requested */}
          
          {/* Stats - always horizontal */}
          <div className="mt-8 md:mt-12 max-w-full">
            <div className="flex flex-nowrap justify-center gap-4 md:gap-8 px-2 mx-auto max-w-2xl">
              <div className="text-center flex-shrink-0">
                <div className="text-2xl md:text-3xl font-bold text-[#004534] mb-1 md:mb-2">2.750+</div>
                <div className="text-[#0C6951] text-xs md:text-sm">MWp Instalados</div>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="text-2xl md:text-3xl font-bold text-[#004534] mb-1 md:mb-2">17+</div>
                <div className="text-[#0C6951] text-xs md:text-sm">Projetos Concluídos</div>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="text-2xl md:text-3xl font-bold text-[#004534] mb-1 md:mb-2">11+</div>
                <div className="text-[#0C6951] text-xs md:text-sm">Anos de Experiência</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;