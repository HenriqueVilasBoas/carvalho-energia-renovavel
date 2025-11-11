import React, { useState } from 'react';
import { MessageCircle, Send, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import whatsappLogo from '../images_projetos/nossahistoria/whatsapp.png';

const Contact = () => {
  const { language } = useLanguage();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const phoneNumber = '5571992503740';
  
  const handleWhatsAppSend = () => {
    if (!message.trim()) {
      alert(language === 'pt' ? 'Por favor, digite uma mensagem.' : 'Please enter a message.');
      return;
    }

    const fullMessage = language === 'pt' 
      ? `Olá! Meu nome é ${name || 'Cliente'}. ${message}${email ? `\n\nEmail: ${email}` : ''}`
      : `Hello! My name is ${name || 'Customer'}. ${message}${email ? `\n\nEmail: ${email}` : ''}`;
    
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="pt-24 pb-16 bg-[#FAFAFF]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="display-medium text-[#004534] mb-4">
            {language === 'pt' ? 'Contato' : 'Contact'}
          </h2>
          <p className="body-large text-[#0C6951] max-w-2xl mx-auto">
            {language === 'pt' 
              ? 'Entre em contato conosco através do WhatsApp para mais informações sobre nossos serviços.'
              : 'Contact us through WhatsApp for more information about our services.'
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="network-card">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <h3 className="heading-2 text-[#004534] mb-6">
                  {language === 'pt' ? 'Envie uma Mensagem' : 'Send a Message'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#004534] mb-2">
                      {language === 'pt' ? 'Nome (Opcional)' : 'Name (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-[#CACAFC] rounded-lg focus:ring-2 focus:ring-[#004534] focus:border-transparent"
                      placeholder={language === 'pt' ? 'Seu nome' : 'Your name'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#004534] mb-2">
                      {language === 'pt' ? 'Email (Opcional)' : 'Email (Optional)'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-[#CACAFC] rounded-lg focus:ring-2 focus:ring-[#004534] focus:border-transparent"
                      placeholder={language === 'pt' ? 'seu@email.com' : 'your@email.com'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#004534] mb-2">
                      {language === 'pt' ? 'Mensagem' : 'Message'} *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-[#CACAFC] rounded-lg focus:ring-2 focus:ring-[#004534] focus:border-transparent resize-none"
                      placeholder={language === 'pt' 
                        ? 'Digite sua mensagem aqui...'
                        : 'Type your message here...'
                      }
                      required
                    />
                  </div>

                  <button
                    onClick={handleWhatsAppSend}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5" />
                    {language === 'pt' ? 'Enviar via WhatsApp' : 'Send via WhatsApp'}
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="heading-2 text-[#004534] mb-6">
                  {language === 'pt' ? 'Informações de Contato' : 'Contact Information'}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <img src={whatsappLogo} alt="WhatsApp" className="w-8 h-8" />
                    <div>
                      <h4 className="font-semibold text-[#004534] mb-1">
                        {language === 'pt' ? 'WhatsApp' : 'WhatsApp'}
                      </h4>
                      <p className="text-[#0C6951] mb-2">
                        +55 71 99250-3740
                      </p>
                      <p className="text-sm text-gray-600">
                        {language === 'pt' 
                          ? 'Respondemos em até 24 horas'
                          : 'We respond within 24 hours'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#EDEDFE] p-6 rounded-lg">
                    <h4 className="font-semibold text-[#004534] mb-3">
                      {language === 'pt' ? 'Por que escolher o WhatsApp?' : 'Why choose WhatsApp?'}
                    </h4>
                    <ul className="space-y-2 text-sm text-[#0C6951]">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#004534] rounded-full"></div>
                        {language === 'pt' 
                          ? 'Resposta rápida e direta'
                          : 'Quick and direct response'
                        }
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#004534] rounded-full"></div>
                        {language === 'pt' 
                          ? 'Atendimento personalizado'
                          : 'Personalized service'
                        }
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#004534] rounded-full"></div>
                        {language === 'pt' 
                          ? 'Compartilhamento fácil de arquivos'
                          : 'Easy file sharing'
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
