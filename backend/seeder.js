const mongoose = require('mongoose');
require('dotenv').config();

const connectdb = require('./config/db');
const Task = require('./models/Task');

const seedTasks = async () => {
  try {
    // Connect to DB
    await connectdb();

    // Clear existing tasks
    await Task.deleteMany();
    console.log('Existing tasks removed');

    // Sample data
    const tasks = [
      {
        title: 'Learn Express.js',
        completed: false,
      },
      {
        title: 'Build To-Do API',
        completed: true,
      },
      {
        title: 'Connect MongoDB with Mongoose',
        completed: false,
      },
      {
        title: 'Test API using Postman',
        completed: false,
      },
    ];

    // Insert tasks
    await Task.insertMany(tasks);
    console.log('Tasks seeded successfully ✅');

    process.exit();
  } catch (error) {
    console.error('Seeding failed ❌');
    console.error(error);
    process.exit(1);
  }
};

seedTasks();
