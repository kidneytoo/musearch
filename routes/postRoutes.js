const mongoose = require('mongoose');
const toJson = require('../helpers/toJson');

const Artist = mongoose.model('Artist');
const Post = mongoose.model('Post');

module.exports = app => {
  app.post('/api/post', async (req, res) => {
    try {
      let artist = await Artist.findById(req.body.artistID);

      if (!artist) {
        return res.status(404).send('Artist Not Found');
      }

      let post = await Post.findOne({
        topic: req.body.topic
      });

      if (post) {
        return res.status(403).send('Post Existed');
      }

      let newPost = new Post({
        topic: req.body.topic,
        description: req.body.description,
        date: req.body.date,
        tickets: {
          cost: req.body.cost,
          method: req.body.method,
          link: req.body.link
        },
        artist: [req.body.artistID]
      });

      await newPost.save();

      artist.work.push(newPost._id);

      await artist.save();

      res.status(200).send('Post Success');
    } catch (e) {
      console.log(e);
      return res.status(500).send(toJson.toJSON(e));
    }
  });

  app.get('/api/post', async (req, res) => {
    try {
      let allPost = await Post.find()
        .sort({ date: 1 })
        .populate({
          path: 'artist',
          model: 'Artist'
        });

      return res.status(200).json(allPost);
    } catch (e) {
      return res.status(500).send(toJson.toJSON(e));
    }
  });

  app.get('/api/post/:id', async (req, res) => {
    try {
      let post = await Post.findById(req.params.id).populate({
        path: 'artist',
        model: 'Artist'
      });

      return res.status(200).json(post);
    } catch (e) {
      return res.status(500).send(toJson.toJSON(e));
    }
  });
};
