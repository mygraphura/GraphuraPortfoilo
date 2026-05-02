import mongoose from 'mongoose';

const loginLogSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  ipAddress: { type: String, required: true },
  location: { type: String, default: 'Unknown' },
  device: { type: String, required: true },
  status: { type: String, default: 'SUCCESS' },
}, { timestamps: true });

loginLogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

const LoginLog = mongoose.model('LoginLog', loginLogSchema);
export default LoginLog;
