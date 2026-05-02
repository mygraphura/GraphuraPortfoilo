import { useNavigate } from "react-router-dom";
import { BrandsShowcaseSection } from "./sections/BrandsShowcaseSection";
import { ReelSection } from "./sections/ReelSection";
import { VideoShowcaseSection } from "./sections/VideoShowcaseSection";
import { ProjectsCarouselSection } from "./sections/ProjectsCarouselSection/ProjectsCarouselSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { ContactFooterSection } from "./sections/ContactFooterSection";
import "./sections/HeroBannerSection/HeroBannerSection.css";

// Navigation items data
const navItems = [
  { label: "WORK", path: "/project-page" },
  { label: "ABOUT", path: "/" },
  { label: "GET IN TOUCH", path: "/" },
  { label: "DASHBOARD", path: "/dashboard" },
];

export const HomePage = ({ announcements = [], projects = [], reels = [], videos = [] }) => {
  const navigate = useNavigate();
  return (
    <main className="bg-[#0a0a0f] overflow-hidden w-full flex flex-col">
      {/* Hero header area */}
      <header className="hero-master">
        {/* Background Outline Text */}
        <div className="hero-bg-text">GRAPHURA</div>

        {/* Floating Navigation */}
        <div className="hero-nav">
          <div className="hero-logo-wrap">
            <img
              className="hero-logo w-[140px] md:w-[170px] h-auto object-contain cursor-pointer"
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
                  navigate(item.path);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <nav className="mobile-nav-links">
            {navItems.map((item) => (
              <a
                key={`mobile-${item.label}`}
                href="#"
                className="mobile-n-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="hero-content-lux">
          <h1 className="hero-main-title">
            <span className="white-text animate-slide-up">BUILDS FOR</span>
            <span className="gold-stroke animate-slide-up delay-200">BRANDS</span>
          </h1>

          <div className="hero-tagline-wrap">
            <div className="tagline-line"></div>
            <p className="tagline-text">THAT AIM HIGHER</p>
            <div className="tagline-line rev"></div>
          </div>
        </div>

        {/* Floating Glass Cards */}
        <div className="floating-elements">
          <div className="float-item f-1">⚛</div>
          <div className="float-item f-2">5</div>
          <div className="float-item f-3">⬡</div>
          <div className="float-item f-4">F</div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-hint animate-fade-in delay-1000">
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Scroll</span>
          <div className="scroll-line"></div>
        </div>

        {/* Decorative Gradients */}
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[#c8a84b] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#8c60f2] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>
      </header>

      {/* Page sections */}
      <VideoShowcaseSection videos={videos} />
      <BrandsShowcaseSection />
      <ProjectsCarouselSection projects={projects} />
      <ReelSection reels={reels} />
      <CallToActionSection />
      <ContactFooterSection />
    </main>
  );
};