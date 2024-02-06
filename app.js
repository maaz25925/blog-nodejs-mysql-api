const express = require('express');
const app = express();
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/images', imageRoutes);

module.exports = app;
