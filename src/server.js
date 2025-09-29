// ✅ Cú pháp import theo ES Module
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import ViewEngine from './config/viewEngine.js';
import router from './routers/web.js';

// Khởi tạo biến môi trường
dotenv.config();

const app = express();
const port = process.env.PORT || 80;
const hostname = process.env.HOST_NAME;
const mongodb = process.env.MONGODB_URL;

// Kết nối MongoDB
async function connect() {
  try {
    await mongoose.connect(mongodb);
    console.log('Kết nối thành công');
  } catch (error) {
    console.log('Kết nối thất bại:', error);
  }
}
connect();


// Cho phép CORS
app.use(cors());
app.use(express.json());
// Sử dụng router
app.use('/api', router);

// Chạy server
app.listen(port, () => {
  console.log(`Đang chạy tại http://${hostname}:${port}`);
});
