const express = require('express');
//const db = require('../db');
const Membre = require('../lib/Membre');
const Activite = require('../lib/Activite');
const Categorie = require('../lib/Categorie');
const Organise = require('../lib/Organise');
const Participe = require('../lib/Participe');
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

		// On cherche l'ID de l'utilisateur
		let whereClause = new WhereClause('?? = ?', ['email', req.body.userConnected]); // will prepare params
		let result = await Membre.find(whereClause);
		if (result.length == 1) {
			id_current_user = result[0].id;
		}
		let organise = new Organise();
		organise.id_membre = id_current_user;
		organise.id_activite = activite.id;
		await organise.insert();
		res.json({ 'success': true, 'insert_id': activite.id, 'message': 'Enregistrement effetuée avec succès' });
	} catch (e) {
		res.json({ 'success': false, 'message': 'Une erreur s\'est produite, veuillez réessayer plus tard !' });
	}
});

router.post('/login', async (req, res, next) => {
	try {
		let whereClause = new WhereClause('?? = ? AND ?? = ?', ['email', req.body.email, 'mot_de_passe', req.body.mot_de_passe]);
		let result = await Membre.find(whereClause);
		if (result.length == 1) {
			res.json({ 'success': true, 'id': result[0].id, 'message': `Bienvenue ${result[0].nom} ${result[0].prenom}` });
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

router.get("/activite", async (req, res, next) => {
	try {
		let results = await Activite.find();
		res.json(results);
	} catch (e) {
		res.json({ 'success': false });
	}
});

router.get("/activite/:id", async (req, res, next) => {
	try {
		let whereClause = new WhereClause('?? = ?', ['id', req.params.id]); // will prepare params
		let result = await Activite.find(whereClause);
		res.json(result[0]);
	} catch (e) {
		res.json({ 'success': false });
	}
});

router.get("/membre/:id/activites", async (req, res, next) => {
	try {
		let whereClause = new WhereClause('?? = ?', ['id_membre', req.params.id]);
		let result_id_activ = await Organise.find(whereClause);
		let array_id_activite = [];
		for (element of result_id_activ) {
			array_id_activite.push(element.id_activite);
		}
		liste_id_activite = "(" + array_id_activite.join(",") + ")";
		let whereClauseActivites = new WhereClause('id IN ' + liste_id_activite, []);
		let activites = await Activite.find(whereClauseActivites);
		res.json(activites);
	} catch (e) {
		res.json({ 'success': false });
	}
});

router.post("/membre/inscrire", async (req, res, next) => {
	try {
		let participe = new Participe();
		participe.id_activite = req.body.id_activite;
		participe.id_membre = req.body.id_membre;
		await participe.insert();
		res.json({ 'message': 'Vous êtes désormais enregistré pour cette activité !' });
	} catch (e) {
		console.log(e);
		res.json({ 'message': 'Enregistrement échouée ! Veuillez re-essayer plus tard !' });
	}
});

module.exports = router;
