const { model, Schema } = require("mongoose");
const COLLECTION_NAME = "Users";
const DOCUMENT_NAME = " User";
const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

const userModel = model(DOCUMENT_NAME, userSchema, COLLECTION_NAME);
module.exports = userModel;
