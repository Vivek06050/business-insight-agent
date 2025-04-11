const mongoose = require('mongoose');

const savedQuerySchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  chartData: {
    type: Object, 
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('SavedQuery', savedQuerySchema);
