const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    try{
        const {nom, password} = req.body;
        // Vérification de l'utilisateur
        const user = await User.findOne({ nom });
        if(!user){
            return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
        }
        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
        }
        // Suppression du mot de passe avant de renvoyer la réponse
        user.password = undefined;
        // Création du token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '36h' });
        // Envoi de la réponse
        res.status(200).json({ message: "Connexion réussie", data: user, token });

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


module.exports = login;