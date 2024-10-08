const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware'); // Import auth middleware

const router = express.Router();

router.post('/:user_id/courses', authenticateToken, userController.addCourseToUser);

router.get('/:user_id/courses/progress', authenticateToken, userController.getUserCourseProgress);

router.put('/:user_id/courses/:course_id/progress', authenticateToken, userController.updateUserCourseProgress);

module.exports = router;
