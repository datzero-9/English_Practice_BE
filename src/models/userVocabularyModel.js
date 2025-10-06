import mongoose from 'mongoose';

const userVocabularySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  vocabId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary', required: true },
  isMemorized: { type: Boolean, default: false }, 
  lastReviewed: { type: Date, default: null },
  reviewCount: { type: Number, default: 0 },
});

userVocabularySchema.index({ userId: 1, vocabId: 1 }, { unique: true });

export default mongoose.model('UserVocabulary', userVocabularySchema);
