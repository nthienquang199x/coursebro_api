const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  course_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  course_level: DataTypes.STRING,
  course_salary: DataTypes.DECIMAL(10, 2),
  course_icon: DataTypes.STRING,
  job_desc: DataTypes.TEXT,
  companies_hiring: DataTypes.TEXT,
  jobs_open: DataTypes.INTEGER
}, { timestamps: false });

module.exports = Course;
