const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectID = Schema.ObjectId;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  genre: {
    type: ObjectID,
    ref: 'Genre'
  },
  members: [
    {
      name: {
        type: String
      },
      nickname: {
        type: String
      },
      play: {
        type: String
      }
    }
  ],
  description: {
    type: String,
    required: true
  },
  youtubeLink: [
    {
      type: String
    }
  ],
  work: [
    {
      type: ObjectID,
      ref: 'Post'
    }
  ],
  owner: {
    type: ObjectID,
    ref: 'ArtistManager'
  },
  userFollow: {
    type: ObjectID,
    ref: 'FacebookUsers'
  },
  url: {
    type: String,
    required: true,
    unique: true
  }
});

mongoose.model('Artist', artistSchema);
