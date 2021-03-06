// ************ Création et exportation du modèle de sauce ************ //

// Importation de mongoose
const mongoose = require('mongoose');

// Création d'un schéma de sauce pour la base de données mongoDB
const sauceSchema = mongoose.Schema({

  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  // Par défaut les like et dislike ont une valeur de 0
  likes: { type: Number, default: 0, required: true },
  dislikes: { type: Number, default: 0, required: true },
  // Tableaux contenants tous les userID qui ont liké ou disliké la sauce en question
  usersLiked: { type: [String],  default: [], required: true },
  usersDisliked: { type: [String],  default: [], required: true },
});

// Exportation du schéma en tant que modèle mongoose
module.exports = mongoose.model('Sauce', sauceSchema);