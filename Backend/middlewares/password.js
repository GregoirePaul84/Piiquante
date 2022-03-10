// Importation de password-validator
const passwordValidator = require('password-validator');

// Création du schéma password
var passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                                    // Longueur minimum de 8 caractères
.is().max(20)                                                   // Longueur maximum de 20 caractères
.has().uppercase()                                              // Doit contenir des majuscules
.has().lowercase()                                              // Doit contenir des minuscules
.has().digits(2)                                                // Doit contenir au moins 2 chiffres
.has().not().spaces()                                           // Espaces interdits
.is().not().oneOf(['Passw0rd', 'Password123', 'Azerty123']);    // Valeurs interdites

// Vérification de la qualité du password
module.exports = (req, res, next) => {
    
    // Si le mot de passe est conforme
    if (passwordSchema.validate(req.body.password)) {
        next();
    } 

    // Si le mot de passe n'est pas conforme 
    else {
        console.log('Mot de passe non conforme');
        return res.status(400).json( { error: "Le mot de passe n'est pas assez fort"} )
    }
};