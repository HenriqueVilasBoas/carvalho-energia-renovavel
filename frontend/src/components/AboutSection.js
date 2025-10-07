import React from 'react';
import { Award, Leaf, HardHat } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/mockData';

const AboutSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  

  

  return (
    <section id="about" className="py-16 bg-[#FAFAFF]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="display-medium text-[#004534] mb-4">
            {t.aboutTitle}
          </h2>
          <p className="body-large text-[#0C6951] max-w-2xl mx-auto">
            {t.aboutSubtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Company Story */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="lg:w-[115%]">
              <h3 className="heading-2 text-[#004534] mb-6">
                {language === 'pt' ? 'Nossa História' : 'Our Story'}
              </h3>
              <div className="space-y-4 text-[#0C6951] leading-relaxed text-justify">
                {language === 'pt' ? (
                  <>
                    <p>
                      A Carvalho Energia Renovável nasceu com um propósito claro: transformar o setor energético do Brasil e acelerar a transição para um futuro sustentável. Com mais de 11 anos de experiência, consolidamo-nos como referência na construção de usinas fotovoltaicas de grande escala, combinando engenharia de excelência, inovação tecnológica e compromisso inegociável com segurança e sustentabilidade.
                    </p>
                    <p>
                      Atuamos em projetos de Geração Centralizada (GC) e Geração Distribuída (GD), oferecendo soluções completas em regime Turn Key ou serviços específicos, como cravação de perfis metálicos, montagem de estruturas e módulos, instalações elétricas, obras civis, logística e operação e manutenção (O&M). Trabalhamos com uma ampla gama de trackers, incluindo Soltec, STI Nortland, Convert Italia, Nextracker, Brametal e Archtech, garantindo qualidade e desempenho em cada projeto.
                    </p>
                    <p>
                      Nosso compromisso vai além da geração de energia limpa: cada empreendimento gera desenvolvimento econômico, cria oportunidades locais e fortalece comunidades. Atuamos com foco na satisfação de clientes e colaboradores, guiando nossas ações pela ética, transparência e excelência.
                    </p>
                    <p>
                      Acreditamos que segurança e sustentabilidade caminham juntas, pois proteger pessoas, equipamentos e o meio ambiente não é apenas uma obrigação, mas um diferencial estratégico que garante a confiabilidade e a longevidade de nossos projetos. É essa combinação de expertise técnica, paixão e inovação que nos permite superar desafios, entregar resultados consistentes em todos os projetos e consolidar nossa posição como líder na transição energética do Brasil.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Carvalho Energia Renovável was born with a clear purpose: to transform Brazil's energy sector and accelerate the transition to a sustainable future. With over 11 years of experience, we have established ourselves as a reference in the construction of large-scale photovoltaic plants, combining engineering excellence, technological innovation, and an uncompromising commitment to safety and sustainability.
                    </p>
                    <p>
                      We operate in Centralized Generation (CG) and Distributed Generation (DG) projects, offering complete solutions in Turn Key mode or specific services, such as metal profile driving, structure and module assembly, electrical installations, civil works, logistics, and operation and maintenance (O&M). We work with a wide range of trackers, including Soltec, STI Nortland, Convert Italia, Nextracker, Brametal, and Archtech, ensuring quality and performance in every project.
                    </p>
                    <p>
                      Our commitment goes beyond generating clean energy: each project generates economic development, creates local opportunities, and strengthens communities. We operate with a focus on customer and employee satisfaction, guiding our actions through ethics, transparency, and excellence.
                    </p>
                    <p>
                      We believe that safety and sustainability go hand in hand, as protecting people, equipment, and the environment is not just an obligation, but a strategic differentiator that ensures the reliability and longevity of our projects. It is this combination of technical expertise, passion, and innovation that allows us to overcome challenges, deliver consistent results in all projects, and consolidate our position as a leader in Brazil's energy transition.
                    </p>
                  </>
                )}               
              </div>
            </div>
            
            <div className="relative lg:ml-[10%]">
              <img 
                src={require('../images_projetos/nossahistoria/nossahistoria.JPG')}
                alt="Nossa História"
                className="w-full h-[600px] object-cover rounded-[32px] shadow-lg mx-auto"
                style={{maxWidth: '400px'}}
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-[16px] p-3 shadow-lg">
                <p className="text-black text-center font-medium text-sm">
                  Fundador e COO: Tiago Nunes de Castro
                </p>
              </div>
            </div>
          </div>

          

          {/* Values - merged into a single card */}
          <div className="mb-16">
            <div className="network-card hover:shadow-xl">
              <h3 className="heading-2 text-[#004534] text-center mb-6">
                {language === 'pt' ? 'Nossos Valores' : 'Our Values'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center border border-[#CACAFC]">
                    <Award className="text-[#004534]" size={32} />
                  </div>
                  <div className="text-[#004534] font-semibold mt-3">
                    {language === 'pt' ? 'Excelência Técnica' : 'Technical Excellence'}
                  </div>
                  <p className="network-card-content mt-2 max-w-xs">
                    {language === 'pt'
                      ? 'Comprometidos com padrões elevados de qualidade, segurança e inovação em cada projeto.'
                      : 'Committed to high standards of quality, safety, and innovation on every project.'}
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center border border-[#CACAFC]">
                    <Leaf className="text-[#004534]" size={32} />
                  </div>
                  <div className="text-[#004534] font-semibold mt-3">
                    {language === 'pt' ? 'Sustentabilidade' : 'Sustainability'}
                  </div>
                  <p className="network-card-content mt-2 max-w-xs">
                    {language === 'pt'
                      ? 'Promovemos um futuro limpo com soluções renováveis e práticas responsáveis ao longo do ciclo de vida.'
                      : 'We drive a cleaner future with renewable solutions and responsible practices across the lifecycle.'}
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center border border-[#CACAFC]">
                    <HardHat className="text-[#004534]" size={32} />
                  </div>
                  <div className="text-[#004534] font-semibold mt-3">
                    {language === 'pt' ? 'Segurança' : 'Safety'}
                  </div>
                  <p className="network-card-content mt-2 max-w-xs">
                    {language === 'pt'
                      ? 'Priorizamos a proteção de pessoas e do meio ambiente, garantindo confiabilidade, prevenção de riscos e resultados consistentes em todos os nossos projetos.'
                      : 'We prioritize the protection of people and the environment, ensuring reliability, risk prevention and consistent results in all our projects.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;