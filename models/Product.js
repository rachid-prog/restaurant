const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, "Nom du produit requis"],
        minlength: [3, 'Le nom doit contenir au moins 3 caractères'],
        maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
        trim: true,
        match: [/^[a-zA-Z0-9 _-]+$/, 'Le nom ne doit pas contenir de caractères spéciaux'],
        unique: [true, "Nom du produit unique"]
        
    },
    description: {
        type: String,
        required :[true, "Déscription du produit requis"],
        minlength: [10, 'Le nom doit contenir au moins 10 caractères'],
        maxlength: [300, 'Le nom ne peut pas dépasser 300 caractères'],
        trim: true,
        match: [/^[a-zA-Z0-9 .,;:'"!?()\-_]+$/, 'La description contient des caractères invalides']
    },
    prix: {
        type: Number,
        required: [true, "Prix du produit requis"],
        trim : true,
        min: [0, 'Le prix ne peut pas être négatif']
            
    },
    stock:{
        type: Number,
        required: [true, "le stock produit reauis"],
        trim: true,
        min: [0, 'Le stock ne peut pas être négatif'],
        validate: {
            validator: Number.isInteger,
            message: 'Le stock doit être un nombre entier'
        }
    },
    image:{
            type: String
    }

    
}, { timestamps: true})


module.exports = mongoose.model('Produit', productSchema)