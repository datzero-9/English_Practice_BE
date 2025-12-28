import mongoose from 'mongoose';

const userVocabularySchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true }, // UID của User
  vocabId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary', required: true },
  
  isMemorized: { type: Boolean, default: false }, 
  reviewCount: { type: Number, default: 0 },
  lastReviewed: { type: Date, default: null },
}, { timestamps: true });

// Index kép để tránh trùng lặp
userVocabularySchema.index({ userId: 1, vocabId: 1 }, { unique: true });

export default mongoose.model('UserVocabulary', userVocabularySchema);