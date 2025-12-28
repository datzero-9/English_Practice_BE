import UserVocabulary from '../models/userVocabularyModel.js';
import Vocabulary from '../models/vocabularyModel.js';

// Đánh dấu thuộc
export const markAsMemorized = async (req, res) => {
  try {
    const { userId, vocabId } = req.body;
    await UserVocabulary.findOneAndUpdate(
      { userId, vocabId },
      { $set: { isMemorized: true, lastReviewed: new Date() }, $inc: { reviewCount: 1 } },
      { upsert: true, new: true }
    );
    res.status(200).json({ status: true, message: "Đã đánh dấu thuộc" });
  } catch (err) {
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

// Bỏ đánh dấu thuộc
export const unmarkAsMemorized = async (req, res) => {
  try {
    const { userId, vocabId } = req.body;
    await UserVocabulary.findOneAndUpdate({ userId, vocabId }, { $set: { isMemorized: false } });
    res.status(200).json({ status: true, message: "Đã bỏ thuộc" });
  } catch (err) {
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

// Lấy từ vựng của User (Chia 2 loại: Đã thuộc & Chưa thuộc)
export const getAllVocabulariesByUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    
    // 1. Lấy list ID đã thuộc
    const memorizedRecords = await UserVocabulary.find({ userId, isMemorized: true }).select('vocabId').lean();
    const memorizedIds = memorizedRecords.map(r => r.vocabId);

    // 2. Query song song
    const [memorized, unmemorized] = await Promise.all([
      Vocabulary.find({ _id: { $in: memorizedIds } }).lean(),
      Vocabulary.find({ _id: { $nin: memorizedIds } }).limit(50).lean() // Lấy 50 từ chưa thuộc để học
    ]);

    res.status(200).json({ status: true, data: { memorized, unmemorized } });
  } catch (err) {
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

// 🔥 API BXH: Đếm số từ đã thuộc
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await UserVocabulary.aggregate([
      { $match: { isMemorized: true } }, // Chỉ đếm từ đã thuộc
      { $group: { _id: "$userId", score: { $sum: 1 } } }, // Gom nhóm theo user, đếm số lượng
      { $sort: { score: -1 } }, // Sắp xếp giảm dần
      { $limit: 20 }, // Lấy top 20
      {
        $lookup: { // Lấy info User
          from: "users",
          localField: "_id",
          foreignField: "uid",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          uid: "$_id",
          name: "$userInfo.name",
          avatar: "$userInfo.photoURL",
          score: 1
        }
      }
    ]);
    res.status(200).json({ status: true, data: leaderboard });
  } catch (err) {
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};