import { useRef, useState } from "react";
import { Play } from "lucide-react";
import "./ReelSection.css";

const ReelCard = ({ reel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="reel-card" onClick={handlePlayToggle}>
      <video
        ref={videoRef}
        className="reel-vid"
        loop
        muted
        playsInline
        poster={reel.posterSrc}
      >
        <source src={reel.videoSrc} type="video/mp4" />
      </video>

      <div className="reel-card-overlay">
        {!isPlaying && (
          <div className="mini-play-btn">
            <Play size={24} color="#fff" fill="#fff" />
          </div>
        )}
        <div className="reel-info">
          <span className="reel-client">{reel.client}</span>
          <h4 className="reel-title">{reel.title}</h4>
        </div>
      </div>
    </div>
  );
};

export const ReelSection = ({ reels = [] }) => {
  if (!reels || reels.length === 0) return null;

  return (
    <section className="reel-master-section">
      <div className="reel-marquee-wrap top-marquee">
        <div className="reel-marquee">
          <span>GRAPHURA SHOWREELS • 2026 • </span>
          <span>GRAPHURA SHOWREELS • 2026 • </span>
          <span>GRAPHURA SHOWREELS • 2026 • </span>
          <span>GRAPHURA SHOWREELS • 2026 • </span>
        </div>
      </div>
      
      <div className="multi-reels-container">
        <div className="reels-scroll-track">
          {reels.map((reel) => (
            <ReelCard key={reel.id || reel._id} reel={{...reel, videoSrc: reel.videoUrl, posterSrc: reel.posterUrl}} />
          ))}
        </div>
      </div>

      <div className="reel-marquee-wrap bottom-marquee">
        <div className="reel-marquee reverse">
           <span>INNOVATIVE DESIGNS • LUXURY AESTHETICS • BOLD STRATEGIES • </span>
           <span>INNOVATIVE DESIGNS • LUXURY AESTHETICS • BOLD STRATEGIES • </span>
           <span>INNOVATIVE DESIGNS • LUXURY AESTHETICS • BOLD STRATEGIES • </span>
           <span>INNOVATIVE DESIGNS • LUXURY AESTHETICS • BOLD STRATEGIES • </span>
        </div>
      </div>
    </section>
  );
};
