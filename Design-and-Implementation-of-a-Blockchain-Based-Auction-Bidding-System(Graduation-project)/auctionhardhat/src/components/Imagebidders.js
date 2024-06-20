const mongoose = require('mongoose');

const ImagebiddersSchema = new mongoose.Schema({
  ID: Number,
  userbid: String,
  amount: String,
}, {
  collection: 'Imagebidders',
});

const Imagebidders  = mongoose.model('Imagebidders', ImagebiddersSchema);

module.exports = Imagebidders;

module.exports = mongoose.model('Imagebidders', ImagebiddersSchema);;