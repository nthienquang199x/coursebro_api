const express = require('express');
const lessonContentController = require('../controllers/lessonContentController');

const router = express.Router();

router.get('/lessons/:id', lessonContentController.getContentByLesson);

router.post('/lessons/:id', lessonContentController.addContentToLesson);

router.put('/:id', lessonContentController.updateContent);

router.delete('/:id', lessonContentController.deleteContent);

module.exports = router;
