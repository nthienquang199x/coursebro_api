const User = require('../models/user');
const Course = require('../models/course');
const Progress = require('../models/progress');

// Add a course to the user's profile
exports.addCourseToUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const { courseId } = req.body;

    const user = await User.findByPk(userId);
    const course = await Course.findByPk(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or Course not found' });
    }

    user.course_taken = courseId;
    await user.save();

    res.status(200).json({ message: `Course added to user profile`, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve the user's progress across all courses
exports.getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.params.user_id;

    const user = await User.findByPk(userId, {
      include: [{
        model: Course,
        as: 'courses',
        through: { attributes: [] } // Many-to-many relationships (optional)
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const progress = await Progress.findAll({
      where: { user_id: userId },
      include: [Course]
    });

    res.status(200).json({ user, progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user's progress in a specific course
exports.updateUserCourseProgress = async (req, res) => {
  try {
    const { user_id, course_id } = req.params;
    const { progressPercentage } = req.body;

    const user = await User.findByPk(user_id);
    const course = await Course.findByPk(course_id);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or Course not found' });
    }

    const [progress, created] = await Progress.findOrCreate({
      where: {
        user_id: user_id,
        course_id: course_id
      },
      defaults: {
        user_id: user_id,
        course_id: course_id,
        progress_percentage: progressPercentage
      }
    });

    if (!created) {
      progress.progress_percentage = progressPercentage;
      await progress.save();
    }

    res.status(200).json({ message: 'User progress updated', progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
