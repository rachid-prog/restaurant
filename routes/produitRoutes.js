const express = require('express')
const router = express.Router()
const multer = require('../middlware/multer')
const chechUser = require('../auth/chechUser')
const admin = require('../auth/admin')

router.post('',chechUser, admin, multer.single('image'), require('../controllers/produitController/createProduit'))
router.get('',chechUser,  require('../controllers/produitController/getAllProduis'))
router.get('/:id',chechUser,  require('../controllers/produitController/getOneProduit'))
router.delete('/:id',chechUser, admin,  require('../controllers/produitController/deleteProduit'))
router.put('/:id',chechUser, admin,  multer.single('image'), require('../controllers/produitController/updateProduit'))







module.exports = router
