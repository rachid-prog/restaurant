const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connexion = ()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then((con) => {
        console.log(` ☻ Connexion à MongoDB réussie ☻ [ ${con.connection.host} ${con.connection.port} ${con.connection.name} ] `);
    })
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB :', err);
    });
}

module.exports = connexion;