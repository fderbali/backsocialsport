-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sport_plus
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `sport_plus` ;

-- -----------------------------------------------------
-- Schema sport_plus
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sport_plus` DEFAULT CHARACTER SET utf8 ;
USE `sport_plus` ;

-- -----------------------------------------------------
-- Table `sport_plus`.`membre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sport_plus`.`membre` ;

CREATE TABLE IF NOT EXISTS `sport_plus`.`membre` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `prenom` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `date_de_naissance` DATE NOT NULL,
  `mot_de_passe` VARCHAR(45) NOT NULL,
  `avatar` VARCHAR(255) NULL,
  `is_public` ENUM('Y', 'N') NOT NULL,
  `is_connected` ENUM('Y', 'N') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sport_plus`.`categorie`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sport_plus`.`categorie` ;

CREATE TABLE IF NOT EXISTS `sport_plus`.`categorie` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sport_plus`.`activite`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sport_plus`.`activite` ;

CREATE TABLE IF NOT EXISTS `sport_plus`.`activite` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(100) NULL,
  `lieu` VARCHAR(255) NULL,
  `nombre` INT NULL,
  `id_categorie` INT UNSIGNED NOT NULL,
  `debut` DATETIME NOT NULL,
  `fin` DATETIME NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_activite_categorie_idx` (`id_categorie` ASC),
  CONSTRAINT `fk_activite_categorie`
    FOREIGN KEY (`id_categorie`)
    REFERENCES `sport_plus`.`categorie` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sport_plus`.`courriel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sport_plus`.`courriel` ;

CREATE TABLE IF NOT EXISTS `sport_plus`.`courriel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_expediteur` INT UNSIGNED NOT NULL,
  `id_destinataire` INT UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL,
  `message` TEXT NOT NULL,
  `sujet` VARCHAR(255) NOT NULL,
  `courrielcol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_courriel_membre1_idx` (`id_expediteur` ASC),
  INDEX `fk_courriel_membre2_idx` (`id_destinataire` ASC),
  CONSTRAINT `fk_courriel_membre1`
    FOREIGN KEY (`id_expediteur`)
    REFERENCES `sport_plus`.`membre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_courriel_membre2`
    FOREIGN KEY (`id_destinataire`)
    REFERENCES `sport_plus`.`membre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sport_plus`.`centre_interets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sport_plus`.`centre_interets` ;

CREATE TABLE IF NOT EXISTS `sport_plus`.`centre_interets` (
  `id_membre` INT UNSIGNED NOT NULL,
  `id_categorie` INT UNSIGNED NOT NULL,
  `centre_interetscol` VARCHAR(45) NULL,
  PRIMARY KEY (`id_membre`, `id_categorie`),
  INDEX `fk_centre_interets_categorie1_idx` (`id_categorie` ASC),
  CONSTRAINT `fk_centre_interets_membre1`
    FOREIGN KEY (`id_membre`)
    REFERENCES `sport_plus`.`membre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_centre_interets_categorie1`
    FOREIGN KEY (`id_categorie`)
    REFERENCES `sport_plus`.`categorie` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sport_plus`.`organise`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sport_plus`.`organise` ;

CREATE TABLE IF NOT EXISTS `sport_plus`.`organise` (
  `id_membre` INT UNSIGNED NOT NULL,
  `id_activite` INT UNSIGNED NOT NULL,
  `organisecol` VARCHAR(45) NULL,
  PRIMARY KEY (`id_membre`, `id_activite`),
  INDEX `fk_organise_activite1_idx` (`id_activite` ASC),
  CONSTRAINT `fk_organise_membre1`
    FOREIGN KEY (`id_membre`)
    REFERENCES `sport_plus`.`membre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_organise_activite1`
    FOREIGN KEY (`id_activite`)
    REFERENCES `sport_plus`.`activite` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sport_plus`.`participe`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sport_plus`.`participe` ;

CREATE TABLE IF NOT EXISTS `sport_plus`.`participe` (
  `id_membre` INT UNSIGNED NOT NULL,
  `id_activite` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_membre`, `id_activite`),
  CONSTRAINT `fk_participe_membre1`
    FOREIGN KEY (`id_membre`)
    REFERENCES `sport_plus`.`membre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
