const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
      type: String,
      required: true
    },
    root: {
        type: Boolean
    }
});

module.exports = model('User', UserSchema);
