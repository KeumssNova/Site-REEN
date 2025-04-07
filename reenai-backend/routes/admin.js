const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// Appliquer le rôle 'admin' via authorizeRoles
router.get('/users', authenticate, authorizeRoles(['admin']), adminController.getAllUsers);
router.delete('/users/:id', authenticate, authorizeRoles(['admin']), adminController.deleteUser);
router.put('/users/:id/role', authenticate, authorizeRoles(['admin']), adminController.updateUserRole);

module.exports = router;
