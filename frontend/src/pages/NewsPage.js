import React, { useMemo, useState, useEffect } from 'react';
import { Calendar, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations, mockNews } from '../data/mockData';

const NewsPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [expanded, setExpanded] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const API_BASE = process.env.REACT_APP_API_BASE || 'https://carvalhoenergia.com.br/api';

  // Filter and search news
  const filteredNews = useMemo(() => {
    let filtered = [...mockNews];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(news => 
        news.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.summary[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.fullStory[language].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort by date
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [searchTerm, language]);

  const toggle = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return language === 'pt'
      ? date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Fetch like counts on mount
  useEffect(() => {
    const ids = mockNews.map(n => n.id).join(',');
    fetch(`${API_BASE}/news/likes?ids=${ids}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setLikeCounts(data.counts || {}))
      .catch(() => {
        const zeros = {};
        mockNews.forEach(n => { zeros[String(n.id)] = 0; });
        setLikeCounts(zeros);
      });
  }, []);

  const hasLikedInSession = (newsId) => sessionStorage.getItem(`liked_news_${newsId}`) === '1';

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
    if (hasLikedInSession(newsId)) return;
    try {
      const session_id = getSessionId();
      const key = String(newsId);
      const prevShown = Number(likeCounts[key] || 0);
      setLikeCounts(prev => ({ ...prev, [key]: prevShown + 1 }));
      sessionStorage.setItem(`liked_news_${newsId}`, '1');
      const res = await fetch(`${API_BASE}/news/${newsId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id })
      });
      if (!res.ok) throw new Error('Failed to like');
      const data = await res.json();
      if (typeof data.count === 'number' && data.count > prevShown + 1) {
        setLikeCounts(prev => ({ ...prev, [key]: data.count }));
      }
    } catch (e) {
      // keep optimistic count
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFFEE]">
      <Header />
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="display-medium text-[#004534] mb-4">{t.newsTitle}</h1>
            <p className="body-large text-[#0C6951] max-w-2xl mx-auto">{t.newsSubtitle}</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="network-card">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#807979] w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'pt' ? 'Pesquisar notícias...' : 'Search news...'}
                  className="w-full pl-10 pr-4 py-3 border border-[#CACAFC] rounded-lg focus:ring-2 focus:ring-[#004534] focus:border-transparent"
                />
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-[#CACAFC]">
                <p className="text-sm text-[#807979]">
                  {filteredNews.length} {language === 'pt' ? 'notícias encontradas' : 'news found'}
                  {searchTerm && ` ${language === 'pt' ? 'para' : 'for'} "${searchTerm}"`}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {filteredNews.map((news) => {
              const isExpanded = true;
              return (
                <article key={news.id} className="network-card">
                  <h2 className="network-card-title mb-2">{news.title[language]}</h2>
                  <div className="flex items-center gap-2 text-[#807979] mb-3">
                    <Calendar size={16} />
                    <span className="text-sm">{formatDate(news.date)}</span>
                    <span className="text-xs font-medium text-[#0C6951] bg-[#EDEDFE] px-2 py-1 rounded-full ml-2">
                      {news.category[language]}
                    </span>
                  </div>
                  <div className={`network-card-content ${isExpanded ? 'text-lg leading-relaxed' : ''} text-justify`}>
                    {isExpanded ? news.fullStory[language] : news.summary[language]}
                  </div>
                  {/* Category already shown as tag beside date */}
                  {isExpanded && news.image && (
                    <div className="mt-4">
                      <img src={news.image} alt={news.title[language]} className="w-full h-auto rounded-xl border border-[#CACAFC]" />
                    </div>
                  )}
                  <div className="border-t border-[#CACAFC] mt-4 pt-4 flex items-center justify-between text-sm text-[#807979]">
                    <div>
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
                  {/* Always expanded on the main news page - no toggle button */}
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;


