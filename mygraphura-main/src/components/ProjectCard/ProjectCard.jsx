import './ProjectCard.css'

function ProjectCard({ project, onToggleStar, onEdit, getUpdatedLabel }) {
  return (
    <article className="luxury-card group">
      <div className="card-inner">
        <div className="card-media">
          {project.thumbnail ? (
            <img className="media-preview" src={project.thumbnail} alt={project.thumbnailAlt || "Project thumbnail"} />
          ) : (
            <div className="media-placeholder" style={{ background: project.iconColor }}>
              {project.icon}
            </div>
          )}
          <div className="media-overlay">
             <button
              type="button"
              className={`luxury-star ${project.starred ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); onToggleStar(project.id); }}
            >
              ★
            </button>
            <div className="status-badge">{project.status || 'Private'}</div>
          </div>
        </div>

        <div className="card-content">
          <div className="card-header">
            <span className="category-tag">{project.category || 'Designing'}</span>
            <span className="update-time">{getUpdatedLabel(project.updatedAt)}</span>
          </div>

          <h3 className="card-title">{project.title}</h3>
          
          <div className="luxury-footer" style={{ border: 'none', paddingTop: '10px' }}>
            <div className="action-row">
                <button className="lux-btn-edit" onClick={() => onEdit(project)}>
                    Edit Project
                </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
