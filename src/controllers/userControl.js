import User from '../models/userModel.js';

export const createOrUpdateUser = async (req, res) => {
  try {
    const { uid, name, email, photoURL } = req.body;
    if (!uid || !email) return res.status(400).json({ status: false, message: "Thiếu thông tin" });

    const user = await User.findOneAndUpdate(
      { uid },
      { name, email, photoURL },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ status: true, user });
  } catch (err) {
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid }).lean();
    if (!user) return res.status(404).json({ status: false, message: "User not found" });
    res.status(200).json({ status: true, user });
  } catch (err) {
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};