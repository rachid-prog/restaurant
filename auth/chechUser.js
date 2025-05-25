const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const chechUser = async (req, res, next) => {
    try{      
      const id = req.params.id
      let token;
      // Vérification du token existe
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
      }
      
      if(!token){
            return res.status(401).json({ message: "Token manquant" });
      }
      // Vérification du token valide
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded)=>{
        if(err){
            res.staus(403).json({message: "Token non valide"})
        }
        const user = await User.findById(decoded.id)
        req.user = user
        
        next()
      
      })
      
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Erreur serveur"});
    }
}

module.exports = chechUser