var express = require('express');
var router = express.Router();
var abonnement = require("../controllers/abonnement.c.js");
const checkTokenMiddleware = require("../controllers/security_token.js")

//route pour l'abonnement
router.put('/subscription', checkTokenMiddleware.checkTokenMiddleware, abonnement.abonnements);

//route pour l'abonnement
router.put('/cart', checkTokenMiddleware.checkTokenMiddleware, abonnement.cart);

module.exports = router;