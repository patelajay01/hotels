const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  work:{
    type: String,
    required: true,
    enum: ['chef', 'waiter', 'manager'],
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  address: {
    type: String,
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt
  toJSON: {
    transform: function(doc, ret) {
      // ret is the JSON object before sending response

      // Convert createdAt and updatedAt to IST string format
      if (ret.createdAt) {
        ret.createdAt = ret.createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      }
      if (ret.updatedAt) {
        ret.updatedAt = ret.updatedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      }
      return ret;
    }
  }
});

// Model create karo
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
