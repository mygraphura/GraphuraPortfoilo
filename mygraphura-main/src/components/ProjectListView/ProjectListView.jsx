import ProjectCard from '../ProjectCard/ProjectCard'
import './ProjectListView.css'

function ProjectListView({
  filteredProjects,
  search,
  dateFilter,
  onSearchChange,
  onDateFilterChange,
  onAddNew,
  onToggleStar,
  onEdit,
  onDelete,
  getUpdatedLabel,
  formatDate,
}) {
  return (
    <section className="content-area">
      <div className="content-header">
        <div>
          <h2>Project List</h2>
          <p>Manage projects, progress, and owners from one admin board.</p>
        </div>
        <div className="breadcrumb">Projects / Project List</div>
      </div>

      <div className="toolbar">
        <button type="button" className="add-button" onClick={onAddNew}>
          + Add New
        </button>
        <div className="filters">
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search..."
            aria-label="Search input"
          />
          <select
            value={dateFilter}
            onChange={(event) => onDateFilterChange(event.target.value)}
            aria-label="Date filter"
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this-week">This Week</option>
          </select>
        </div>
      </div>

      <div className="card-grid">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleStar={onToggleStar}
            onEdit={onEdit}
            onDelete={onDelete}
            getUpdatedLabel={getUpdatedLabel}
            formatDate={formatDate}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="empty">No projects found. Try another search or add a new project.</p>
      )}
    </section>
  )
}

export default ProjectListView
