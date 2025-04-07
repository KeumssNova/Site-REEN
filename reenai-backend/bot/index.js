const axios = require('axios');
const Parser = require('rss-parser');
const { JSDOM } = require('jsdom');
const fs = require('fs/promises');
const path = require('path');

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

// URLs des flux RSS (ajouter ici les flux à récupérer)
const RSS_FEEDS = [
  'https://www.africaintelligence.fr/info/rss',
  'https://www.panapress.com/rss/',
  'https://feeds.feedburner.com/AfricaIntelligence-fr',
  'https://feeds.feedburner.com/IntelligenceOnline',
  "https://www.panapress.com/rss/",
  "https://www.jeuneafrique.com/flux-rss/",
  " https://www.afdb.org/fr/flux-rss",
  " https://www.voaafrique.com/p/5740.html",
  "https://www.fakt-afrique.org/flux-rss/",
  "https://www.afriqueverte.org/flux-rss",
  "https://www.cirad.fr/rss",
  "",
  "https://www.panapress.com/rss/rss_1.xml", // Actualités
  "https://www.panapress.com/rss/rss_2.xml", // Agriculture
  "https://www.panapress.com/rss/rss_3.xml", // Culture
  "https://www.panapress.com/rss/rss_4.xml", // Economie
  "https://www.panapress.com/rss/rss_5.xml", // Environnement
  "https://www.panapress.com/rss/rss_6.xml", // Genre
  "https://www.panapress.com/rss/rss_7.xml", // Politique
  "https://www.panapress.com/rss/rss_8.xml", // Revue de presse
  "https://www.panapress.com/rss/rss_9.xml", // Santé
  "https://www.panapress.com/rss/rss_10.xml", // Sciences
  "https://www.panapress.com/rss/rss_11.xml", // Social
  "https://www.panapress.com/rss/rss_12.xml", // Société
  "https://www.panapress.com/rss/rss_13.xml", // Sports
  "https://www.panapress.com/rss/rss_14.xml", // Bulletin SIDA
  "https://www.panapress.com/rss/rss_15.xml", // Cantines Scolaires
  "https://www.panapress.com/rss/rss_16.xml", // Centrafrique
  "https://www.panapress.com/rss/rss_17.xml", // CEN-SAD
  "https://www.panapress.com/rss/rss_18.xml", // CEDEAO
  "https://www.panapress.com/rss/rss_19.xml", // CMCR
  "https://www.panapress.com/rss/rss_20.xml", // Conflit ivoirien
  "https://www.panapress.com/rss/rss_21.xml", // CORAF
  "https://www.panapress.com/rss/rss_22.xml", // CAN
  "https://www.panapress.com/rss/rss_23.xml", // Coupe du Monde
  "https://www.panapress.com/rss/rss_24.xml", // Crise Malienne
  "https://www.panapress.com/rss/rss_25.xml", // Darfour
  "https://www.panapress.com/rss/rss_26.xml", // Education Pour Tous
  "https://www.panapress.com/rss/rss_27.xml", // Faux médicaments
  "https://www.panapress.com/rss/rss_28.xml", // Forum des partis, médias, société civile
  "https://www.panapress.com/rss/rss_29.xml", // Francophonie
  "https://www.panapress.com/rss/rss_30.xml", // Réfugiés
  "https://www.panapress.com/rss/rss_31.xml", // Sommet Ligue Arabe
  "https://www.panapress.com/rss/rss_32.xml", // Médias africains
  "https://www.panapress.com/rss/rss_33.xml", // Nelson Mandela
  "https://www.panapress.com/rss/rss_34.xml", // Intellectuels Afrique & diaspora
  "https://www.panapress.com/rss/rss_35.xml", // African Gender Award
  "https://www.panapress.com/rss/rss_36.xml", // RALLIES
  "https://www.panapress.com/rss/rss_37.xml", // RSF/CPJ
  "https://www.panapress.com/rss/rss_38.xml", // Sécurité
  "https://www.panapress.com/rss/rss_39.xml", // Somalie
  "https://www.panapress.com/rss/rss_40.xml", // TICAD
  "https://www.panapress.com/rss/rss_41.xml", // Transport Aérien
  "https://www.panapress.com/rss/rss_42.xml", // UNICEF
  "https://www.africaintelligence.com/rss", // Africa Intelligence
  "http://www.rfi.fr/general/rss",
  "http://www.rfi.fr/afrique/rss",
  "http://www.rfi.fr/afrique/actu/rss",
  "http://www.rfi.fr/afrique/archives/rss",
  "http://www.rfi.fr/afrique/archives/201407/rss",
  "http://www.rfi.fr/afrique/archives/201408/rss",
  "http://www.rfi.fr/afrique/archives/201409/rss",
  "http://www.rfi.fr/afrique/archives/201410/rss",
  "http://www.rfi.fr/afrique/archives/201411/rss",
  "http://www.rfi.fr/afrique/archives/201412/rss",
  "http://www.rfi.fr/afrique/archives/201501/rss",
  "http://www.rfi.fr/afrique/archives/201502/rss",
  "http://www.rfi.fr/afrique/archives/201503/rss",
  "http://www.rfi.fr/afrique/archives/201504/rss",
  "http://www.rfi.fr/afrique/archives/201505/rss",
  "http://www.rfi.fr/afrique/archives/201506/rss",
  "http://www.rfi.fr/afrique/archives/201507/rss",
  "http://www.rfi.fr/afrique/archives/201508/rss",
  "http://www.rfi.fr/afrique/archives/201509/rss",
  "http://www.rfi.fr/afrique/archives/201510/rss",
  "http://www.rfi.fr/afrique/archives/201511/rss",
  "http://www.rfi.fr/afrique/archives/201512/rss",
  "http://www.rfi.fr/afrique/archives/201601/rss",
  "http://www.rfi.fr/afrique/archives/201602/rss",
  "http://www.rfi.fr/afrique/archives/201603/rss",
  "http://www.rfi.fr/afrique/archives/201604/rss",
  "http://www.rfi.fr/afrique/archives/201605/rss",
  "http://www.rfi.fr/afrique/archives/201606/rss",
  "http://www.rfi.fr/afrique/archives/201607/rss",
  "http://www.rfi.fr/afrique/archives/201608/rss",
  "http://www.rfi.fr/afrique/archives/201609/rss",
  "http://www.rfi.fr/afrique/archives/201610/rss",
  "http://www.rfi.fr/afrique/archives/201611/rss",
  "http://www.rfi.fr/afrique/archives/201612/rss",
  "http://www.rfi.fr/afrique/archives/201701/rss",
  "http://www.rfi.fr/afrique/archives/201702/rss",
  "http://www.rfi.fr/afrique/archives/201703/rss",
  "http://www.rfi.fr/afrique/archives/201704/rss",
  "http://www.rfi.fr/afrique/archives/201705/rss",
  "http://www.rfi.fr/afrique/archives/201706/rss",
  "http://www.rfi.fr/afrique/archives/201707/rss",
  "http://www.rfi.fr/afrique/archives/201708/rss",
  "http://www.rfi.fr/afrique/archives/201709/rss",
  "http://www.rfi.fr/afrique/archives/201710/rss",
  "http://www.rfi.fr/afrique/archives/201711/rss",
  "http://www.rfi.fr/afrique/archives/201712/rss",
  "http://www.rfi.fr/afrique/archives/201801/rss",
  "http://www.rfi.fr/afrique/archives/201802/rss",
  "http://www.rfi.fr/afrique/archives/201803/rss",
  "http://www.rfi.fr/afrique/archives/201804/rss",
  "http://www.rfi.fr/afrique/archives/201805/rss",
  "http://www.rfi.fr/afrique/archives/201806/rss",
  "http://www.rfi.fr/afrique/archives/201807/rss",
  "http://www.rfi.fr/afrique/archives/201808/rss",
  "http://www.rfi.fr/afrique/archives/201809/rss",
  "http://www.rfi.fr/afrique/archives/201810/rss",
  "http://www.rfi.fr/afrique/archives/201811/rss",
  "http://www.rfi.fr/afrique/archives/201812/rss",
  "http://www.rfi.fr/afrique/archives/201901/rss",
  "http://www.rfi.fr/afrique/archives/201902/rss",
  "http://www.rfi.fr/afrique/archives/201903/rss",
  "http://www.rfi.fr/afrique/archives/201904/rss",
  "http://www.rfi.fr/afrique/archives/201905/rss",
  "http://www.rfi.fr/afrique/archives/201906/rss",
  "http://www.rfi.fr/afrique/archives/201907/rss",
  "http://www.rfi.fr/afrique/archives/201908/rss",
  "http://www.rfi.fr/afrique/archives/201909/rss",
  "http://www.rfi.fr/afrique/archives/201910/rss",
  "http://www.rfi.fr/afrique/archives/201911/rss",
  "http://www.rfi.fr/afrique/archives/201912/rss",
  "http://www.rfi.fr/afrique/archives/202001/rss",
  "http://www.rfi.fr/afrique/archives/202002/rss",
  "http://www.rfi.fr/afrique/archives/202003/rss",
  "http://www.rfi.fr/afrique/archives/202004/rss",
  "http://www.rfi.fr/afrique/archives/202005/rss",
  "http://www.rfi.fr/afrique/archives/202006/rss",
  "http://www.rfi.fr/afrique/archives/202007/rss",
  "http://www.rfi.fr/afrique/archives/202008/rss",
  "http://www.rfi.fr/afrique/archives/202009/rss",
  "http://www.rfi.fr/afrique/archives/202010/rss",
  "http://www.rfi.fr/afrique/archives/202011/rss",
  "http://www.rfi.fr/afrique/archives/202012/rss",
  "http://www.rfi.fr/afrique/archives/202101/rss",
  "http://www.rfi.fr/afrique/archives/202102/rss",
  "http://www.rfi.fr/afrique/archives/202103/rss",
  "http://www.rfi.fr/afrique/archives/202104/rss",
  "http://www.rfi.fr/afrique/archives/202105/rss",
  "http://www.rfi.fr/afrique/archives/202106/rss",
  "http://www.rfi.fr/afrique/archives/202107/rss",
  "http://www.rfi.fr/afrique/archives/202108/rss",
  "http://www.rfi.fr/afrique/archives/202109/rss",
  "http://www.rfi.fr/afrique/archives/202110/rss",
  "http://www.rfi.fr/afrique/archives/202111/rss",
  "http://www.rfi.fr/afrique/archives/202112/rss" // Ajouter les flux ici
];

// Configuration des mots-clés ciblés sur l'Afrique
const CONFIG = {
  fetchInterval: 3600000, // 1 heure en millisecondes
  maxEntriesPerFeed: 50,
  includeContent: true,
  includeCategories: true,
  includePublishDate: true,
  extractFullContent: true, // Extraction du contenu complet
  filterByKeywords: true, // Filtrage par mots-clés
  // Mots-clés d'intérêt par catégorie, centrés sur l'Afrique
  keywords: {
    technology: [
      'technologie émergente', 
      'innovation locale', 
      'startups émergentes', 
      'inclusion numérique', 
      'fintech émergente', 
      'agritech', 
      'énergie solaire', 
      'mobile banking', 
      'e-commerce', 
      'connectivité rurale'
    ],
    politics: [
      'démocratie émergente', 
      'élections locales', 
      'gouvernance régionale', 
      'union continentale', 
      'intégration régionale', 
      'souveraineté nationale', 
      'diplomatie Sud-Sud', 
      'indépendance économique', 
      'politique panafricaine'
    ],
    economy: [
      'croissance économique', 
      'libre-échange continental', 
      'développement durable', 
      'investissement émergent', 
      'commerce intracontinental', 
      'ressources naturelles', 
      'industrialisation émergente', 
      'entrepreneuriat local', 
      'diaspora économique', 
      'microfinance'
    ],
    culture: [
      'héritage culturel', 
      'langues locales', 
      'art contemporain', 
      'musique traditionnelle', 
      'littérature postcoloniale', 
      'cinéma émergent', 
      'traditions locales', 
      'afrofuturisme', 
      'décolonisation culturelle', 
      'patrimoine mondial'
    ]
  },
  keywordScoreThreshold: 1 // Score minimum pour qu'un article soit conservé
};

/**
 * Récupère et analyse un flux RSS
 * @param {string} feedUrl - URL du flux RSS
 * @returns {Promise<Array>} Articles du flux
 */

const fetchInterval = 5000;

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
      const articles = await fetchRssFeed(url);
      console.log(`Articles récupérés pour ${url}:`, articles);
      // Traite les articles ici
    }, delay);

    // Augmente le délai avant le prochain appel
    delay += fetchInterval;
  });
};

// Lancer le processus de récupération avec délai
fetchFeedsWithDelay();

// Configuration des sélecteurs par domaine
const SITE_SELECTORS = {
  'panapress.com': {
    articleSelectors: ['article', '.news-content', '.news-article', '.entry-content'],
    paragraphSelector: 'p',
    minParagraphLength: 50
  },
  'rfi.fr': {
    articleSelectors: ['article', '.article-body', '.content-body', '.article-content'],
    paragraphSelector: 'p',
    minParagraphLength: 50
  },
  'africaintelligence.fr': {
    articleSelectors: ['article', '.article-content', '.post-content', '.entry-content'],
    paragraphSelector: 'p',
    minParagraphLength: 50
  },
  'default': {
    articleSelectors: ['article', '.article', '.content', '.post-content', 'main', '.entry-content'],
    paragraphSelector: 'p',
    minParagraphLength: 40
  }
};


/**
 * Extrait le contenu textuel d'une page web
 * @param {string} url - URL de l'article
 * @returns {Promise<string>} Contenu textuel de l'article
 */
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

/**
 * Calcule un score de pertinence basé sur les mots-clés trouvés dans le texte
 * @param {string} text - Texte à analyser
 * @returns {Object} Score et catégories trouvées
 */
function calculateKeywordScore(text) {
  if (!text) return { score: 0, categories: {} };
  
  const lowercaseText = text.toLowerCase();
  let totalScore = 0;
  const categories = {};
  
  for (const [category, keywords] of Object.entries(CONFIG.keywords)) {
    let categoryScore = 0;
    const foundKeywords = [];
    
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = lowercaseText.match(regex);
      if (matches && matches.length > 0) {
        categoryScore += matches.length;
        foundKeywords.push(`${keyword} (${matches.length})`);
      }
    }
    
    if (categoryScore > 0) {
      categories[category] = {
        score: categoryScore,
        keywords: foundKeywords
      };
      totalScore += categoryScore;
    }
  }
  
  return { score: totalScore, categories };
}

/**
 * Transforme un article RSS en format adapté pour l'IA
 * @param {Object} item - Article RSS
 * @returns {Promise<Object>} - Données formatées pour l'IA
 */
async function transformItemForAI(item) {
  let fullContent = '';
  if (CONFIG.extractFullContent) {
    fullContent = await extractArticleContent(item.link);
  }
  
  const contentToAnalyze = fullContent || item.contentEncoded || item.content || item.contentSnippet || item.description || '';
  
  const keywordAnalysis = CONFIG.filterByKeywords ? calculateKeywordScore(contentToAnalyze) : { score: 0, categories: {} };
  
  const aiItem = {
    title: item.title || '',
    source: item.link || '',
    timestamp: new Date().toISOString(),
    keywordScore: keywordAnalysis.score,
    keywordCategories: keywordAnalysis.categories
  };
  
  if (fullContent) aiItem.fullContent = fullContent;
  if (CONFIG.includeContent && (item.contentEncoded || item.content || item.contentSnippet || item.description)) {
    aiItem.summaryContent = item.contentEncoded || item.content || item.contentSnippet || item.description;
  }
  if (CONFIG.includeCategories && item.categories) aiItem.categories = item.categories;
  if (CONFIG.includePublishDate && item.pubDate) aiItem.publishDate = item.pubDate;
  if (item.creator) aiItem.author = item.creator;
  
  return aiItem;
}

/**
 * Filtre les articles selon leur score de mots-clés
 * @param {Array} items 
 */
function filterItemsByKeywords(items) {
  if (!CONFIG.filterByKeywords) return items;
  return items.filter(item => item.keywordScore >= CONFIG.keywordScoreThreshold);
}

/**
 * Sauvegarde les données au format JSONL
 * @param {Array} items - Articles transformés
 */
async function saveToJsonl(items) {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    const jsonlContent = items.map(item => JSON.stringify(item)).join('\n');
    await fs.writeFile(OUTPUT_FILE, jsonlContent);
    console.log(`Données sauvegardées dans ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error.message);
  }
}

/**
 * Génère un rapport sur les articles récupérés
 * @param {Array} items - Articles avant filtrage
 * @param {Array} filteredItems - Articles après filtrage
 */
async function generateReport(items, filteredItems) {
  try {
    const reportFile = path.join(OUTPUT_DIR, 'rapport.txt');
    let report = `RAPPORT DE RÉCUPÉRATION DES FLUX RSS\n`;
    report += `Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n\n`;
    report += `Nombre total d'articles récupérés: ${items.length}\n`;
    report += `Nombre d'articles conservés après filtrage: ${filteredItems.length}\n\n`;
    
    report += `ARTICLES CONSERVÉS PAR CATÉGORIE:\n`;
    const categoryCounts = {};
    filteredItems.forEach(item => {
      Object.keys(item.keywordCategories).forEach(category => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    });
    
    for (const [category, count] of Object.entries(categoryCounts)) {
      report += `- ${category}: ${count} articles\n`;
    }
    
    report += `\nDÉTAIL DES ARTICLES CONSERVÉS:\n`;
    filteredItems.forEach((item, index) => {
      report += `${index + 1}. "${item.title}" (Score: ${item.keywordScore})\n`;
      report += `   Catégories: ${Object.keys(item.keywordCategories).join(', ')}\n`;
      report += `   Source: ${item.source}\n\n`;
    });
    
    await fs.writeFile(reportFile, report);
    console.log(`Rapport généré dans ${reportFile}`);
  } catch (error) {
    console.error('Erreur lors de la génération du rapport:', error.message);
  }
}

/**
 * Fonction principale
 */
async function main() {
  try {
    console.log('Démarrage du bot RSS amélioré...');
    
    const allItemsPromises = RSS_FEEDS.map(feedUrl => fetchRssFeed(feedUrl));
    const allFeedsItems = await Promise.all(allItemsPromises);
    
    const allItems = allFeedsItems.flat();
    
    if (allItems.length === 0) {
      console.log('Aucun article trouvé dans les flux RSS');
      return;
    }
    
    console.log(`Traitement de ${allItems.length} articles...`);
    
    const transformedItemsPromises = allItems.map(transformItemForAI);
    const transformedItems = await Promise.all(transformedItemsPromises);
    
    const filteredItems = filterItemsByKeywords(transformedItems);
    
    await saveToJsonl(filteredItems);
    
    await generateReport(transformedItems, filteredItems);
    
    console.log(`Traitement terminé: ${filteredItems.length}/${transformedItems.length} articles conservés`);
  } catch (error) {
    console.error('Erreur dans le processus principal:', error.message);
  }
}

// Exécution immédiate puis à intervalles réguliers
main();
setInterval(main, CONFIG.fetchInterval);

// Gestion propre de la fermeture
process.on('SIGINT', () => {
  console.log('Bot arrêté');
  process.exit(0);
});
