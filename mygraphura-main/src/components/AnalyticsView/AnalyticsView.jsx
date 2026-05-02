import React, { useMemo, useEffect, useState } from 'react';
import './AnalyticsView.css';

const AnalyticsView = ({ projects }) => {
  const [liveCounts, setLiveCounts] = useState({});

  useEffect(() => {
    const fetchLiveCounts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_URL}/analytics/live-counts`);
        if (response.ok) {
          const data = await response.json();
          setLiveCounts(data);
        }
      } catch (e) {
        console.error("Failed to fetch live counts", e);
      }
    };

    fetchLiveCounts();
    const interval = setInterval(fetchLiveCounts, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, []);

  // Calculate Totals
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    let totalViews = 0;
    let totalReactions = 0;

    projects.forEach(p => {
      totalViews += (p.views || 0);
      if (p.reactions) {
        totalReactions += (p.reactions.like || 0) + (p.reactions.love || 0) + (p.reactions.fire || 0);
      }
    });

    return { totalProjects, totalViews, totalReactions };
  }, [projects]);

  return (
    <div className="analytics-container dashboard-transition">
      <div className="content-header">
        <div className="header-meta">
            <h2>Project Analytics</h2>
            <p>Real-time insights and project performance tracking</p>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card gold">
          <div className="stat-icon">👁️</div>
          <div className="stat-info">
            <h4>Total Views</h4>
            <p>{stats.totalViews.toLocaleString()}</p>
          </div>
          <div className="stat-badge">+12% this week</div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon">❤️</div>
          <div className="stat-info">
            <h4>Total Reactions</h4>
            <p>{stats.totalReactions.toLocaleString()}</p>
          </div>
          <div className="stat-badge">+8% engagement</div>
        </div>

        <div className="stat-card cyan">
          <div className="stat-icon">🚀</div>
          <div className="stat-info">
            <h4>Total Projects</h4>
            <p>{stats.totalProjects}</p>
          </div>
          <div className="stat-badge">Active Portfolio</div>
        </div>
      </div>

      {/* Analytics Table */}
      <div className="analytics-card">
        <div className="card-header">
            <h3>Detailed Performance</h3>
        </div>
        <div className="table-responsive">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Launch Date</th>
                <th>Total Views</th>
                <th>Reactions</th>
                <th>Live Now</th>
                <th>Engagement</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const totalReacts = (project.reactions?.like || 0) + (project.reactions?.love || 0) + (project.reactions?.fire || 0);
                const liveCount = liveCounts[project.id] || 0;
                
                return (
                  <tr key={project.id}>
                    <td>
                      <div className="table-project-info">
                        <div className="project-icon-mini" style={{ background: project.iconColor }}>
                          {project.icon}
                        </div>
                        <span className="project-name">{project.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className="date-badge">
                        {new Date(project.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td>
                      <strong className="views-count">{project.views || 0}</strong>
                    </td>
                    <td>
                      <div className="reaction-pills-mini">
                        <span title="Likes">👍 {project.reactions?.like || 0}</span>
                        <span title="Loves">❤️ {project.reactions?.love || 0}</span>
                        <span title="Fire">🔥 {project.reactions?.fire || 0}</span>
                      </div>
                    </td>
                    <td>
                      <div className="live-status">
                        <span className={`pulse-dot ${liveCount > 0 ? 'online' : ''}`}></span>
                        <span className="live-count">{liveCount} Active</span>
                      </div>
                    </td>
                    <td>
                        <div className="engagement-bar-container">
                            <div 
                                className="engagement-bar" 
                                style={{ width: `${Math.min((totalReacts / (project.views || 1)) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
