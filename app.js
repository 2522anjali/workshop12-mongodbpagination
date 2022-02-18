const express = require('express');
const bodyParser = require('body-parser');
const user = require('./route/user.route')
const app = express();
const db = require('./db.js');

app.use(bodyParser.json({ limit : '25mb'}));
app.use(bodyParser.urlencoded({limit:'25mb',extended:true}));
app.use('/user', user.getRouter());


app.listen(443, () =>
    console.log('up and running')
);