const LessonContent = require('../models/lessonContent');
const Lesson = require('../models/lesson');

// Retrieve content for a specific lesson
exports.getContentByLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;

    const content = await LessonContent.findAll({
      where: { lesson_id: lessonId },
    });

    if (content.length === 0) {
      return res.status(404).json({ message: 'No content found for this lesson' });
    }

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add new content to a specific lesson
exports.addContentToLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const { content_text, content_video, content_type, content_order } = req.body;

    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const newContent = await LessonContent.create({
      lesson_id: lessonId,
      content_text,
      content_type,
      content_order,
      content_video
    });

    res.status(201).json({ message: 'Content added successfully', newContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit specific content in a lesson
exports.updateContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const { content_text, content_video, content_type, content_order } = req.body;

    const content = await LessonContent.findByPk(contentId);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    content.content_text = content_text || content.content_text;
    content.content_type = content_type || content.content_type;
    content.content_order = content_order || content.content_order;
    content.content_video = content_video || "";

    await content.save();

    res.status(200).json({ message: 'Content updated successfully', content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete specific content from the database
exports.deleteContent = async (req, res) => {
  try {
    const contentId = req.params.id;

    const content = await LessonContent.findByPk(contentId);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    await content.destroy();

    res.status(204).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
