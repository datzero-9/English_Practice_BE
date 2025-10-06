import express from 'express';
import { createOrUpdateUser, getUserInfo } from '../controllers/userControl.js';
import { addVocabulary, getRandomVocabularies, deleteVocabulary } from '../controllers/vocabularyControl.js';
import {  markAsMemorized,getAllVocabulariesByUser,unmarkAsMemorized } from '../controllers/userVocabularyControl.js';

const router = express.Router();

// Route POST - thêm hoặc cập nhật user
router.post('/user', createOrUpdateUser);
router.get('/user/:uid', getUserInfo);


//Vocabulary

router.post('/addVocabulary', addVocabulary);
router.get('/getRandomVocabularies', getRandomVocabularies);
router.post('/deleteVocabulary', deleteVocabulary);

router.get('/getAllVocabulariesByUser/:id', getAllVocabulariesByUser);
router.post('/markAsMemorized', markAsMemorized);
router.post('/unmarkAsMemorized', unmarkAsMemorized);


export default router;
