const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation supplémentaire
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hash généré:', hashedPassword);

    // Création de l'utilisateur avec vérification
    const user = new User({ email, password: hashedPassword });
    await user.save();
    
    // Vérification rétroactive
    const verifyUser = await User.findById(user._id).select('+password');
    const isMatch = await bcrypt.compare(password, verifyUser.password);
    
    if (!isMatch) {
      await User.deleteOne({ _id: user._id });
      throw new Error("Échec de vérification post-enregistrement");
    }

    res.status(201).json({ message: "Compte créé avec succès" });

  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ message: error.message || "Erreur serveur" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: "Identifiants invalides" });

    console.log('Comparaison entre:');
    console.log('Mot de passe reçu:', password);
    console.log('Hash stocké:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Résultat comparaison:', isMatch);

    if (!isMatch) return res.status(401).json({ message: "Identifiants invalides" });

    res.json({ message: "Connexion réussie", user: { email: user.email, role: user.role } });

  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};