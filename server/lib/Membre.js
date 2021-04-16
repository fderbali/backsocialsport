const DatabaseAccessObject = require('sql-dao').DatabaseAccessObject
const MySqlDatabaseConnection = require('sql-dao').MySqlDatabaseConnection
const NumericValidator = require('sql-dao').validators.NumericValidator
const RequiredValidator = require('sql-dao').validators.RequiredValidator
const LengthValidator = require('sql-dao').validators.LengthValidator

const databaseConfig = require('./../../config/db.config.js'); // your config file

class Membre extends DatabaseAccessObject {
	constructor() {
		super()
		/**
		 * @member {integer}
		 */
		this.id = undefined
		/**
		 * @member {string}
		 */
		this.nom = undefined
		/**
		 * @member {string}
		 */
		this.prenom = undefined
		/**
		 * @member {string}
		 */
		this.email = undefined
		/**
		 * @member {Date}
		 */
		this.date_de_naissance = undefined
		/**
		 * @member {string}
		 */
		this.mot_de_passe = undefined
		/**
		 * @member {string}
		 */
		this.avatar = undefined
		/**
		 * @member {string}
		 */
		this.is_public = undefined
		/**
		 * @member {string}
		 */
		this.is_connected = undefined
		/**
		 * @member {string}
		 */
		this.sexe = undefined
	}

	/**
	 * set up validators
	 */
	initValidators() {
		this.addValidator('id', new NumericValidator(0))
		this.addValidator('nom', new RequiredValidator())
		this.addValidator('nom', new LengthValidator(0, 45))
		this.addValidator('prenom', new RequiredValidator())
		this.addValidator('prenom', new LengthValidator(0, 45))
		this.addValidator('email', new RequiredValidator())
		this.addValidator('email', new LengthValidator(0, 45))
		this.addValidator('date_de_naissance', new RequiredValidator())
		this.addValidator('mot_de_passe', new RequiredValidator())
		this.addValidator('mot_de_passe', new LengthValidator(0, 45))
		this.addValidator('sexe', new RequiredValidator())
		this.addValidator('sexe', new LengthValidator(0, 1))
		this.addValidator('avatar', new LengthValidator(0, 255))
		this.addValidator('is_public', new RequiredValidator())
		this.addValidator('is_public', new LengthValidator(0, Number.POSITIVE_INFINITY))
		this.addValidator('is_connected', new RequiredValidator())
		this.addValidator('is_connected', new LengthValidator(0, Number.POSITIVE_INFINITY))
	}

	/**
	 * Attributes with should be validated (or stored in db)
	 * @returns {string[]}
	 */
	static getAttributeNames() {
		return ['id', 'nom', 'prenom', 'email', 'date_de_naissance', 'mot_de_passe', 'avatar', 'is_public', 'is_connected', 'sexe']
	}

	/**
	 * @returns {Relation[]}
	 */
	static getRelations() {
		return []
	}

	/**
	 * @returns {MySqlDatabaseConnection}
	 */
	static getDatabaseConnection() {
		return new MySqlDatabaseConnection(databaseConfig)
	}

	/**
	 * @returns {string}
	 */
	static getTableName() {
		return 'membre'
	}

	/**
	 * @returns {string}
	 */
	static getPrimaryKey() {
		return 'id'
	}
}

module.exports = Membre
