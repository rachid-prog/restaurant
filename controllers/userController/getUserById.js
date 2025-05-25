const User = require('../../models/User');

const getUserById = async (req, res) => {
    try{      
       
       if(req.user.id !== req.params.id){
        return res.status(400).json({ message: "Erreur lors de la récupération de l'utilisateur id" });
       }
       
       
        // Récupération de l'utilisateur par son ID
        const user = await User.findById(req.params.id).select("-password");
        
        if(!user){
            return res.status(400).json({ message: "Erreur lors de la récupération de l'utilisateur" });
        }
        // Envoi de la réponse
        res.status(200).json({ message: "Utilisateur trouvé", data: user });
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

module.exports = getUserById;