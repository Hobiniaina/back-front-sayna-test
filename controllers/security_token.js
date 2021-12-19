'use strict';
const jwt = require('jsonwebtoken')
var db = require('../services/db');


const SECRET_ACCESS_TOKEN = 'testSayna'

/* Vérification du token */
exports.checkTokenMiddleware = async (req, res, next) => {
	
	// Récupération du token
	let token;

	if (!req.body.authorization) {
		token = req.headers.authorization && extractBearerToken(req.headers.authorization);
	} else {
		token = req.body.authorization && extractBearerToken(req.body.authorization);
	}

	console.log(extractBearerToken(req.headers.authorization));


	// Présence d'un token
	if (!token) {
		return res.status(401).json({
			error: true,
			message: 'Le token envoyer n\'est pas conforme'
		})
	}
	let tokenDb = [];
	await db.collection('tokens').where('token','==',token)
		.get()
		.then((querySnapshot) => {
		     querySnapshot.forEach((doc) => {
		     	tokenDb.push(doc.data());
			})
		 }) 
	if(tokenDb.length>=1){
		jwt.verify(tokenDb[0].token, SECRET_ACCESS_TOKEN, (err, decodedToken) => {
			if (err) {
				res.status(401).json({
					error: true,
					message: 'Votre token n\'ai plus valid , veillez réinitialiser'
				})
			} else {
				return next()
			}
		})
	}else{
		res.status(401).json({
			error: true,
			message: 'Le token envoyer n\'existe pas'
		})
	}
}

/* Récupération du header bearer */
const extractBearerToken = headerValue => {
	if (typeof headerValue !== 'string') {
		return false
	}

	const matches = headerValue.match(/(Bearer)\s+(\S+)/i)
	return matches && matches[2]
}

/* Récupération du header bearer */
exports.extractBearerTokens = (headerValue) => {
	if (typeof headerValue !== 'string') {
		return false
	}

	const matches = headerValue.match(/(Bearer)\s+(\S+)/i)
	return matches && matches[2]
}
