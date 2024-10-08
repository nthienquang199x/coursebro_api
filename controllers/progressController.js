const Progress = require('../models/progress');
const Lesson = require('../models/lesson');
const User = require('../models/user');

// Create or Update progress for a specific lesson and user
exports.trackProgress = async (req, res) => {
  try {
    
    const { userId, progressPercentage } = req.body;
    const lessonId = req.params.id;

    const lesson = await Lesson.findByPk(lessonId);
    const user = await User.findByPk(userId);

    if (!lesson || !user) {
      return res.status(404).json({ message: 'Lesson or User not found' });
    }

    const [progress, created] = await Progress.findOrCreate({
      where: { lesson_id: lessonId, user_id: userId },
      defaults: {
        lesson_id: lessonId,
        user_id: userId,
        progress_percentage: progressPercentage,
      },
    });

    if (!created) {
      progress.progress_percentage = progressPercentage;
      await progress.save();
    }

    res.status(200).json({ message: 'Progress updated successfully', progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all progress for a specific user across all lessons
exports.getProgressByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const progress = await Progress.findAll({ where: { user_id: userId } });

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get progress for a specific user in a specific lesson
exports.getProgressByLessonAndUser = async (req, res) => {
  try {
    const { lesson_id, user_id } = req.params;

    const lesson = await Lesson.findByPk(lesson_id);
    const user = await User.findByPk(user_id);

    if (!lesson || !user) {
      return res.status(404).json({ message: 'Lesson or User not found' });
    }

    const progress = await Progress.findOne({
      where: {
        lesson_id: lesson_id,
        user_id: user_id,
      },
    });

    if (progress) {
      res.status(200).json(progress);
    } else {
      res.status(404).json({ message: 'Progress not found for the specified lesson and user' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
