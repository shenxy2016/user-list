const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/userlist");
mongoose.Promise = global.Promise;



app.use(bodyParser.json());

app.use('/api', require('./apiRouter'));

//handling middleware
app.use(function(err, req, res, next){
    console.log(err);
    res.status(402).send({error: err.message});
})


app.listen(port, () => console.log(`Listening on port ${port}`));