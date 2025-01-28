const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');
const Blog = require('./models/blog');
const Comment = require('./models/comments');
const mainroute = require('./routes/mainRoutes');

const app = express();
app.use(cors());

app.use(bodyParser.json({extended:false}));
app.use(mainroute);

//Associations
Comment.belongsTo(Blog, {constraints: true, onDelete:'CASCADE'});
Blog.hasMany(Comment);


sequelize.sync({force:true})
.then(result => {
    app.listen(5500);
}).catch(err => console.log(err));
