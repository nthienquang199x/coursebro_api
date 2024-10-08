// Load environment variables from .env file
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,        
  process.env.DB_USER,        
  process.env.DB_PASSWORD,    
  {
    host: process.env.DB_HOST,    
    port: process.env.DB_PORT,    
    dialect: process.env.DB_DIALECT,  
    logging: false,               
    pool: {
      max: 5,                      
      min: 0,                      
      acquire: 30000,              
      idle: 10000                  
    }
  }
);

// Test the connection to the database
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
