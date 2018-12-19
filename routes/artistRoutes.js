const mongoose = require('mongoose');

const Artist = mongoose.model('Artist');
const ArtistManager = mongoose.model('ArtistManager');
const Genre = mongoose.model('Genre');
const asyncFunction = require('../helpers/asyncFunction');
const ObjectId = require('mongoose').Types.ObjectId;
const toJson = require('../helpers/toJson');

module.exports = app => {
  app.post('/api/artist', async (req, res) => {
    try {
      const amId = ObjectId(req.body.ownerId);
      let genre = [];
      let genre_name = [];

      let artistManager = await ArtistManager.findById(amId);

      if (!artistManager) {
        return res.status(404).send('ArtistManager Not Found');
      }

      let artist = await Artist.findOne({
        name: req.body.name
      });

      if (artist) {
        return res.status(403).send('Artist Existed');
      }

      let newArtist = new Artist({
        name: req.body.name,
        members: req.body.members,
        description: req.body.description,
        youtubeLink: req.body.youtubeLink,
        owner: artistManager._id,
        url: req.body.url,
        work: []
      });

      await newArtist.save();

      await asyncFunction.asyncForEach(req.body.genre, async element => {
        let gen = await Genre.findOne({
          name: element
        });

        if (gen) {
          let newGenreArtist = gen.artist;
          newGenreArtist.addToSet(newArtist._id);
          gen.set({
            artist: newGenreArtist
          });
          await gen.save();
          genre.push(ObjectId(gen._id));
          genre_name.push(gen.name);
        } else {
          let newGenre = new Genre({
            name: element,
            artist: [newArtist._id]
          });
          await newGenre.save();
          genre.push(ObjectId(newGenre._id));
          genre_name.push(newGenre.name);
        }
      });

      artistManager.artist.push(newArtist._id);

      await artistManager.save();

      //   newArtist.set(req.body);
      //   console.log(newArtist);
      //   newArtist.set({
      //     genre: genre
      //   });

      //   await newArtist.save();

      const response = {
        artist: newArtist,
        genre_name: genre_name
      };

      res.status(200).send(response);
    } catch (e) {
      console.log(e);
      return res.status(500).send(toJson.toJSON(e));
    }
  });

  app.get('/api/artist/:url', async (req, res) => {
    try {
      let artist = await Artist.findOne({ url: req.params.url }).populate({
        path: 'work',
        model: 'Post'
      });

      return res.status(200).json(artist);
    } catch (e) {
      return res.status(500).send(toJson.toJSON(e));
    }
  });

  app.get('/api/artist', async (req, res) => {
    try {
      let allArtist = await Artist.find().populate({
        path: 'work',
        model: 'Post'
      });

      return res.status(200).json(allArtist);
    } catch (e) {
      return res.status(500).send(toJson.toJSON(e));
    }
  });
};
