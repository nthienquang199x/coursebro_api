const express = require('express');
const lessonController = require('../controllers/lessonController');

const router = express.Router();

router.post('/course/:id', lessonController.addLesson);

router.get('/course/:id/', lessonController.getLessonsByCourse);

router.put('/:id', lessonController.updateLesson);

router.delete('/:id', lessonController.deleteLesson);

router.put('/lessons/:id/change-course', lessonController.changeCourse);

module.exports = router;
