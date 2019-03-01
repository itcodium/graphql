

// expose this function to our app using module.exports
module.exports = function(passport,LocalStrategy,User) {
   /* passport.serializeUser(function(user, done) {
        console.log("passport.serializeUser",user );
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        console.log("deserialize User",id );
        User.findOne({ 'id_str' :  id }, function(err, user) {
            console.log("deserialize User -> done",user );
            done(err, user);
        });
    });

    passport.use( 'local', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'id_str',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(username, password, done) {
        console.log("Buscar usuario -> ");
        User.findOne({ 'id_str' :  id }, function (err, user) {
            console.log("Buscar usuario -> ");
                if (err) { 
                  return done(err);
                }
                if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
                }
                
                return done(null, user);
              });
    }));
    */


 passport.serializeUser(function(user, done) {
    console.log("1. deserialize User",user.id_str );
    done(null, user.id_str);
});

passport.deserializeUser(function(id, done) {
    console.log("2. deserialize User -> ",id );
      User.findOne({ id_str: id }, function(err, user) {
        done(err, user);
      });
  
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("0. DONE ->",username)
    User.findOne({ id_str: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      return done(null, user);
    });
  }
));

};