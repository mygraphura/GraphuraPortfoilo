import React, { useState } from 'react';
import './VideoShowcaseSection.css';
import { Play, X } from 'lucide-react';

export const VideoShowcaseSection = ({ videos = [] }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  if (!videos || videos.length === 0) return null;

  return (
    <section className="video-showcase-master">
      <div className="v-showcase-header">
         <span className="v-mini-tag">LATEST PRODUCTION</span>
         <h2 className="v-big-title">Exclusive <span className="v-hollow-text">PROJECTS</span></h2>
      </div>

      <div className="v-showcase-grid">
         {videos.map(video => (
            <div key={video.id || video._id} className="v-showcase-card" onClick={() => setActiveVideo(video)}>
               <div className="v-thumbnail-wrapper">
                 {video.posterUrl ? (
                   <img src={video.posterUrl} alt={video.title} className="v-thumb-img" />
                 ) : video.type === 'youtube' ? (
                   <img src={`https://img.youtube.com/vi/${video.videoUrl}/hqdefault.jpg`} alt={video.title} className="v-thumb-img" />
                 ) : (
                   <video src={video.videoUrl} className="v-thumb-vid" muted playsInline></video>
                 )}
                 <div className="v-play-overlay">
                    <div className="v-play-btn"><Play size={24} fill="#c8a84b" color="#c8a84b" /></div>
                 </div>
               </div>
               <div className="v-card-info">
                  <span className="v-client">{video.project}</span>
                  <h3 className="v-title">{video.title}</h3>
               </div>
            </div>
         ))}
      </div>

      {activeVideo && (
         <div className="v-modal-overlay">
            <button className="v-close-modal" onClick={() => setActiveVideo(null)}>
               <X size={32} />
            </button>
            <div className="v-modal-content">
               {activeVideo.type === 'youtube' ? (
                  <iframe 
                    className="v-iframe-player"
                    src={`https://www.youtube.com/embed/${activeVideo.videoUrl}?autoplay=1`}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
               ) : (
                  <video src={activeVideo.videoUrl} controls autoPlay className="v-html-player"></video>
               )}
            </div>
         </div>
      )}
    </section>
  );
};
