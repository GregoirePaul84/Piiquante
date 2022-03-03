// Importation du modèle de sauce
const Sauce = require('../models/sauce');

// Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
  };

// Récupération d'une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

// Création d'une sauce
exports.createSauce = (req, res, next) => {
  console.log("Nouvelle sauce : ", req.body.sauce);
  // Récupération des données du front-end en format JSON
  const sauceObject = JSON.parse(req.body.sauce);
  // Suppression de l'id généré par mongoDB
  delete sauceObject._id;
  // Création d'une nouvelle instance du modèle Sauce
  const sauce = new Sauce({
    ...sauceObject,
    // On génère l'URL de l'image avec le protocole, le nom d'hôte, le dossier images et le nom du fichier
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};