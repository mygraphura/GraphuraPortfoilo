import React, { useRef } from 'react'
import './CreateProjectView.css'

const statusOptions = ['Private', 'Team', 'Public']
const categoryOptions = ['Designing', 'Development', 'Marketing', 'Branding', 'Photography']
const skillOptions = ['React', 'UI/UX', 'Node.js', 'Figma', 'MongoDB', 'AWS', 'Python']

export const CreateProjectView = ({
  form,
  setForm,
  onCancel,
  onSubmit,
  onThumbnailChange,
  editingId,
  error,
  onDelete,
}) => {
  const descriptionRef = useRef(null)

  const onToggleSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  return (
    <section className="dashboard-content dashboard-transition">
      <div className="content-header">
        <h2>{editingId ? 'Edit Project' : 'Create Project'}</h2>
      </div>

      <form className="create-layout" onSubmit={onSubmit}>
        <div className="create-left">
          <section className="create-card">
            <h3>Project Identity</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <label>
                    Project Title
                    <input
                        placeholder="Enter project title"
                        value={form.title}
                        onChange={(event) => {
                            const title = event.target.value;
                            setForm((prev) => {
                                const next = { ...prev, title };
                                if (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
                                    next.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                }
                                return next;
                            });
                        }}
                        onBlur={(event) => {
                            const title = event.target.value;
                            setForm((prev) => {
                                const next = { ...prev };
                                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                if (!prev.slug) next.slug = slug;
                                const baseUrl = window.location.origin + '/project/';
                                if (!prev.liveDemoUrl || prev.liveDemoUrl.startsWith(window.location.origin)) {
                                    next.liveDemoUrl = baseUrl + (next.slug || prev.slug);
                                }
                                return next;
                            });
                        }}
                    />
                </label>
                <label>
                    Project Category
                    <input
                        placeholder="Designing, Development, etc."
                        value={form.category || ''}
                        onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    />
                </label>
            </div>

            <label>
              Tagline
              <input
                placeholder="Fast. Elegant. Powerful."
                value={form.tagline || ''}
                onChange={(e) => setForm(prev => ({ ...prev, tagline: e.target.value }))}
              />
            </label>

            <label>
              Project Slug
              <input
                placeholder="e.g. game-changer-project"
                value={form.slug || ''}
                onChange={(event) => {
                  const slug = event.target.value;
                  setForm((prev) => {
                    const next = { ...prev, slug };
                    const baseUrl = window.location.origin + '/project/';
                    if (!prev.liveDemoUrl || prev.liveDemoUrl.startsWith(window.location.origin)) {
                        next.liveDemoUrl = baseUrl + slug;
                    }
                    return next;
                  });
                }}
              />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <label>
                    Live Preview Link (Marketplace)
                    <input
                        placeholder="Autofilled..."
                        value={form.liveDemoUrl || ''}
                        readOnly
                        style={{ backgroundColor: '#f9f9f9', cursor: 'not-allowed' }}
                    />
                </label>
                <label>
                    Project Link (Live Demo)
                    <input
                        placeholder="https://external-demo.com"
                        value={form.externalProjectLink || ''}
                        onChange={(e) => setForm(prev => ({ ...prev, externalProjectLink: e.target.value }))}
                    />
                </label>
            </div>

            <label>
              Contact Number
              <input
                placeholder="+91..."
                value={form.contactNumber || ''}
                onChange={(e) => setForm(prev => ({ ...prev, contactNumber: e.target.value }))}
              />
            </label>
          </section>

          <section className="create-card">
            <h3>Project Overview</h3>
            <p className="attachments-subtitle">Primary introduction text and featured image.</p>
            <label>
              Overview Text
              <textarea
                placeholder="Briefly introduce your project..."
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, description: event.target.value }))
                }
                style={{ minHeight: '100px' }}
              />
            </label>
            <div style={{ marginTop: '15px' }}>
                <label>Thumbnail / Hero Image</label>
                <input type="file" accept="image/*" onChange={onThumbnailChange} />
                <input 
                    placeholder="Thumbnail Alt Text" 
                    value={form.thumbnailAlt || ''}
                    onChange={(e) => setForm(prev => ({ ...prev, thumbnailAlt: e.target.value }))}
                    style={{ marginTop: '8px', width: '100%' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                <label>Overview Background Image</label>
                <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setForm(prev => ({ ...prev, overviewImage: { ...prev.overviewImage, url: reader.result } }));
                        reader.readAsDataURL(file);
                    }
                }} />
                <input 
                    placeholder="Overview Image Alt Text" 
                    value={form.overviewImage?.alt || ''}
                    onChange={(e) => setForm(prev => ({ ...prev, overviewImage: { ...prev.overviewImage, alt: e.target.value } }))}
                    style={{ marginTop: '8px', width: '100%' }}
                />
            </div>
          </section>

          <section className="create-card">
            <h3>Detailed Description</h3>
            <p className="attachments-subtitle">Deep dive into the project's logic and architecture.</p>
            <label>
              Description Text
              <textarea
                placeholder="Explain the project in detail..."
                value={form.detailedDescription || ''}
                onChange={(e) => setForm(prev => ({ ...prev, detailedDescription: e.target.value }))}
                style={{ minHeight: '150px' }}
              />
            </label>
            <div style={{ marginTop: '15px' }}>
                <label>Description Illustration / Image</label>
                <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setForm(prev => ({ ...prev, detailedDescriptionImage: { ...prev.detailedDescriptionImage, url: reader.result } }));
                        reader.readAsDataURL(file);
                    }
                }} />
                <input 
                    placeholder="Detailed Image Alt Text" 
                    value={form.detailedDescriptionImage?.alt || ''}
                    onChange={(e) => setForm(prev => ({ ...prev, detailedDescriptionImage: { ...prev.detailedDescriptionImage, alt: e.target.value } }))}
                    style={{ marginTop: '8px', width: '100%' }}
                />
            </div>
          </section>

          <section className="create-card">
            <h3>Key Points</h3>
            <p className="attachments-subtitle">Add project highlights with custom icons.</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input 
                    id="new-skill-icon" 
                    placeholder="Icon (Emoji)" 
                    defaultValue="✨" 
                    style={{ width: '80px', textAlign: 'center' }} 
                />
                <input 
                    id="new-skill-text" 
                    placeholder="Feature title..." 
                    style={{ flex: 1 }} 
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            document.getElementById('add-skill-btn').click();
                        }
                    }}
                />
                <button 
                    id="add-skill-btn"
                    type="button" 
                    className="add-button"
                    style={{ padding: '8px 16px' }}
                    onClick={() => {
                        const icon = document.getElementById('new-skill-icon').value || '✨';
                        const text = document.getElementById('new-skill-text').value;
                        if (text) {
                            setForm(prev => ({ ...prev, skills: [...prev.skills, { text, icon }] }));
                            document.getElementById('new-skill-text').value = '';
                        }
                    }}
                >
                    Add
                </button>
            </div>

            <div className="skill-chips" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {form.skills && form.skills.map((skill, idx) => (
                <div key={idx} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    background: '#f8f9fc',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>{skill.icon}</span>
                    <span style={{ fontWeight: '600', color: '#334155' }}>{skill.text}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setForm(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }))}
                    style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                  >
                    ×
                  </button>
                </div>
              ))}
              {(!form.skills || form.skills.length === 0) && (
                  <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '12px', padding: '10px' }}>No key points added yet.</p>
              )}
            </div>
          </section>

          <section className="create-card">
            <h3 className="attachments-title">Project Gallery</h3>
            <p className="attachments-subtitle">Showcase your work with a grid of images.</p>
            <div className="upload-dropzone" onClick={() => document.getElementById('gall-upload').click()}>
                <input id="gall-upload" type="file" multiple accept="image/*" onChange={(e) => {
                    const files = Array.from(e.target.files);
                    files.forEach(file => {
                        const reader = new FileReader();
                        reader.onloadend = () => setForm(prev => ({
                            ...prev, 
                            extraImages: [...prev.extraImages, { url: reader.result, name: file.name, alt: '' }]
                        }));
                        reader.readAsDataURL(file);
                    });
                }} />
                <span className="upload-icon">📷</span>
                <p>Click to add gallery images</p>
            </div>

            <div className="attachment-grid">
              {form.extraImages.map((image, index) => (
                <div key={index} className="attachment-item">
                  <img src={image.url} alt={image.alt || image.name} />
                  <input 
                    placeholder="Alt text" 
                    value={image.alt || ''}
                    onChange={(e) => {
                        const next = [...form.extraImages];
                        next[index].alt = e.target.value;
                        setForm(prev => ({ ...prev, extraImages: next }));
                    }}
                    style={{ width: '100%', fontSize: '11px', marginTop: '5px' }}
                  />
                  <button
                    type="button"
                    className="remove-attachment"
                    onClick={() => setForm(prev => ({ ...prev, extraImages: prev.extraImages.filter((_, i) => i !== index) }))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="create-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>SEO Optimization</h3>
                <button 
                    type="button"
                    onClick={() => {
                        const templates = [
                            { seoTitle: `${form.title} | Premium Design by Graphura`, metaDescription: `Discover ${form.title}, a high-end digital masterpiece crafted for excellence.`, metaKeywords: `${form.title}, graphura, design, luxury` },
                            { seoTitle: `${form.title} - Innovative Tech Solutions`, metaDescription: `Learn how ${form.title} uses cutting-edge technology to redefine industry standards.`, metaKeywords: `${form.title}, innovation, technology, coding` }
                        ];
                        const random = templates[Math.floor(Math.random() * templates.length)];
                        setForm(prev => ({ ...prev, ...random }));
                    }}
                    style={{ padding: '6px 12px', fontSize: '11px', background: '#eab308', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    ✨ Get New Suggestion
                </button>
            </div>
            <label>
              SEO Title
              <input value={form.seoTitle || ''} onChange={(e) => setForm(prev => ({ ...prev, seoTitle: e.target.value }))} />
            </label>
            <label>
              Meta Description
              <textarea value={form.metaDescription || ''} onChange={(e) => setForm(prev => ({ ...prev, metaDescription: e.target.value }))} />
            </label>
            <label>
              Meta Keywords
              <input value={form.metaKeywords || ''} onChange={(e) => setForm(prev => ({ ...prev, metaKeywords: e.target.value }))} />
            </label>
          </section>
        </div>

        <div className="create-right">
          <section className="create-card">
            <h3>Status</h3>
            <select value={form.status} onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}>
                {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </section>

          {editingId && (
            <section className="create-card" style={{ border: '1px solid #fee2e2' }}>
                <h3 style={{ color: '#ef4444' }}>Danger Zone</h3>
                <p style={{ fontSize: '12px', color: '#7f8c8d', marginBottom: '15px' }}>Once you delete a project, there is no going back. Please be certain.</p>
                <button 
                    type="button" 
                    className="sidebar-delete-btn"
                    onClick={() => {
                        if (window.confirm('Are you absolutely sure? This will permanently delete the project and all associated media.')) {
                            onDelete(editingId);
                        }
                    }}
                    style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '10px', 
                        padding: '14px', 
                        background: '#fff5f5',
                        border: '1px solid #feb2b2',
                        borderRadius: '12px',
                        color: '#c53030',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span>Delete Permanentely</span>
                </button>
            </section>
          )}

          {form.status === 'Public' && (
            <section className="create-card">
              <h3>Reactions</h3>
              <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', 
                  gap: '12px' 
              }}>
                <div className="reaction-input-group">
                    <span style={{ fontSize: '14px', marginBottom: '4px', display: 'block' }}>👍 Like</span>
                    <input type="number" value={form.reactions_like} onChange={(e) => setForm(prev => ({ ...prev, reactions_like: e.target.value }))} style={{ width: '100%' }} />
                </div>
                <div className="reaction-input-group">
                    <span style={{ fontSize: '14px', marginBottom: '4px', display: 'block' }}>❤️ Love</span>
                    <input type="number" value={form.reactions_love} onChange={(e) => setForm(prev => ({ ...prev, reactions_love: e.target.value }))} style={{ width: '100%' }} />
                </div>
                <div className="reaction-input-group">
                    <span style={{ fontSize: '14px', marginBottom: '4px', display: 'block' }}>🔥 Fire</span>
                    <input type="number" value={form.reactions_fire} onChange={(e) => setForm(prev => ({ ...prev, reactions_fire: e.target.value }))} style={{ width: '100%' }} />
                </div>
              </div>
            </section>
          )}

          <div className="form-actions-sidebar" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {error && <p className="error form-error" style={{ marginBottom: '10px' }}>{error}</p>}
            <button type="submit" className="add-button" style={{ width: '100%', padding: '15px' }}>
                {editingId ? 'Update Masterpiece' : 'Create Masterpiece'}
            </button>
            <button type="button" className="ghost" onClick={onCancel} style={{ width: '100%', padding: '12px' }}>
                Cancel
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default CreateProjectView
