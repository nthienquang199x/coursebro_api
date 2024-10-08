const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./course'); // Assuming Course model exists and is correctly defined

const Lesson = sequelize.define('Lesson', {
  lesson_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course, // Refers to the Course model
      key: 'course_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  lesson_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  lesson_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lesson_icon: {
    type: DataTypes.STRING(255), // This can be a URL or file path
    allowNull: true // Optional field
  },
  lesson_date: {
    type: DataTypes.DATEONLY, // Can store only the date (e.g., 2024-09-30)
    allowNull: false
  },
  lesson_order: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'lessons', // Explicit table name
  timestamps: false // Adds createdAt and updatedAt fields automatically
});

// Establish association between Lesson and Course models
Lesson.belongsTo(Course, { foreignKey: 'course_id' });

module.exports = Lesson;
