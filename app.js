const dotenv = require('dotenv').config();
const connexion = require('./database/connexion');


const cors = require('cors');

const express= require('express');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connexion à la base de données
connexion();

// Routes
app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/produits', require('./routes/produitRoutes'))

app.use('/api/orders', require('./routes/OrderRoutes'))
//Route 404
app.use((req, res, next) => {
    res.status(404).json({ message: "Page non trouvée" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` ☻ En écoute sur http://localhost:${PORT} ☻ `);
})
