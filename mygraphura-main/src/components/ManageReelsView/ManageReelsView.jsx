import { useState } from 'react';
import './ManageReelsView.css';

function toDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Unable to read file'));
    reader.readAsDataURL(file);
  });
}

const ManageReelsView = ({ reels, onCreate, onDelete }) => {
  const [form, setForm] = useState({ title: '', client: '', videoBase64: '', posterBase64: '' });
  const [videoName, setVideoName] = useState('');
  const [posterName, setPosterName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.client || !form.videoBase64 || !form.posterBase64) {
      alert("All fields including video and poster are required.");
      return;
    }
    setIsSubmitting(true);
    await onCreate(form);
    setForm({ title: '', client: '', videoBase64: '', posterBase64: '' });
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
    <div className="content-area reels-admin-area">
      <div className="content-header">
        <div>
          <h2>Manage Reels</h2>
          <p>Publish short cinematic reels to display on the Home Page</p>
        </div>
        <div className="breadcrumb">Dashboards &gt; Home &gt; Reels</div>
      </div>

      <div className="reels-admin-container">
        <form className="reel-create-form" onSubmit={handleSubmit}>
           <h3>Publish New Reel</h3>
           <div className="input-group">
              <label>Reel Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Brand Campaign" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
              />
           </div>
           
           <div className="input-group">
              <label>Client / Subtitle</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Fruit Bounty" 
                value={form.client} 
                onChange={e => setForm({...form, client: e.target.value})} 
              />
           </div>

           <div className="input-group">
              <label>Cover Image (Poster) - For better performance</label>
              <div className="file-upload-box">
                <input type="file" required accept="image/*" id="poster-upload" onChange={handlePosterChange} />
                <label htmlFor="poster-upload" className="file-label">
                   {posterName ? posterName : 'Choose Image'}
                </label>
              </div>
           </div>

           <div className="input-group">
              <label>Video File (MP4 format)</label>
              <div className="file-upload-box">
                <input type="file" required accept="video/*" id="video-upload" onChange={handleVideoChange} />
                <label htmlFor="video-upload" className="file-label">
                   {videoName ? videoName : 'Choose Video'}
                </label>
              </div>
           </div>

           <button type="submit" disabled={isSubmitting} className="auth-button" style={{marginTop: '15px'}}>
              {isSubmitting ? 'Uploading to Cloudinary...' : 'Publish Reel'}
           </button>
        </form>

        <div className="reels-list-view">
           <h3>Published Reels</h3>
           {reels.length === 0 ? (
             <p style={{color: '#8391a2'}}>No reels published yet.</p>
           ) : (
             <div className="admin-reels-grid">
               {reels.map(reel => (
                 <div key={reel.id || reel._id} className="admin-reel-card">
                    <div className="reel-thumbnail-wrap">
                      <img src={reel.posterUrl} alt={reel.title} />
                      <button type="button" className="delete-reel-btn" onClick={() => onDelete(reel.id || reel._id)} title="Delete Reel">
                         &times;
                      </button>
                    </div>
                    <div className="admin-reel-info">
                       <h4>{reel.title}</h4>
                       <span>{reel.client}</span>
                       <small>Added: {new Date(reel.createdAt).toLocaleDateString()}</small>
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

export default ManageReelsView;
