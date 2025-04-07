require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const { spawn } = require('child_process'); // Pour exécuter le bot en arrière-plan
const router = express.Router(); // Instancier un routeur express

// Configuration
const config = {
  username: process.env.DB_USER || 'salymdc',
  password: process.env.DB_PASS || 'motdepasse',
  cluster: process.env.DB_CLUSTER || 'reenai-db.6aafrxa.mongodb.net',
  dbName: process.env.DB_NAME || 'reenai-db'
};

// URI de connexion
const uri = `mongodb+srv://${encodeURIComponent(config.username)}:${encodeURIComponent(config.password)}@${config.cluster}/${config.dbName}?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`;

// Initialisation Express
const app = express();
app.use(cors());
app.use(express.json());

// Connexion double (Mongoose + MongoDB Native)
async function connectDatabases() {
  try {
    // 1. Connexion Mongoose (pour les schémas)
    await mongoose.connect(uri, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    console.log('✅ Mongoose connecté');

    // 2. Connexion Native Driver (pour les opérations avancées)
    const client = new MongoClient(uri, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    await client.connect();
    console.log('✅ MongoDB Native Driver connecté');
    
    // Stocke la connexion dans app.locals
    app.locals.mongoClient = client;
    
    // Test de connexion
    await client.db().command({ ping: 1 });
    console.log('🏓 Ping MongoDB réussi');

  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    process.exit(1);
  }
}

// Middleware de vérification de connexion
app.use((req, res, next) => {
  if (!app.locals.mongoClient) {
    return res.status(503).json({ message: 'Service indisponible' });
  }
  req.mongoClient = app.locals.mongoClient;
  next();
});

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL de votre front
  credentials: true
}));

// Routes
console.log("✅ Chargement des routes...")
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

// Démarrage
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`\n🚀 Server prêt sur le port ${PORT}`);
  await connectDatabases();
});

// Gestion propre de la fermeture
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  await app.locals.mongoClient?.close();
  process.exit(0);
});

let botProcess = null; // Déclare une variable pour stocker le processus du bot

// Route pour démarrer le bot manuellement
router.post('/start-bot', async (req, res) => {
  try {
    // On exécute le fichier du bot en arrière-plan
    botProcess = spawn('node', ['./bot/index.js']);  // Modifie le chemin si nécessaire

    botProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    botProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    botProcess.on('close', (code) => {
      console.log(`Bot terminé avec le code ${code}`);
    });

    res.status(200).send('Bot démarré');
  } catch (error) {
    console.error('Erreur lors du démarrage du bot:', error);
    res.status(500).send('Erreur lors du démarrage du bot');
  }
});

// Route pour arrêter le bot manuellement
router.post('/stop-bot', (req, res) => {
  if (botProcess) {
    botProcess.kill('SIGINT'); // Envoie le signal d'arrêt du processus
    res.status(200).send('Bot arrêté');
  } else {
    res.status(400).send('Aucun bot en cours d\'exécution');
  }
});

app.use('/api/bot', router);  // Utiliser le routeur avec le préfixe /api/bot



module.exports = router;
