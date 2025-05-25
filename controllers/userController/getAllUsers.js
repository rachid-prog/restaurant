const User = require('../../models/User');


const getAllUsers = async (req, res) => {
    try{
      
        // Récupération de tous les utilisateurs par order de création 
        const users = await User.find().sort({ createdAt: -1 }).select("-password");
        if(!users){
            return res.status(400).json({ message: "Erreur lors de la récupération des utilisateurs" });
        }
        // Envoi de la réponse
        res.status(200).json({ message: "Liste des utilisateurs", data: users });
    }
    catch(err){
        console.log(err);       

        res.status(500).json({message: "Erreur serveur"});
    }
}

module.exports = getAllUsers;