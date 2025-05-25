const User = require('../../models/User');

const deleteUser = async (req, res) => {
    try{
        // Récupération de l'utilisateur par son ID
        const user = await User.findByIdAndDelete(req.params.id);
        
        if(!user){
            return res.status(400).json({ message: "Erreur lors de la suppression de l'utilisateur" });
        }
        // Envoi de la réponse sans mot de passe
        user.password = undefined;
        res.status(200).json({ message: "Utilisateur supprimé avec succès", data: user });
    }
    catch(err){
        console.log(err);
        //Vérifieier ID
        if(err.name === 'CastError'){
            return res.status(400).json({ message: "ID non invalide" });
        }        
        res.status(500).json({message: "Erreur serveur"});
    }
}

module.exports = deleteUser;