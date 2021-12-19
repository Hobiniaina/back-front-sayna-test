var express = require('express');
var router = express.Router();
var db = require('../services/db');
var auth = require("../controllers/auth.js");
const checkTokenMiddleware = require("../controllers/security_token.js")

//route de l'authentification de l'utlisateur
router.post('/login', auth.login);

//route d'inscription de l'utilisateur
router.post('/register', auth.register);

//route de récuperation de l'utilisateur
router.get('/user', checkTokenMiddleware.checkTokenMiddleware, auth.getOneUser);

//route de modification de l'utilisateur
router.put('/user', checkTokenMiddleware.checkTokenMiddleware, auth.updateUser);

//route de modification de password de l'utilisateur
router.put('/user/modifPassword', checkTokenMiddleware.checkTokenMiddleware, auth.updatePassword);

//route de recuperation des utilisateurs
router.get('/users', checkTokenMiddleware.checkTokenMiddleware, auth.getAllUsers);

//route de deconnexion de l'utilisateur
router.delete('/user/off', checkTokenMiddleware.checkTokenMiddleware, auth.deleteToken);

//route de suppression de l'utilisateur
router.delete('/user', checkTokenMiddleware.checkTokenMiddleware, auth.deleteUser);

module.exports = router;
