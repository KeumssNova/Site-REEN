// Codes HTTP précis :

// 200 : Succès

// 403 : Interdit (non-admin)

// 404 : Non trouvé

// 500 : Erreur serveur

const User = require('../models/User');

// GET - Récupérer tous les utilisateurs (Page admin seulement)
exports.getAllUsers = async (req, res) => {
  if (!req.userData || !req.userData.roles.includes('admin')) { 
    return res.status(403).json({ message: 'Accès interdit' });
  }

  try {
    const usersCollection = req.app.locals.mongoClient.db().collection('users');
    const users = await usersCollection.find({}, { projection: { password: 0 } }).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


// DELETE - Supprimer un utilisateur (admin seulement)
exports.deleteUser = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès interdit' });
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT - Modifier le rôle d'un utilisateur (admin seulement)
exports.updateUserRole = async (req, res) => {
  try {
    // Vérifier que l'utilisateur a un rôle admin
    if (!req.userData.roles || !req.userData.roles.includes('admin')) {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    const { role } = req.body;
    const allowedRoles = ['user', 'BOT_MANAGER', 'admin'];

    // Vérification si le rôle est valide
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    // Prévenir l'utilisateur de se retirer de son propre rôle admin
    if (req.params.id === req.userData.userId && role !== 'admin') {
      return res.status(400).json({ message: 'Vous ne pouvez pas vous retirer du rôle d\'admin' });
    }

    // Mise à jour du rôle
    const user = await User.findByIdAndUpdate(req.params.id, { roles: [role] }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json({ message: 'Rôle mis à jour' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

