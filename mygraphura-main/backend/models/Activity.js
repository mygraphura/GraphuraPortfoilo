import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['PROJECT', 'SECURITY', 'SYSTEM', 'OTHER'], default: 'OTHER' },
}, { timestamps: true });

activitySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
