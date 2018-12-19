const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectID = Schema.ObjectId;

const artistManagerSchema = new Schema({
  tel: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  artist: [
    {
      type: ObjectID,
      ref: 'Artist'
    }
  ]
});

mongoose.model('ArtistManager', artistManagerSchema);
