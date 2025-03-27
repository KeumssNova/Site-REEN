const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId, role: decodedToken.role }; // Ajoute le rôle ici !
        next();
    } catch {
        res.status(401).json({ message: "Authentification échouée" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.userData.role !== 'admin') {
        return res.status(403).json({ message: "Accès refusé : droits insuffisants" });
    }
    next();
};

module.exports = { authenticate, isAdmin }; // Export nommé unique