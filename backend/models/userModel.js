import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    // whenever the user will be created , their cart will be one empty object
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
); // mongodb ignores the empty object so that uses this

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
