import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ContactFooterSection } from '../HomePage/sections/ContactFooterSection/ContactFooterSection';
import './ProjectDetailView.css';
import "../HomePage/sections/HeroBannerSection/HeroBannerSection.css";

// Navigation items data
const navItems = [
  { label: "WORK", path: "/" },
  { label: "ABOUT", path: "/" },
  { label: "GET IN TOUCH", path: "/" },
  { label: "DASHBOARD", path: "/dashboard" },
];

// Simple UID generator for session tracking
const getSessionId = () => {
  let sid = sessionStorage.getItem('graphura_sid');
  if (!sid) {
    sid = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('graphura_sid', sid);
  }
  return sid;
};

export const ProjectDetailView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: paramId } = useParams();
  
  const id = paramId || location.pathname.split('/').filter(Boolean).pop();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    let heartbeatInterval;
    const sessionId = getSessionId();

    const fetchProject = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_URL}/projects/${id}`);
        if (!response.ok) throw new Error('Project not found');
        const data = await response.json();
        setProject(data);

        // Update SEO Metadata
        if (data.seoTitle) {
          document.title = data.seoTitle;
        } else {
          document.title = `${data.title} | Graphura`;
        }

        const metas = [
          { name: 'description', content: data.metaDescription },
          { name: 'keywords', content: data.metaKeywords }
        ];

        metas.forEach(m => {
          if (m.content) {
            let tag = document.querySelector(`meta[name="${m.name}"]`);
            if (!tag) {
              tag = document.createElement('meta');
              tag.name = m.name;
              document.head.appendChild(tag);
            }
            tag.content = m.content;
          }
        });
        
        // Track Initial View
        fetch(`${API_URL}/projects/${data.id || id}/view`, { method: 'POST' }).catch(e => console.error("View tracking failed", e));

        // Start Heartbeat (every 20 seconds) for real-time live visitors
        const sendHeartbeat = () => {
           fetch(`${API_URL}/projects/${data.id || id}/heartbeat`, { 
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ sessionId }) 
           }).catch(e => console.error("Heartbeat failed", e));
        };

        sendHeartbeat(); // Immediate
        heartbeatInterval = setInterval(sendHeartbeat, 20000);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
    };
  }, [id]);

  if (loading) return (
    <div className="loading-container">
      <div className="loader"></div>
      <span className="loader-text">Initializing Project Canvas</span>
    </div>
  );
  if (error) return <div className="error-container"><h2>Error</h2><p>{error}</p><button onClick={() => navigate('/')}>Back Home</button></div>;
  if (!project) return null;

  const handleLaunch = () => {
    if (project.externalProjectLink) {
      window.open(project.externalProjectLink, '_blank');
    } else if (project.liveDemoUrl) {
      window.open(project.liveDemoUrl, '_blank');
    }
  };

  return (
    <div className="project-detail-layout">
      {/* Floating Global Navigation */}
      <div className="hero-nav detail-nav-fix">
        <div className="hero-logo-wrap">
          <img
            className="w-[140px] md:w-[170px] h-auto object-contain cursor-pointer"
            alt="Graphura"
            src="/images/img_image_2.png"
            onClick={() => navigate('/')}
          />
        </div>
        <nav className="hidden lg:flex nav-link-group">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="n-link"
              onClick={(e) => {
                e.preventDefault();
                navigate(item.label === 'DASHBOARD' ? '/dashboard' : '/');
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Immersive Hero Section */}
      <section className="detail-hero-lux">
        <div className="hero-bg-accent"></div>
        
        {/* Floating Decorative Elements - Sync with Home Page Style */}
        <div className="detail-floating-decoration">
           <div className="float-item-detail f-1">⚛</div>
           <div className="float-item-detail f-2">⬢</div>
           <div className="float-item-detail f-3">✧</div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <button className="back-link group" onClick={() => navigate(-1)}>
            <span className="group-hover:-translate-x-2 transition-transform">←</span>
            BACK TO ARCHIVE
          </button>

          <div className="detail-title-block">
            <div className="flex items-center gap-4 mb-8">
               <span className="detail-category-tag m-0">{project.category} // {new Date(project.updatedAt).getFullYear()}</span>
               <div className="w-12 h-px bg-[#c8a84b]"></div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] text-white/30 font-black tracking-widest uppercase">Live Project</span>
               </div>
            </div>

            <h1 className="detail-main-h1">
               <span className="block">{project.title.split(' ')[0]}</span>
               <span className="gold-stroke block">{project.title.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="detail-tagline-lux">{project.tagline}</p>
          </div>
        </div>
      </section>

      {/* Primary Visual Showcase */}
      <section className="visual-container-lux">
         <div className="visual-frame">
            <img 
               src={project.thumbnail} 
               alt={project.thumbnailAlt || project.title} 
               className="main-visual-img" 
            />
            <div className="visual-overlay"></div>
         </div>
      </section>

      {/* Architectural Content Grid */}
      <section className="detail-grid-lux max-w-7xl mx-auto">
         <div className="info-left">
            <div className="mb-24 relative">
               <span className="section-label">01 // Overview</span>
               <div className="overview-text [font-family:'Cinzel',serif] italic opacity-80">
                  "{project.description}"
               </div>
            </div>

            <div className="mb-24">
               <span className="section-label">02 // Concept Design</span>
               <div 
                 className="prose prose-invert max-w-none text-white/50 leading-relaxed space-y-8 text-lg font-light" 
                 dangerouslySetInnerHTML={{ __html: project.detailedDescription }} 
               />
               
               {project.detailedDescriptionImage?.url && (
                  <div className="mt-16 rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
                     <img src={project.detailedDescriptionImage.url} alt="Detail" className="w-full h-auto" />
                  </div>
               )}
            </div>
         </div>

         <div className="info-right">
            <aside className="spec-sidebar">
               <div className="spec-card">
                  <span className="section-label mb-8">Specification</span>
                  
                  <div className="space-y-2">
                     <div className="spec-item">
                        <span className="spec-label">Project Status</span>
                        <span className="spec-value uppercase tracking-widest">{project.status}</span>
                     </div>
                     <div className="spec-item">
                        <span className="spec-label">Latest Release</span>
                        <span className="spec-value">{new Date(project.updatedAt).toLocaleDateString()}</span>
                     </div>
                     <div className="spec-item">
                        <span className="spec-label">Industry</span>
                        <span className="spec-value uppercase tracking-widest">{project.category}</span>
                     </div>
                  </div>

                  <div className="mt-12 pt-12 border-t border-white/5">
                     <span className="spec-label block mb-6">Technologies Applied</span>
                     <div className="flex flex-wrap gap-3">
                        {project.skills?.map((s, i) => (
                           <span key={i} className="px-5 py-2 bg-white/[0.03] border border-white/10 rounded-full text-[9px] font-black uppercase text-white/40 tracking-widest">
                              {s.text}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="mt-10">
                  <button onClick={handleLaunch} className="launch-btn-lux w-full block text-center">
                     Launch Case Study
                  </button>
               </div>
            </aside>
         </div>
      </section>

      {/* High-Impact Gallery */}
      {project.extraImages?.length > 0 && (
         <section className="gallery-lux max-w-7xl mx-auto">
            <span className="section-label mb-16">03 // Visual Gallery</span>
            <div className="gallery-grid-lux">
               {project.extraImages.map((img, idx) => (
                  <div key={idx} className="gallery-item-lux group">
                     <img 
                        src={img.url} 
                        alt={img.alt || `Gallery ${idx}`} 
                        className="transition-transform duration-[2s] group-hover:scale-110"
                     />
                  </div>
               ))}
            </div>
         </section>
      )}

      {/* Contextual CTA Section */}
      <section className="detail-cta-lux">
          <div className="max-w-3xl mx-auto">
             <h2 className="text-white [font-family:'Cinzel',serif] text-5xl mb-8 leading-tight">
                Looking for Similar <br />
                <span className="gold-stroke">Capabilities?</span>
             </h2>
             <p className="text-white/40 mb-12 font-light text-lg">Every project we build is a step towards defining the future of digital luxury. Let's create yours.</p>
             <button onClick={() => navigate('/')} className="px-12 py-5 border border-white/10 text-[10px] font-black tracking-[0.5em] uppercase hover:bg-white hover:text-black transition-all">
                The Archive
             </button>
          </div>
      </section>

      {/* Global Footer */}
      <ContactFooterSection />
    </div>
  );
};
