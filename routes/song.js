var express = require('express');
var router = express.Router();
var song = require("../controllers/song.c.js");
const checkTokenMiddleware = require("../controllers/security_token.js")

//route pour song
router.get('/songs',checkTokenMiddleware.checkTokenMiddleware, song.songs);

//prend Un son
router.get('/songs/:id',checkTokenMiddleware.checkTokenMiddleware, song.OneSong);

module.exports = router;