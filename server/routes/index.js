const express = require('express');
//const db = require('../db');
const Membre = require('../lib/Membre');
const Activite = require('../lib/Activite');
const Categorie = require('../lib/Categorie');
const router = express.Router();
const WhereClause = require('./../../node_modules/sql-dao/lib/WhereClause.js');

router.post('/createmembre', async (req, res, next) => {
	try {
		// On commence par vérifier la présence du mail :
		let whereClause = new WhereClause('?? = ?', ['email', req.body.email]); // will prepare params
		let result = await Membre.find(whereClause);
		if (result.length == 1) {
			res.json({ 'success': false, 'message': 'Votre adresse email est déjà sur notre base de données !' });
		}
		let membre = new Membre();
		membre.nom = req.body.nom;
		membre.prenom = req.body.prenom;
		membre.email = req.body.email;
		membre.date_de_naissance = req.body.date_de_naissance;
		membre.is_public = req.body.is_public;
		membre.is_connected = req.body.is_connected;
		membre.mot_de_passe = req.body.mot_de_passe;
		membre.sexe = req.body.sexe;
		membre.avatar = "";
		await membre.insert()
		res.json({ 'success': true, 'insert_id': membre.id, 'message': 'Enregistrement effetuée avec succès' });
	} catch (e) {
		res.json({ 'success': false, 'message': 'Une erreur s\'est produite, veuillez réessayer plus tard !' });
	}
});

router.post('/addactivite', async (req, res, next) => {
	try {
		let activite = new Activite();
		activite.nom = req.body.nom;
		activite.lieu = req.body.lieu;
		activite.nombre = req.body.nombre;
		activite.id_categorie = req.body.categorie;
		activite.debut = req.body.date_debut_activite;
		activite.fin = req.body.date_fin_activite;
		activite.description = req.body.description;
		await activite.insert();
		res.json({ 'success': true, 'insert_id': activite.id, 'message': 'Enregistrement effetuée avec succès' });
	} catch (e) {
		console.log(e);
		res.json({ 'success': false, 'message': 'Une erreur s\'est produite, veuillez réessayer plus tard !' });
	}
});

router.post('/login', async (req, res, next) => {
	try {
		let whereClause = new WhereClause('?? = ? AND ?? = ?', ['email', req.body.email, 'mot_de_passe', req.body.mot_de_passe]);
		let result = await Membre.find(whereClause);
		if (result.length == 1) {
			res.json({ 'success': true, 'message': `Bienvenue ${result[0].nom} ${result[0].prenom}` });
		} else {
			res.json({ 'success': false, 'message': `Mauvaises informations de connexion` });
		}
	} catch (e) {
		res.json({ 'success': false, 'message': 'Une erreur s\'est produite, veuillez réessayer plus tard !' });
	}
});

router.get("/membre", async (req, res, next) => {
	try {
		let results = await Membre.find();
		res.json(results);
	} catch (e) {
		res.json({ 'success': false });
	}
});
router.get("/membre/:id", async (req, res, next) => {
	try {
		let whereClause = new WhereClause('?? = ?', ['id', req.params.id]); // will prepare params
		let result = await Membre.find(whereClause);
		console.log(result[0]);
		res.json(result[0]);
	} catch (e) {
		res.json({ 'success': false });
	}
});

router.get("/categorie", async (req, res, next) => {
	try {
		let results = await Categorie.find();
		res.json(results);
	} catch (e) {
		res.json({ 'success': false });
	}
});

module.exports = router;
