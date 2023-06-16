const mongoose = require('mongoose');
const slugify = require('slugify');

const guitarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A guitar requires a name'],
      unique: true,
    },
    manufacturer: {
      type: String,
      required: [true, 'A guitar requires a manufacturer'],
    },
    slug: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

guitarSchema.virtual('scaleCm').get(function () {
  return this.scale * 2.54;
});

guitarSchema.pre('save', function (next) {
  this.slug = slugify(`${this.manufacturer}-${this.name}`, { lower: true });
  next();
});

guitarSchema.pre('save', function (next) {
  console.log('Saving document...');
  next();
});

guitarSchema.post('save', function (document, next) {
  console.log(document);
  next();
});

const Guitar = mongoose.model('Guitar', guitarSchema);
module.exports = Guitar;
