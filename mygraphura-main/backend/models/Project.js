import mongoose from 'mongoose';

const extraImageSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String },
  alt: { type: String }
}, { _id: false });

const skillSchema = new mongoose.Schema({
  text: { type: String },
  icon: { type: String, default: '✨' }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  tagline: { type: String },
  contactNumber: { type: String },
  
  description: { type: String, required: true }, 
  overviewImage: {
    url: { type: String },
    alt: { type: String }
  },

  detailedDescription: { type: String },
  detailedDescriptionImage: {
    url: { type: String },
    alt: { type: String }
  },

  icon: { type: String, default: 'P' },
  iconColor: { type: String, default: '#f3e7c9' },
  dueDate: { type: String },
  tasksDone: { type: Number, default: 0 },
  tasksTotal: { type: Number, default: 0 },
  starred: { type: Boolean, default: false },
  team: { type: [String], default: [] },
  status: { type: String, enum: ['Private', 'Team', 'Public'], default: 'Private' },
  category: { type: String, default: 'Designing' },
  
  skills: { type: [skillSchema], default: [] }, // Advanced Key Points
  
  thumbnail: { type: String },
  thumbnailName: { type: String },
  thumbnailAlt: { type: String },
  
  extraImages: { type: [extraImageSchema], default: [] },

  reactions: {
    like: { type: Number, default: 0 },
    love: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
  },
  seoTitle: { type: String },
  metaDescription: { type: String },
  metaKeywords: { type: String },
  
  liveDemoUrl: { type: String },
  externalProjectLink: { type: String },
  views: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now }
}, { timestamps: true });

projectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
