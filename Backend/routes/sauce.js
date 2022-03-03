// Importation d'express
const express = require('express');

// Création du routeur
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');

// Importation du middleware auth
const auth = require('../middlewares/auth');

// Importation du middleware multer
const multer = require('../middlewares/multer-config');

// Création d'une route pour créer une sauce, associée à multer pour 
router.post('/', auth, multer, sauceCtrl.createSauce);