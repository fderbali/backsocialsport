const DatabaseAccessObject = require('sql-dao').DatabaseAccessObject
const MySqlDatabaseConnection = require('sql-dao').MySqlDatabaseConnection
const NumericValidator = require('sql-dao').validators.NumericValidator
const LengthValidator = require('sql-dao').validators.LengthValidator
const RequiredValidator = require('sql-dao').validators.RequiredValidator

const databaseConfig = require('./../../config/db.config.js') // your config file

class Activite extends DatabaseAccessObject {
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
		this.lieu = undefined
		/**
		 * @member {integer}
		 */
		this.nombre = undefined
		/**
		 * @member {integer}
		 */
		this.id_categorie = undefined
		/**
		 * @member {Date}
		 */
		this.debut = undefined
		/**
		 * @member {Date}
		 */
		this.fin = undefined
		/**
		 * @member {string}
		 */
		this.description = undefined
	}

	/**
	 * set up validators
	 */
	initValidators() {
		this.addValidator('id', new NumericValidator(0))
		this.addValidator('nom', new LengthValidator(0, 100))
		this.addValidator('lieu', new LengthValidator(0, 255))
		this.addValidator('nombre', new NumericValidator(Number.NEGATIVE_INFINITY))
		this.addValidator('id_categorie', new RequiredValidator())
		this.addValidator('id_categorie', new NumericValidator(0))
		this.addValidator('debut', new RequiredValidator())
		this.addValidator('fin', new RequiredValidator())
		this.addValidator('description', new LengthValidator(0, 255))
	}

	/**
	 * Attributes with should be validated (or stored in db)
	 * @returns {string[]}
	 */
	static getAttributeNames() {
		return ['id', 'nom', 'lieu', 'nombre', 'id_categorie', 'debut', 'fin', 'description']
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
		return 'activite'
	}

	/**
	 * @returns {string}
	 */
	static getPrimaryKey() {
		return 'id'
	}
}

module.exports = Activite
