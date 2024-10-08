const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Lesson = require('./lesson');

const Progress = sequelize.define('Progress', {
  progress_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  lesson_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Lesson,
      key: 'lesson_id'
    }
  },
  progress_percentage: DataTypes.INTEGER
}, { timestamps: false });

User.hasMany(Progress, { foreignKey: 'user_id' });
Lesson.hasMany(Progress, { foreignKey: 'lesson_id' });

Progress.belongsTo(User, { foreignKey: 'user_id' });
Progress.belongsTo(Lesson, { foreignKey: 'lesson_id' });

module.exports = Progress;
