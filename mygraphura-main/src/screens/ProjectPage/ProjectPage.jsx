import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactFooterSection } from '../HomePage/sections/ContactFooterSection/ContactFooterSection';
import './ProjectPage.css';

const navItems = [
  { label: 'WORK', path: '/project-page' },
  { label: 'ABOUT', path: '/' },
  { label: 'GET IN TOUCH', path: '/' },
  { label: 'DASHBOARD', path: '/dashboard' },
];

const spotlightCards = [
  {
    title: 'Conversation Systems',
    description: 'Human-like chat flows for leads, support, and onboarding.',
    tone: 'project-page-card blue',
  },
  {
    title: 'Workflow Automation',
    description: 'Trigger actions across CRM, email, and internal tools.',
    tone: 'project-page-card gold',
  },
  {
    title: 'Performance Insights',
    description: 'Track handoff rates, response times, and user intent.',
    tone: 'project-page-card green',
  },
];

const overviewSections = [
  {
    title: 'Project Overview',
    copy: [
      'Lorem ipsum simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. The same visual language is kept here so the project page feels connected to the homepage.',
      'This section is designed to sit directly below Get In Touch and continue the story with a more editorial, presentation-style layout.',
    ],
    image: '/images/inmg.png',
    alt: 'Graphura wordmark artwork',
  },
  {
    title: 'Visual Direction',
    copy: [
      'Lorem ipsum simply dummy text of the printing and typesetting industry. The layout keeps the same dark glass panels, thin borders, and gold accent details used in the hero.',
      'The content is arranged in alternating blocks to mirror the composition from the reference, with the text and artwork trading places on each row.',
      'That keeps the page readable while still feeling like a high-end project showcase rather than a plain case-study dump.',
    ],
    image: '/images/inmg.png',
    alt: 'Graphura icon badge',
    reversed: true,
  },
];

const keyPoints = [
  { label: 'Quick Response', tone: 'project-page-key-point blue' },
  { label: 'Easy Communication', tone: 'project-page-key-point green' },
  { label: 'Clear information', tone: 'project-page-key-point purple' },
  { label: 'User friendly', tone: 'project-page-key-point indigo' },
  { label: '24/7 available', tone: 'project-page-key-point teal' },
  { label: 'Update needed..', tone: 'project-page-key-point emerald' },
];

const similarProjects = [
  {
    number: '01',
    category: 'WEB DEVELOPMENT',
    title: 'GraphuraBot',
    description: 'AI chatbot and automation layer for fast business responses.',
    bg: '#10143a',
    glow: 'rgba(69, 102, 255, 0.16)',
  },
  {
    number: '02',
    category: 'BRANDING',
    title: 'Brand System',
    description: 'Visual language and UI kit for a premium product showcase.',
    bg: '#1a102d',
    glow: 'rgba(200, 168, 75, 0.16)',
  },
  {
    number: '03',
    category: 'PRODUCT UI',
    title: 'Dashboard Flow',
    description: 'Controls, analytics, and project views built for quick scanning.',
    bg: '#0c2a35',
    glow: 'rgba(26, 178, 229, 0.16)',
  },
  {
    number: '04',
    category: 'MOTION',
    title: 'Launch Motion',
    description: 'Subtle transitions and motion language for the homepage stack.',
    bg: '#112015',
    glow: 'rgba(56, 217, 115, 0.15)',
  },
  {
    number: '05',
    category: 'AI SYSTEMS',
    title: 'Assist Layer',
    description: 'Support-first interface built to reduce response time and effort.',
    bg: '#220f26',
    glow: 'rgba(204, 26, 229, 0.16)',
  },
];

const ctaTiles = [
  { image: '/images/img_282599_removebg_preview.png', alt: 'React icon', tone: 'project-page-cta-tile light' },
  { image: '/images/img_image_87.png', alt: 'HTML5 icon', tone: 'project-page-cta-tile gold' },
  { image: '/images/img_image_2.png', alt: 'Graphura logo', tone: 'project-page-cta-tile dark' },
  { image: '/images/img_39aff0c0_b383_4.png', alt: 'Refresh icon', tone: 'project-page-cta-tile slate' },
  { image: '/images/img_36c405bb_7527_4.png', alt: 'Collaboration icon', tone: 'project-page-cta-tile emerald' },
  { image: '/images/img_48cf00c7_2587_4.png', alt: 'Graphura badge', tone: 'project-page-cta-tile violet' },
];

const feedbackTiles = [
  { label: 'This Helped !', tone: 'project-page-feedback-tile blue' },
  { label: 'Food for Thought..', tone: 'project-page-feedback-tile green' },
  { label: 'I still have doubts !', tone: 'project-page-feedback-tile purple' },
  { label: 'Can be Better', tone: 'project-page-feedback-tile indigo' },
  { label: 'Spotted something !!', tone: 'project-page-feedback-tile teal' },
  { label: 'Update needed..', tone: 'project-page-feedback-tile emerald' },
];

export const ProjectPage = () => {
  const navigate = useNavigate();
  const workRef = useRef(null);
  const contactRef = useRef(null);
  const sliderRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const sliderDots = useMemo(() => similarProjects, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollProjects = (direction) => {
    const track = sliderRef.current;
    if (!track) return;

    const scrollAmount = Math.max(track.clientWidth * 0.82, 320);
    track.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    setActiveProjectIndex((currentIndex) => {
      if (direction === 'next') {
        return Math.min(currentIndex + 1, similarProjects.length - 1);
      }

      return Math.max(currentIndex - 1, 0);
    });
  };

  const scrollToProject = (index) => {
    const target = cardRefs.current[index];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setActiveProjectIndex(index);
  };

  return (
    <main className="project-page-shell">
      <header className="project-page-hero">
        <div className="project-page-noise" />
        <div className="project-page-glow project-page-glow-left" />
        <div className="project-page-glow project-page-glow-right" />

        <div className="project-page-nav">
          <div className="project-page-logo-wrap">
            <img
              className="project-page-logo"
              alt="Graphura"
              src="/images/img_image_2.png"
              onClick={() => navigate('/')}
            />
          </div>

          <nav className="project-page-nav-pill" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="project-page-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="project-page-search"
            onClick={() => scrollToSection(contactRef)}
            aria-label="Search projects"
          >
            <img src="/images/Search.png" alt="" />
          </button>
        </div>

        <div className="project-page-hero-layout">
          <div className="project-page-mascot-card" aria-hidden="true">
            <div className="project-page-mascot-shell">
              <div className="project-page-mascot-glow" />
              <img className="project-page-mascot-image" src="/images/robot.png" alt="Robot mascot" />
            </div>
          </div>

          <div className="project-page-copy">
            <span className="project-page-kicker">Selected Project</span>
            <h1 className="project-page-title">GRAPHOBOT</h1>
            <p className="project-page-subtitle">AI-powered chatbot for business automation.</p>

            <div className="project-page-actions">
              <button
                type="button"
                className="project-page-btn"
                onClick={() => scrollToSection(workRef)}
              >
                Link <span>→</span>
              </button>
              <button
                type="button"
                className="project-page-btn ghost"
                onClick={() => scrollToSection(contactRef)}
              >
                Contact us <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section ref={workRef} className="project-page-work">
        <div className="project-page-section-head">
          <span className="project-page-section-tag">Selected Work</span>
          <h2>Built to feel as polished as the homepage.</h2>
          <p>
            This page keeps the same dark luxury look, but shifts the focus to a
            single project hero and supporting case-study blocks.
          </p>
        </div>

        <div className="project-page-grid">
          {spotlightCards.map((card) => (
            <article key={card.title} className={card.tone}>
              <div className="project-page-card-label" />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section ref={contactRef} className="project-page-contact">
        <div className="project-page-contact-panel">
          <span className="project-page-section-tag">Get in touch</span>
          <h2>Need a project page for another build?</h2>
          <p>
            Duplicate this screen and swap the hero copy, accent color, and
            feature cards for the next project.
          </p>
          <div className="project-page-contact-actions">
            <button type="button" className="project-page-btn" onClick={() => navigate('/')}>
              Back home <span>→</span>
            </button>
            <button type="button" className="project-page-btn ghost" onClick={() => navigate('/dashboard')}>
              Open dashboard <span>→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="project-page-overview">
        <div className="project-page-overview-frame">
          {overviewSections.map((section, index) => (
            <article
              key={section.title}
              className={`project-page-overview-row ${section.reversed ? 'reversed' : ''}`}
            >
              <div className="project-page-overview-copy">
                {index === 0 && <span className="project-page-overview-kicker">Project Overview</span>}
                <h2>{section.title}</h2>
                {section.copy.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="project-page-overview-visual" aria-label={section.alt}>
                <div className="project-page-overview-visual-inner">
                  <div className="project-page-overview-glow" />
                  <img src={section.image} alt={section.alt} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="project-page-key-points-section">
        <div className="project-page-key-points-panel">
          <span className="project-page-section-tag">Feedback</span>
          <div className="project-page-key-points-grid" aria-label="Project key points">
            {keyPoints.map((point) => (
              <article key={point.label} className={point.tone}>
                <div className="project-page-key-point-swatch" aria-hidden="true" />
                <p>{point.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-page-slider-section">
        <div className="project-page-slider-header">
          <div>
            <span className="project-page-section-tag">Similar Projects</span>
            <h2>More work with the same polished feel.</h2>
          </div>

          <div className="project-page-slider-controls">
            <button type="button" className="project-page-slider-btn" onClick={() => scrollProjects('prev')} aria-label="Scroll projects left">
              ←
            </button>
            <button type="button" className="project-page-slider-btn" onClick={() => scrollProjects('next')} aria-label="Scroll projects right">
              →
            </button>
          </div>
        </div>

        <div className="project-page-slider-shell">
          <div ref={sliderRef} className="project-page-slider-track">
            {similarProjects.map((project, index) => (
              <article
                key={project.title}
                ref={(node) => { cardRefs.current[index] = node; }}
                className="project-page-slider-card"
                style={{ '--card-bg': project.bg, '--card-glow': project.glow }}
                onClick={() => scrollToProject(index)}
              >
                <span className="project-page-slider-number">{project.number}</span>
                <span className="project-page-slider-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="project-page-slider-arrow">↗</span>
              </article>
            ))}
          </div>
        </div>

        <div className="project-page-slider-dots" aria-label="Project slider pagination">
          {sliderDots.map((project, index) => (
            <button
              key={project.title}
              type="button"
              className={`project-page-slider-dot ${index === activeProjectIndex ? 'active' : ''}`}
              onClick={() => scrollToProject(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="project-page-cta-section">
        <div className="project-page-cta-panel">
          <div className="project-page-cta-copy">
            <span className="project-page-section-tag">Like our works ?</span>
            <h2>Let&apos;s make your project come alive</h2>
            <button type="button" className="project-page-cta-button" onClick={() => scrollToSection(contactRef)}>
              Contact Us
            </button>
          </div>

          <div className="project-page-cta-art" aria-label="Project technology tiles">
            {ctaTiles.map((tile) => (
              <figure key={tile.alt} className={tile.tone}>
                <img src={tile.image} alt={tile.alt} />
              </figure>
            ))}
          </div>
        </div>

        <div className="project-page-cta-frame" aria-hidden="true">
          <img src="/images/Frame%203.png" alt="" />
        </div>
      </section>

      <section className="project-page-feedback-section">
        <div className="project-page-feedback-panel">
          <span className="project-page-feedback-title">Tell us what you think?</span>
          <div className="project-page-feedback-grid" aria-label="Feedback options">
            {feedbackTiles.map((tile) => (
              <article key={tile.label} className={tile.tone}>
                <div className="project-page-feedback-swatch" aria-hidden="true" />
                <p>{tile.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactFooterSection />
    </main>
  );
};