const DatabaseAccessObject = require('sql-dao').DatabaseAccessObject
const MySqlDatabaseConnection = require('sql-dao').MySqlDatabaseConnection
const RequiredValidator = require('sql-dao').validators.RequiredValidator
const NumericValidator = require('sql-dao').validators.NumericValidator
const LengthValidator = require('sql-dao').validators.LengthValidator

const databaseConfig = require('./../../config/db.config.js') // your config file

class Centre_interets extends DatabaseAccessObject {
	constructor() {
		super()
		/**
		 * @member {integer}
		 */
		this.id_membre = undefined
		/**
		 * @member {integer}
		 */
		this.id_categorie = undefined
		/**
		 * @member {string}
		 */
		this.centre_interetscol = undefined
	}

	/**
	 * set up validators
	 */
	initValidators() {
		this.addValidator('id_membre', new RequiredValidator())
		this.addValidator('id_membre', new NumericValidator(0))
		this.addValidator('id_categorie', new RequiredValidator())
		this.addValidator('id_categorie', new NumericValidator(0))
		this.addValidator('centre_interetscol', new LengthValidator(0, 45))
	}

	/**
	 * Attributes with should be validated (or stored in db)
	 * @returns {string[]}
	 */
	static getAttributeNames() {
		return ['id_membre', 'id_categorie', 'centre_interetscol']
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
		return 'centre_interets'
	}

	/**
	 * @returns {string}
	 */
	static getPrimaryKey() {
		return 'id_categorie'
	}
}

module.exports = Centre_interets
