const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom:{
        type: String,
        required: [true, "Le nom est requis"],
        trim: true,
        lowercase: true,
        unique: [true, "Le nom doit être unique"],
        validate: {
            validator: function(v) {
                return /^[a-zA-Zéèà]+$/.test(v);
            },
            message: props => `${props.value} n'est pas un nom valide!`
        }
    },
    password:{
        type: String,
        required: [true, "Le mot de passe est requis"],
        trim: true,
    },
    role: { type: String,
         enum: ['user', "admin", 'preparation', 'accueil'], 
         default: 'user'
    },
    
    

},{timestamps: true});

module.exports = mongoose.model('User', userSchema);