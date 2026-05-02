import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

// Project card data
const mockProjects = [
  {
    id: "01",
    bg: "#0c0c23",
    gradientColor:
      "radial-gradient(50% 50% at 0% 0%, rgba(69,102,255,0.3) 0%, rgba(69,102,255,0) 100%)",
    category: "WEB DEVELOPMENT",
    title: "GraphuraBot",
    description: "It is ChatBot made by Graphura team",
    descriptionMultiline: false,
    extraDecor: null,
  },
  {
    id: "02",
    bg: "#0a1c0c",
    gradientColor:
      "radial-gradient(50% 50% at 0% 0%, rgba(26,178,77,0.3) 0%, rgba(26,178,77,0) 100%)",
    category: "DIGITAL MARKETING",
    title: "Hotel Shiv Ganga",
    description: "360° campaign driving\n3× revenue in 6 months.",
    descriptionMultiline: true,
    extraDecor: null,
  },
  {
    id: "03",
    bg: "#19071e",
    gradientColor:
      "radial-gradient(50% 50% at 0% 0%, rgba(204,26,229,0.3) 0%, rgba(204,26,229,0) 100%)",
    category: "BRANDING",
    title: "Fruit Bounty",
    description: "Complete brand system\nfor EV mobility startup.",
    descriptionMultiline: true,
    extraDecor: null,
  },
  {
    id: "04",
    bg: "#07161e",
    gradientColor:
      "radial-gradient(50% 50% at 0% 0%, rgba(26,178,229,0.3) 0%, rgba(26,178,229,0) 100%)",
    category: "ERP DEVELOPMENT",
    title: "Chatbot",
    description: "Full ERP — 70% less\nmanual reporting time.",
    descriptionMultiline: true,
    extraDecor: null,
  },
  {
    id: "05",
    bg: "#07161e",
    gradientColor:
      "radial-gradient(50% 50% at 0% 0%, rgba(26,178,229,0.3) 0%, rgba(26,178,229,0) 100%)",
    category: "ERP DEVELOPMENT",
    title: "Chatbot",
    description: "Full ERP — 70% less\nmanual reporting time.",
    descriptionMultiline: true,
    extraDecor: "◆",
  },
  {
    id: "01",
    bg: "#0c0c23",
    gradientColor:
      "radial-gradient(50% 50% at 0% 0%, rgba(69,102,255,0.3) 0%, rgba(69,102,255,0) 100%)",
    category: "WEB DEVELOPMENT",
    title: "GraphuraBot",
    description: "It is ChatBot made by Graphura team",
    descriptionMultiline: false,
    extraDecor: null,
  },
  {
    id: "02",
    bg: "#0a1c0c",
    gradientColor:
      "radial-gradient(50% 50% at 0% 0%, rgba(26,178,77,0.3) 0%, rgba(26,178,77,0) 100%)",
    category: "DIGITAL MARKETING",
    title: "Hotel Shiv Ganga",
    description: "360° campaign driving\n3× revenue in 6 months.",
    descriptionMultiline: true,
    extraDecor: null,
  },
  {
    id: "03",
    bg: "#19071e",
    gradientColor:
      "radial-gradient(50% 50% at 0% 0%, rgba(204,26,229,0.3) 0%, rgba(204,26,229,0) 100%)",
    category: "BRANDING",
    title: "Fruit Bounty",
    description: "Complete brand system\nfor EV mobility startup.",
    descriptionMultiline: true,
    extraDecor: null,
  },
  {
    id: "04",
    bg: "#07161e",
    gradientColor:
      "radial-gradient(50% 50% at 0% 0%, rgba(26,178,229,0.3) 0%, rgba(26,178,229,0) 100%)",
    category: "ERP DEVELOPMENT",
    title: "Chatbot",
    description: "Full ERP — 70% less\nmanual reporting time.",
    descriptionMultiline: true,
    extraDecor: null,
  },
  {
    id: "05",
    bg: "#07161e",
    gradientColor:
      "radial-gradient(50% 50% at 0% 0%, rgba(26,178,229,0.3) 0%, rgba(26,178,229,0) 100%)",
    category: "ERP DEVELOPMENT",
    title: "Chatbot",
    description: "Full ERP — 70% less\nmanual reporting time.",
    descriptionMultiline: true,
    extraDecor: "◆",
  },
];

// Pagination dots data
const paginationDots = [
  { active: true },
  { active: false },
  { active: false },
  { active: false },
];

export const ProjectsGallerySection = ({ projects = [], onReact }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const displayProjects = projects.length > 0 ? projects : mockProjects;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -305, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 305, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[linear-gradient(90deg,rgba(20,10,46,1)_0%,rgba(10,10,26,1)_60%,rgba(5,38,56,1)_100%)] overflow-hidden h-[350px] sm:h-[500px] md:h-[600px] lg:h-[665px]">
      {/* Wave background image */}
      <img
        className="absolute w-full h-[40%] sm:h-[55%] md:w-[104.17%] md:h-[75.19%] top-[42%] left-0 pointer-events-none"
        alt="Wave"
        src="/wave-1-1.png"
      />

      {/* Header row */}
      <div className="absolute z-10 left-4 top-6 sm:left-10 sm:top-10 md:left-20 md:top-14 flex items-center gap-0">
        <span className="font-['Inter',Helvetica] font-medium text-[#c8a84b] text-[10px] tracking-[5.00px] leading-[normal] whitespace-nowrap">
          SELECTED WORK
        </span>
      </div>

      {/* Divider line */}
      <div className="hidden md:block absolute top-[63px] left-[40px] md:left-[280px] w-[90vw] md:w-[1100px] h-px bg-[#c8a84b] opacity-[0.14]" />

      {/* Projects label */}
      <div className="absolute left-4 top-12 sm:left-10 sm:top-16 md:left-20 md:top-20 opacity-45 font-['Inter',Helvetica] font-normal text-[#898999] text-xs tracking-[0.50px] leading-[normal] z-10">
        Projects
      </div>

      {/* Cards area */}
      <div className="absolute top-[80px] sm:top-[110px] md:top-[137px] left-0 w-full h-[220px] sm:h-[320px] md:h-[416px]">
        {/* Left fade gradient */}
        <div className="absolute top-0 left-0 w-[30px] sm:w-[50px] md:w-[70px] h-full bg-[linear-gradient(90deg,rgba(10,10,15,1)_0%,rgba(10,10,15,0)_100%)] z-10 pointer-events-none" />

        {/* Right fade gradient */}
        <div className="absolute top-0 right-0 w-[30px] sm:w-[50px] md:w-[70px] h-full bg-[linear-gradient(90deg,rgba(10,10,15,0)_0%,rgba(10,10,15,1)_100%)] z-10 pointer-events-none" />

        {/* Scrollable cards container */}
        <div
          ref={scrollRef}
          className="absolute top-0 left-[80px] right-[80px] h-[416px] flex gap-[25px] overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayProjects.map((project, index) => {
            const isMock = projects.length === 0;
            const bg = isMock ? project.bg : "#0c0c23";
            const gradientColor = isMock ? project.gradientColor : "radial-gradient(50% 50% at 0% 0%, rgba(69,102,255,0.3) 0%, rgba(69,102,255,0) 100%)";
            return (
            <div
              key={project.id || `project-${index}`}
              onClick={() => navigate('/project/' + (project.slug || project.id))}
              className="shrink-0 w-[280px] h-[416px] relative rounded-[3px] overflow-hidden border border-solid border-[#c8a84b1f] cursor-pointer hover:border-[#c8a84b80] transition-colors"
              style={{ backgroundColor: bg }}
            >
              {/* Radial gradient decoration */}
              <div
                className="absolute top-10 left-[50px] w-[199px] h-[193px]"
                style={{ background: gradientColor }}
              />

              {/* Extra diamond decor for last card */}
              {project.extraDecor && (
                <div className="absolute top-[90px] left-[90px] opacity-10 text-[80px] font-['Inter',Helvetica] font-normal text-[#c8a84b] tracking-[0] leading-[normal]">
                  {project.extraDecor}
                </div>
              )}

              {/* Project number */}
              <div className="absolute top-[15px] left-5 opacity-35 font-['Inter',Helvetica] font-medium text-[#c8a84b] text-[11px] tracking-[2.00px] leading-[normal] whitespace-nowrap">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Horizontal divider */}
              <div className="absolute top-[248px] left-0 w-[280px] h-px bg-[#c8a84b] opacity-[0.08]" />

              {/* Category */}
              <div className="absolute top-[264px] left-5 opacity-90 font-['Inter',Helvetica] font-medium text-[#c8a84b] text-[8px] tracking-[2.50px] leading-[normal] uppercase">
                {project.category}
              </div>

              {/* Title */}
              <div className="absolute top-[286px] left-5 pr-5 opacity-[0.93] font-['Inter',Helvetica] font-bold text-[#f5efe8] text-lg tracking-[-0.30px] leading-[normal] truncate max-w-full">
                {project.title}
              </div>

              {/* Description */}
              <div className="absolute top-[316px] left-5 pr-5 opacity-[0.68] font-['Inter',Helvetica] font-normal text-[#898999] text-[11px] tracking-[0.20px] leading-[18px] line-clamp-2">
                {project.descriptionMultiline && isMock
                  ? project.description.split("\n").map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))
                  : project.description}
              </div>
              
              {/* Reactions Bar for Live Projects */}
              {!isMock && (
                <div className="absolute left-5 top-[357px] flex gap-2 z-20">
                  <button onClick={() => onReact(project.id, 'like')} className="bg-[#1a1a24] border border-[#c8a84b40] rounded-full px-2 py-1 flex items-center gap-1 hover:bg-[#c8a84b20] transition-colors cursor-pointer text-white">
                    👍 <span className="text-[10px] text-[#898999]">{project.reactions?.like || 0}</span>
                  </button>
                  <button onClick={() => onReact(project.id, 'love')} className="bg-[#1a1a24] border border-[#c8a84b40] rounded-full px-2 py-1 flex items-center gap-1 hover:bg-[#c8a84b20] transition-colors cursor-pointer text-white">
                    ❤️ <span className="text-[10px] text-[#898999]">{project.reactions?.love || 0}</span>
                  </button>
                  <button onClick={() => onReact(project.id, 'fire')} className="bg-[#1a1a24] border border-[#c8a84b40] rounded-full px-2 py-1 flex items-center gap-1 hover:bg-[#c8a84b20] transition-colors cursor-pointer text-white">
                    🔥 <span className="text-[10px] text-[#898999]">{project.reactions?.fire || 0}</span>
                  </button>
                </div>
              )}

              {/* Arrow button */}
              <div className="absolute top-[357px] left-[228px] w-8 h-8 rounded-2xl border border-solid border-[#c8a84b66] flex items-center justify-center">
                <span className="opacity-90 font-['Inter',Helvetica] font-normal text-[#c8a84b] text-[13px] tracking-[0] leading-[normal]">
                  ↗
                </span>
              </div>

              {/* Bottom gold gradient bar */}
              <div className="absolute bottom-0 left-0 w-[280px] h-[3px] bg-[linear-gradient(90deg,rgba(201,168,76,0)_0%,rgba(201,168,76,0.8)_50%,rgba(201,168,76,0)_100%)]" />
            </div>
            )
          })}
        </div>

        {/* Left navigation button */}
        <Button
          onClick={scrollLeft}
          className="absolute top-[181px] left-[30px] w-10 h-10 flex items-center justify-center bg-[#111117] rounded-[20px] overflow-hidden border border-solid border-[#c8a84b66] z-20 p-0 hover:bg-[#1a1a24] cursor-pointer"
          variant="ghost"
        >
          <span className="font-['Inter',Helvetica] font-normal text-[#c8a84b] text-base tracking-[0] leading-[normal]">
            ←
          </span>
        </Button>

        {/* Right navigation button */}
        <Button
          onClick={scrollRight}
          className="absolute top-[181px] right-[30px] w-10 h-10 flex items-center justify-center bg-[#111117] rounded-[20px] overflow-hidden border border-solid border-[#c8a84b66] z-20 p-0 hover:bg-[#1a1a24] cursor-pointer"
          variant="ghost"
        >
          <span className="font-['Inter',Helvetica] font-normal text-[#c8a84b] text-base tracking-[0] leading-[normal]">
            →
          </span>
        </Button>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-[58px] left-20 flex items-center gap-2">
        {paginationDots.map((dot, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setActiveIndex(index)}
            className={
              dot.active || index === activeIndex
                ? "w-5 h-1.5 bg-[#c8a84be6] rounded-[10px]"
                : "w-1.5 h-1.5 bg-[#c8a84b40] rounded-[3px]"
            }
          />
        ))}
      </div>

      {/* Drag hint text */}
      <div className="absolute bottom-[48px] right-[240px] opacity-30 font-['Inter',Helvetica] font-normal text-[#898999] text-[10px] tracking-[2.00px] leading-[normal] whitespace-nowrap">
        ← drag to explore →
      </div>
    </section>
  );
};