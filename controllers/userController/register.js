const User = require('../../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try{
        const { nom, password, role } = req.body;       
        
        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        // Création de l'utilisateur
        const user = await User.create({ nom, password: hashedPassword, role });
        if(!user){
            return res.status(400).json({ message: "Erreur lors de la création de l'utilisateur" });
        }
        // Suppression du mot de passe avant de renvoyer la réponse
        user.password = undefined;
       
        // Envoi de la réponse
        res.status(201).json({ message: "Utilisateur créé avec succès", data: user });


        
        

    }
    catch(err){
        console.log(err);
        // Vérification de l'erreur de validation
        if(err.name === 'ValidationError'){
            return res.status(400).json({ message: err.message });
        }
        // Vérification de l'erreur de duplication
        if(err.name === "MongooseError"){
            return res.status(400).json({ message: "Nom d'utilisateur déjà utilisé" });
        }

        res.status(500).json({message: "Erreur serveur"});
    }
}

module.exports = register;