// src/controllers/UserController.js
import User from '../models/user.js'; // model mới đã cập nhật uid, name, email, photoURL

// @desc: Thêm người dùng từ client sau khi đăng nhập Firebase
export const createOrUpdateUser = async (req, res) => {
    try {
        const { uid, name, email, photoURL } = req.body;
        console.log("Received user data:", req.body);
        if (!uid || !email) {
            return res.status(400).json({ message: 'Thiếu uid hoặc email', status: false });
        }

        let user = await User.findOne({ uid });

        if (user) {
            // Nếu user đã tồn tại → có thể cập nhật thêm info nếu muốn
            user.name = name || user.name;
            user.photoURL = photoURL || user.photoURL;
            await user.save();
            return res.status(200).json({ message: 'Đã cập nhật người dùng', user, status: true });
        } else {
            // Tạo mới user
            const newUser = new User({ uid, name, email, photoURL });
            await newUser.save();
            console.log("Tạo thành công")
            return res.status(201).json({ message: 'Tạo người dùng thành công', user: newUser, status: true });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Lỗi server', status: false });
    }
};

// @desc: Lấy thông tin user theo uid (nếu cần)
export const getUserInfo = async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy user', status: false });
        }
        return res.status(200).json({ user, status: true });
    } catch (err) {
        return res.status(500).json({ message: 'Lỗi server', status: false });
    }
};

