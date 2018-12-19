const toJson = require('../helpers/toJson');

module.exports = app => {
  app.post('/api/post', (req, res) => {
    res.json(req.user);
  });
};
