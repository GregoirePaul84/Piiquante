// ************ Création du contrôleur sauce ************ //

// Importation du modèle de sauce
const Sauce = require('../models/sauce');

// Importation du package fs qui nous permettra de supprimer les fichiers
const fs = require('fs');

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

// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  /* Test pour vérifier si il y'a une nouvelle image dans la modification
  Si nouvelle image on aura un req.file 
  Si req.file existe, on récupère le string qu'on parse en objet JSON, puis on modifie imageUrl
  Si il n'existe pas, on traite l'objet de req.body */
  
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  /*On utilise updateOne pour modifier une sauce dans la data base, 
  On modifie l'id de sauceObject avec l'id qui correspond aux paramètres de requêtes */
  
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  // On va chercher grâce à findOne la sauce qui a l'id dans les paramètres de la requête
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      /* On récupère le nom du fichier grâce à split qui renvoie un tableau avec les éléments avant et après '/images/', 
      puis on récupère le 2e élément qui correspond au nom du fichier */
      const filename = sauce.imageUrl.split('/images/')[1];
      // On utilise unlink qui permet de supprimer un fichier
      fs.unlink(`images/${filename}`, () => {
        // On supprime la sauce de la data base
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};