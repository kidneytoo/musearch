const mongoose = require('mongoose');
const toJson = require('../helpers/toJson');

const ArtistManager = mongoose.model('ArtistManager');

module.exports = app => {
  app.post(
    '/api/register',

    async (req, res) => {
      let artistManager = await ArtistManager.findOne({
        tel: req.body.tel
      });

      if (artistManager) {
        return res.status(403).send('Manager Existed');
      }

      let newArtistManager = new ArtistManager({
        tel: req.body.tel,
        password: req.body.password
      });

      await newArtistManager.save();

      res.status(200).send('Register Success');
    }
  );

  app.post(
    '/api/login',

    async (req, res) => {
      const tel = req.body.tel;
      const password = req.body.password;

      let artistManager = await ArtistManager.findOne({
        tel
      }).populate({
        path: 'artist',
        model: 'Artist'
      });

      if (!artistManager) {
        return res.status(404).send('User Not Found');
      }

      if (password !== artistManager.password) {
        return res.status(401).send('Password not Matched');
      }

      res.status(200).json(artistManager);
    }
  );

  app.get('/api/artistmanager', async (req, res) => {
    try {
      let artistManager = await ArtistManager.findById(req.body.id).populate({
        path: 'artist',
        model: 'Artist'
      });

      return res.status(200).json(artistManager);
    } catch (e) {
      return res.status(500).send(toJson.toJSON(e));
    }
  });
};
