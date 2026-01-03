const express = require('express');
const cors = require('cors');
const connectdb = require('./config/db');
const taskRoutes = require('./route/taskRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());


connectdb();


app.use('/api/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.send("To-Do API is running ✅");
});


const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => {
    console.log("Server is running successfully");
    console.log(`http://localhost:${PORT}`);
});



module.exports = {app , server} ;