const User = require('../models/User');
const getMongoCollection = (collectionName) => {
  return req.app.locals.mongoClient.db().collection(collectionName);
};



// Codes HTTP précis :

// 200 : Succès

// 403 : Interdit (non-admin)

// 404 : Non trouvé

// 500 : Erreur serveur

exports.getAllUsers = async (req, res) => {
    try {
      
      const usersCollection = getMongoCollection('users');
      const users = await usersCollection.find(
        {},
        { projection: { password: 0 } // Exclut le password
      }).toArray();

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