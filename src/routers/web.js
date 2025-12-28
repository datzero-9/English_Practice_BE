import express from 'express';
import { createOrUpdateUser, getUserInfo } from '../controllers/userControl.js';
import { addVocabulary, getRandomVocabularies, deleteVocabulary } from '../controllers/vocabularyControl.js';
import { markAsMemorized, getAllVocabulariesByUser, unmarkAsMemorized, getLeaderboard } from '../controllers/userVocabularyControl.js';

const router = express.Router();

router.post('/user', createOrUpdateUser);
router.get('/user/:uid', getUserInfo);

router.post('/addVocabulary', addVocabulary);
router.get('/getRandomVocabularies', getRandomVocabularies);
router.post('/deleteVocabulary', deleteVocabulary);

router.get('/getAllVocabulariesByUser/:id', getAllVocabulariesByUser);
router.post('/markAsMemorized', markAsMemorized);
router.post('/unmarkAsMemorized', unmarkAsMemorized);

// Route mới cho BXH
router.get('/leaderboard', getLeaderboard);

export default router;