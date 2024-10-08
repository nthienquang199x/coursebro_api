const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lesson = require('./lesson');

const LessonContent = sequelize.define('LessonContent', {
  content_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  lesson_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Lesson,
      key: 'lesson_id'
    }
  },
  content_text: DataTypes.TEXT,
  content_video: DataTypes.TEXT,
  content_type: DataTypes.STRING,
  content_order: DataTypes.INTEGER
}, { timestamps: false });

Lesson.hasMany(LessonContent, { foreignKey: 'lesson_id' });
LessonContent.belongsTo(Lesson, { foreignKey: 'lesson_id' });

module.exports = LessonContent;
