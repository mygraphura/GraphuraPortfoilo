import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  project: { type: String, required: true, trim: true },
  type: { type: String, enum: ['cloudinary', 'youtube'], required: true },
  videoUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

videoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
