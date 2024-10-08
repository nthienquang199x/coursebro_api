const Lesson = require('../models/lesson');
const Course = require('../models/course');

// Create a new lesson for a specific course
exports.addLesson = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { lesson_name, lesson_description, lesson_icon, lesson_date, lesson_order } = req.body;

    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const newLesson = await Lesson.create({
      course_id: courseId,
      lesson_name,
      lesson_description,
      lesson_icon,
      lesson_date,
      lesson_order,
    });

    res.status(201).json({ message: 'Lesson created successfully', newLesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all lessons for a specific course
exports.getLessonsByCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const lessons = await Lesson.findAll({
      where: { course_id: courseId },
    });

    if (lessons.length === 0) {
      return res.status(404).json({ message: 'No lessons found for this course' });
    }

    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit an existing lesson
exports.updateLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const { lesson_name, lesson_description, lesson_icon, lesson_date, lesson_order } = req.body;

    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    lesson.lesson_name = lesson_name || lesson.lesson_name;
    lesson.lesson_description = lesson_description || lesson.lesson_description;
    lesson.lesson_icon = lesson_icon || lesson.lesson_icon;
    lesson.lesson_date = lesson_date || lesson.lesson_date;
    lesson.lesson_order = lesson_order || lesson.lesson_order;

    await lesson.save();

    res.status(200).json({ message: 'Lesson updated successfully', lesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific lesson
exports.deleteLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;

    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    await lesson.destroy();

    res.status(204).json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Move a lesson to a different course
exports.changeCourse = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const { newCourseId } = req.body;

    const lesson = await Lesson.findByPk(lessonId);
    const newCourse = await Course.findByPk(newCourseId);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    if (!newCourse) {
      return res.status(404).json({ message: 'New course not found' });
    }

    lesson.course_id = newCourseId;
    await lesson.save();

    res.status(200).json({ message: 'Lesson moved to new course successfully', lesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
