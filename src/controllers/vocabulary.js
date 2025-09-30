// ✅ @desc: Thêm từ vựng mới
import Vocabulary from '../models/vocabulary.js';

export const addVocabulary = async (req, res) => {
    try {
        const { english, vietnamese, exampleEn, exampleVi, createdById, createdByName } = req.body;

        if (!english || !vietnamese || !createdById) {
            return res.status(400).json({ message: 'Thiếu dữ liệu bắt buộc', status: false });
        }

        const newWord = new Vocabulary({
            english,
            vietnamese,
            exampleEn,
            exampleVi,
            createdById,
            createdByName
        });

        await newWord.save();
        return res.status(201).json({ message: 'Đã thêm từ vựng mới', vocabulary: newWord, status: true });
    } catch (err) {
        console.error("Lỗi thêm từ vựng:", err);
        return res.status(500).json({ message: 'Lỗi server khi thêm từ vựng', status: false });
    }
};


export const getRandomVocabularies = async (req, res) => {
  try {
    const sizeParam = parseInt(req.query.size, 10);
    const hasSize = !Number.isNaN(sizeParam) && sizeParam > 0;

    // Sắp xếp theo cũ nhất -> mới nhất (ưu tiên createdAt, fallback _id nếu cần)
    const sortOrder = { createdAt: 1, _id: 1 };

    let query = Vocabulary.find({}).sort(sortOrder).lean();

    if (hasSize) {
      query = query.limit(sizeParam);
    }

    const items = await query;
    const total = await Vocabulary.countDocuments({});

    return res.status(200).json({
      message: hasSize
        ? `Lấy ${items.length} từ vựng cũ nhất thành công`
        : 'Lấy toàn bộ từ vựng (cũ nhất trước) thành công',
      status: true,
      total,          // tổng số từ trong CSDL
      count: items.length, // số lượng trả về
      data: items,
    });
  } catch (err) {
    console.error('Lỗi lấy từ vựng:', err);
    return res.status(500).json({ message: 'Lỗi server khi lấy dữ liệu', status: false });
  }
};