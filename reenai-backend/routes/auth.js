const express = require('express');
const router = express.Router(); // Crée un nouveau routeur Express
const authController = require('../controllers/auth'); // Importe les fonctions

// Associe une route HTTP à une fonction du contrôleur
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/test', (req, res) => {
    res.send("✅ Route test OK");
  });
  

module.exports = router; // Exporte le routeur configuré