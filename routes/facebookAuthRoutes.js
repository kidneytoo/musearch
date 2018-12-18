const passport = require('passport');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('please login');
  });
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
  );
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );
  app.get('/api/current_user', (req, res) => {
    res.json(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    //res.send(req.user);
    res.redirect('/');
  });
};
