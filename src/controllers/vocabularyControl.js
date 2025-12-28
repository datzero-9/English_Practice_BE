import Vocabulary from '../models/vocabularyModel.js';

// Thêm từ vào kho
export const addVocabulary = async (req, res) => {
  try {
    const { english, vietnamese, exampleEn, exampleVi, createdById } = req.body;
    if (!english || !createdById) return res.status(400).json({ status: false, message: "Thiếu dữ liệu" });

    const newWord = await Vocabulary.create({ english, vietnamese, exampleEn, exampleVi, createdById });
    res.status(201).json({ status: true, message: "Thêm thành công", vocabulary: newWord });
  } catch (err) {
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

// Lấy từ ngẫu nhiên (Join với User để lấy Avatar người tạo)
export const getRandomVocabularies = async (req, res) => {
  try {
    const size = parseInt(req.query.size) || 20;
    const items = await Vocabulary.aggregate([
      { $sample: { size: size } }, // Random thật sự
      {
        $lookup: {
          from: 'users',
          localField: 'createdById',
          foreignField: 'uid',
          as: 'creatorInfo'
        }
      },
      { $unwind: { path: '$creatorInfo', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          english: 1, vietnamese: 1, exampleEn: 1, exampleVi: 1, createdById: 1,
          createdByName: { $ifNull: ['$creatorInfo.name', 'Ẩn danh'] },
          createdByAvatar: '$creatorInfo.photoURL'
        }
      }
    ]);
    res.status(200).json({ status: true, data: items });
  } catch (err) {
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

export const deleteVocabulary = async (req, res) => {
    try {
        const { id, createdById } = req.body;
        const vocab = await Vocabulary.findById(id);
        if (!vocab) return res.status(404).json({ status: false, message: "Không tìm thấy" });
        if (String(vocab.createdById) !== String(createdById)) return res.status(403).json({ status: false, message: "Không có quyền xóa" });
        
        await vocab.deleteOne();
        res.status(200).json({ status: true, message: "Đã xóa" });
    } catch (err) {
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
}