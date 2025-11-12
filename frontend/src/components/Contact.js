import React, { useState } from 'react';
import { MessageCircle, Send, Phone, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import whatsappLogo from '../images_projetos/nossahistoria/whatsapp.png';

const Contact = () => {
  const { language } = useLanguage();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneNumber = '5571992503740';

  // Email validation function
  const validateEmail = (email) => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Sanitize input to prevent XSS
  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '').trim();
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate message (required)
    if (!message.trim()) {
      newErrors.message = language === 'pt' 
        ? 'Por favor, digite uma mensagem.' 
        : 'Please enter a message.';
    } else if (message.trim().length < 10) {
      newErrors.message = language === 'pt'
        ? 'A mensagem deve ter pelo menos 10 caracteres.'
        : 'Message must be at least 10 characters.';
    }

    // Validate email (optional but must be valid if provided)
    if (email && !validateEmail(email)) {
      newErrors.email = language === 'pt'
        ? 'Por favor, insira um email válido.'
        : 'Please enter a valid email address.';
    }

    // Validate name length if provided
    if (name && name.length > 100) {
      newErrors.name = language === 'pt'
        ? 'O nome deve ter no máximo 100 caracteres.'
        : 'Name must be less than 100 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleWhatsAppSend = () => {
    // Clear previous errors
    setErrors({});
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    try {
      const fullMessage = language === 'pt' 
        ? `Olá! Meu nome é ${sanitizedName || 'Cliente'}. ${sanitizedMessage}${sanitizedEmail ? `\n\nEmail: ${sanitizedEmail}` : ''}`
        : `Hello! My name is ${sanitizedName || 'Customer'}. ${sanitizedMessage}${sanitizedEmail ? `\n\nEmail: ${sanitizedEmail}` : ''}`;
      
      const encodedMessage = encodeURIComponent(fullMessage);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      // Reset form after successful send
      setTimeout(() => {
        setMessage('');
        setName('');
        setEmail('');
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      setErrors({ 
        general: language === 'pt' 
          ? 'Erro ao abrir WhatsApp. Por favor, tente novamente.' 
          : 'Error opening WhatsApp. Please try again.' 
      });
      setIsSubmitting(false);
    }
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
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                      <AlertCircle size={20} />
                      <span className="text-sm">{errors.general}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-[#004534] mb-2">
                      {language === 'pt' ? 'Nome (Opcional)' : 'Name (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      maxLength={100}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004534] focus:border-transparent ${
                        errors.name ? 'border-red-300' : 'border-[#CACAFC]'
                      }`}
                      placeholder={language === 'pt' ? 'Seu nome' : 'Your name'}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#004534] mb-2">
                      {language === 'pt' ? 'Email (Opcional)' : 'Email (Optional)'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004534] focus:border-transparent ${
                        errors.email ? 'border-red-300' : 'border-[#CACAFC]'
                      }`}
                      placeholder={language === 'pt' ? 'seu@email.com' : 'your@email.com'}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#004534] mb-2">
                      {language === 'pt' ? 'Mensagem' : 'Message'} *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      rows={4}
                      maxLength={1000}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004534] focus:border-transparent resize-none ${
                        errors.message ? 'border-red-300' : 'border-[#CACAFC]'
                      }`}
                      placeholder={language === 'pt' 
                        ? 'Digite sua mensagem aqui...'
                        : 'Type your message here...'
                      }
                      required
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.message && (
                        <p className="text-sm text-red-600">{errors.message}</p>
                      )}
                      <p className={`text-xs ml-auto ${message.length > 900 ? 'text-red-600' : 'text-gray-500'}`}>
                        {message.length}/1000
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleWhatsAppSend}
                    disabled={isSubmitting}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{language === 'pt' ? 'Enviando...' : 'Sending...'}</span>
                      </>
                    ) : (
                      <>
                        <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5" />
                        {language === 'pt' ? 'Enviar via WhatsApp' : 'Send via WhatsApp'}
                      </>
                    )}
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
                        +55 (62) 9844-4010
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
