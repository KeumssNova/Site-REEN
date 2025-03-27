const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// Middleware d'authentification et de vérification de rôle
const { authenticate, isAdmin } = require('../middleware/auth');


// Route protégée par authentification
router.get('/users', authenticate, isAdmin, adminController.getAllUsers);

router.get('/test', (req, res) => res.send("Route admin test OK"));

module.exports = router;