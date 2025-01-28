const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog_manager', 'root', '123445', {
    dialect:'mysql', host:'localhost'
});

module.exports=sequelize;