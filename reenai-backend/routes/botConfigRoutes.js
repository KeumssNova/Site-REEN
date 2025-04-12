const express = require('express');
const router = express.Router();
const BotConfig = require('../models/BotConfig'); // Le modèle Mongoose

// Ajouter un flux RSS
router.post('/addRssFeed', async (req, res) => {
  const { rssFeed } = req.body;

  try {
    let botConfig = await BotConfig.findOne(); // On suppose qu'il y a un seul document de configuration
    if (!botConfig) {
      botConfig = new BotConfig();
    }

    // Ajouter le flux RSS si ce n'est pas déjà présent
    if (!botConfig.rssFeeds.includes(rssFeed)) {
      botConfig.rssFeeds.push(rssFeed);
      await botConfig.save();
      return res.status(200).json({ message: 'Flux RSS ajouté', botConfig });
    }

    return res.status(400).json({ message: 'Flux RSS déjà existant' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// Supprimer un flux RSS
router.post('/removeRssFeed', async (req, res) => {
  const { rssFeed } = req.body;

  try {
    const botConfig = await BotConfig.findOne();
    if (!botConfig) return res.status(404).json({ message: 'Aucune configuration trouvée' });

    // Supprimer le flux RSS
    botConfig.rssFeeds = botConfig.rssFeeds.filter(feed => feed !== rssFeed);
    await botConfig.save();

    return res.status(200).json({ message: 'Flux RSS supprimé', botConfig });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// Ajouter un mot-clé et son lien associé
router.post('/addKeyword', async (req, res) => {
  const { keyword, link } = req.body;

  try {
    let botConfig = await BotConfig.findOne();
    if (!botConfig) {
      botConfig = new BotConfig();
    }

    // Ajouter le lien au mot-clé
    if (!botConfig.keywords.has(keyword)) {
      botConfig.keywords.set(keyword, [link]);
    } else {
      botConfig.keywords.get(keyword).push(link);
    }

    await botConfig.save();
    return res.status(200).json({ message: 'Mot-clé ajouté', botConfig });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// Supprimer un lien pour un mot-clé donné
router.post('/removeLink', async (req, res) => {
  const { keyword, link } = req.body;

  try {
    const botConfig = await BotConfig.findOne();
    if (!botConfig) return res.status(404).json({ message: 'Aucune configuration trouvée' });

    // Supprimer le lien associé au mot-clé
    if (botConfig.keywords.has(keyword)) {
      botConfig.keywords.set(
        keyword,
        botConfig.keywords.get(keyword).filter(existingLink => existingLink !== link)
      );
    }

    await botConfig.save();
    return res.status(200).json({ message: 'Lien supprimé', botConfig });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
});

module.exports = router;
