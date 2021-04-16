const DatabaseAccessObject = require('sql-dao').DatabaseAccessObject
const MySqlDatabaseConnection = require('sql-dao').MySqlDatabaseConnection
const NumericValidator = require('sql-dao').validators.NumericValidator
const RequiredValidator = require('sql-dao').validators.RequiredValidator
const LengthValidator = require('sql-dao').validators.LengthValidator

const databaseConfig = require('./../../config/db.config.js') // your config file

class Categorie extends DatabaseAccessObject {
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
	}

	/**
	 * set up validators
	 */
	initValidators() {
		this.addValidator('id', new NumericValidator(0))
		this.addValidator('nom', new RequiredValidator())
		this.addValidator('nom', new LengthValidator(0, 45))
	}

	/**
	 * Attributes with should be validated (or stored in db)
	 * @returns {string[]}
	 */
	static getAttributeNames() {
		return ['id', 'nom']
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
		return 'categorie'
	}

	/**
	 * @returns {string}
	 */
	static getPrimaryKey() {
		return 'id'
	}
}

module.exports = Categorie
