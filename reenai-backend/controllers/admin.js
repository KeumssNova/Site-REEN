const User = require('../models/User');

// Codes HTTP précis :

// 200 : Succès

// 403 : Interdit (non-admin)

// 404 : Non trouvé

// 500 : Erreur serveur

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};