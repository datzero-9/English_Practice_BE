import express from 'express';
import { createOrUpdateUser, getUserInfo } from '../controllers/user.js';

const router = express.Router();

// Route POST - thêm hoặc cập nhật user
router.post('/user', createOrUpdateUser);

// Route GET - lấy thông tin user theo UID
router.get('/user/:uid', getUserInfo);

export default router;
