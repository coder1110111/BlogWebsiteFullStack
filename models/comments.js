const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    comment: {
        allowNull:false,
        type:Sequelize.STRING
    }
});

module.exports = Comment;