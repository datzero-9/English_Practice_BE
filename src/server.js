import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routers/web.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

// 1. Kết nối MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    process.exit(1);
  }
};
connectDB();

// 2. Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Router
app.use('/api', router);

// 4. Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});