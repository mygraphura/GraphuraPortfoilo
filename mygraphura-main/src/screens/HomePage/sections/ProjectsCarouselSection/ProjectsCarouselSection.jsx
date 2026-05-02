import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ProjectsCarouselSection.css';

const mockProjects = [
  {
    id: "m1",
    number: "01",
    category: "WEB DEVELOPMENT",
    title: "GraphuraBot",
    description: "It is ChatBot made by Graphura team",
    bg: "#0c0c23",
    glow: "rgba(69,102,255,0.15)"
  },
  {
    id: "m2",
    number: "02",
    category: "DIGITAL MARKETING",
    title: "Hotel Shiv Ganga",
    description: "360° campaign driving 3× revenue in 6 months.",
    bg: "#0a1c0c",
    glow: "rgba(26,178,77,0.15)"
  },
  {
    id: "m3",
    number: "03",
    category: "BRANDING",
    title: "Fruit Bounty",
    description: "Complete brand system for EV mobility startup.",
    bg: "#19071e",
    glow: "rgba(204,26,229,0.15)"
  },
  {
    id: "m4",
    number: "04",
    category: "ERP DEVELOPMENT",
    title: "Chatbot",
    description: "Full ERP — 70% less manual reporting time.",
    bg: "#07161e",
    glow: "rgba(26,178,229,0.15)"
  },
  {
    id: "m5",
    number: "05",
    category: "ERP DEVELOPMENT",
    title: "Chatbot",
    description: "Full ERP — 70% less manual reporting time.",
    bg: "#07071e",
    glow: "rgba(140,96,242,0.15)",
    showDiamond: true
  },
  {
    id: "m6",
    number: "06",
    category: "WEB DEVELOPMENT",
    title: "GraphuraBot",
    description: "It is ChatBot made by Graphura team",
    bg: "#1e1e3e",
    glow: "rgba(69,102,255,0.15)"
  },
  {
    id: "m7",
    number: "07",
    category: "DIGITAL MARKETING",
    title: "Hotel Shiv Ganga",
    description: "360° campaign driving 3× revenue in 6 months.",
    bg: "#122612",
    glow: "rgba(26,178,77,0.15)"
  },
  {
    id: "m8",
    number: "08",
    category: "BRANDING",
    title: "Fruit Bounty",
    description: "Complete brand system for EV mobility startup.",
    bg: "#2b1031",
    glow: "rgba(204,26,229,0.15)"
  },
  {
    id: "m9",
    number: "09",
    category: "ERP DEVELOPMENT",
    title: "Chatbot",
    description: "Full ERP — 70% less manual reporting time.",
    bg: "#10232b",
    glow: "rgba(26,178,229,0.15)"
  },
  {
    id: "m10",
    number: "10",
    category: "ERP DEVELOPMENT",
    title: "Chatbot",
    description: "Full ERP — 70% less manual reporting time.",
    bg: "#090918",
    glow: "rgba(200,168,75,0.15)",
    showDiamond: true
  }
];

export const ProjectsCarouselSection = ({ projects = [], onReact }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const displayProjects = projects.length > 0 ? projects : mockProjects;

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="carousel-lux-section">
      <div className="carousel-wave-bg">
         <img src="/wave-1-2.png" alt="Wave" className="wave-img" />
      </div>

      <div className="carousel-header">
         <div className="header-left">
            <span className="section-tag">SELECTED WORK</span>
            <h2 className="section-title"><span className="gold-text">Projects</span></h2>
         </div>
         <div className="header-right">
            <span className="drag-hint">← DRAG TO EXPLORE →</span>
            <div className="nav-btns">
               <button onClick={() => handleScroll('prev')} className="nav-btn">←</button>
               <button onClick={() => handleScroll('next')} className="nav-btn">→</button>
            </div>
         </div>
      </div>

      <div className="carousel-container">
        <div ref={scrollRef} className="carousel-track">
           {displayProjects.map((project, index) => (
             <div 
               key={`${project.id || index}`} 
               className="carousel-card"
               style={{ '--card-bg': project.bg || '#111', '--glow-color': project.glow || 'rgba(200,168,75,0.1)' }}
               onClick={() => navigate('/project/' + (project.slug || project.id))}
             >
                <div className="card-glow"></div>
                
                {project.showDiamond && <div className="card-diamond">◆</div>}
                
                <div className="card-top">
                   <span className="card-number">{project.number || String(index + 1).padStart(2, '0')}</span>
                   <span className="card-cat">{project.category}</span>
                </div>

                <div className="card-body">
                   <h3 className="card-title">{project.title}</h3>
                   <p className="card-desc">{project.description}</p>
                </div>

                <div className="card-footer">
                   <div className="arrow-circle">
                      <span className="arrow-icon">↗</span>
                   </div>
                </div>

                <div className="card-bottom-line"></div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};