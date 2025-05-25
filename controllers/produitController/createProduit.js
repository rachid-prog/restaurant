const Produit = require('../../models/Product')

const createProduit = async(req, res)=>{
    try{
        const {nom, description, prix, stock, image} = req.body
        
        const produit = await Produit.create({nom, description, prix, stock, image})
        if(!produit){
            return res.status(400).json({message: "erreur de création du produit"})
        }
        res.status(201).json({ message: "Produit créé avec succès", data: produit });


    }
    catch(err){
        console.log(err)
         // Vérification de l'erreur de validation
        if(err.name === 'ValidationError'){
            return res.status(400).json({ message: err.message });
        }
        // Vérification de l'erreur de duplication
        if(err.name === "MongooseError"){
            return res.status(400).json({ message: "Nom du produit déjà utilisé" });
        }
        res.status(500).json({message: "erreur serveur"})
    }

}

module.exports = createProduit