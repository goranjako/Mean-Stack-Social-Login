
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var UserSchema = new mongoose.Schema({
    
    google: {
        id: String,
        token: String,
        email: String,
        name: String
      },
      facebook: {
        id: String,
        token: String,
        email: String,
        name: String
      },
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByEmail = function(email, callback){
    var query = { email : email };
    User.findOne(query, callback);
};
module.exports.addUser = function(newUser, callback){
    if(newUser.password!==""){
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                if(err) throw err;
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    }else{
         newUser.save(callback);
    }
};
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};