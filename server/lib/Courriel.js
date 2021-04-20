const DatabaseAccessObject = require('sql-dao').DatabaseAccessObject
const MySqlDatabaseConnection = require('sql-dao').MySqlDatabaseConnection
const NumericValidator = require('sql-dao').validators.NumericValidator
const RequiredValidator = require('sql-dao').validators.RequiredValidator
const LengthValidator = require('sql-dao').validators.LengthValidator

const databaseConfig = require('./../../config/db.config.js') // your config file

class Courriel extends DatabaseAccessObject {
	constructor() {
		super()
		/**
		 * @member {integer}
		 */
		this.id = undefined
		/**
		 * @member {integer}
		 */
		this.id_expediteur = undefined
		/**
		 * @member {integer}
		 */
		this.id_destinataire = undefined
		/**
		 * @member {Date}
		 */
		this.date = undefined
		/**
		 * @member {string}
		 */
		this.message = undefined
		/**
		 * @member {string}
		 */
		this.sujet = undefined
		/**
		 * @member {string}
		 */
		this.courriel_lu = undefined
	}

	/**
	 * set up validators
	 */
	initValidators() {
		this.addValidator('id', new NumericValidator(Number.NEGATIVE_INFINITY))
		this.addValidator('id_expediteur', new RequiredValidator())
		this.addValidator('id_expediteur', new NumericValidator(0))
		this.addValidator('id_destinataire', new RequiredValidator())
		this.addValidator('id_destinataire', new NumericValidator(0))
		this.addValidator('date', new RequiredValidator())
		this.addValidator('message', new RequiredValidator())
		this.addValidator('message', new LengthValidator(0, Number.POSITIVE_INFINITY))
		this.addValidator('sujet', new RequiredValidator())
		this.addValidator('sujet', new LengthValidator(0, 255))
		this.addValidator('courriel_lu', new LengthValidator(1, 1))
	}

	/**
	 * Attributes with should be validated (or stored in db)
	 * @returns {string[]}
	 */
	static getAttributeNames() {
		return ['id', 'id_expediteur', 'id_destinataire', 'date', 'message', 'sujet', 'courriel_lu']
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
		return 'courriel'
	}

	/**
	 * @returns {string}
	 */
	static getPrimaryKey() {
		return 'id'
	}
}

module.exports = Courriel
