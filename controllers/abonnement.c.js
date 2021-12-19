
var db = require('../services/db');
//Pour la securiter
const jwt = require('jsonwebtoken');


exports.abonnements = async (req, res) => {

	let body = req.body;

	if (!body.id_de_la_carte && !body.cvc) {
		res.status(400).send({
			error: true,
			message: "Une ou plusieurs données obligatoire sont manquantes"
		});
		return;
	}

	//tester si le id-carte existe deja dans la bd
	let data = [];
	await db.collection("abonnement")
		.where('id_de_la_carte', '==', body.id_de_la_carte)
		.get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				data.push({ id: doc.id, data: doc.data() });
			})
		});
	if (data.length >= 1) {
		console.log()
		//si il y au moin un abonnement pour l'id-de-la-carte selectionner
		let ab = await db.collection("abonnement").doc(data[0].id).update({ cvc: body.cvc });
		if (ab) {
			res.status(200).send({
				error: false,
				message: "Votre abonnement a bien été mis à jour"
			});
		} else {
			res.status(402).send({
				error: true,
				message: "Echec du payement de l'offre"
			});
		}

		return;
	}

	//ajout nouveau abonnement.
	const result = await db.collection('abonnement').add({ id_de_la_carte: body.id_de_la_carte, cvc: body.cvc });
	if (result) {
		res.status(200).send({
			error: true,
			message: "Votre période d'essai viens d'être activé - 5min"
		});
	} else {
		res.status(402).send({
			error: true,
			message: "Echec du payement de l'offre"
		});
	}

}


exports.cart = async (req, res) => {
	console.log(req.body);
	let body = req.body;
	if (!body.cartNumber && !body.month && !body.year && !body.default) {
		if (!body.cartNumber) {
			res.status(404).send({
				error: true,
				message: "Veuillez compléter votre profil avec une carte de crédi"
			});
		} else {
			res.status(409).send({
				error: true,
				message: "Une ou plusieurs données sont erronées"
			});
		}

		return;
	}

	//tester si le cartNumber existe deja
	let data = [];
	await db.collection("carte")
		.where('cartNumber', '==', body.cartNumber)
		.get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			})
		});
	if (data.length >= 1) {
		res.status(409).send({
			error: true,
			message: "La carte existe déjà"
		});
		return;
	}

	const result = await db.collection('carte').add({ cartNumber: body.cartNumber, month: body.month, year: body.year, default: body.default });

	if (result) {
		res.status(200).send({
			error: true,
			message: "Vos données on été mises à jour"
		});
	}

}