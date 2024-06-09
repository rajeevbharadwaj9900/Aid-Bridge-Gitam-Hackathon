const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/airbridge")
  .then(() => {
    console.log('Mongoose connected');
  })
  .catch((e) => {
    console.error('Failed to connect to Mongoose', e);
  });

const signUpSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmpassword: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  introduction: {
    type: String,
    required: true
  }
});

const SignUpCollection = mongoose.model('SignUpCollection', signUpSchema);

module.exports = SignUpCollection;

