const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('FacebookUsers');

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'email', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        userId: profile.id
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = await new User({
          userId: profile.id,
          email: profile._json.email,
          firstname: profile._json.first_name,
          lastname: profile._json.last_name,
          followArtists: []
        }).save();
        done(null, user);
      }
    }
  )
);
