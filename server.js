require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const routes = require('./routes/route');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString,{ useNewUrlParser: true, useUnifiedTopology: true});
const database = mongoose.connection;
database.on('error', (error) => {
    console.log('not working')
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(bodyparser.json());

app.use('/api',routes);

app.listen(100, () => {
    console.log(`Server Started at ${100}`)
})

module.exports = app;