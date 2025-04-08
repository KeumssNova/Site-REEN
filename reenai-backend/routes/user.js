const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload'); // multer

// Récupérer le profil
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userData.userId).select('pseudo email photo');
        console.log("Chemin de la photo de profil:", user.photo);
        res.status(200).json(user);
    } catch (err) {
        console.error('Erreur lors de la récupération du profil :', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Mettre à jour le profil
router.post('/profile', authenticate, upload.single('photo'), async (req, res) => {
    try {
        const { pseudo, email } = req.body;
        const updateData = { pseudo, email };

        if (req.file) {
            updateData.photo = `/uploads/profile_pictures/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.userData.userId,
            updateData,
            { new: true }
        );

        console.log('Photo enregistrée :', updateData.photo);
        console.log("URL photo envoyée au frontend:", user.photo);
        res.status(200).json({ message: 'Profil mis à jour', user: updatedUser });
    } catch (err) {
        console.error('Erreur mise à jour profil :', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});


router.delete('/profile/photo', authenticate, async (req, res) => {
    try {
      const user = await User.findById(req.userData.userId);
      if (user.photo) {
        // 🔁 supprimer le fichier si tu veux aussi en local (fs.unlink)
        user.photo = '';
        await user.save();
      }
      res.status(200).json({ message: 'Photo supprimée' });
    } catch (err) {
      console.error('Erreur suppression photo :', err);
      res.status(500).json({ message: "Erreur lors de la suppression de la photo" });
    }
  });
  

module.exports = router;
