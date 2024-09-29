const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  username: {
	type: String,
	required: true,
	unique: true,
	trim: true
  },
  email: {
	type: String,
	required: true,
	unique: true,
	trim: true
  },
  password: {
	type: String,
	required: true
  },
  createdAt: {
	type: Date,
	default: Date.now
  },
  updatedAt: {
	type: Date,
	default: Date.now
  }
});

// Middleware to update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = UserModel;