// Importatiopn des modules
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user')
const app = express();

// Headers permettant d'éviter les erreurs CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Connection à mongoDB
mongoose.connect('mongodb+srv://gregoirePaulet:n7CcDMurQkqfZpYM@cluster0.s0jcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/api/auth', userRoutes);

module.exports = app;