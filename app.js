const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('./routes/article').router
const cors = require('cors');
const { application } = require('express');

const app = express();

// this is the config file
require('dotenv').config()

// Middleware
app.use(bodyParser.json());
app.use(cors())

// testing endpoint
app.get('/', (req, res) => {
    res.send("we are on home page")
})


// Routes
app.use('/api/', Article)






// connect to database
const mongoURL = process.env.MONGODB_URL

const port = process.env.PORT || 4000;

mongoose.set("strictQuery", true);

mongoose.connect(mongoURL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    app.listen(port, () => {
        console.log(`listening at port ${port} Connected to DB`)

    })
}).catch((err) => {
    console.log(err.message + "000 errrrror")
})

module.exports = app;




