import { useMemo, useState } from 'react'
import './AdminProfileView.css'

function AdminProfileView({ projects, profile, activities = [], admins = [], onSaveProfile, onChangePassword }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(profile)
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
  const [passwordStatus, setPasswordStatus] = useState(null)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (passwords.new !== passwords.confirm) {
      setPasswordStatus({ type: 'danger', text: 'New passwords do not match' })
      return
    }
    if (passwords.new.length < 6) {
      setPasswordStatus({ type: 'danger', text: 'Password must be at least 6 characters' })
      return
    }

    setIsChangingPassword(true)
    setPasswordStatus(null)

    try {
      await onChangePassword(passwords.current, passwords.new)
      setPasswordStatus({ type: 'success', text: 'Password updated successfully' })
      setPasswords({ current: '', new: '', confirm: '' })
    } catch (err) {
      setPasswordStatus({ type: 'danger', text: err.message })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const initials = (profile?.name || 'User Name')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const stats = useMemo(
    () => ({
      projects: projects.length,
      starred: projects.filter((project) => project.starred).length,
      images: projects.reduce(
        (count, project) => count + (project.extraImages?.length || 0),
        0,
      ),
    }),
    [projects],
  )

  return (
    <section className="profile-dashboard">
      <div className="profile-hero">
        <div className="profile-overlay" />

        <div className="profile-main">
          <div className="profile-avatar" aria-hidden="true">
            {initials}
          </div>

          <div className="profile-summary">
            <h2>{profile.name}</h2>
            <p className="profile-role">{profile.role}</p>
            <p className="profile-location">
              {profile.location} · {profile.company}
            </p>
            <div className="profile-socials">
              {profile.twitter && (
                <a href={`https://twitter.com/${profile.twitter?.replace('@', '')}`} target="_blank" rel="noreferrer" className="social-link-pill">
                  <span className="icon-gold">𝕏</span>
                  <span>{profile.twitter}</span>
                </a>
              )}
              {profile.github && (
                <a href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer" className="social-link-pill">
                  <span className="icon-gold">🐙</span>
                  <span>{profile.github}</span>
                </a>
              )}
              {profile.linkedin && (
                <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noreferrer" className="social-link-pill">
                  <span className="icon-gold">💼</span>
                  <span>{profile.linkedin}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div>
            <strong>{profile.followers}</strong>
            <span>Followers</span>
          </div>
          <div>
            <strong>{profile.following}</strong>
            <span>Following</span>
          </div>
        </div>
      </div>

      <div className="profile-nav-bar">
        <div className="profile-tabs" role="tablist" aria-label="Profile sections">
          <button
            type="button"
            className={`profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            type="button"
            className={`profile-tab ${activeTab === 'activities' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'activities'}
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
          <button
            type="button"
            className={`profile-tab ${activeTab === 'projects' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'projects'}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            type="button"
            className={`profile-tab ${activeTab === 'documents' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'documents'}
            onClick={() => setActiveTab('documents')}
          >
            Admin Members
          </button>
          <button
            type="button"
            className={`profile-tab ${activeTab === 'security' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'security'}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        {!isEditing && (
          <button
            type="button"
            className="profile-edit-btn"
            onClick={() => {
              setDraft(profile)
              setIsEditing(true)
            }}
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing && (
        <form
          className="profile-edit-form"
          onSubmit={(event) => {
            event.preventDefault()
            onSaveProfile(draft)
            setIsEditing(false)
          }}
        >
          <label>
            Name
            <input
              value={draft.name}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, name: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Role
            <input
              value={draft.role}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, role: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Location
            <input
              value={draft.location}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, location: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Company
            <input
              value={draft.company}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, company: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Followers
            <input
              value={draft.followers}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, followers: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Following
            <input
              value={draft.following}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, following: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Twitter Handle
            <input
              value={draft.twitter || ''}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, twitter: event.target.value }))
              }
            />
          </label>
          <label>
            GitHub Username
            <input
              value={draft.github || ''}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, github: event.target.value }))
              }
            />
          </label>
          <label>
            LinkedIn Username
            <input
              value={draft.linkedin || ''}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, linkedin: event.target.value }))
              }
            />
          </label>

          <div className="profile-edit-actions">
            <button
              type="button"
              className="profile-cancel-btn"
              onClick={() => {
                setDraft(profile)
                setIsEditing(false)
              }}
            >
              Cancel
            </button>
            <button type="submit" className="profile-save-btn">
              Save Profile
            </button>
          </div>
        </form>
      )}

      <div className="profile-panel" role="tabpanel">
        {activeTab === 'overview' && (
          <div className="profile-overview-grid">
            <article className="profile-kpi">
              <h4>Total Projects</h4>
              <p>{stats.projects}</p>
            </article>
            <article className="profile-kpi">
              <h4>Starred Projects</h4>
              <p>{stats.starred}</p>
            </article>
            <article className="profile-kpi">
              <h4>Uploaded Images</h4>
              <p>{stats.images}</p>
            </article>
          </div>
        )}

        {activeTab === 'activities' && (
          <ul className="profile-list">
            {(!activities || activities.length === 0) ? (
              <li>No recent activities found...</li>
            ) : (
              activities.map((activity) => (
                <li key={activity.id}>
                  {activity.text}
                  <span>({new Date(activity.createdAt).toLocaleString()})</span>
                </li>
              ))
            )}
          </ul>
        )}

        {activeTab === 'projects' && (
          <ul className="profile-list">
            {projects.map((project) => (
              <li key={project.id}>
                <strong>{project.title}</strong>
                <span>
                  {project.status || 'Private'} · {project.category || 'Designing'}
                </span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'documents' && (
          <ul className="profile-list">
            {admins.length === 0 ? (
                <li>No other admin accounts found.</li>
            ) : (
                admins.map((adm) => (
                    <li key={adm._id || adm.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <strong>{adm.name}</strong>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#8391a2' }}>{adm.email}</p>
                        </div>
                        <span className="log-badge badge-status-success">Administrator</span>
                    </li>
                ))
            )}
          </ul>
        )}

        {activeTab === 'security' && (
          <div className="profile-security" style={{maxWidth: '400px'}}>
            <h4 style={{ color: '#4f5e87', marginBottom: '16px' }}>Change Password</h4>
            
            {passwordStatus && (
              <div style={{
                padding: '12px',
                marginBottom: '16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                backgroundColor: passwordStatus.type === 'success' ? '#e6f7f3' : '#fde8e4',
                color: passwordStatus.type === 'success' ? '#0ab39c' : '#f06548'
              }}>
                {passwordStatus.text}
              </div>
            )}
            
            <form onSubmit={handlePasswordSubmit} className="profile-edit-form" style={{ gridTemplateColumns: '1fr' }}>
              <label>
                Current Password
                <input 
                  type="password" 
                  value={passwords.current} 
                  onChange={e => setPasswords({...passwords, current: e.target.value})} 
                  required 
                />
              </label>
              
              <label>
                New Password
                <input 
                  type="password" 
                  value={passwords.new} 
                  onChange={e => setPasswords({...passwords, new: e.target.value})} 
                  required 
                  minLength="6"
                />
              </label>
              
              <label>
                Confirm New Password
                <input 
                  type="password" 
                  value={passwords.confirm} 
                  onChange={e => setPasswords({...passwords, confirm: e.target.value})} 
                  required 
                  minLength="6"
                />
              </label>
              
              <button type="submit" disabled={isChangingPassword} className="profile-save-btn" style={{marginTop: '16px', width: '100%'}}>
                {isChangingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminProfileView
