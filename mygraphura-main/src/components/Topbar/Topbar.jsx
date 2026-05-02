import './Topbar.css'

function Topbar({ view, search, onSearchChange, onToggleSidebar, onOpenProfile, profileName }) {
  return (
    <header className="topbar">
      <button type="button" className="menu-toggle" onClick={onToggleSidebar}>
        ☰
      </button>
      {view === 'list' && (
        <input
          className="top-search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search projects..."
          aria-label="Search projects"
        />
      )}
      {view === 'create' && <div className="top-title">Project Setup Wizard</div>}
      {view === 'profile' && <div className="top-title">Admin Profile</div>}
      <div className="top-actions">
        <button type="button" className="profile-chip" onClick={onOpenProfile}>
          {profileName}
        </button>
      </div>
    </header>
  )
}

export default Topbar
