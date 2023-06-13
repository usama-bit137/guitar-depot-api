const mongoose = require('mongoose');

const guitarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A guitar requires a name'],
    unique: true,
  },
  manufacturer: {
    type: String,
    required: [true, 'A guitar requires a manufacturer'],
  },
  introduced: {
    type: Number,
    required: [true, 'A guitar requires a year of introduction'],
  },
  neck: {
    type: Array,
  },
  fretboard: {
    type: Array,
  },
  body: {
    type: Array,
  },
  scale: {
    type: Number,
  },
  bridge: {
    type: String,
  },
  pickups: {
    type: String,
  },
  desc: {
    type: String,
    default: 'Description',
    required: [true, 'A guitar requires a description'],
  },
  img: {
    type: String,
  },
});

const Guitar = mongoose.model('Guitar', guitarSchema);
module.exports = Guitar;
