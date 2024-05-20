const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: false,
      default:
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png",
    },
  },
  { timestamps: true }
);

const AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;
