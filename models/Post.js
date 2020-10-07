const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  image: { type: String, required: true },
  author: { type: Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Types.ObjectId, ref: 'User' }],
  date: { type: Date, default: Date.now() },
  text: { type: String },
  public_id: { type: String },
  hashtags: { type: String }
});

module.exports = model('Post', schema);
