const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wardrobeItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  imageUrl: String,
  description: String,
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WardrobeItem', wardrobeItemSchema);
