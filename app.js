const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');
const Blog = require('./models/blog');
const Comment = require('./models/comments');
const mainRoute = require('./routes/mainRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
app.use(cors());

app.use(bodyParser.json({extended:false}));
app.use('/comments',commentRoutes);
app.use(mainRoute);

//Associations
Comment.belongsTo(Blog, {constraints: true, onDelete:'CASCADE'});
Blog.hasMany(Comment);


sequelize.sync()
.then(result => {
    app.listen(5500);
}).catch(err => console.log(err));
