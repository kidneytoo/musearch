const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectID = Schema.ObjectId;

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  artist: [
    {
      type: ObjectID,
      ref: 'Artist'
    }
  ]
});

mongoose.model('Genre', genreSchema);
