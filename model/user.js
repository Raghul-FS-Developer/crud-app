var mongoose = require("mongoose");
var { Schema } = mongoose;
var validator = require("validator");

var user = new Schema(
  {
    image: {
      require: true,
      type: String,
    },
    name: {
      require: true,
      type: String,
    },
    age: {
      require: true,
      type: String,
    },
    role: {
      require: true,
      type: String,
    },
    project: {
      require: true,
      type: String,
    },
    mobile: {
      require: true,
      type: String,
    },
    email: {
      unique: true,
      require: true,
      lowercase: true,
      type: String,
      validate: (value) => {
        return validator.isEmail(value);
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", user);
