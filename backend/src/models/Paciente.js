const { DataTypes } = require('sequelize');
// const  sequelize  = require('./db/index')
const { sequelize } = require('../db/index')
//const FichaClinica = require('./FichaClinica')

const Paciente = sequelize.define('paciente', {
    idPaciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "Codigo unico de identificacion"
    },
    nombre: {
      type: DataTypes.STRING(250),
      allowNull: false,
      comment: "Nombre del paciente"
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Edad del paciente"
    },
    telefono: {
      type: DataTypes.STRING(9),
      allowNull: false,
      comment: "Numero telefonico del paciente"
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Direccion residencial del paciente"
    },
    ocupacion: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "Clase o tipo de trabajo del paciente"
    },
    estadoCivil: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "Situacion de relacion sentimental de una persona"
    },
    referido: {
      type: DataTypes.STRING(250),
      allowNull: true,
      comment: "Doctor que refirio al paciente a la clinica"
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "fecha de creación del registro",
      // get() {
      //   return this.getDataValue('createdAt').toISOString().slice(0,10);
      // }
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "fecha de actualización del registro",
      // get() {
      //   return this.getDataValue('updatedAt').toISOString().slice(0,10);
      // }
    }
  }, {
    tableName: 'paciente',
    timestamps: true, // Si no tienes campos de fecha created_at y updated_at
  });
    
  module.exports = Paciente;
