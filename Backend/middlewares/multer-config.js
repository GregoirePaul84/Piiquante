// ************ Middleware pour enregistrer les images ************//

// Importation de multer
const multer = require('multer');

// Gère les extensions des fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };
  
// Objet de configuration pour multer
const storage = multer.diskStorage({
    // Indique à multer d'enregistrer dans le fichier images
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        // Gère le problème des espaces
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        // Génère un nom de fichier unique
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exportation du middleware multer 
module.exports = multer({storage: storage}).single('image');