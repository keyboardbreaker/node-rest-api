function errorResponse(err) {
    this._response = {
      status: false,
      message: err.message,
      description: err.code,
      stack: JSON.stringify(err.stack)
    };  
  };
  
  errorResponse.prototype.getResponse = function() {
    return this._response;
  };
  
  module.exports = errorResponse;