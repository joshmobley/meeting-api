const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')

passport.use(LocalStrategy);

passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
  },    
  function(username, password, done) {
    User
      .findOne({ where: { email: username } })
      .then( user => {

        if (!user) return done(null, false);

        user
          .validatePassword(password)
          .then( valid => {
            if(!valid) return done(null, false)
            return done(null, user)
          })
          .catch( err => done(null, err));

      })
      .catch( err => done(null, 'cannot find user to validate'));
      
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findByPk(id)
        .then(user => done(null, user))
        .catch(err => done(err, null))
  });