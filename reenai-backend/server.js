require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const { spawn } = require('child_process'); // Pour exécuter le bot en arrière-plan
const router = express.Router(); // Instancier un routeur express
const path = require('path');
const jsdom = require('jsdom')
const {JSDOM} = jsdom;  
const axios = require('axios');


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
    botProcess = spawn('node', ['./bot/index.js']); 

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


const userRoutes = require('./routes/user'); //
app.use('/api/user', userRoutes);

// Applique CORS pour autoriser toutes les requêtes (ajuste selon tes besoins)
app.use(cors());

// Serve les fichiers du dossier uploads (photos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware pour afficher l'accès aux fichiers téléchargés dans la console (optionnel, pour déboguer)
app.use('/uploads', (req, res, next) => {
  console.log('Accès au dossier uploads:', req.url);
  next();
});

app.get('/api/auth/verify-token', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  // Vérifier le token avec code secret 
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }


    res.status(200).json({ message: 'Token valide', user: decoded });
  });
});

const fs = require('fs');

const NodeCache = require("node-cache");
const myCache = new NodeCache();
const fetch = require('node-fetch');

const fetchWithRetry = async (url, attempts = 3, delay = 2000) => {
  for (let i = 0; i < attempts; i++) {
    try {
      return await axios.get(url, { timeout: 7000 });
    } catch (err) {
      console.warn(`⏱️ Tentative ${i + 1} échouée pour ${url}`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error(`❌ Échec après ${attempts} tentatives pour ${url}`);
};

// Route principale
app.get('/api/articles', async (req, res) => {
  const filePath = path.join(__dirname, "./bot/output/ai_training_data.jsonl");

  fs.readFile(filePath, 'utf-8', async (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la lecture du fichier' });
    }

    const articles = data
      .split('\n')
      .filter(Boolean)
      .map(line => JSON.parse(line))
      .filter(article => article.title && article.source);

    const articlesWithImages = await Promise.all(articles.slice(-4).map(async (article) => {
      const cachedImage = myCache.get(article.source);
      if (cachedImage) {
        article.image = cachedImage;
        return article;
      }

      try {
        const response = await fetchWithRetry(article.source);
        const dom = new JSDOM(response.data);
        const image = dom.window.document.querySelector('img');

        article.image = image?.src || '/default-image.jpg';
        myCache.set(article.source, article.image, 3600); // cache 1h
      } catch (error) {
        console.error(`Erreur image (${article.title}):`, error.message);
        article.image = '/default-image.jpg';
      }

      return article;
    }));

    res.json(articlesWithImages);
  });
});

app.get('/api/all-articles', async (req, res) => {
  const filePath = path.join(__dirname, "./bot/output/ai_training_data.jsonl");

  fs.readFile(filePath, 'utf-8', async (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la lecture du fichier' });
    }

    const articles = data
      .split('\n')
      .filter(Boolean)
      .map(line => JSON.parse(line))
      .filter(article => article.title && article.source);

      
    // Ignorer les 10 premiers articles
    const articlesToProcess = articles.slice(10); 

    const articlesWithImages = await Promise.all(articlesToProcess.map(async (article) => {
      const cachedImage = myCache.get(article.source);
      if (cachedImage) {
        article.image = cachedImage;
        return article;
      }

      try {
        const response = await fetchWithRetry(article.source);
        const dom = new JSDOM(response.data);
        const image = dom.window.document.querySelector('img');

        article.image = image?.src || '/default-image.jpg';
        myCache.set(article.source, article.image, 3600); // Cache 1h
      } catch (error) {
        console.error(`Erreur image (${article.title}):`, error.message);
        article.image = '/default-image.jpg';
      }

      return article;
    }));

    res.json(articlesWithImages);
  });
});

module.exports = router;
