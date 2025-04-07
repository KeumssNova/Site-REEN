const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  roles: { // Changement ici : rôles sous forme de tableau
    type: [String],
    enum: ['admin', 'user', 'BOT_MANAGER'],
    default: ['user']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('User', userSchema);