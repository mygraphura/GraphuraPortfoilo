import React, { useState, useEffect } from 'react'
import './LoginLogsView.css'

const LoginLogsView = () => {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchLogs() {
      try {
        const token = localStorage.getItem('admin_token')
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/auth/logs`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const data = await response.json()
          setLogs(data)
        }
      } catch (err) {
        console.error("Failed to fetch logs:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLogs()
  }, [])

  return (
    <div className="content-area">
      <div className="content-header">
        <div>
          <h2>Security Audits</h2>
          <p>Real-time login activity and geographical mapping</p>
        </div>
        <div className="breadcrumb">Dashboards &gt; Security &gt; Logs</div>
      </div>

      <div className="logs-card">
        <table className="logs-table">
          <thead>
            <tr>
              <th>User</th>
              <th>IP Address</th>
              <th>Location (Lat/Long)</th>
              <th>Time &amp; Date</th>
              <th>Device</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No login records found.</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <div className="log-user-info">
                      <span className="log-username">{log.name}</span>
                      <span className="log-email">{log.email}</span>
                    </div>
                  </td>
                  <td className="log-text-muted">{log.ipAddress}</td>
                  <td>
                    <span className="log-badge badge-location">
                      {log.location}
                    </span>
                  </td>
                  <td className="log-text-muted">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="log-text-muted">{log.device}</td>
                  <td>
                    <span className={log.status === 'FAILED' ? "log-badge badge-status-danger" : "log-badge badge-status-success"}>
                      {log.status || 'SUCCESS'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LoginLogsView
