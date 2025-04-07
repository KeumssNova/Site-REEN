const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token décodé:', decodedToken);  // Ajouter un log pour vérifier le contenu du token
        
        // Vérifie que decodedToken contient bien les informations attendues
        if (!decodedToken || !decodedToken.userId || !decodedToken.roles) {
            return res.status(401).json({ message: "Authentification échouée" });
        }
        
        req.userData = {
            userId: decodedToken.userId,
            roles: decodedToken.roles || []
        };
        next();
    } catch (error) {
        console.error('Erreur lors de l\'authentification:', error);  // Log d'erreur détaillé
        res.status(401).json({ message: "Authentification échouée" });
    }
};


const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.userData || !Array.isArray(req.userData.roles)) {
            return res.status(403).json({ message: "Aucun rôle trouvé" });
        }

        const hasRole = req.userData.roles.some(role => allowedRoles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ message: "Accès refusé : rôle insuffisant" });
        }

        next();
    };
};

module.exports = { authenticate, authorizeRoles };
