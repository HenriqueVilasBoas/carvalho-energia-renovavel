import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations, mockProjects } from '../data/mockData';

const FeaturedProjects = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [cristinoImageIndex, setCristinoImageIndex] = useState(0);
  const [panoramaImageIndex, setPanoramaImageIndex] = useState(0);
  const [belmonteImageIndex, setBelmonteImageIndex] = useState(0);
  const [saogoncaloImageIndex, setSaogoncaloImageIndex] = useState(0);
  const [trindadeImageIndex, setTrindadeImageIndex] = useState(0);
  const [dracenaImageIndex, setDracenaImageIndex] = useState(0);
  const [piraporaImageIndex, setPiraporaImageIndex] = useState(0);
  const [iaciaraImageIndex, setIaciaraImageIndex] = useState(0);
  const [santoantonioImageIndex, setSantoantonioImageIndex] = useState(0);
  const { language } = useLanguage();
  const t = translations[language];

  // Determine which projects to show
  const projectsToShow = showAllProjects ? mockProjects : mockProjects.slice(0, 3);

  // Load local images for Cristino Castro project (Webpack require.context)
  const importAllImages = (r) => r.keys().sort().map(r);
  let cristinoImages = [];
  let panoramaImages = [];
  let belmonteImages = [];
  let saogoncaloImages = [];
  let trindadeImages = [];
  let dracenaImages = [];
  let piraporaImages = [];
  let iaciaraImages = [];
  let santoantonioImages = [];
  try {
    // images under src/images_projetos/cristinocastro
    // Supported extensions: jpg/jpeg/png/svg
    cristinoImages = importAllImages(require.context('../images_projetos/cristinocastro', false, /\.(png|jpe?g|svg)$/i));
  } catch (e) {
    cristinoImages = [];
  }
  try {
    panoramaImages = importAllImages(require.context('../images_projetos/panorama', false, /\.(png|jpe?g|svg)$/i));
  } catch (e) {
    panoramaImages = [];
  }
  try {
    belmonteImages = importAllImages(require.context('../images_projetos/belmonte', false, /\.(png|jpe?g|svg)$/i));
  } catch (e) {
    belmonteImages = [];
  }
  try {
    saogoncaloImages = importAllImages(require.context('../images_projetos/saogoncalo', false, /\.(png|jpe?g|svg)$/i));
  } catch (e) {
    saogoncaloImages = [];
  }
  try {
    trindadeImages = importAllImages(require.context('../images_projetos/jaiba', false, /\.(png|jpe?g|svg)$/i));
  } catch (e) {
    trindadeImages = [];
  }
  try {
    dracenaImages = importAllImages(require.context('../images_projetos/dracena', false, /\.(png|jpe?g|svg)$/i));
  } catch (e) {
    dracenaImages = [];
  }
  try {
    piraporaImages = importAllImages(require.context('../images_projetos/pirapora', false, /\.(png|jpe?g|svg)$/i));
  } catch (e) {
    piraporaImages = [];
  }
  try {
    iaciaraImages = importAllImages(require.context('../images_projetos/jaciara', false, /\.(png|jpe?g|svg)$/i));
  } catch (e) {
    iaciaraImages = [];
  }
  try {
    santoantonioImages = importAllImages(require.context('../images_projetos/santoantonio', false, /\.(png|jpe?g|svg)$/i));
  } catch (e) {
    santoantonioImages = [];
  }

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % mockProjects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + mockProjects.length) % mockProjects.length);
  };

  const currentProjectData = mockProjects[currentProject];
  const isCristino = currentProjectData.id === 1;
  const isPanorama = currentProjectData.id === 2;
  const isBelmonte = currentProjectData.id === 3;
  const isSaogoncalo = currentProjectData.id === 4;
  const isTrindade = currentProjectData.id === 5;
  const isDracena = currentProjectData.id === 6;
  const isPirapora = currentProjectData.id === 7;
  const isIaciara = currentProjectData.id === 8;
  const isSantoantonio = currentProjectData.id === 9;

  useEffect(() => {
    // Reset local image index whenever project changes
    setCristinoImageIndex(0);
    setPanoramaImageIndex(0);
    setBelmonteImageIndex(0);
    setSaogoncaloImageIndex(0);
    setTrindadeImageIndex(0);
    setDracenaImageIndex(0);
    setPiraporaImageIndex(0);
    setIaciaraImageIndex(0);
    setSantoantonioImageIndex(0);
  }, [currentProject]);

  let displayedProjectImage = currentProjectData.image;
  if (isCristino && cristinoImages.length > 0) {
    displayedProjectImage = cristinoImages[cristinoImageIndex];
  } else if (isPanorama && panoramaImages.length > 0) {
    displayedProjectImage = panoramaImages[panoramaImageIndex];
  } else if (isBelmonte && belmonteImages.length > 0) {
    displayedProjectImage = belmonteImages[belmonteImageIndex];
  } else if (isSaogoncalo && saogoncaloImages.length > 0) {
    displayedProjectImage = saogoncaloImages[saogoncaloImageIndex];
  } else if (isTrindade && trindadeImages.length > 0) {
    displayedProjectImage = trindadeImages[trindadeImageIndex];
  } else if (isDracena && dracenaImages.length > 0) {
    displayedProjectImage = dracenaImages[dracenaImageIndex];
  } else if (isPirapora && piraporaImages.length > 0) {
    displayedProjectImage = piraporaImages[piraporaImageIndex];
  } else if (isIaciara && iaciaraImages.length > 0) {
    displayedProjectImage = iaciaraImages[iaciaraImageIndex];
  } else if (isSantoantonio && santoantonioImages.length > 0) {
    displayedProjectImage = santoantonioImages[santoantonioImageIndex];
  }

  const handleProjectImageClick = () => {
    if (isCristino && cristinoImages.length > 0) {
      setCristinoImageIndex((prev) => (prev + 1) % cristinoImages.length);
    } else if (isPanorama && panoramaImages.length > 0) {
      setPanoramaImageIndex((prev) => (prev + 1) % panoramaImages.length);
    } else if (isBelmonte && belmonteImages.length > 0) {
      setBelmonteImageIndex((prev) => (prev + 1) % belmonteImages.length);
    } else if (isSaogoncalo && saogoncaloImages.length > 0) {
      setSaogoncaloImageIndex((prev) => (prev + 1) % saogoncaloImages.length);
    } else if (isTrindade && trindadeImages.length > 0) {
      setTrindadeImageIndex((prev) => (prev + 1) % trindadeImages.length);
    } else if (isDracena && dracenaImages.length > 0) {
      setDracenaImageIndex((prev) => (prev + 1) % dracenaImages.length);
    } else if (isPirapora && piraporaImages.length > 0) {
      setPiraporaImageIndex((prev) => (prev + 1) % piraporaImages.length);
    } else if (isIaciara && iaciaraImages.length > 0) {
      setIaciaraImageIndex((prev) => (prev + 1) % iaciaraImages.length);
    } else if (isSantoantonio && santoantonioImages.length > 0) {
      setSantoantonioImageIndex((prev) => (prev + 1) % santoantonioImages.length);
    }
  };

  return (
    <section id="projects" className="py-16 bg-[#FAFAFF]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="display-medium text-[#004534] mb-4">
            {t.projectsTitle}
          </h2>
          <p className="body-large text-[#0C6951] max-w-2xl mx-auto">
            {t.projectsSubtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[32px] shadow-lg">
            <img
              src={displayedProjectImage}
              alt={currentProjectData.title[language]}
              className={`w-full h-[500px] md:h-[600px] object-cover ${(isCristino || isPanorama || isBelmonte || isSaogoncalo || isTrindade || isDracena || isPirapora || isIaciara || isSantoantonio) ? 'cursor-pointer' : ''}`}
              onClick={(isCristino || isPanorama || isBelmonte || isSaogoncalo || isTrindade || isDracena || isPirapora || isIaciara || isSantoantonio) ? handleProjectImageClick : undefined}
            />
            
            {/* Overlay with project info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="max-w-lg">
                  <div className="flex items-center gap-2 text-[#D3FF62] mb-2">
                    <MapPin size={20} />
                    <span className="text-lg font-medium project-text-stroke">
                      {currentProjectData.location[language]}
                    </span>
                  </div>
 
                  <h3 className="heading-2 text-white mb-3 project-text-stroke" style={{color: 'white'}}>
                    {currentProjectData.title[language]}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-[#D3FF62] mb-4">
                    <Zap size={20} />
                    <span className="text-xl font-semibold project-text-stroke">
                      {currentProjectData.capacity}
                    </span>
                  </div>

                  <p className="body-medium text-white/95 mb-6 project-text-stroke" style={{color: 'white'}}>
                    {currentProjectData.achievements[language]}
                  </p>
                  
                  <Link
                    to={`/ufv/${currentProjectData.slug || ''}`}
                    className="btn-primary bg-[#D3FF62] text-[#004534] hover:bg-white hover:shadow-lg inline-flex items-center gap-2 transition-all duration-300"
                  >
                    <span className="button-text">{t.viewProject}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-4 lg:-left-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#004534] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextProject}
            className="absolute right-4 lg:-right-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#004534] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {mockProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProject
                    ? 'bg-[#004534] scale-125'
                    : 'bg-[#CACAFC] hover:bg-[#004534]/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Hide project grid */}
        <div className="block lg:hidden">
          {/* Mobile only shows carousel, no additional grid */}
        </div>

        {/* Desktop: Project Grid */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
            {projectsToShow.map((project, index) => {
              // Determine which image to show for each project
              let projectImage = project.image;
              if (project.id === 1 && cristinoImages.length > 0) {
                projectImage = cristinoImages[cristinoImageIndex];
              } else if (project.id === 2 && panoramaImages.length > 0) {
                projectImage = panoramaImages[panoramaImageIndex];
              } else if (project.id === 3 && belmonteImages.length > 0) {
                projectImage = belmonteImages[belmonteImageIndex];
              } else if (project.id === 4 && saogoncaloImages.length > 0) {
                projectImage = saogoncaloImages[saogoncaloImageIndex];
              } else if (project.id === 5 && trindadeImages.length > 0) {
                projectImage = trindadeImages[trindadeImageIndex];
              } else if (project.id === 6 && dracenaImages.length > 0) {
                projectImage = dracenaImages[dracenaImageIndex];
              } else if (project.id === 7 && piraporaImages.length > 0) {
                projectImage = piraporaImages[piraporaImageIndex];
              } else if (project.id === 8 && iaciaraImages.length > 0) {
                projectImage = iaciaraImages[iaciaraImageIndex];
              } else if (project.id === 9 && santoantonioImages.length > 0) {
                projectImage = santoantonioImages[santoantonioImageIndex];
              }

              return (
                <Link
                  key={project.id}
                  to={`/ufv/${project.slug || ''}`}
                  className="network-card group transition-all duration-300 hover:scale-105"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={projectImage}
                      alt={project.title[language]}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle image click for each project
                        if (project.id === 1 && cristinoImages.length > 0) {
                          setCristinoImageIndex((prev) => (prev + 1) % cristinoImages.length);
                        } else if (project.id === 2 && panoramaImages.length > 0) {
                          setPanoramaImageIndex((prev) => (prev + 1) % panoramaImages.length);
                        } else if (project.id === 3 && belmonteImages.length > 0) {
                          setBelmonteImageIndex((prev) => (prev + 1) % belmonteImages.length);
                        } else if (project.id === 4 && saogoncaloImages.length > 0) {
                          setSaogoncaloImageIndex((prev) => (prev + 1) % saogoncaloImages.length);
                        } else if (project.id === 5 && trindadeImages.length > 0) {
                          setTrindadeImageIndex((prev) => (prev + 1) % trindadeImages.length);
                        } else if (project.id === 6 && dracenaImages.length > 0) {
                          setDracenaImageIndex((prev) => (prev + 1) % dracenaImages.length);
                        } else if (project.id === 7 && piraporaImages.length > 0) {
                          setPiraporaImageIndex((prev) => (prev + 1) % piraporaImages.length);
                        } else if (project.id === 8 && iaciaraImages.length > 0) {
                          setIaciaraImageIndex((prev) => (prev + 1) % iaciaraImages.length);
                        } else if (project.id === 9 && santoantonioImages.length > 0) {
                          setSantoantonioImageIndex((prev) => (prev + 1) % santoantonioImages.length);
                        }
                      }}
                    />
                  </div>
                  <h4 className="network-card-title text-lg mt-4">
                    {project.title[language]}
                  </h4>
                  <p className="network-card-content text-sm">
                    {project.location[language]} • {project.capacity}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Ver mais / Ocultar button */}
          <div className="text-center mt-8">
            {!showAllProjects ? (
              <button
                onClick={() => setShowAllProjects(true)}
                className="inline-flex items-center gap-2 bg-[#004534] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#003426] transition-colors"
              >
                {language === 'pt' ? 'Ver mais projetos' : 'View more projects'}
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setShowAllProjects(false)}
                className="inline-flex items-center gap-2 bg-gray-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-700 transition-colors"
              >
                {language === 'pt' ? 'Ver menos' : 'View fewer projects'}
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;