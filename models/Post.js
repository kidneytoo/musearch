const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectID = Schema.ObjectId;

const postSchema = new Schema({
  topic: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  date: [
    {
      type: Date,
      required: true
    }
  ],
  tickets: {
    cost: [
      {
        type: Number,
        required: true
      }
    ],
    method: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  artist: [
    {
      type: ObjectID,
      ref: 'Artist'
    }
  ]
});

mongoose.model('Post', postSchema);
