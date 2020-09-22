const { Schema, model } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: { type: Date },
  gender: { type: String },
  bio: { type: String }
});

module.exports = model('User', schema);
