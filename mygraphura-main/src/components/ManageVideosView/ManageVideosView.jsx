import { useState } from 'react';
import './ManageVideosView.css';

function toDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Unable to read file'));
    reader.readAsDataURL(file);
  });
}

function extractYouTubeID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const ManageVideosView = ({ videos, onCreate, onDelete }) => {
  const [form, setForm] = useState({ title: '', project: '', type: 'cloudinary', videoUrl: '', videoBase64: '', posterBase64: '' });
  const [videoName, setVideoName] = useState('');
  const [posterName, setPosterName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.project) return alert("Title and Project details are required.");
    
    let submitData = { ...form };
    
    if (form.type === 'cloudinary' && !form.videoBase64) {
      return alert("Please select a video file for Cloudinary upload.");
    }

    if (form.type === 'youtube') {
      if (!form.videoUrl) return alert("Please provide a valid YouTube Link.");
      const ytID = extractYouTubeID(form.videoUrl);
      if (!ytID) return alert("Invalid YouTube URL");
      submitData.videoUrl = ytID;
    }

    setIsSubmitting(true);
    await onCreate(submitData);
    setForm({ title: '', project: '', type: 'cloudinary', videoUrl: '', videoBase64: '', posterBase64: '' });
    setVideoName('');
    setPosterName('');
    setIsSubmitting(false);
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoName(file.name);
      try {
        const base64 = await toDataUrl(file);
        setForm(f => ({ ...f, videoBase64: base64 }));
      } catch (err) {
        alert("Failed to read video file");
      }
    }
  };

  const handlePosterChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterName(file.name);
      try {
        const base64 = await toDataUrl(file);
        setForm(f => ({ ...f, posterBase64: base64 }));
      } catch (err) {
        alert("Failed to read poster file");
      }
    }
  };

  return (
    <div className="content-area video-admin-area">
      <div className="content-header">
        <div>
          <h2>Manage Project Videos</h2>
          <p>Publish full landscape videos via Cloudinary or YouTube</p>
        </div>
        <div className="breadcrumb">Dashboards &gt; Home &gt; Videos</div>
      </div>

      <div className="videos-admin-container">
        <form className="video-create-form" onSubmit={handleSubmit}>
           <h3>Publish New Video</h3>
           <div className="input-group">
              <label>Video Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Graphura App Showcase" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
              />
           </div>
           
           <div className="input-group">
              <label>Project Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Web Development 2026" 
                value={form.project} 
                onChange={e => setForm({...form, project: e.target.value})} 
              />
           </div>

           <div className="input-group">
              <label>Video Source</label>
              <select 
                className="select-dropdown"
                value={form.type} 
                onChange={e => setForm({...form, type: e.target.value})}
              >
                 <option value="cloudinary">Cloudinary File Upload</option>
                 <option value="youtube">YouTube Embed Link</option>
              </select>
           </div>

           {form.type === 'cloudinary' ? (
             <div className="input-group">
                <label>Video File (MP4 format)</label>
                <div className="file-upload-box">
                  <input type="file" accept="video/*" id="vid-upload" onChange={handleVideoChange} />
                  <label htmlFor="vid-upload" className="file-label">
                     {videoName ? videoName : 'Choose Video File'}
                  </label>
                </div>
             </div>
           ) : (
             <div className="input-group">
                <label>YouTube Link</label>
                <input 
                  type="text" 
                  placeholder="https://www.youtube.com/watch?v=..." 
                  value={form.videoUrl} 
                  onChange={e => setForm({...form, videoUrl: e.target.value})} 
                />
             </div>
           )}

           <div className="input-group">
              <label>Custom Cover Image (Optional)</label>
              <div className="file-upload-box">
                <input type="file" accept="image/*" id="poster-upload" onChange={handlePosterChange} />
                <label htmlFor="poster-upload" className="file-label">
                   {posterName ? posterName : 'Choose Cover Image'}
                </label>
              </div>
           </div>

           <button type="submit" disabled={isSubmitting} className="auth-button" style={{marginTop: '15px'}}>
              {isSubmitting ? 'Processing...' : 'Publish Video'}
           </button>
        </form>

        <div className="videos-list-view">
           <h3>Live Videos</h3>
           {videos.length === 0 ? (
             <p style={{color: '#8391a2'}}>No project videos uploaded yet.</p>
           ) : (
             <div className="admin-videos-grid">
               {videos.map(video => (
                 <div key={video.id || video._id} className="admin-video-card">
                    <div className="video-thumbnail-wrap">
                      {video.posterUrl ? (
                         <img src={video.posterUrl} alt="Custom Cover" />
                      ) : video.type === 'youtube' ? (
                        <img src={`https://img.youtube.com/vi/${video.videoUrl}/hqdefault.jpg`} alt="YT Thumbnail" />
                      ) : (
                         <video src={video.videoUrl} muted className="cloud-video-preview"></video>
                      )}
                      
                      <div className="vid-type-badge">{video.type === 'youtube' ? 'YT' : 'CLO'}</div>
                      <button type="button" className="delete-vid-btn" onClick={() => onDelete(video.id || video._id)} title="Delete Video">
                         &times;
                      </button>
                    </div>
                    <div className="admin-video-info">
                       <h4>{video.title}</h4>
                       <span>{video.project}</span>
                       <small>Source: {video.type.toUpperCase()}</small>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

export default ManageVideosView;
