const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: Types.ObjectId, ref: 'Post' }],
  likes: [{ type: Types.ObjectId, ref: 'Post' }],
  birthday: { type: Date },
  gender: { type: String },
  bio: { type: String }
});

module.exports = model('User', schema);
