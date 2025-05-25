const Produit = require('../../models/Product')

const updateProduit = async (req, res)=>{
    try{
        const id = req.params.id

        const updateproduit = await Produit.findByIdAndUpdate(id, {...req.body}, {new: true})
        
        if(!updateProduit){
            return res.status(400).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
        }
        res.status(200).json({ message: "Produit mis à jour avec succès", data: updateproduit });

    }
    catch(err){
         console.log(err);
        // Vérification de l'erreur de validation
        if(err.name === 'ValidationError'){
            return res.status(400).json({ message: err.message });
        }
        // Vérification de l'erreur de duplication
        if(err.name === "MongooseError"){
            return res.status(400).json({ message: "Nom du produit déjà utilisé" });
        }

        res.status(500).json({message: "Erreur serveur"});

    }

}

module.exports = updateProduit
