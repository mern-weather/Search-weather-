const mongoose = require("mongoose");

// Create Schema

const WeatherPost = new mongoose.Schema({
  temperature: String,
  city: { type: String, required: true },
  description: String,
  iconLink: String,
  info: String,
  displayImages: {
    type: Array
  },
  date: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  coordinates: Array,
  email: String,
  errorImage: String
});

module.exports = mongoose.model("Post", WeatherPost);
