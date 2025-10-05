import express from 'express';
import { createOrUpdateUser, getUserInfo } from '../controllers/user.js';
import { addVocabulary,getRandomVocabularies,deleteVocabulary } from '../controllers/vocabulary.js';

const router = express.Router();

// Route POST - thêm hoặc cập nhật user
router.post('/user', createOrUpdateUser);
router.get('/user/:uid', getUserInfo);


//Vocabulary

router.post('/addVocabulary',addVocabulary);
router.get('/getRandomVocabularies',getRandomVocabularies);
router.post('/deleteVocabulary', deleteVocabulary);

export default router;
