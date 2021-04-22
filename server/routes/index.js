const express = require('express');
//const db = require('../db');
const Membre = require('../lib/Membre');
const Activite = require('../lib/Activite');
const Categorie = require('../lib/Categorie');
const Organise = require('../lib/Organise');
const Participe = require('../lib/Participe');
const Courriel = require('../lib/Courriel');
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

router.post('/sendcourriel', async (req, res) => {
	try {
		let courriel = new Courriel();
		courriel.sujet = req.body.sujet;
		courriel.message = req.body.message;
		courriel.date = req.body.date;
		courriel.id_expediteur = req.body.id_expediteur;
		courriel.id_destinataire = req.body.id_destinataire;
		await courriel.insert();
		res.json({ 'success': true, 'insert_id': courriel.id, 'message': 'Message effetuée avec succès' });
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

router.get("/courriel/:id", async (req, res, next) => {
	try {
		let whereClause = new WhereClause('?? = ?', ['id', req.params.id]); // will prepare params
		let result = await Courriel.find(whereClause);
		res.json(result[0]);
	} catch (e) {
		res.json({ 'success': false });
	}
});

router.get("/courriel/:id/mark_as_read", async (req, res, next) => {
	try {
		courriel = new Courriel();
		courriel.id = req.params.id;
		courriel.courriel_lu = "Y"
		await courriel.update();
		res.json({ 'success': true });
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

router.get("/membre/:id/courriels", async (req, res) => {
	try {
		let whereClause = new WhereClause('?? = ?', ['id_destinataire', req.params.id]);
		let result_courriel = await Courriel.find(whereClause);
		if (result_courriel.length == 0) {
			res.json({ 'success': false });
		} else {
			res.json(result_courriel);
		}
	} catch (e) {
		console.log(e)
		res.json({ 'success': false });
	}
});

router.get("/membre/:id/sentcourriels", async (req, res) => {
	try {
		let whereClause = new WhereClause('?? = ?', ['id_expediteur', req.params.id]);
		let result_courriel = await Courriel.find(whereClause);
		if (result_courriel.length == 0) {
			res.json({ 'success': false });
		} else {
			res.json(result_courriel);
		}
	} catch (e) {
		res.json({ 'success': false });
	}
});

router.get("/activite/:id/membres", async (req, res, next) => {
	try {
		let whereClause = new WhereClause('?? = ?', ['id_activite', req.params.id]);
		let result_id_memb = await Participe.find(whereClause);
		let array_id_membre = [];
		for (element of result_id_memb) {
			array_id_membre.push(element.id_membre);
		}
		liste_id_membre = "(" + array_id_membre.join(",") + ")";
		let whereClausemembres = new WhereClause('id IN ' + liste_id_membre, []);
		let membres = await Membre.find(whereClausemembres);
		res.json(membres);
	} catch (e) {
		res.json({ 'success': false });
	}
});

router.get("/activite/:id/organisateur", async (req, res, next) => {
	try {
		let whereClause = new WhereClause('?? = ?', ['id_activite', req.params.id]);
		let result_id_memb = await Organise.find(whereClause);
		let array_id_membre = [];
		for (element of result_id_memb) {
			array_id_membre.push(element.id_membre);
		}
		liste_id_membre = "(" + array_id_membre.join(",") + ")";
		let whereClausemembres = new WhereClause('id IN ' + liste_id_membre, []);
		let membres = await Membre.find(whereClausemembres);
		res.json(membres[0]);
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

router.post("/membre/desinscrire", async (req, res, next) => {
	try {
		participe = new Participe();
		participe.id_activite = req.body.id_activite;
		participe.id_membre = req.body.id_membre;
		await participe.delete();
		res.json({ 'message': 'Vous êtes désormais désinscrit de cette activité !' });
	} catch (e) {
		console.log(e);
		res.json({ 'message': 'Désinscription échouée ! Veuillez re-essayer plus tard !' });
	}
});

router.post("/membre/check_inscription", async (req, res) => {
	try {
		whereClause = new WhereClause('?? = ? AND ?? = ?', ['id_membre', req.body.id_membre, 'id_activite', req.body.id_activite]);
		result = await Participe.find(whereClause);
		if (result[0]) {
			value_to_return = { 'subscribed': true };
		} else {
			value_to_return = { 'subscribed': false };
		}
		res.json(value_to_return);
	} catch (e) {
	}
});

module.exports = router;
