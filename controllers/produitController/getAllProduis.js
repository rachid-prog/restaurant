const Produits = require('../../models/Product')

const getAllProduis = async (req, res)=>{
    try{
        const produits = await Produits.find()
        
        if(!produits){
            return res.status(400).json({message: "Accun produit trouvé"})
        }

        res.status(200).json({ message: "Liste des produits", data: produits });

    }
    catch(err){
        console.log(err)
         res.status(500).json({message: "Erreur serveur"});
    }
}

module.exports = getAllProduis