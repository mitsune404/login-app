const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  companyName: { 
    type: String 
  },
  website: { 
    type: String 
  },
  age: { 
    type: Number 
  },
  // Security questions
  securityAnswer1: { 
    type: String, 
    required: true 
  },
  securityAnswer2: { 
    type: String, 
    required: true 
  },
  securityAnswer3: { 
    type: String, 
    required: true 
  },
  // otp related
  otp: { 
    type: String 
  },
  otpExpiry: { 
    type: Date 
  },
  otpAttempts: { 
    type: Number, 
    default: 0 
  },
  otpVerified: { 
    type: Boolean, 
    default: false 
  }
});

// pre save hook to hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);
