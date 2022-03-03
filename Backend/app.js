// ************ Gère les requêtes envoyées au serveur ************ //

// Importation des modules
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Importation pour accéder aux chemins du serveur
const path = require('path');

// Importation des routeurs 
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Connection à mongoDB
mongoose.connect('mongodb+srv://gregoirePaulet:n7CcDMurQkqfZpYM@cluster0.s0jcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Headers permettant d'éviter les erreurs CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Permet d'accéder au corps de la requête contenant du JSON
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;