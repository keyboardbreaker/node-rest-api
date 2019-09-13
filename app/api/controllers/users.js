const userModel = require('../models/users');
const bcrypt = require('bcrypt');
var config = require('../../../config/config');
var standardResponse = require('../../response/standard-res');
var errorHandler = require('../../helper/error-handler');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
    create: function(req, res, next) {
        userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, function(err, result) {
            if (err)
                next(err);
            else {
                res.json({status: "success", message: "User added Successfully!", data: null});
                
            }
        })
    },
    authenticate: function(req, res, next) {
        var profile = [];
        userModel.findOne({email:req.body.email}, function(err, userInfo){
            if(err || userInfo == null) {
                res.json({status:"error", message: "Invalid email/password!!!", data:null});
                next(err);
            } else {
                profile.push(userInfo['_id']);
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = createJWT(userInfo);
                    res.json({ status: "success", message: "user found", data: {user: userInfo, token: token }});
                } else {
                    res.json({ status: "error", message: "invalid email/password", data: null});
                }
            }
            
        });
    }
}

function createJWT(userProfile) {
    var payload = {
        sub: userProfile._id,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix(),
        acc: userProfile.access
    };
    console.log(payload);
    return jwt.encode(payload, config.TOKEN_SECRET);
}