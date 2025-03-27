const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// inscription
exports.register = async (req, res) => {
  try {
    // 1. Récupère les données du body
    const { email, password } = req.body;

    // 2. Vérifie si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // 3. Hash le mot de passe (avec bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Crée l'utilisateur en BDD
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // 5. Renvoie une réponse
    res.status(201).json({ message: "Compte créé" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// connexion
exports.login = async (req, res) => {
  try {
    // 1. Cherche l'utilisateur par email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // 2. Compare les mots de passe hashés
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // 3. Génère un token JWT (session sécurisée)
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Données embarquées
      process.env.JWT_SECRET, // Clé secrète
      { expiresIn: "24h" } // Expiration
    );

    // 4. Renvoie le token
    res.json({ userId: user._id, token });
    
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connecté à MongoDB"))
    .catch(err => console.error("❌ Erreur MongoDB:", err.message));

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
