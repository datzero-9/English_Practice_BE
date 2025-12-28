import mongoose from 'mongoose';

const vocabularySchema = new mongoose.Schema({
  english: { type: String, required: true },
  vietnamese: { type: String, required: true },
  exampleEn: String,
  exampleVi: String,
  // Chỉ lưu ID người tạo
  createdById: { type: String, required: true, ref: 'User' }, 
}, { timestamps: true });

export default mongoose.model('Vocabulary', vocabularySchema);