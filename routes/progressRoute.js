const express = require('express');
const progressController = require('../controllers/progressController');

const router = express.Router();

router.post('/lessons/:id', progressController.trackProgress);

router.get('/user/:id', progressController.getProgressByUser);

router.get('/lessons/:lesson_id/:user_id', progressController.getProgressByLessonAndUser);

module.exports = router;
