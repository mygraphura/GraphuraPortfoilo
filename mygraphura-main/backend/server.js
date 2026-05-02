import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import Project from './models/Project.js';
import Admin from './models/Admin.js';
import LoginLog from './models/LoginLog.js';
import Activity from './models/Activity.js';
import Announcement from './models/Announcement.js';
import Reel from './models/Reel.js';
import Video from './models/Video.js';
// Load environment variables
dotenv.config(); // Try loading from current directory (.env)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// If not found in current directory, try parent (for local development structure)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '200mb' })); // Increased limit for base64 images and videos

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphura_marketplace';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB 👍'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Helper: Process Base64 images to Cloudinary URLs
const processImagesToCloudinary = async (projectData) => {
  // Fallback to base64 saving if Cloudinary is not configured yet
  if (!process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY.includes('your_api_key')) {
    console.log("⚠️ Cloudinary not configured. Skipped image processing (using Base64 directly).");
    return projectData;
  }

  if (projectData.thumbnail && projectData.thumbnail.startsWith('data:image')) {
    const uploadRes = await cloudinary.uploader.upload(projectData.thumbnail, { folder: 'graphura' });
    projectData.thumbnail = uploadRes.secure_url;
  }
  
  if (projectData.extraImages && Array.isArray(projectData.extraImages)) {
    projectData.extraImages = await Promise.all(projectData.extraImages.map(async (img) => {
      if (img.url && img.url.startsWith('data:image')) {
        const uploadRes = await cloudinary.uploader.upload(img.url, { folder: 'graphura' });
        return { ...img, url: uploadRes.secure_url };
      }
      return img;
    }));
  }
  return projectData;
};

// Helper: Process Base64 reels to Cloudinary URLs
const processReelToCloudinary = async (reelData) => {
  if (!process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY.includes('your_api_key')) {
     return reelData;
  }
  
  if (reelData.posterBase64 && reelData.posterBase64.startsWith('data:image')) {
     const uploadRes = await cloudinary.uploader.upload(reelData.posterBase64, { folder: 'graphura/reels' });
     reelData.posterUrl = uploadRes.secure_url;
  }

  if (reelData.videoBase64 && reelData.videoBase64.startsWith('data:video')) {
     const uploadRes = await cloudinary.uploader.upload(reelData.videoBase64, { 
         resource_type: "video",
         folder: 'graphura/reels' 
     });
     reelData.videoUrl = uploadRes.secure_url;
  }

  return reelData;
};

// Helper: Process Base64 videos to Cloudinary URLs
const processVideoToCloudinary = async (videoData) => {
  // Always try to upload poster if provided (both for YT and Cloudinary types)
  if (videoData.posterBase64 && videoData.posterBase64.startsWith('data:image')) {
     if (process.env.CLOUDINARY_API_KEY && !process.env.CLOUDINARY_API_KEY.includes('your_api_key')) {
         const uploadRes = await cloudinary.uploader.upload(videoData.posterBase64, { folder: 'graphura/videos' });
         videoData.posterUrl = uploadRes.secure_url;
     }
  }

  // Upload video file if type is cloudinary
  if (videoData.type === 'cloudinary' && videoData.videoBase64 && videoData.videoBase64.startsWith('data:video')) {
     if (process.env.CLOUDINARY_API_KEY && !process.env.CLOUDINARY_API_KEY.includes('your_api_key')) {
         const uploadRes = await cloudinary.uploader.upload(videoData.videoBase64, { 
             resource_type: "video",
             folder: 'graphura/videos' 
         });
         videoData.videoUrl = uploadRes.secure_url;
     }
  }

  return videoData;
};

// Helper: Log Admin Activities
const logActivity = async (text, type) => {
  try {
    const activity = new Activity({ text, type });
    await activity.save();
  } catch (err) {
    console.error("Activity logging error:", err);
  }
};

// Routes

// Middleware: Authenticate Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided!' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, secretKey, password } = req.body;
    
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ message: 'Invalid Admin Secret Key' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    const admin = new Admin({ name, email, password });
    await admin.save();
    
    // Create token on registration to auto-login
    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '2h' }
    );

    res.status(201).json({ message: 'Account created successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, location, clientIp } = req.body;
    
    // Helper to log attempts
    const logAttempt = async (userEmail, userName, status) => {
      try {
        const ip = clientIp || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
        const device = req.headers['user-agent'] || 'Unknown Device';
        const parsedLocation = location || (ip.includes('127.0') || ip.includes('::1') ? 'Localhost' : 'Global IP Node');
        
        const newLog = new LoginLog({
          email: userEmail,
          name: userName,
          ipAddress: ip,
          device: device,
          location: parsedLocation,
          status: status
        });
        await newLog.save();
      } catch (err) {
        console.error("Failed to record log:", err);
      }
    };

    const admin = await Admin.findOne({ email });
    if (!admin) {
      await logAttempt(email, 'Unknown User', 'FAILED');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      await logAttempt(email, admin.name, 'FAILED');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Success Authentication
    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '2h' }
    );

    // Record Success
    await logAttempt(admin.email, admin.name, 'SUCCESS');
    await logActivity(`Admin ${admin.name} logged in successfully`, 'SECURITY');

    res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// Fetch all administrators (Protected)
app.get('/api/auth/admins', authenticateToken, async (req, res) => {
  try {
    const admins = await Admin.find({}, '-password');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins' });
  }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      // Return 200 even if not found to prevent email enumeration
      return res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
    }

    const resetToken = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '15m' }
    );

    const resetLink = `http://localhost:5174/reset-password?token=${resetToken}`;
    
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${process.env.BREVO_SENDER_NAME || 'Graphura Admin'}" <${process.env.BREVO_SENDER_EMAIL || 'noreply@graphura.in'}>`,
      to: admin.email,
      subject: 'Graphura Admin: Password Reset Request',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Hello ${admin.name},</p>
          <p>Someone has requested a password reset for your Graphura Marketplace Admin account.</p>
          <p>If this was you, click the link below to reset your password (valid for 15 minutes):</p>
          <a href="${resetLink}" style="display:inline-block; padding:10px 20px; background:#c8a84b; color:#111; text-decoration:none; border-radius:5px;">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during password reset', error: error.message });
  }
});

app.get('/api/auth/logs', async (req, res) => {
  try {
    const logs = await LoginLog.find().sort({ createdAt: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching security logs' });
  }
});

app.put('/api/auth/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const admin = await Admin.findOne({ email: req.user.email });
    if (!admin) return res.status(404).json({ message: 'User not found' });

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

    admin.password = newPassword;
    await admin.save();
    
    await logActivity(`Admin ${admin.name} successfully updated their password`, 'SECURITY');

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating password', error: error.message });
  }
});

app.get('/api/activities', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(50);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching activities' });
  }
});

// --- Project Routes ---
// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ updatedAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching projects' });
  }
});

// Get a single project by ID or Slug
app.get('/api/projects/:param', async (req, res) => {
  try {
    const { param } = req.params;
    let project;
    
    // Check if valid MongoDB ID
    if (mongoose.Types.ObjectId.isValid(param)) {
      project = await Project.findById(param);
    }
    
    // If not found by ID, try fetching by slug
    if (!project) {
      project = await Project.findOne({ slug: param });
    }

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching project details' });
  }
});

// Create a new project
app.post('/api/projects', async (req, res) => {
  try {
    const processedData = await processImagesToCloudinary(req.body);
    const newProject = new Project(processedData);
    const savedProject = await newProject.save();

    await logActivity(`Created a new project: "${savedProject.title}"`, 'PROJECT');

    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error saving project', error: error.message });
  }
});

// Increment view count (Public)
app.post('/api/projects/:id/view', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { 
        $inc: { views: 1 },
        lastActive: new Date()
      },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ views: project.views });
  } catch (error) {
    res.status(500).json({ message: 'Error updating views' });
  }
});

// Store live sessions in memory (for real-time counting)
let liveSessions = {}; // { sessionId: { projectId, lastPing } }

// Real-time Heartbeat (Public - Multi-user)
app.post('/api/projects/:id/heartbeat', async (req, res) => {
  try {
    const { sessionId } = req.body;
    const projectId = req.params.id;
    
    if (sessionId) {
      liveSessions[sessionId] = { projectId, lastPing: Date.now() };
    }

    // Also update the project's lastActive for backward compatibility
    await Project.findByIdAndUpdate(projectId, { lastActive: new Date() });
    
    res.json({ status: 'active' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating heartbeat' });
  }
});

// Get Live Counts (Public)
app.get('/api/analytics/live-counts', (req, res) => {
    // Clean up expired sessions (older than 40s)
    const now = Date.now();
    Object.keys(liveSessions).forEach(sid => {
        if (now - liveSessions[sid].lastPing > 40000) {
            delete liveSessions[sid];
        }
    });

    const counts = {};
    Object.values(liveSessions).forEach(session => {
        counts[session.projectId] = (counts[session.projectId] || 0) + 1;
    });

    res.json(counts);
});

// React to a project
app.put('/api/projects/:id/react', async (req, res) => {
  try {
    const { type } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    if (['like', 'love', 'fire'].includes(type)) {
      if (!project.reactions) {
        project.reactions = { like: 0, love: 0, fire: 0 };
      }
      project.reactions[type] = (project.reactions[type] || 0) + 1;
    } else {
      return res.status(400).json({ message: 'Invalid reaction type' });
    }
    
    const updated = await project.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating reaction' });
  }
});

// Update a project
app.put('/api/projects/:id', async (req, res) => {
  try {
    let processedData = req.body;
    // Only process images if there's actually a substantial payload
    // (Skips overhead for simple operations like toggling "starred")
    if (req.body.thumbnail || req.body.extraImages) {
        processedData = await processImagesToCloudinary(req.body);
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      processedData, 
      { new: true, runValidators: true }
    );
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });

    await logActivity(`Updated the project: "${updatedProject.title}"`, 'PROJECT');

    res.json(updatedProject);
  } catch (error) {
    console.error("PUT Error:", error);
    res.status(400).json({ message: 'Error updating project', error: error.message });
  }
});

// Delete a project
app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });

    await logActivity(`Deleted project: "${deletedProject.title}"`, 'PROJECT');

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// --- Announcement Routes ---
// Get all announcements
app.get('/api/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching announcements' });
  }
});

// Create announcement
app.post('/api/announcements', authenticateToken, async (req, res) => {
  try {
    const newAnnounce = new Announcement(req.body);
    const savedAnnounce = await newAnnounce.save();
    
    await logActivity(`Posted a new announcement: "${savedAnnounce.title}"`, 'SYSTEM');
    
    res.status(201).json(savedAnnounce);
  } catch (error) {
    res.status(400).json({ message: 'Error saving announcement' });
  }
});

// Toggle announcement active status
app.put('/api/announcements/:id/toggle', authenticateToken, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    
    // Support documents that don't have isActive explictily set gracefully
    announcement.isActive = announcement.isActive === false ? true : false;
    const updated = await announcement.save();
    
    await logActivity(`Toggled announcement "${updated.title}" to ${updated.isActive ? 'Active' : 'Inactive'}`, 'SYSTEM');
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling announcement' });
  }
});

// Delete announcement
app.delete('/api/announcements/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Announcement not found' });
    
    await logActivity(`Deleted announcement: "${deleted.title}"`, 'SYSTEM');
    
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting announcement' });
  }
});

// --- Reel Routes ---
app.get('/api/reels', async (req, res) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    res.json(reels);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching reels' });
  }
});

app.post('/api/reels', authenticateToken, async (req, res) => {
  try {
    const processedData = await processReelToCloudinary(req.body);
    const newReel = new Reel(processedData);
    const savedReel = await newReel.save();
    
    await logActivity(`Added a new Reel: "${savedReel.title}"`, 'PROJECT');
    
    res.status(201).json(savedReel);
  } catch (error) {
    console.error("Error saving reel:", error);
    res.status(400).json({ message: 'Error saving reel', error: error.message });
  }
});

app.delete('/api/reels/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Reel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Reel not found' });
    
    await logActivity(`Deleted reel: "${deleted.title}"`, 'PROJECT');
    
    res.json({ message: 'Reel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reel' });
  }
});

// --- Video Routes ---
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching videos' });
  }
});

app.post('/api/videos', authenticateToken, async (req, res) => {
  try {
    const processedData = await processVideoToCloudinary(req.body);
    const newVideo = new Video(processedData);
    const savedVideo = await newVideo.save();
    
    await logActivity(`Added a new Project Video: "${savedVideo.title}"`, 'PROJECT');
    
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error("Error saving video:", error);
    res.status(400).json({ message: 'Error saving video', error: error.message });
  }
});

app.delete('/api/videos/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Video.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Video not found' });
    
    await logActivity(`Deleted video: "${deleted.title}"`, 'PROJECT');
    
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Graphura API running on http://localhost:${PORT}`));
