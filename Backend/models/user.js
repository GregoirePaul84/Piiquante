// Importation des modules
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

// Exportation du modèle
module.exports = mongoose.model('User', userSchema);