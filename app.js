require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
//dotenv.config();


const app = express();
app.use(express.json());

//Import routes
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/api/weather', weatherRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});