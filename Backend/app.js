// ************ Gère les requêtes envoyées au serveur ************ //

// Importation d'express
const express = require('express');

// Importation de mongoose qui permet de faire le lien entre mongoDB et notre application
const mongoose = require('mongoose');

const app = express();

// Importation pour accéder aux chemins du serveur
const path = require('path');

// Importation de helmet pour renforcer les en-têtes des requêtes HTTP
const helmet = require('helmet')

// Importation des routeurs 
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Connection à mongoDB
mongoose.connect('mongodb+srv://gregoirePaulet:n7CcDMurQkqfZpYM@cluster0.s0jcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// On inclue les 15 middlewares de Helmet pour la sécurité 
app.use(helmet());


// Headers permettant d'éviter les erreurs CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site, cross-origin');

  next();
});

// Permet d'accéder au corps de la requête contenant du JSON
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;