const Joi = require('joi')


const validateProduitSchema = Joi.object({
    nom: Joi.string().required().min(3).max(100).trim().lowercase().regex(/^[a-zA-Z-_\séèàçùêôîûïüäöüß]+$/).message({
        'string.base': 'Le nom doit être une chaîne de caractères',
        'string.empty': 'Le nom est obligatoire',
        'string.min': 'Le nom doit contenir au moins 3 caractères',
        'string.max': 'Le nom doit contenir au plus 30 caractères',
        'string.pattern.base': 'Le nom ne peut contenir que des lettres, des espaces, des tirets et des underscores',
        'any.required': 'Le nom est obligatoire'

    })
})

const validateProduit = (req, res, next)=>{
     const { error } = validateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({success: false, message: error.message });
    }
    next();
}

module.exports = validateProduit
