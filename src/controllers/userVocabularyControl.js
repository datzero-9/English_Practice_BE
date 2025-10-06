import Vocabulary from '../models/vocabularyModel.js';
import UserVocabulary from '../models/userVocabularyModel.js';




export const markAsMemorized = async (req, res) => {
  console.log(req.body);
  try {
    const { userId, vocabId } = req.body;

    if (!userId || !vocabId)
      return res.status(400).json({ message: 'Thiếu userId hoặc vocabId', status: false });

    let record = await UserVocabulary.findOne({ userId, vocabId });
    if (record) {
      record.isMemorized = true;
      record.reviewCount += 1;
      record.lastReviewed = new Date();
      await record.save();
      res.json({ message: 'Bạn đã thuộc từ này trước đây...', status: true });

    } else {
      await UserVocabulary.create({
        userId,
        vocabId,
        isMemorized: true,
        reviewCount: 1,
        lastReviewed: new Date(),

      });
    }

    res.status(200).json({ message: 'Đã đánh dấu là ĐÃ THUỘC', status: true });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', status: false });
  }
};

export const unmarkAsMemorized = async (req, res) => {
  try {
    const { userId, vocabId } = req.body;
    if (!userId || !vocabId)
      return res.status(400).json({ message: "Thiếu userId hoặc vocabId", status: false });

    const record = await UserVocabulary.findOne({ userId, vocabId });
    if (!record)
      return res.status(404).json({ message: "Không tìm thấy từ này trong danh sách học", status: false });

    record.isMemorized = false;
    await record.save();

    res.status(200).json({ message: "Đã chuyển từ này sang CHƯA THUỘC", status: true });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", status: false });
  }
};


export const getAllVocabulariesByUser = async (req, res) => {
  // console.log(req.params.id);
  try {
    const userId = req.params.id;

    if (!userId)
      return res.status(400).json({ message: "Thiếu userId", status: false });

    // 1️⃣ Lấy danh sách vocabId mà user đã thuộc
    const memorizedRecords = await UserVocabulary.find({
      userId,
      isMemorized: true,
    }).select("vocabId");

    const memorizedIds = memorizedRecords.map((r) => r.vocabId);

    // 2️⃣ Lấy chi tiết các từ đã thuộc
    const memorized = await Vocabulary.find({ _id: { $in: memorizedIds } });

    // 3️⃣ Lấy các từ chưa thuộc
    const unmemorized = await Vocabulary.find({
      _id: { $nin: memorizedIds },
    }).sort({ createdAt: 1 });

    // 4️⃣ Trả về kết quả gộp
    return res.status(200).json({
      message: "Lấy danh sách từ ĐÃ và CHƯA thuộc thành công",
      memorizedCount: memorized.length,
      unmemorizedCount: unmemorized.length,
      data: {
        memorized,
        unmemorized,
      },
      status: true,
    });
  } catch (err) {
    console.error("❌ Lỗi getAllVocabulariesByUser:", err);
    res.status(500).json({ message: "Lỗi server", status: false });
  }
};



