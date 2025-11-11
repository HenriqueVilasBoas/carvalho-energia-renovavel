import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/mockData';
import logoCarvalho from '../images_projetos/LOGO carvalho.png';
import brasilFlag from '../images_projetos/nossahistoria/brasil.png';
import usaFlag from '../images_projetos/nossahistoria/usa.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const languages = [
    { code: 'pt', name: 'Português', flag: brasilFlag },
    { code: 'en', name: 'English', flag: usaFlag }
  ];

  return (
    <header className="network-header">
      <div className="nav-wrapper">
        <Link to="/" className="network-logo flex items-center gap-3">
          <img 
            src={logoCarvalho}
            alt="Carvalho Logo" 
            className="w-9 h-9 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight">Carvalho</span>
            <span className="text-xs font-medium text-[#D3FF62] leading-tight">Energia Renovável</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="network-nav hidden lg:flex">
            <Link to="/" className="network-nav-link">{language === 'pt' ? 'Página Inicial' : 'Home Page'}</Link>
          <button 
            onClick={() => scrollToSection('projects')} 
            className="network-nav-link"
          >
            {t.projects}
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="network-nav-link"
          >
            {t.services}
          </button>
          <Link 
            to="/noticias" 
            className="network-nav-link"
          >
            {t.news}
          </Link>
          <button 
            onClick={() => scrollToSection('about')} 
            className="network-nav-link"
          >
            {t.about}
          </button>
          <Link 
            to="/contato" 
            className="network-nav-link"
          >
            {language === 'pt' ? 'Contato' : 'Contact'}
          </Link>
          
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="network-nav-link flex items-center gap-2"
            >
              <div className="flex items-center gap-1">
                <img src={brasilFlag} alt="Brasil" className="w-4 h-3" />
                <span className="text-xs">/</span>
                <img src={usaFlag} alt="USA" className="w-4 h-3" />
              </div>
              <ChevronDown size={16} />
            </button>
            
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-[#CACAFC] min-w-[120px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      toggleLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-[#EDEDFE] flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg ${
                      language === lang.code ? 'bg-[#EDEDFE] text-[#004534]' : 'text-[#0C6951]'
                    }`}
                  >
                    <img src={lang.flag} alt={lang.name} className="w-4 h-3" />
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#004534] border-t border-[#0C6951] mt-2 rounded-b-lg mx-3">
          <nav className="py-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-6 py-2 text-white hover:bg-[#0C6951] transition-colors"
            >
              Página inicial
            </Link>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="block w-full text-left px-6 py-2 text-white hover:bg-[#0C6951] transition-colors"
            >
              {t.projects}
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="block w-full text-left px-6 py-2 text-white hover:bg-[#0C6951] transition-colors"
            >
              {t.services}
            </button>
            <Link 
              to="/noticias" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-6 py-2 text-white hover:bg-[#0C6951] transition-colors"
            >
              {t.news}
            </Link>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left px-6 py-2 text-white hover:bg-[#0C6951] transition-colors"
            >
              {t.about}
            </button>
            <Link 
              to="/contato" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-6 py-2 text-white hover:bg-[#0C6951] transition-colors"
            >
              {language === 'pt' ? 'Contato' : 'Contact'}
            </Link>
            
            {/* Mobile Language Options */}
            <div className="px-6 py-2">
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      toggleLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full flex items-center gap-1 text-sm transition-colors ${
                      language === lang.code 
                        ? 'bg-[#D3FF62] text-[#004534]' 
                        : 'bg-[#0C6951] text-white hover:bg-[#D3FF62] hover:text-[#004534]'
                    }`}
                  >
                    <img src={lang.flag} alt={lang.name} className="w-4 h-3" />
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;