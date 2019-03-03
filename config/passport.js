var mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy

var ObjUser = new Object();
ObjUser.id = "123";
ObjUser.name = "test";
ObjUser.email = "test@test.com";
ObjUser.instituciones = [];
ObjUser.instituciones.push({});
ObjUser.perfiles = [];
ObjUser.perfiles.push({});
ObjUser.username = "test";

//var User = require('../app/models/usuario');

module.exports = function (passport, config) {
  passport.serializeUser(function (user, done) {

    done(null, ObjUser.id)
  })

  passport.deserializeUser(function (id, done) {
    return done(null, ObjUser)
  })

  passport.use(new LocalStrategy({
    usernameField: 'cedula',
    passwordField: 'password'
  },
    function (cedula, password, done) {
      return done(null, ObjUser)
    }
  ))

  /*
  passport.serializeUser(function (user, done) {
    console.log("1. deserialize User", user.id_str);
    done(null, user.id_str);
  });
  passport.deserializeUser(function (id, done) {
    console.log("2. deserialize User -> ", id);
    User.findOne({ id_str: id }, function (err, user) {
      done(err, user);
    });

  });
  passport.use(new LocalStrategy(
    function (username, password, done) {
      console.log("0. DONE ->", username)
      User.findOne({ id_str: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        return done(null, user);
      });
    }
  ));
 */
}
