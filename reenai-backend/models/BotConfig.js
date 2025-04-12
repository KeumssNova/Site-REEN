const mongoose = require('mongoose');

// Schéma pour stocker les flux RSS, les mots-clés, et d'autres configurations
const botConfigSchema = new mongoose.Schema({
  rssFeeds: {
    type: [String], // Liste des liens des flux RSS
    default: [],
  },
  keywords: {
    type: Map,
    of: [String], // Chaque mot-clé aura une liste de liens associés
    default: {},
  },
  fetchInterval: {
    type: Number,
    default: 60000,  // Intervalle de récupération des flux RSS en ms (par exemple 60s)
  },
  maxEntriesPerFeed: {
    type: Number,
    default: 10,  // Nombre maximal d'articles par flux
  },
  includeContent: {
    type: Boolean,
    default: true,  // Inclure le contenu complet des articles
  },
  includeCategories: {
    type: Boolean,
    default: true,  // Inclure les catégories des articles
  },
  includePublishDate: {
    type: Boolean,
    default: true,  // Inclure la date de publication
  },
  extractFullContent: {
    type: Boolean,
    default: true,  // Extraire le contenu complet des articles
  },
  filterByKeywords: {
    type: Boolean,
    default: true,  // Filtrer les articles par mots-clés
  },
  keywordScoreThreshold: {
    type: Number,
    default: 10,  // Seuil du score des mots-clés pour filtrer les articles
  }
}, { timestamps: true });

module.exports = mongoose.model('BotConfig', botConfigSchema);
