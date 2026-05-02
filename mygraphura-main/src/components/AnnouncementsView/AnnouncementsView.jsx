import React, { useState } from 'react'
import './AnnouncementsView.css'

const AnnouncementsView = ({ announcements, onCreate, onDelete, onToggle }) => {
  const [form, setForm] = useState({ title: '', description: '', category: 'New', link: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await onCreate(form)
    setForm({ title: '', description: '', category: 'New', link: '' })
    setIsSubmitting(false)
  }

  const getBadgeColor = (category) => {
    switch(category) {
      case 'Offer': return '#ff6b6b'
      case 'Achievement': return '#19b495'
      default: return '#4361ee'
    }
  }

  return (
    <div className="content-area">
      <div className="content-header">
        <div>
          <h2>Announcements</h2>
          <p>Publish live notifications, offers, and achievements to the home page</p>
        </div>
        <div className="breadcrumb">Dashboards &gt; Home &gt; Announcements</div>
      </div>

      <div className="announcements-container">
        <form className="announcement-form" onSubmit={handleSubmit}>
          <h3>Post New Announcement</h3>
          <div className="input-group">
            <label>Title</label>
            <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Graphic Bundles 50% Off!" />
          </div>
          <div className="input-group">
            <label>Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option value="New">New</option>
              <option value="Offer">Offer</option>
              <option value="Achievement">Achievement</option>
            </select>
          </div>
          <div className="input-group">
            <label>Description (Details)</label>
            <textarea required rows="4" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Provide further details..."></textarea>
          </div>
          <div className="input-group">
            <label>Redirect Link (Optional)</label>
            <input type="url" value={form.link} onChange={e => setForm({...form, link: e.target.value})} placeholder="https://..." />
          </div>
          <button type="submit" disabled={isSubmitting} className="auth-button" style={{marginTop: '10px'}}>
            {isSubmitting ? 'Posting...' : 'Publish Announcement'}
          </button>
        </form>

        <div className="announcements-list">
          <h3>Active Announcements</h3>
          {announcements.length === 0 ? (
            <p style={{color: '#8391a2'}}>No announcements posted yet.</p>
          ) : (
            announcements.map((ann) => (
              <div key={ann.id} className="announcement-card">
                <div className="announcement-header">
                  <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <span className="announcement-badge" style={{backgroundColor: getBadgeColor(ann.category)}}>
                      {ann.category}
                    </span>
                    {ann.isActive === false && <span style={{fontSize: '10px', color: '#e53e3e', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e53e3e'}}>INACTIVE</span>}
                  </div>
                  <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                    <button type="button" onClick={() => onToggle(ann.id)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', color: ann.isActive !== false ? '#718096' : '#19b495'}}>
                      {ann.isActive !== false ? 'Deactivate' : 'Activate'}
                    </button>
                    <button type="button" className="announcement-delete-btn" onClick={() => onDelete(ann.id)}>
                      &times;
                    </button>
                  </div>
                </div>
                <h4>{ann.title}</h4>
                <p>{ann.description}</p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <small>{new Date(ann.createdAt).toLocaleDateString()}</small>
                  {ann.link && <a href={ann.link} target="_blank" rel="noreferrer" style={{fontSize: '0.8rem', color: '#4361ee', textDecoration: 'none', fontWeight: 'bold'}}>Preview Link ↗</a>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementsView
