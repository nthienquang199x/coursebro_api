const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./course'); // Assuming Course model exists and is correctly defined

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true // Optional field
  },
  your_city: {
    type: DataTypes.STRING(100),
    allowNull: true // Optional field
  },
  course_taken: {
    type: DataTypes.INTEGER,
    allowNull: true, // User may not be enrolled in a course at the time
    references: {
      model: Course, // Refers to the Course model
      key: 'course_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL' // If the course is deleted, set course_taken to NULL
  },
  progress_percentage: {
    type: DataTypes.INTEGER,
    allowNull: true, // May not have any progress initially
    defaultValue: 0 // Default value for progress is 0%
  }
}, {
  tableName: 'users',
  timestamps: false // Automatically adds createdAt and updatedAt fields
});

// Establishing the association with the Course model
User.belongsTo(Course, { foreignKey: 'course_taken' });

module.exports = User;
