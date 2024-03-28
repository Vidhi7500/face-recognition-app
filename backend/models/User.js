const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const FaceBiometricSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  facialData: {
    landmarks: {
      type: [String], 
      required: true,
    },
    descriptors: {
      type: [Number],
      required: true,
    },
  },
});

const User = mongoose.model('User', userSchema);
const FaceBiometric = mongoose.model('FaceBiometric', FaceBiometricSchema);

module.exports = {User, FaceBiometric};
