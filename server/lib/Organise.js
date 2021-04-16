const DatabaseAccessObject = require('sql-dao').DatabaseAccessObject
const MySqlDatabaseConnection = require('sql-dao').MySqlDatabaseConnection
const NumericValidator = require('sql-dao').validators.NumericValidator
const RequiredValidator = require('sql-dao').validators.RequiredValidator

const databaseConfig = require('./../../config/db.config.js') // your config file

class Organise extends DatabaseAccessObject {
	constructor() {
		super()
		/**
		 * @member {integer}
		 */
		this.id = undefined
		/**
		 * @member {integer}
		 */
		this.id_membre = undefined
		/**
		 * @member {integer}
		 */
		this.id_activite = undefined
	}

	/**
	 * set up validators
	 */
	initValidators() {
		this.addValidator('id', new NumericValidator(Number.NEGATIVE_INFINITY))
		this.addValidator('id_membre', new RequiredValidator())
		this.addValidator('id_membre', new NumericValidator(0))
		this.addValidator('id_activite', new RequiredValidator())
		this.addValidator('id_activite', new NumericValidator(0))
	}

	/**
	 * Attributes with should be validated (or stored in db)
	 * @returns {string[]}
	 */
	static getAttributeNames() {
		return ['id', 'id_membre', 'id_activite']
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
		return 'organise'
	}

	/**
	 * @returns {string}
	 */
	static getPrimaryKey() {
		return 'id'
	}
}

module.exports = Organise
