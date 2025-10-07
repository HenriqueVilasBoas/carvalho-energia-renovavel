import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Zap, Calendar, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockProjects, translations } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const t = translations[language];
  
  const project = mockProjects.find(p => p.slug === slug);
  const isCristino = project && project.id === 1;
  const isPanorama = project && project.id === 2;
  const isBelmonte = project && project.id === 3;
  const isSaogoncalo = project && project.id === 4;
  const isTrindade = project && project.id === 5;
  const isDracena = project && project.id === 6;
  const isPirapora = project && project.id === 7;
  const isIaciara = project && project.id === 8;
  const isSantoantonio = project && project.id === 9;

  // Load local images for Cristino Castro (only on this project)
  const cristinoImages = useMemo(() => {
    if (!isCristino) return [];
    try {
      const ctx = require.context('../images_projetos/cristinocastro', false, /\.(png|jpe?g|svg)$/i);
      return ctx.keys().sort().map(ctx);
    } catch (e) {
      return [];
    }
  }, [isCristino]);
  const panoramaImages = useMemo(() => {
    if (!isPanorama) return [];
    try {
      const ctx = require.context('../images_projetos/panorama', false, /\.(png|jpe?g|svg)$/i);
      return ctx.keys().sort().map(ctx);
    } catch (e) {
      return [];
    }
  }, [isPanorama]);
  const belmonteImages = useMemo(() => {
    if (!isBelmonte) return [];
    try {
      const ctx = require.context('../images_projetos/belmonte', false, /\.(png|jpe?g|svg)$/i);
      return ctx.keys().sort().map(ctx);
    } catch (e) {
      return [];
    }
  }, [isBelmonte]);
  const saogoncaloImages = useMemo(() => {
    if (!isSaogoncalo) return [];
    try {
      const ctx = require.context('../images_projetos/saogoncalo', false, /\.(png|jpe?g|svg)$/i);
      return ctx.keys().sort().map(ctx);
    } catch (e) {
      return [];
    }
  }, [isSaogoncalo]);
  const trindadeImages = useMemo(() => {
    if (!isTrindade) return [];
    try {
      const ctx = require.context('../images_projetos/jaiba', false, /\.(png|jpe?g|svg)$/i);
      return ctx.keys().sort().map(ctx);
    } catch (e) {
      return [];
    }
  }, [isTrindade]);
  const dracenaImages = useMemo(() => {
    if (!isDracena) return [];
    try {
      const ctx = require.context('../images_projetos/dracena', false, /\.(png|jpe?g|svg)$/i);
      return ctx.keys().sort().map(ctx);
    } catch (e) {
      return [];
    }
  }, [isDracena]);
  const piraporaImages = useMemo(() => {
    if (!isPirapora) return [];
    try {
      const ctx = require.context('../images_projetos/pirapora', false, /\.(png|jpe?g|svg)$/i);
      return ctx.keys().sort().map(ctx);
    } catch (e) {
      return [];
    }
  }, [isPirapora]);
  const iaciaraImages = useMemo(() => {
    if (!isIaciara) return [];
    try {
      const ctx = require.context('../images_projetos/jaciara', false, /\.(png|jpe?g|svg)$/i);
      return ctx.keys().sort().map(ctx);
    } catch (e) {
      return [];
    }
  }, [isIaciara]);
  const santoantonioImages = useMemo(() => {
    if (!isSantoantonio) return [];
    try {
      const ctx = require.context('../images_projetos/santoantonio', false, /\.(png|jpe?g|svg)$/i);
      return ctx.keys().sort().map(ctx);
    } catch (e) {
      return [];
    }
  }, [isSantoantonio]);

  const [cristinoIdx, setCristinoIdx] = useState(0);
  const [panoramaIdx, setPanoramaIdx] = useState(0);
  const [belmonteIdx, setBelmonteIdx] = useState(0);
  const [saogoncaloIdx, setSaogoncaloIdx] = useState(0);
  const [trindadeIdx, setTrindadeIdx] = useState(0);
  const [dracenaIdx, setDracenaIdx] = useState(0);
  const [piraporaIdx, setPiraporaIdx] = useState(0);
  const [iaciaraIdx, setIaciaraIdx] = useState(0);
  const [santoantonioIdx, setSantoantonioIdx] = useState(0);
  let currentImage = project ? project.image : '';
  if (isCristino && cristinoImages.length > 0) currentImage = cristinoImages[cristinoIdx];
  if (isPanorama && panoramaImages.length > 0) currentImage = panoramaImages[panoramaIdx];
  if (isBelmonte && belmonteImages.length > 0) currentImage = belmonteImages[belmonteIdx];
  if (isSaogoncalo && saogoncaloImages.length > 0) currentImage = saogoncaloImages[saogoncaloIdx];
  if (isTrindade && trindadeImages.length > 0) currentImage = trindadeImages[trindadeIdx];
  if (isDracena && dracenaImages.length > 0) currentImage = dracenaImages[dracenaIdx];
  if (isPirapora && piraporaImages.length > 0) currentImage = piraporaImages[piraporaIdx];
  if (isIaciara && iaciaraImages.length > 0) currentImage = iaciaraImages[iaciaraIdx];
  if (isSantoantonio && santoantonioImages.length > 0) currentImage = santoantonioImages[santoantonioIdx];
  const handleImageClick = () => {
    if (isCristino && cristinoImages.length > 0) {
      setCristinoIdx((prev) => (prev + 1) % cristinoImages.length);
    } else if (isPanorama && panoramaImages.length > 0) {
      setPanoramaIdx((prev) => (prev + 1) % panoramaImages.length);
    } else if (isBelmonte && belmonteImages.length > 0) {
      setBelmonteIdx((prev) => (prev + 1) % belmonteImages.length);
    } else if (isSaogoncalo && saogoncaloImages.length > 0) {
      setSaogoncaloIdx((prev) => (prev + 1) % saogoncaloImages.length);
    } else if (isTrindade && trindadeImages.length > 0) {
      setTrindadeIdx((prev) => (prev + 1) % trindadeImages.length);
    } else if (isDracena && dracenaImages.length > 0) {
      setDracenaIdx((prev) => (prev + 1) % dracenaImages.length);
    } else if (isPirapora && piraporaImages.length > 0) {
      setPiraporaIdx((prev) => (prev + 1) % piraporaImages.length);
    } else if (isIaciara && iaciaraImages.length > 0) {
      setIaciaraIdx((prev) => (prev + 1) % iaciaraImages.length);
    } else if (isSantoantonio && santoantonioImages.length > 0) {
      setSantoantonioIdx((prev) => (prev + 1) % santoantonioImages.length);
    }
  };
  
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFFEE]">
      <Header />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[#004534] hover:text-[#0C6951] transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Voltar aos Projetos</span>
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <img 
                src={currentImage}
                alt={project.title[language]}
                className={`w-full h-[400px] object-cover rounded-[32px] shadow-lg ${(isCristino || isPanorama || isBelmonte || isSaogoncalo || isTrindade || isDracena || isPirapora || isIaciara || isSantoantonio) ? 'cursor-pointer' : ''}`}
                onClick={(isCristino || isPanorama || isBelmonte || isSaogoncalo || isTrindade || isDracena || isPirapora || isIaciara || isSantoantonio) ? handleImageClick : undefined}
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-[#004534] mb-4">
                  {project.title[language]}
                </h1>
                <div className="flex items-center gap-2 text-[#0C6951] mb-6">
                  <MapPin size={20} />
                  <span className="text-lg">{project.location[language]}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FAFAFF] p-6 rounded-[24px] border border-[#CACAFC]">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="text-[#D3FF62]" size={24} />
                    <span className="font-semibold text-[#004534]">Capacidade</span>
                  </div>
                  <p className="text-2xl font-bold text-[#0C6951]">{project.capacity}</p>
                </div>
                
                <div className="bg-[#FAFAFF] p-6 rounded-[24px] border border-[#CACAFC]">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="text-[#D3FF62]" size={24} />
                    <span className="font-semibold text-[#004534]">Status</span>
                  </div>
                  <p className="text-xl font-bold text-[#0C6951]">Concluído</p>
                </div>
              </div>
              
              <div className="bg-[#EDEDFE] p-6 rounded-[24px]">
                <h3 className="font-semibold text-[#004534] mb-3">Principais Conquistas</h3>
                <p className="text-[#0C6951] leading-relaxed">
                  {project.achievements[language]}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#004534] mb-3">Sobre o Projeto</h3>
                <p className="text-[#0C6951] leading-relaxed text-lg text-justify">
                  {project.description[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;