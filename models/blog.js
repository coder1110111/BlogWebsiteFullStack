const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Blog = sequelize.define('blog', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    title: {
        allowNull:false,
        type:Sequelize.STRING
    },
    author: {
        type:Sequelize.STRING,
        allowNull: false
    },
    content: {
        allowNull: false,
        type: Sequelize.STRING
    }
})

module.exports = Blog;