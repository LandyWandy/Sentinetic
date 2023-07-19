const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://Droobie:yelooD13@cluster0.9popvnh.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connection successful;');
  }) .then(() => {
    console.log(`Server running at ${res.url}`);
  })

module.exports = mongoose.connection;
