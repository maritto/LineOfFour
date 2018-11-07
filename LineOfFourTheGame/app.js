const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlencode = require('urlencode');

const gamesRoute = require('./api/routes/games');
const usersRoute = require('./api/routes/users');

const dbUsername = '';
const dbPassword = '';

mongoose.connect(   'mongodb+srv://' + dbUsername + ':' + dbPassword + '@cluster0-pzznl.mongodb.net/test?retryWrites=true',{
    useNewUrlParser:true
}).then(result => {
    console.log('logged in mongodb! ' + result);
}).catch(error => {
    console.log('could not connect to db, error - ' + error);
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use('/games', gamesRoute);
app.use('/users', usersRoute);

module.exports = app;