const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: Types.ObjectId, ref: 'Post' }],
  likes: [{ type: Types.ObjectId, ref: 'Post' }],
  birthday: { type: Date, default: null },
  profileImg: { type: String, default: null },
  gender: { type: String, default: null },
  bio: { type: String, default: null },
  followers: [{ type: Types.ObjectId, ref: 'User' }],
  following: [{ type: Types.ObjectId, ref: 'User' }]
});

module.exports = model('User', schema);
