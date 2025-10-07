import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations, mockServices } from '../data/mockData';
import logoCarvalho from '../images_projetos/LOGO carvalho.png';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: MapPin,
      text: {
        pt: "Goiânia, GO - Brasil",
        en: "Goiânia, GO - Brazil"
      }
    },
    {
      icon: Phone,
      text: {
        pt: "+55 (62) 9844-4010",
        en: "+55 (62) 9844-4010",
      }
    },
    {
      icon: Mail,
      text: {
        pt: "contato@carvalhoenergia.com.br",
        en: "contato@carvalhoenergia.com.br"
      }
    }
  ];

  const quickLinks = [
    { name: { pt: "Início", en: "Home" }, to: "/#home" },
    { name: { pt: "Projetos", en: "Projects" }, to: "/#projects" },
    { name: { pt: "Serviços", en: "Services" }, to: "/#services" },
    { name: { pt: "Notícias", en: "News" }, to: "/#news" },
    { name: { pt: "Sobre Nós", en: "About" }, to: "/#about" }
  ];


  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/carvalhoenergia/posts/?feedView=all", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-[#004534] text-white">
      <div className="container mx-auto px-4 pt-24 md:pt-28 pb-10 md:pb-12">
        <div className="w-full h-6 md:h-10 bg-[#004534]"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8 mt-8 md:mt-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoCarvalho}
                alt="Carvalho Logo" 
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight">Carvalho</span>
                <span className="text-sm font-medium text-[#D3FF62] leading-tight">Energia Renovável</span>
              </div>
            </div>
            <p className="text-white/80 mb-5 md:mb-6 leading-relaxed">
              {language === 'pt'
                ? 'Especialistas em energia solar, construindo um futuro sustentável através de usinas fotovoltaicas de grande escala.'
                : 'Solar energy specialists, building a sustainable future through large-scale photovoltaic plants.'
              }
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 md:gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-[#0C6951] p-2 rounded-lg hover:bg-[#D3FF62] hover:text-[#004534] transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="order-3 md:order-none">
            <h4 className="text-lg font-semibold mb-4 text-[#D3FF62]">
              {language === 'pt' ? 'Links Rápidos' : 'Quick Links'}
            </h4>
            <ul className="space-y-1.5 md:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-white/80 hover:text-[#D3FF62] transition-colors"
                  >
                    {link.name[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="order-2 md:order-none">
            <h4 className="text-lg font-semibold mb-4 text-[#D3FF62]">
              {language === 'pt' ? 'Serviços' : 'Services'}
            </h4>
            <ul className="space-y-1.5 md:space-y-2">
              {mockServices.map((service) => (
                <li key={service.id} className="text-white/80">
                  {service.title[language]}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="order-1 md:order-none">
            <h4 className="text-lg font-semibold mb-4 text-[#D3FF62]">
              {language === 'pt' ? 'Contato' : 'Contact'}
            </h4>
            <div className="space-y-2.5 md:space-y-3">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <IconComponent className="text-[#D3FF62] flex-shrink-0" size={20} />
                    <span className="text-white/80 text-sm">
                      {contact.text[language]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#0C6951] pt-5 md:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-white/60 text-xs md:text-sm">
              © {currentYear} Carvalho Energia Renovável. {t.rights}
            </p>
            
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-white/60">
              <a href="#" className="hover:text-[#D3FF62] transition-colors">
                {language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
              </a>
              <a href="#" className="hover:text-[#D3FF62] transition-colors">
                {language === 'pt' ? 'Termos de Uso' : 'Terms of Use'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;