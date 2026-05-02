import { useLocation, useNavigate } from 'react-router-dom'
import './Sidebar.css'

function Sidebar({ isVisible }) {
  const navigate = useNavigate()
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <aside className={`sidebar ${isVisible ? 'open' : 'hidden'}`}>
      <h1 className="brand">Graphura</h1>
      <p className="menu-label">Menu</p>
      <nav className="menu-items">
        <button
          type="button"
          className={`menu-item ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        <button
          type="button"
          className={`menu-item ${isActive('/dashboard/create') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard/create')}
        >
          Create Project
        </button>
        <button
          type="button"
          className={`menu-item ${isActive('/dashboard/analytics') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard/analytics')}
        >
          Project Analytics
        </button>
        <button
          type="button"
          className={`menu-item ${isActive('/dashboard/logs') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard/logs')}
        >
          Login Logs
        </button>
        <button
          type="button"
          className={`menu-item ${isActive('/dashboard/announcements') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard/announcements')}
        >
          Announcements
        </button>
        <button
          type="button"
          className={`menu-item ${isActive('/dashboard/reels') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard/reels')}
        >
          Manage Reels
        </button>
        <button
          type="button"
          className={`menu-item ${isActive('/dashboard/videos') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard/videos')}
        >
          Manage Videos
        </button>
      </nav>
      
      <div className="logout-container">
        <button 
          type="button" 
          className="logout-button"
          onClick={() => {
            localStorage.removeItem('admin_token');
            navigate('/login');
          }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
