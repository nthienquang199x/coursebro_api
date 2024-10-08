const Course = require('../models/course');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.update(req.body);
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.destroy();
      res.status(200).json({ message: 'Course deleted' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
