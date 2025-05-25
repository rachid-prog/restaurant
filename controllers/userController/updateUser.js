const User = require('../../models/User');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
    try{
        // Récupération de l'utilisateur par son ID
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(400).json({ message: "Erreur lors de la récupération de l'utilisateur" });
        }

        //Vérifier si le nom, passworrd et le rôle sont présents
        if(!req.body.nom || !req.body.password){
            return res.status(400).json({ message: "Nom, mot de passe et rôle sont requis" });
        }
       
        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Mise à jour de l'utilisateur
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { ...req.body, password: hashedPassword }, { new: true });
        
        if(!updatedUser){
            return res.status(400).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
        }
        // Envoi de la réponse sans mot de passe
        updatedUser.password = undefined;
        res.status(200).json({ message: "Utilisateur mis à jour avec succès", data: updatedUser });

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

module.exports = updateUser;