var db = require('../services/db');
//Pour la securiter
const jwt = require('jsonwebtoken');

const checkTokenMiddleware = require("../controllers/security_token.js");


exports.songs = async (req, res) => {
    let token = checkTokenMiddleware.extractBearerTokens(req.headers.authorization);
    //verifier si l'utlisateur a le token dans le bd
    let id = "";
    await db.collection('tokens').where('token', '==', token)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                id = doc.id;
            })
        })

    if (id != "") {
        let data = [];
        await db.collection("songs")
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        cover: doc.data().cover,
                        time: doc.data().time,
                        type: doc.data().type,
                        createdAt: doc.data().createdAt,
                        updatedAt: doc.data().updatedAt,
                    });
                })
            });
        res.status(200).send({
            error: false,
            message: { songs: data }
        });
    } else {
        res.status(403).send({
            error: false,
            message: "Votre abonnement ne permet pas d'accéder à la ressource"
        });
    }
}

exports.OneSong = async (req, res) => {
    let token = checkTokenMiddleware.extractBearerTokens(req.headers.authorization);
    //verifier si l'utlisateur a le token dans le bd
    let id = "";
    await db.collection('tokens').where('token', '==', token)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                id = doc.id;
            })
        })

    if (id != "") {
        let data = {};
        await db.collection("songs")
            .where("id" ,"==" ,req.params.id)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data = {
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        cover: doc.data().cover,
                        time: doc.data().time,
                        type: doc.data().type,
                        createdAt: doc.data().createdAt,
                        updatedAt: doc.data().updatedAt,
                    }
                })
            });
        res.status(200).send({
            error: false,
            message: {  songs: data }
        });
    } else {
        res.status(403).send({
            error: false,
            message: "Votre abonnement ne permet pas d'accéder à la ressource"
        });
    }
}