var config = require('../../config/config');

function standardResponse(resData) {
  if(resData == undefined) {
    resData = {
      status: false,
      message: '',
      data: []
    }
  }
  this._response = {
    status: resData.status,
    message: resData.message,
    data: resData.results
  };
};

standardResponse.prototype.getResponse = function() {
  return this._response;
};

standardResponse.prototype.setResponse = function(responseData) {
  this._response.status = responseData.status || false;
  this._response.message = responseData.message || '';
  this._response.data = responseData.results || [];
};

standardResponse.prototype.notAuthoristedResponse = function() {
  this._response.status = false;
  this._response.message = config.RESPONSE_MESSAGE.UNAUTHORISTED;
  this._response.data = [];
  return this._response;
}

module.exports = standardResponse;