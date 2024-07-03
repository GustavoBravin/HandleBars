const conn = require ("../db/conn");
const {DataTypes} = require ("sequelize");

const Jogo = conn.define ("Jogo", {
    nome: {
        type: DataTypes.STRING,
        required: true,
    },

    valorJogo: {
        type: DataTypes.STRING,
        required: true,
    },

    descricaoJogo: {
        type: DataTypes.STRING,
        required: true,
    },
});

module.exports = Jogo;