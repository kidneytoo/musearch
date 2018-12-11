const passport = require('passport');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('please login');
  });
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    })
  );
  app.get('/profile', (req, res) => {
    console.log(req.user);
    res.json(req.user);
  });
};
