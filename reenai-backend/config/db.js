const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Supprime les options
    console.log('MongoDB Connecté...');
    mongoose.set('debug', true);
  } catch (err) {
    console.error('Erreur connexion:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;