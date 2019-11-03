var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
var config = require('../config/database');
var passportFacebook = require('../config/auth');
var passportGoogle = require('../config/auth');
var jwt = require('jsonwebtoken');
var token;


// FACEBOOK ROUTES 
router.get('/auth/facebook',
passportFacebook.authenticate('facebook', { scope: 'email' })
);


router.get('/auth/facebook/callback',
passportFacebook.authenticate('facebook',{failureRedirect:'http://localhost:4200'}), function(req, res) {
// Successful authentication, redirect home.
var user = {
  name: req.user.facebook.name,
  email: req.user.facebook.email
};
token = jwt.sign(user, config.secret, {
    expiresIn : 604800 //1week
});
res.redirect('http://localhost:4200/home/?token='+token);
});

// GOOGLE ROUTES 
router.get("/auth/google",
  passportGoogle.authenticate("google", {scope: [ 'profile','email'] })
);

router.get("/auth/google/callback",
	passportGoogle.authenticate("google", { failureRedirect: "http://localhost:4200", session: false }),
	function(req, res) {
		var user = {
      name: req.user.google.name,
      email: req.user.google.email  
  };
  token = jwt.sign(user, config.secret, {
      expiresIn : 604800 //1week
  });
		res.redirect("http://localhost:4200/home/?token="+token);
	}
); 

 // LOGOUT 
 router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
  return res.json({'success': true, "message": "user logout successfully"});
});


module.exports = router;  
