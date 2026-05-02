import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, default: '' },
  category: { type: String, enum: ['Offer', 'Achievement', 'New'], required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

announcementSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
