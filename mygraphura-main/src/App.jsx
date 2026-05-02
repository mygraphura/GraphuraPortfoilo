import { useEffect, useMemo, useRef, useState } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Topbar from './components/Topbar/Topbar'
import ProjectListView from './components/ProjectListView/ProjectListView'
import CreateProjectView from './components/CreateProjectView/CreateProjectView'
import AdminProfileView from './components/AdminProfileView/AdminProfileView'
import LoginLogsView from './components/LoginLogsView/LoginLogsView'
import AnnouncementsView from './components/AnnouncementsView/AnnouncementsView'
import ManageReelsView from './components/ManageReelsView/ManageReelsView'
import ManageVideosView from './components/ManageVideosView/ManageVideosView'
import LoginView from './components/Auth/LoginView'
import SignupView from './components/Auth/SignupView'
import ForgotPasswordView from './components/Auth/ForgotPasswordView'
import AnalyticsView from './components/AnalyticsView/AnalyticsView'
import { HomePage } from './screens/HomePage'
import { ProjectPage } from './screens/ProjectPage'
import { ProjectDetailView } from './screens/ProjectDetailView/ProjectDetailView'
import { NotFoundPage } from './screens/NotFoundPage/NotFoundPage'
import './App.css'

const PROFILE_STORAGE_KEY = 'admin_profile_dashboard_v1'
const SKILL_OPTIONS = ['UI/UX', 'Figma', 'HTML', 'CSS', 'JavaScript', 'C#', 'Node.js']
const CATEGORY_OPTIONS = ['Designing', 'Development', 'Marketing', 'Research']
const STATUS_OPTIONS = ['Private', 'Team', 'Public']

function defaultProfile() {
  return {
    name: 'Anna Adame',
    role: 'Owner & Founder',
    location: 'California, United States',
    company: 'Themesbrand',
    followers: '24.3K',
    following: '1.3K',
    twitter: '@anna_adame',
    github: 'anna-adame',
    linkedin: 'anna.adame',
  }
}

function getStoredProfile() {
  const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY)
  if (!raw) {
    return defaultProfile()
  }

  try {
    const parsed = JSON.parse(raw)
    return {
      ...defaultProfile(),
      ...parsed,
    }
  } catch {
    return defaultProfile()
  }
}

function emptyForm() {
  return {
    title: '',
    slug: '',
    description: '',
    status: 'Private',
    category: 'Designing',
    skills: [], // Stores objects { text, icon }
    thumbnail: '',
    thumbnailName: '',
    extraImages: [],
    reactions_like: 0,
    reactions_love: 0,
    reactions_fire: 0,
    seoTitle: '',
    metaDescription: '',
    metaKeywords: '',
    liveDemoUrl: '',
    tagline: '',
    contactNumber: '',
    detailedDescription: '',
    thumbnailAlt: '',
    overviewImage: { url: '', alt: '' },
    detailedDescriptionImage: { url: '', alt: '' },
    liveDemoUrl: '',
    externalProjectLink: '',
  }
}

function toDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Unable to read file'))
    reader.readAsDataURL(file)
  })
}

function getUpdatedLabel(isoDate) {
  if (!isoDate) return 'Updated recently'
  const now = new Date()
  const updated = new Date(isoDate)
  if (isNaN(updated.getTime())) return 'Updated recently'
  
  const diffMs = now - updated
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHr / 24)

  if (diffSec < 60) return 'Updated Just now'
  if (diffMin < 60) return `Updated ${diffMin} min${diffMin > 1 ? 's' : ''} ago`
  if (diffHr < 24) return `Updated ${diffHr} hr${diffHr > 1 ? 's' : ''} ago`
  if (diffDays === 1) return 'Updated Yesterday'
  return `Updated ${diffDays} days ago`
}

function getFilterDateDays(filter) {
  if (filter === 'today') {
    return 0
  }
  if (filter === 'yesterday') {
    return 1
  }
  if (filter === 'this-week') {
    return 7
  }
  return null
}

function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function EditProjectWrapper({ 
  form, setForm, error, handleSaveProject, closeCreatePage, 
  handleThumbnailChange, handleExtraImagesChange, removeExtraImage, 
  toggleSkill, applyDescriptionFormat, CATEGORY_OPTIONS, 
  STATUS_OPTIONS, SKILL_OPTIONS, descriptionRef, onDelete
}) {
  const { id } = useParams()
  return (
    <CreateProjectView
      form={form}
      setForm={setForm}
      error={error}
      onSubmit={(e) => handleSaveProject(e, id)}
      onCancel={closeCreatePage}
      onThumbnailChange={handleThumbnailChange}
      onExtraImagesChange={handleExtraImagesChange}
      onRemoveExtraImage={removeExtraImage}
      onToggleSkill={toggleSkill}
      onApplyDescriptionFormat={applyDescriptionFormat}
      categoryOptions={CATEGORY_OPTIONS}
      statusOptions={STATUS_OPTIONS}
      skillOptions={SKILL_OPTIONS}
      descriptionRef={descriptionRef}
      editingId={id}
      onDelete={onDelete}
    />
  )
}

function App() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024)
  const [sidebarVisible, setSidebarVisible] = useState(() => window.innerWidth > 1024)
  const [projects, setProjects] = useState([])
  const [activities, setActivities] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [reels, setReels] = useState([])
  const [videos, setVideos] = useState([])
  const [profile, setProfile] = useState(() => getStoredProfile())
  const [admins, setAdmins] = useState([])
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [form, setForm] = useState(() => emptyForm())
  const [error, setError] = useState('')
  const [tick, setTick] = useState(0)
  const descriptionRef = useRef(null)
  const wasMobileRef = useRef(window.innerWidth <= 1024)
  
  const navigate = useNavigate()
  const location = useLocation()
  const view = location.pathname.split('/')[2] || 'list'

  // Enforce JWT Session limits (2 hours) globally for dashboard routes
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard')) {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        navigate('/login')
        return
      }
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp * 1000 < Date.now()) {
          // Token expired (2 hours limit reached)
          localStorage.removeItem('admin_token')
          navigate('/login')
        } else {
          // Dynamically seed Profile with Real DB Data
          setProfile(prev => ({
            ...prev, 
            name: payload.name || prev.name,
            email: payload.email || prev.email
          }))
        }
      } catch (e) {
        localStorage.removeItem('admin_token')
        navigate('/login')
      }
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const token = localStorage.getItem('admin_token')
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/projects`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        } else if (response.status === 401) {
          localStorage.removeItem('admin_token')
          navigate('/login')
        }
      } catch (err) {
        console.error("Backend not running or error fetching projects:", err)
      }
    }
    
    async function fetchActivities() {
      try {
        const token = localStorage.getItem('admin_token')
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/activities`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const data = await response.json()
          setActivities(data)
        }
      } catch (err) {
        console.error("Error fetching activities:", err)
      }
    }

    async function fetchAnnouncements() {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/announcements`)
        if (response.ok) {
          const data = await response.json()
          setAnnouncements(data)
        }
      } catch (err) {
        console.error("Error fetching announcements:", err)
      }
    }

    async function fetchReels() {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/reels`)
        if (response.ok) setReels(await response.json())
      } catch (err) { console.error("Error", err) }
    }

    async function fetchVideos() {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/videos`)
        if (response.ok) setVideos(await response.json())
      } catch (err) { console.error("Error", err) }
    }

    if (location.pathname.startsWith('/dashboard')) {
      fetchProjects()
      fetchActivities()
      fetchAnnouncements()
      fetchAdmins()
      fetchReels()
      fetchVideos()
    } else if (location.pathname === '/') {
      fetchProjects()
      fetchAnnouncements()
      fetchReels()
      fetchVideos()
    }
  }, [location.pathname, navigate])

  async function fetchAdmins() {
    try {
      const token = localStorage.getItem('admin_token')
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
      const response = await fetch(`${API_URL}/auth/admins`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setAdmins(data)
      }
    } catch (err) {
      console.error("Error fetching admins:", err)
    }
  }

  useEffect(() => {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 1024
      setIsMobile(mobile)

      if (wasMobileRef.current !== mobile) {
        setSidebarVisible(!mobile)
        wasMobileRef.current = mobile
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(timer)
  }, [])

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase()
    const dateRange = getFilterDateDays(dateFilter)
    const now = Date.now()

    if (!Array.isArray(projects)) return []

    return projects
      .filter((project) => {
        const title = project.title || ''
        const desc = project.description || ''
        const matchesSearch =
          title.toLowerCase().includes(term) ||
          desc.toLowerCase().includes(term)

        if (!matchesSearch) {
          return false
        }

        if (dateRange === null) {
          return true
        }

        const updatedDate = project.updatedAt ? new Date(project.updatedAt).getTime() : 0
        const diffDays = Math.floor(
          (now - updatedDate) / (24 * 60 * 60 * 1000),
        )

        return dateRange === 0 ? diffDays === 0 : diffDays <= dateRange
      })
      .sort((a, b) => {
        if (a.starred !== b.starred) {
          return Number(b.starred) - Number(a.starred)
        }
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
  }, [projects, search, dateFilter, tick])

  const openCreatePage = () => {
    setError('')
    setForm(emptyForm())
    navigate('/dashboard/create')
  }

  const openEditPage = (project) => {
    setError('')
    setForm({
      title: project.title,
      slug: project.slug || '',
      description: project.description,
      status: project.status || 'Private',
      category: project.category || 'Designing',
      skills: Array.isArray(project.skills) ? project.skills.map(s => typeof s === 'string' ? { text: s, icon: '✨' } : s) : [],
      thumbnail: project.thumbnail || '',
      thumbnailName: project.thumbnail ? 'Uploaded image' : '',
      extraImages: project.extraImages || [],
      reactions_like: project.reactions?.like || 0,
      reactions_love: project.reactions?.love || 0,
      reactions_fire: project.reactions?.fire || 0,
      seoTitle: project.seoTitle || '',
      metaDescription: project.metaDescription || '',
      metaKeywords: project.metaKeywords || '',
      liveDemoUrl: project.liveDemoUrl || '',
      tagline: project.tagline || '',
      contactNumber: project.contactNumber || '',
      detailedDescription: project.detailedDescription || '',
      thumbnailAlt: project.thumbnailAlt || '',
      overviewImage: project.overviewImage || { url: '', alt: '' },
      detailedDescriptionImage: project.detailedDescriptionImage || { url: '', alt: '' },
      liveDemoUrl: project.liveDemoUrl || '',
      externalProjectLink: project.externalProjectLink || '',
    })
    navigate(`/dashboard/edit/${project.id}`)
  }

  const closeCreatePage = () => {
    navigate('/dashboard')
    setError('')
  }

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem('admin_token')
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
      await fetch(`${API_URL}/projects/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setProjects((prev) => prev.filter((project) => project.id !== id))
    } catch (err) {
      console.error("Failed to delete project:", err)
    }
  }

  const toggleStar = async (id) => {
    const project = projects.find(p => p.id === id)
    if (!project) return
    const updatedStatus = !project.starred

    try {
      const token = localStorage.getItem('admin_token')
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
      await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ starred: updatedStatus, updatedAt: new Date().toISOString() })
      })
      setProjects((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, starred: updatedStatus, updatedAt: new Date().toISOString() } : p
        )
      )
    } catch (err) {
      console.error("Failed to toggle star:", err)
    }
  }

  const toggleSkill = (skill) => {
    setForm((prev) => {
      const exists = prev.skills.includes(skill)
      const nextSkills = exists
        ? prev.skills.filter((item) => item !== skill)
        : [...prev.skills, skill]

      return {
        ...prev,
        skills: nextSkills.length > 0 ? nextSkills : [skill],
      }
    })
  }

  const applyDescriptionFormat = (prefix, suffix = '') => {
    const textarea = descriptionRef.current
    if (!textarea) {
      return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const current = form.description
    const selection = current.slice(start, end) || 'text'
    const nextValue =
      current.slice(0, start) + prefix + selection + suffix + current.slice(end)

    setForm((prev) => ({ ...prev, description: nextValue }))
  }

  const handleThumbnailChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    try {
      const dataUrl = await toDataUrl(file)
      setForm((prev) => ({
        ...prev,
        thumbnail: dataUrl,
        thumbnailName: file.name,
      }))
    } catch {
      setError('Unable to read the selected image file.')
    }
  }

  const handleExtraImagesChange = async (event) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) {
      return
    }

    try {
      const uploads = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          url: await toDataUrl(file),
        })),
      )

      setForm((prev) => ({
        ...prev,
        extraImages: [...prev.extraImages, ...uploads],
      }))
      event.target.value = ''
    } catch {
      setError('Unable to read one or more selected image files.')
    }
  }

  const removeExtraImage = (index) => {
    setForm((prev) => ({
      ...prev,
      extraImages: prev.extraImages.filter((_, imageIndex) => imageIndex !== index),
    }))
  }

  const handleSaveProject = async (event, editingId = null) => {
    event.preventDefault()

    if (!form.title.trim() || !form.description.trim()) {
      setError('Project title and description are required.')
      return
    }

    const existingProject = editingId
      ? projects.find((project) => project.id === editingId)
      : null

    const payload = {
      title: form.title.trim(),
      slug: (form.slug || '').trim(),
      description: form.description.trim(),
      tasksDone: existingProject?.tasksDone ?? 0,
      tasksTotal: existingProject?.tasksTotal ?? 10,
      dueDate: existingProject?.dueDate ?? new Date().toISOString().slice(0, 10),
      team: existingProject?.team ?? ['NA'],
      updatedAt: new Date().toISOString(),
      status: form.status,
      category: form.category,
      skills: form.skills,
      thumbnail: form.thumbnail,
      extraImages: form.extraImages,
      reactions: {
        like: Number(form.reactions_like) || 0,
        love: Number(form.reactions_love) || 0,
        fire: Number(form.reactions_fire) || 0,
      },
      seoTitle: (form.seoTitle || '').trim(),
      metaDescription: (form.metaDescription || '').trim(),
      metaKeywords: (form.metaKeywords || '').trim(),
      liveDemoUrl: (form.liveDemoUrl || '').trim(),
      tagline: (form.tagline || '').trim(),
      contactNumber: (form.contactNumber || '').trim(),
      detailedDescription: (form.detailedDescription || '').trim(),
      thumbnailAlt: (form.thumbnailAlt || '').trim(),
      overviewImage: form.overviewImage,
      detailedDescriptionImage: form.detailedDescriptionImage,
      liveDemoUrl: (form.liveDemoUrl || '').trim(),
      externalProjectLink: (form.externalProjectLink || '').trim(),
    }

    try {
      const token = localStorage.getItem('admin_token')
      const headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
      
      if (editingId) {
        const response = await fetch(`${API_URL}/projects/${editingId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload)
        })
        if (!response.ok) {
          const text = await response.text()
          throw new Error(text)
        }
        const updatedProj = await response.json()
        setProjects((prev) => prev.map((p) => p.id === editingId ? updatedProj : p))
      } else {
        const finalPayload = {
          ...payload,
          icon: payload.title[0].toUpperCase(),
          iconColor: '#e3effd',
          starred: false,
        }
        const response = await fetch(`${API_URL}/projects`, {
          method: 'POST',
          headers,
          body: JSON.stringify(finalPayload)
        })
        if (!response.ok) {
          const text = await response.text()
          throw new Error(text)
        }
        const newProj = await response.json()
        setProjects((prev) => [newProj, ...prev])
      }
      closeCreatePage()
    } catch (err) {
      setError('Failed to sync with backend database: ' + err.message)
    }
  }

  const handleReactToProject = async (projectId, type) => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
      const response = await fetch(`${API_URL}/projects/${projectId}/react`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      })
      if (response.ok) {
        const updated = await response.json()
        setProjects(prev => prev.map(p => p.id === projectId ? updated : p))
      }
    } catch (e) {
      console.error("Failed to react", e)
    }
  }

  if (location.pathname === '/') {
    return <HomePage announcements={announcements} projects={projects} reels={reels} videos={videos} onReact={handleReactToProject} />
  }

  if (location.pathname === '/project-page') {
    return <ProjectPage />
  }

  if (location.pathname.startsWith('/project/')) {
    return <ProjectDetailView />
  }

  if (location.pathname === '/login') {
    return <LoginView />
  }

  if (location.pathname === '/signup') {
    return <SignupView />
  }

  if (location.pathname === '/forgot-password') {
    return <ForgotPasswordView />
  }

  // Handle Public 404s before entering Dashboard shell
  const isDashboardRoute = location.pathname.startsWith('/dashboard')
  const validPublicRoutes = ['/', '/project-page', '/login', '/signup', '/forgot-password']
  const isProjectDetail = location.pathname.startsWith('/project/')
  
  if (!isDashboardRoute && !validPublicRoutes.includes(location.pathname) && !isProjectDetail) {
    return <NotFoundPage />
  }

  const handleChangePassword = async (currentPassword, newPassword) => {
    const token = localStorage.getItem('admin_token')
    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
    
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Failed to change password')
    }
    return data
  }

  return (
    <div className={`dashboard-shell ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
      <Sidebar
        isVisible={sidebarVisible}
      />

      {isMobile && sidebarVisible && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close menu"
          onClick={() => setSidebarVisible(false)}
        />
      )}

      <main className="main-panel">
        <Topbar
          view={view}
          search={search}
          onSearchChange={setSearch}
          onToggleSidebar={() => setSidebarVisible((prev) => !prev)}
          onOpenProfile={() => navigate('/dashboard/profile')}
          profileName={profile.name}
        />

        <Routes>
          <Route
            path="/dashboard/analytics"
            element={<AnalyticsView projects={projects} />}
          />
          <Route
            path="/dashboard"
            element={
              <ProjectListView
                filteredProjects={filteredProjects}
                search={search}
                dateFilter={dateFilter}
                onSearchChange={setSearch}
                onDateFilterChange={setDateFilter}
                onAddNew={openCreatePage}
                onToggleStar={toggleStar}
                onEdit={openEditPage}
                onDelete={deleteProject}
                getUpdatedLabel={getUpdatedLabel}
                formatDate={formatDate}
              />
            }
          />
          <Route
            path="/dashboard/create"
            element={
              <CreateProjectView
                form={form}
                setForm={setForm}
                error={error}
                onSubmit={(e) => handleSaveProject(e, null)}
                onCancel={closeCreatePage}
                onThumbnailChange={handleThumbnailChange}
                onExtraImagesChange={handleExtraImagesChange}
                onRemoveExtraImage={removeExtraImage}
                onToggleSkill={toggleSkill}
                onApplyDescriptionFormat={applyDescriptionFormat}
                categoryOptions={CATEGORY_OPTIONS}
                statusOptions={STATUS_OPTIONS}
                skillOptions={SKILL_OPTIONS}
                descriptionRef={descriptionRef}
                editingId={null}
              />
            }
          />
          <Route
            path="/dashboard/edit/:id"
            element={<EditProjectWrapper 
              form={form}
              setForm={setForm}
              error={error}
              handleSaveProject={handleSaveProject}
              closeCreatePage={closeCreatePage}
              handleThumbnailChange={handleThumbnailChange}
              handleExtraImagesChange={handleExtraImagesChange}
              removeExtraImage={removeExtraImage}
              toggleSkill={toggleSkill}
              applyDescriptionFormat={applyDescriptionFormat}
              CATEGORY_OPTIONS={CATEGORY_OPTIONS}
              STATUS_OPTIONS={STATUS_OPTIONS}
              SKILL_OPTIONS={SKILL_OPTIONS}
              descriptionRef={descriptionRef}
              onDelete={deleteProject}
            />}
          />
          <Route
            path="/dashboard/profile"
            element={
              <AdminProfileView 
                projects={projects}
                activities={activities}
                profile={profile}
                admins={admins}
                onSaveProfile={setProfile}
                onChangePassword={handleChangePassword}
              />
            }
          />
          <Route
            path="/dashboard/reels"
            element={
              <ManageReelsView 
                reels={reels} 
                onCreate={async (form) => {
                  const token = localStorage.getItem('admin_token')
                  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
                  const response = await fetch(`${API_URL}/reels`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(form)
                  })
                  if(response.ok) {
                    const saved = await response.json()
                    setReels([saved, ...reels])
                  }
                }}
                onDelete={async (id) => {
                  const token = localStorage.getItem('admin_token')
                  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
                  const response = await fetch(`${API_URL}/reels/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                  })
                  if(response.ok) {
                    setReels(reels.filter(r => r.id !== id))
                  }
                }}
              />
            }
          />
          <Route
            path="/dashboard/videos"
            element={
              <ManageVideosView 
                videos={videos} 
                onCreate={async (form) => {
                  const token = localStorage.getItem('admin_token')
                  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
                  const response = await fetch(`${API_URL}/videos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(form)
                  })
                  if(response.ok) {
                    const saved = await response.json()
                    setVideos([saved, ...videos])
                  }
                }}
                onDelete={async (id) => {
                  const token = localStorage.getItem('admin_token')
                  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
                  const response = await fetch(`${API_URL}/videos/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                  })
                  if(response.ok) {
                    setVideos(videos.filter(r => r.id !== id))
                  }
                }}
              />
            }
          />
          <Route
            path="/dashboard/announcements"
            element={
              <AnnouncementsView 
                announcements={announcements} 
                onCreate={async (form) => {
                  const token = localStorage.getItem('admin_token')
                  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
                  const response = await fetch(`${API_URL}/announcements`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(form)
                  })
                  if(response.ok) {
                    const saved = await response.json()
                    setAnnouncements([saved, ...announcements])
                  }
                }}
                onDelete={async (id) => {
                  const token = localStorage.getItem('admin_token')
                  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
                  const response = await fetch(`${API_URL}/announcements/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                  })
                  if(response.ok) {
                    setAnnouncements(announcements.filter(a => a.id !== id))
                  }
                }}
                onToggle={async (id) => {
                  const token = localStorage.getItem('admin_token')
                  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
                  const response = await fetch(`${API_URL}/announcements/${id}/toggle`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}` }
                  })
                  if(response.ok) {
                    const updated = await response.json()
                    setAnnouncements(announcements.map(a => a.id === id ? updated : a))
                  }
                }}
              />
            }
          />
          <Route
            path="/dashboard/logs"
            element={<LoginLogsView />}
          />
          <Route
            path="/project-page"
            element={<ProjectPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
