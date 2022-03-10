// ************ Construction de la route sauce ************ //

// Importation d'express
const express = require('express');

// Création du routeur
const router = express.Router();

// Importation du controleur sauce
const sauceCtrl = require('../controllers/sauce');

// Importation du middleware auth pour authentifier l'utilisateur
const auth = require('../middlewares/auth');

// Importation du middleware multer permettant de télécharger les images des sauces
const multer = require('../middlewares/multer-config');

// Création d'une route permettant la récupération de toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);
// Création d'une route permettant la récupération d'une sauce en particulier
router.get('/:id', auth, sauceCtrl.getOneSauce);
// Création d'une route pour créer une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
// Création d'une route pour modifier les informations d'une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
// Création d'une route pour supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Création d'une route pour gérer les likes et dislikes
router.post('/:id/like', auth, sauceCtrl.likeOrDislike);

module.exports = router;