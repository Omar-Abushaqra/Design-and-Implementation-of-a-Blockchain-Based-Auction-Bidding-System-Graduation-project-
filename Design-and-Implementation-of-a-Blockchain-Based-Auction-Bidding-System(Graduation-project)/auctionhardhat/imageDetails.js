/* const mongoose = require("mongoose");

const ImageDetailsSchema = new mongoose.Schema(
  {
    image: String,
    category: String, 
    duration: Number, 
  },
  {
    collection: "ImageDetails",
  }
);

module.exports = mongoose.model("ImageDetails", ImageDetailsSchema);
 */



const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ImageDetailsSchema = new mongoose.Schema({
  itemID: { type: Number, unique: true },
  image: String,
  category: String,
  duration: Number,
  endTime: Date,
  sellerWallet: String,
  winner: String,

}, {
  collection: 'ImageDetails',
});

ImageDetailsSchema.plugin(AutoIncrement, { inc_field: 'itemID' });

const ImageDetails = mongoose.model('ImageDetails', ImageDetailsSchema);

module.exports = ImageDetails;


ImageDetailsSchema.pre('save', function(next) {
  const currentTime = new Date();
  const durationInMinutes = this.duration;
  const endTime = new Date(currentTime.getTime() + durationInMinutes * 60000); // Calculate end time by adding duration in milliseconds
  this.endTime = endTime;
  next();
});

module.exports = mongoose.model("ImageDetails", ImageDetailsSchema);