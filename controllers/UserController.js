'use strict';

var userService = require('../services/UserService');



exports.register = function(req, res, next) {
	var entity = req.body;
	if(!entity.firstName || !entity.email) {
    next({code: 400, message: 'First name or email address cannot be null or empty'});
  }
  
  userService.register(entity, function(err, response) {
  	if(err) {
  		return next(err);
  	}
  	req.data={
  		statusCode: 201,
  		content: response
  	};
  	next();
  });
};


exports.login = function(req, res, next) {
  console.log('login called');
  var entity = req.body;
  if(!entity.email || !entity.password) {
    next({code: 400, message: 'Email or pasword is missing'});
  }
userService.login(entity, function(err, response){
  if(err){
    return next(err);
  }
  if(response){
  req.data={
      statusCode: 200,
      content: 'Hi, ' + response.firstName + ' you are welcome here'
    };
  }
  else{
  req.data={
      statusCode: 404,
      content: 'Login failed for ' + entity.email + ', incorrect email or password'
    };
    
  }
  next();
});    

};

exports.update = function(req, res, next) {
	
}
