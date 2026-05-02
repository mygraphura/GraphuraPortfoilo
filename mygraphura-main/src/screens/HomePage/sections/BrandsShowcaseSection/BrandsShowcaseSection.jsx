import { useRef } from "react";
import "./BrandsShowcaseSection.css";

const brandsData = [
  {
    id: "01",
    title: "GraphoBot",
    category: "Business Automation",
    description: "AI-powered chatbot for business automation.",
    accent: "#61dafb"
  },
  {
    id: "02",
    title: "G Crown",
    category: "Luxury Retail",
    description: "CRM Platform for elite jewellery management.",
    accent: "#c8a84b"
  },
  {
    id: "03",
    title: "Shiv Ganga",
    category: "Hospitality",
    description: "Digital presence for premier hotel chains.",
    accent: "#0ab39c"
  },
  {
    id: "04",
    title: "Fruit Bounty",
    category: "EV Startup",
    description: "Complete brand identity for a bold market entry.",
    accent: "#f06548"
  },
  {
    id: "05",
    title: "Abcd Mark",
    category: "Marketing",
    description: "Data-driven campaigns that convert at scale.",
    accent: "#8c60f2"
  }
];

export const BrandsShowcaseSection = () => {
  const scrollRef = useRef(null);

  return (
    <section className="brands-cool-section">
      <div className="cool-header">
        <div className="header-box">
          <span className="mini-tag">PARTNERSHIPS</span>
          <h2 className="big-title">Brands We've <span className="hollow-text">BUILT FOR</span></h2>
        </div>
      </div>

      <div className="cool-scroll-wrapper">
        <div ref={scrollRef} className="cool-track">
           {brandsData.map((brand) => (
             <div key={brand.id} className="cool-card">
                <div className="cool-card-inner">
                   <div className="cool-num">{brand.id}</div>
                   <div className="cool-content">
                      <span className="cool-cat" style={{ color: brand.accent }}>{brand.category}</span>
                      <h3 className="cool-name">{brand.title}</h3>
                      <p className="cool-desc">{brand.description}</p>
                   </div>
                   <div className="cool-action">
                      <div className="cool-btn-circle" style={{ borderColor: brand.accent }}>
                         <span className="cool-arrow" style={{ color: brand.accent }}>↗</span>
                      </div>
                   </div>
                </div>
                <div className="cool-bg-glow" style={{ background: `radial-gradient(circle at 50% 100%, ${brand.accent}20 0%, transparent 60%)` }}></div>
             </div>
           ))}
        </div>
      </div>

      <div className="cool-footer">
          <p className="cool-stat-text">100+ Brands Trust Graphura Portfoilo</p>
          <div className="cool-marquee">
             <span>WORLDWIDE • STARTUPS • ENTERPRISES • INNOVATORS • COLLABORATORS • </span>
             <span>WORLDWIDE • STARTUPS • ENTERPRISES • INNOVATORS • COLLABORATORS • </span>
          </div>
      </div>
    </section>
  );
};