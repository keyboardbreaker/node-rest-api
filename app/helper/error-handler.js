// var email = require('./email');
var advErrorRes = require('../response/error-response');

var errorHandler = {
  handle: function log(err, res) {
    advancedResponse = new advErrorRes(err);
    //email.notify(err);
    if(res != undefined) {
      return res.status(500).send(advancedResponse.getResponse());
    }
  }
};

module.exports = errorHandler;