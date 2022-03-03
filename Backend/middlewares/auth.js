// middleware permettant d'authentifier l'utilisateur

// importation du package jwt pour vérifier les tokens
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Récupération du token dans le header authorization
        const token = req.headers.authorization.split(' ')[1];
        // Vérification que la clé correspond à celle dans la fonction login
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Récupération de l'userId de l'objet JS decodedToken
        const userId = decodedToken.userId;
        // Si jamais l'userID de la requête est différent du userId, on renvoie une erreur
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            // Si tout va bien on passe la requête au prochain middleware
            next();
        }
    } catch {
      // Erreur 401 si problème d'authentification   
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };