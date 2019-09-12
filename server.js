const express = require('express'); 
const logger = require('morgan');
const opportunities = require('./routes/opportunities') ;
const users = require('./routes/users');
const mongoose = require('./config/database');
var jwt = require('jsonwebtoken');

var cors = require('cors');
const app = express();


app.use(cors());

app.set('secretKey', 'nodeRestApi'); // jwt secret token
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));

// Configure bodyParser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.json({"tutorial" : "Client Portal REST API"});
    console
});

app.use('/users', users);
app.use('/opportunities', validateUser, opportunities);

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
            res.json({status:"error", message: err.message, data:null});
        }else{
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
    console.log(err);
    if(err.status === 404)
        res.status(404).json({message: "Not found"});
    else 
        res.status(500).json({message: "Something looks wrong :( !!!"});
});

app.listen(3001, function(){ console.log('Node server listening on port 3001');});