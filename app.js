const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const courseRoutes = require('./routes/courseRoute');
const lessonRoutes = require('./routes/lessonRoute');
const lessonContentRoutes = require('./routes/lessonContentRoute');
const userRoutes = require('./routes/userRoute');
const progressRoutes = require('./routes/progressRoute');
const authRoutes = require('./routes/authRoute');
require('dotenv').config(); // To load environment variables


// Create the Express app
const app = express();

// Allow CORS from the React frontend
// app.use(cors({
//   origin: 'https://main.d3ixo3lcv1bszw.amplifyapp.com',
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
//   credentials: true
// }));

// app.options('*',cors());

// Middleware
app.use(bodyParser.json());


// Routes
app.use('/api/auth', authRoutes);

app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/lesson-content', lessonContentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/progress', progressRoutes);


// Sync database models
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });


const PORT = process.env.PORT || 80000;

// Start the server
app.listen(PORT, () => {
  console.log('Server is running');
});
