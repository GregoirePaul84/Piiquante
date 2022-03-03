// Importation d'express
const express = require('express');

// Création du routeur
const router = express.Router();

// Importation du controleur user
const userCtrl = require('../controllers/user');

// Création de routes post pour envoyer les informations
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du routeur et importation dans app.js
module.exports = router;