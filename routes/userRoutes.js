const express = require('express');
const router = express.Router();
const chechUser = require('../auth/chechUser')
const admin = require('../auth/admin')


router.post('/register', require('../controllers/userController/register'));
router.post('/login', require('../controllers/userController/login'));


router.get('', chechUser, admin,  require('../controllers/userController/getAllUsers'));
router.get('/:id', chechUser, require('../controllers/userController/getUserById'));
router.delete('/:id', admin, chechUser, require('../controllers/userController/deleteUser'));
router.put('/:id',chechUser, require('../controllers/userController/updateUser'));



module.exports = router;