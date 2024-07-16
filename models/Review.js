const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  wardrobeItemId: { type: Schema.Types.ObjectId, ref: 'WardrobeItem' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
