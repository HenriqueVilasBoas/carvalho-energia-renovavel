import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { mockProjects } from "./data/mockData";
import { LanguageProvider } from "./contexts/LanguageContext";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ufv/:slug" element={<ProjectDetailPage />} />
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/noticia" element={<NewsPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/project/:id" element={<LegacyProjectRedirect />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </div>
  );
}

function LegacyProjectRedirect() {
  const { id } = useParams();
  const project = mockProjects.find(p => p.id === parseInt(id, 10));
  if (project && project.slug) {
    return <Navigate to={`/ufv/${project.slug}`} replace />;
  }
  return <Navigate to="/" replace />;
}

export default App;