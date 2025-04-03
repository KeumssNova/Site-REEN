// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connexion à la BDD
// connectDB();

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/admin', require('./routes/admin'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`le serveur est sur le port ${PORT}`));

// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connecté à MongoDB Atlas"))
//   .catch(err => console.log("❌ Erreur de connexion", err));

// const { MongoClient, ServerApiVersion } = require('mongodb');

// // Configuration (à remplacer par process.env en production)
// const config = {
//   username: 'salymdc',
//   password: 'motdepasse',
//   cluster: 'reenai-db.6aafrxa.mongodb.net',
//   dbName: 'reenai-db'
// };

// // URI finale avec encodage sécurisé
// const uri = `mongodb+srv://${encodeURIComponent(config.username)}:${encodeURIComponent(config.password)}@${config.cluster}/${config.dbName}?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
//   connectTimeoutMS: 10000,  // 10 secondes timeout
//   socketTimeoutMS: 45000    // 45 secondes timeout
// });

// async function run() {
//   try {
//     await client.connect();
    
//     // Test 1: Vérification basique
//     await client.db().command({ ping: 1 });
//     console.log('✅ Connexion établie avec succès');

//     // Test 2: Vérification des accès
//     const db = client.db(config.dbName);
//     const collections = await db.listCollections().toArray();
//     console.log(`📂 Collections disponibles (${collections.length}) :`, collections.map(c => c.name));

//   } catch (error) {
//     console.error('❌ Erreur critique :', error.message);
    
//     // Diagnostic automatique
//     if (error.message.includes('bad auth')) {
//       console.log('🔐 Problème d\'authentification :');
//       console.log('- Vérifiez le nom d\'utilisateur/mot de passe dans Atlas');
//       console.log('- Vérifiez que l\'utilisateur a les droits "readWrite" sur la base');
//     } else if (error.message.includes('ENOTFOUND')) {
//       console.log('🌐 Problème réseau :');
//       console.log('- Vérifiez votre connexion Internet');
//       console.log('- Essayez avec l\'URI alternative :');
//       console.log(`mongodb://${config.username}:${config.password}@reenai-db-shard-00-00.6aafrxa.mongodb.net:27017,reenai-db-shard-00-01.6aafrxa.mongodb.net:27017,reenai-db-shard-00-02.6aafrxa.mongodb.net:27017/${config.dbName}?ssl=true&replicaSet=atlas-6aafrxa-shard-0&authSource=admin`);
//     }
//   } finally {
//     await client.close();
//   }
// }

// run();

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

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