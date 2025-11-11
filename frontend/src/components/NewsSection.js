import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations, mockNews } from '../data/mockData';
import logoCarvalho from '../images_projetos/LOGO carvalho.png';

const NewsSection = () => {
  const [expandedNews, setExpandedNews] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const { language } = useLanguage();
  const t = translations[language];
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api';

  const toggleExpanded = (newsId) => {
    setExpandedNews(prev => ({
      ...prev,
      [newsId]: !prev[newsId]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return language === 'pt' 
      ? date.toLocaleDateString('pt-BR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
  };

  // Fetch current like counts on mount
  useEffect(() => {
    const ids = mockNews.map(n => n.id).join(',');
    fetch(`${API_BASE}/news/likes?ids=${ids}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setLikeCounts(data.counts || {});
      })
      .catch(() => {
        // fallback: initialize zeros if backend unavailable
        const zeros = {};
        mockNews.forEach(n => { zeros[String(n.id)] = 0; });
        setLikeCounts(zeros);
      });
  }, []);

  const hasLikedInSession = (newsId) => {
    return sessionStorage.getItem(`liked_news_${newsId}`) === '1';
  };

  const getSessionId = () => {
    let sid = sessionStorage.getItem('session_id');
    if (!sid) {
      const gen = (window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
      sid = gen;
      sessionStorage.setItem('session_id', sid);
    }
    return sid;
  };

  const handleLike = async (newsId) => {
    // prevent duplicate like in the same session
    if (hasLikedInSession(newsId)) return;
    try {
      const session_id = getSessionId();
      const key = String(newsId);
      const prevShown = Number(likeCounts[key] || 0);
      // Optimistic increment: reflect +1 immediately in UI
      setLikeCounts(prev => ({ ...prev, [key]: prevShown + 1 }));
      // Mark session immediately to avoid double click while waiting
      sessionStorage.setItem(`liked_news_${newsId}`, '1');
      const res = await fetch(`${API_BASE}/news/${newsId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id })
      });
      if (!res.ok) throw new Error('Failed to like');
      const data = await res.json();
      // If server returns a higher authoritative count, update; otherwise keep optimistic
      if (typeof data.count === 'number' && data.count > prevShown + 1) {
        setLikeCounts(prev => ({ ...prev, [key]: data.count }));
      }
    } catch (e) {
      // Keep optimistic increment and session flag even if backend fails, per requirement
    }
  };

  // share removed per request

  const sorted = [...mockNews].sort((a, b) => new Date(b.date) - new Date(a.date));
  const isHome = true;
  const items = isHome ? sorted.slice(0, 3) : sorted;

  return (
    <section id="news" className="py-16 bg-[#CACAFC]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="display-medium text-[#004534] mb-4">
            {t.newsTitle}
          </h2>
          <p className="body-large text-[#0C6951] max-w-2xl mx-auto">
            {t.newsSubtitle}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {items.map((news, index) => {
            const isExpanded = expandedNews[news.id];
            return (
              <article 
                key={news.id} 
                className={`network-card group transition-all duration-300 hover:shadow-2xl ${
                  index === 0 ? 'lg:col-span-2 xl:col-span-1' : ''
                } ${isExpanded ? 'lg:col-span-2' : ''}`}
              >
                {/* LinkedIn-style header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-[#CACAFC]">
                    <img 
                      src={logoCarvalho}
                      alt="Carvalho Logo" 
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#004534]">Carvalho Energia Renovável</h4>
                    <p className="text-sm text-[#807979]">Energia Solar</p>
                  </div>
                </div>

                {/* Category Tag removed here; shown beside date below */}

                {/* News Content */}
                <h3 className={`network-card-title mb-3 group-hover:text-[#0C6951] transition-colors ${
                  index === 0 ? 'text-2xl' : 'text-lg'
                }`}>
                  {news.title[language]}
                </h3>
                
                <div className={`network-card-content mb-4 ${
                  index === 0 || isExpanded ? 'text-lg leading-relaxed' : ''
                } text-justify`}>
                  {isExpanded ? news.fullStory[language] : news.summary[language]}
                </div>
                {isExpanded && news.image && (
                  <div className="mt-4">
                    <img
                      src={news.image}
                      alt={news.title[language]}
                      className="w-full h-auto rounded-xl border border-[#CACAFC]"
                    />
                  </div>
                )}

                {/* Date, Category Tag and Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#807979]">
                    <Calendar size={16} />
                    <span className="text-sm">{formatDate(news.date)}</span>
                    <span className="text-xs font-medium text-[#0C6951] bg-[#EDEDFE] px-2 py-1 rounded-full ml-2">
                      {news.category[language]}
                    </span>
                  </div>
                  
                  <a 
                    href="/noticias"
                    className="text-[#004534] hover:text-[#0C6951] font-medium text-sm flex items-center gap-1 transition-colors"
                  >
                    <span>{language === 'pt' ? 'Ler mais' : 'Read more'}</span>
                    <ChevronDown size={14} />
                  </a>
                </div>

                {/* Engagement */}
                <div className="border-t border-[#CACAFC] mt-4 pt-4 flex items-center justify-between text-sm text-[#807979]">
                  <div className="flex items-center gap-4">
                    {(() => {
                      const liked = hasLikedInSession(news.id);
                      const count = Number(likeCounts[String(news.id)] || 0);
                      return (
                        <button
                          onClick={() => !liked && handleLike(news.id)}
                          className={`transition-colors ${liked ? 'text-[#0C6951] cursor-default' : 'hover:text-[#004534]'}`}
                          aria-disabled={liked}
                        >
                          👍 {count} {language === 'pt' ? 'curtidas' : 'likes'}
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a href="/noticias" className="btn-secondary border-[#004534] text-[#004534] hover:bg-[#004534] hover:text-white">
            <span className="button-text">Ver Todas as Notícias</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;