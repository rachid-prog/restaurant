const Produit = require('../../models/Product')

const deleteProduit = async (req, res)=>{
    try{
        const id = req.params.id

        const produit = await Produit.findByIdAndDelete(id)

        if(!produit){
            res.status(400).json({message: "Produit non trouvé"})
        }

        res.status(200).json({massage: "Produit supprimer"})


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


module.exports = deleteProduit