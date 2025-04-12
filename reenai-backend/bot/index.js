const axios = require('axios');
const Parser = require('rss-parser');
const { JSDOM } = require('jsdom');
const fs = require('fs/promises');
const path = require('path');
const BotConfig = require('../models/BotConfig')

// Création des instances
const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['description', 'description']
    ]
  }
});

const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'ai_training_data.jsonl');

// URLs des flux RSS
const RSS_FEEDS = [
  'https://www.africaintelligence.fr/info/rss',
  'https://www.panapress.com/rss/',
  'https://feeds.feedburner.com/AfricaIntelligence-fr',
  'https://feeds.feedburner.com/IntelligenceOnline',
  "https://www.jeuneafrique.com/flux-rss/",
  " https://www.afdb.org/fr/flux-rss",
  " https://www.voaafrique.com/p/5740.html",
  "https://www.fakt-afrique.org/flux-rss/",
  "https://www.afriqueverte.org/flux-rss",
  "https://www.cirad.fr/rss",
  "https://www.africaintelligence.com/rss", // Africa Intelligence
  "http://www.rfi.fr/general/rss",
  "http://www.rfi.fr/afrique/rss",
  "http://www.rfi.fr/afrique/actu/rss"
];

const SITE_SELECTORS = {
  "default": {
    articleSelectors: ['.article', '.post'],
    paragraphSelector: 'p',
    minParagraphLength: 50
  }
};

const mongoose = require('mongoose');

const uri = "mongodb+srv://salymdc:motdepasse@reenai-db.6aafrxa.mongodb.net/?retryWrites=true&w=majority&appName=reenai-db";

mongoose.connect(uri)
  .then(() => {
    console.log('Connexion à MongoDB réussie');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err);
  });

// Fichier d'initialisation ou partie de code exécutée une seule fois
const botConfigData = {
  rssFeeds: RSS_FEEDS,
  keywords: {
    "keywords": {
      "politics": [
        "politique",
        "élections",
        "président",
        "gouvernement",
        "transition",
        "démocratie",
        "réforme",
        "loi",
        "parlement",
        "coup d'État"
      ],
      "Économie": [
        "économie",
        "investissement",
        "marché",
        "entreprise",
        "finances",
        "mines",
        "agriculture",
        "pétrole",
        "banque",
        "technologie"
      ],
      "Sécurité": [
        "sécurité",
        "armée",
        "terrorisme",
        "conflit",
        "militaire",
        "attaque",
        "djihadiste",
        "ONU",
        "casque bleu",
        "paix"
      ],
  
      "Éducation": [
        "éducation",
        "université",
        "étudiants",
        "formation",
        "jeunesse",
        "emploi",
        "culture",
        "langue",
        "société",
        "religion"
      ],
  
      "santé": [
        "santé",
        "hôpital",
        "maladie",
        "paludisme",
        "covid",
        "vaccin",
        "environnement",
        "climat",
        "eau",
        "biodiversité"
      ]
    },
  },

  fetchInterval: 60000,  // Intervalle de 60 secondes
  maxEntriesPerFeed: 10,
  includeContent: true,
  includeCategories: true,
  includePublishDate: true,
  extractFullContent: true,
  filterByKeywords: true,
  keywordScoreThreshold: 10,
};
  



async function initializeConfig() {
  const existingConfig = await BotConfig.findOne(); // Cherche une config existante

  if (!existingConfig) {
    const newConfig = new BotConfig(botConfigData);
    await newConfig.save();  // Sauvegarde dans MongoDB
    console.log('Configuration initialisée avec succès');
  } else {
    console.log('Une configuration existe déjà dans la base de données');
  }
}

initializeConfig();
  

// Charger la configuration dynamique
async function loadConfig() {
  const config = await BotConfig.findOne({}); // Charger la configuration depuis la base de données
  if (!config) {
    console.error('Configuration introuvable');
    return null;
  }
  return config;
}

let CONFIG = {};

async function getConfig() {
  const config = await loadConfig();
  if (config) {
    // Mettre à jour la configuration globale
    CONFIG.keywords = config.keywords;
    CONFIG.fetchInterval = config.fetchInterval;
    CONFIG.maxEntriesPerFeed = config.maxEntriesPerFeed;
    CONFIG.includeContent = config.includeContent;
    CONFIG.includeCategories = config.includeCategories;
    CONFIG.includePublishDate = config.includePublishDate;
    CONFIG.extractFullContent = config.extractFullContent;
    CONFIG.filterByKeywords = config.filterByKeywords;
    CONFIG.keywordScoreThreshold = config.keywordScoreThreshold;
  }
}

// Appeler la fonction pour charger la config et démarrer la récupération des flux
getConfig().then(() => {
  fetchFeedsWithDelay();
});

// Récupère et analyse un flux RSS
async function fetchRssFeed(feedUrl) {
  try {
    console.log(`Récupération du flux: ${feedUrl}`);
    const feed = await parser.parseURL(feedUrl);
    return feed.items.slice(0, CONFIG.maxEntriesPerFeed);
  } catch (error) {
    console.error(`Erreur lors de la récupération du flux ${feedUrl}:`, error.message);
    return [];
  }
}

const fetchFeedsWithDelay = () => {
  let delay = 0;

  RSS_FEEDS.forEach((url, index) => {
    setTimeout(async () => {
      const articles = await fetchAndProcessFeeds(url);
      console.log(`Articles récupérés pour ${url}:`, articles);
      // Traite les articles ici si nécessaire
    }, delay);

    // Augmente le délai avant le prochain appel
    delay += CONFIG.fetchInterval;
  });
};

// Extraction du contenu d'un article
async function extractArticleContent(url) {
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');
    
    const selectors = SITE_SELECTORS[domain] || SITE_SELECTORS['default'];
    
    let content = '';
    
    let articleElement = null;
    for (const selector of selectors.articleSelectors) {
      articleElement = document.querySelector(selector);
      if (articleElement) break;
    }
    
    if (articleElement) {
      const paragraphs = articleElement.querySelectorAll(selectors.paragraphSelector);
      paragraphs.forEach(p => {
        content += p.textContent + '\n\n';
      });
      
      if (!content.trim()) {
        content = articleElement.textContent;
      }
    } else {
      const paragraphs = document.querySelectorAll(selectors.paragraphSelector);
      paragraphs.forEach(p => {
        if (p.textContent.length > selectors.minParagraphLength) {
          content += p.textContent + '\n\n';
        }
      });
    }
    
    content = content.replace(/\s+/g, ' ').trim();
    
    console.log(`Site détecté: ${domain}, contenu extrait: ${content.length} caractères`);
    return content;
  } catch (error) {
    console.error(`Erreur lors de l'extraction du contenu de ${url}:`, error.message);
    return '';
  }
}

// Catégorisation et calcul des scores de mots-clés
function calculateKeywordScore(content) {
  if (!content) return { score: 0, categories: {} };
  
  const lowercaseText = content.toLowerCase();
  let totalScore = 0;
  const categories = Object.keys(CONFIG.keywords);
  
  CONFIG.keywords.forEach(keyword => {
    let keywordScore = (lowercaseText.match(new RegExp(keyword, 'g')) || []).length * keyword.length;
    totalScore += keywordScore;
    
    if (keywordScore > 0) {
      categories[keyword] = keywordScore;
    }
  });
  
  const finalScore = totalScore > CONFIG.keywordScoreThreshold ? totalScore : 0;
  return { score: finalScore, categories };
}

// Filtrage des articles selon le score de mots-clés
function filterArticleByKeywordScore(article) {
  const { score, categories } = calculateKeywordScore(article.content);
  
  if (score >= CONFIG.keywordScoreThreshold) {
    article.score = score;
    article.categories = categories;
    return article;
  }
  
  return null;
}

// Traitement et filtrage des articles
async function fetchAndProcessFeeds(feedUrl) {
  const articles = await fetchRssFeed(feedUrl);
  
  const filteredArticles = await Promise.all(articles.map(async (article) => {
    const content = article.contentEncoded || article.content || article.description || '';
    
    if (!content) {
      console.error(`Aucun contenu trouvé pour l'article "${article.title}"`);
      return null;
    }
  
    article.content = content;
    const filteredArticle = filterArticleByKeywordScore(article);
  
    if (filteredArticle) {
      return filteredArticle;
    }
  
    return null;
  }));
  
  return Promise.all(filteredArticles);
}
