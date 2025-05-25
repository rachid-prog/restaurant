const Order = require('../../models/Order')
const User = require('../../models/User')
const Product = require('../../models/Product')

const createOrder = async (req, res)=>{
    try{
        const {items} = req.body

        for( const productId of items){           
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ msg: `Produit introuvable: ${productId}` });
            }
            if (product.stock <= 0) {
            return res.status(400).json({ msg: `Produit en rupture: ${product.name}` });
        }
        }

        // Décrémenter le stock
        for (const productId of items) {
            await Product.findByIdAndUpdate(productId, { $inc: { stock: -1 } });
        }
        const order = await Order.create({
            ...req.body
        })
        if(!order){
            res.status(400).json({message: "Erreur de création de la commande"})
        }
        
        res.status(201).json({message: order})

    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "erreur de serveur"})
    }

}

module.exports = createOrder