import mongoose from 'mongoose';

const vocabularySchema = new mongoose.Schema({
  english: { type: String, required: true },
  vietnamese: { type: String, required: true },
  exampleEn: { type: String },
  exampleVi: { type: String },
  createdById: { type: String, required: true },  
  createdByName: { type: String },               
  createdAt: { type: Date, default: Date.now }        
});

export default mongoose.model('Vocabulary', vocabularySchema);
