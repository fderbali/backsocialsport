const express = require('express');
//const db = require('../db');
const Membre = require('../lib/Membre');
const router = express.Router();
const WhereClause = require('./../../node_modules/sql-dao/lib/WhereClause.js');

router.post('/createmembre', async (req, res, next) => {
	try {
		let membre = new Membre();
		membre.nom = req.body.nom;
		membre.prenom = req.body.prenom;
		membre.email = req.body.email;
		membre.date_de_naissance = req.body.date_de_naissance;
		membre.avatar = "";
		membre.is_public = req.body.is_public;
		membre.is_connected = req.body.is_connected;
		membre.mot_de_passe = req.body.mot_de_passe;
		await membre.insert()
		res.json({ 'success': true, 'insert_id': membre.id });
	} catch (e) {
		res.json({ 'success': false });
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
		res.json(result);
	} catch (e) {
		res.json({ 'success': false });
	}
});

module.exports = router;
