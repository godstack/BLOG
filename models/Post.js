const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Types.ObjectId, ref: 'User' }],
  text: { type: String }
});

module.exports = model('Post', schema);
