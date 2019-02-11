const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./user/User')

passport.use(LocalStrategy);

passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
  },    
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      user.verifyPassword(password).then( res => {
          if(!res) return done(null, false)
          return done(null, user)
      }).catch( err => done(null, err));
      
    });
  }));



passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
  
passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});