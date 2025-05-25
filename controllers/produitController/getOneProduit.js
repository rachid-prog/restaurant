const Produit = require('../../models/Product')

const getOneProduit = async (req, res)=>{
    try{
        const id = req.params.id

        const produit = await Produit.findById(id)

        if(!produit){
            res.status(400).json({massage: "Produit non trouvé"})
        }
        res.status(200).json({message: "utilistateur trouvé", data: produit})

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

module.exports = getOneProduit