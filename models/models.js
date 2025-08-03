const mongoose = require("mongoose");

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
    bio: {
      type: String,
      default: "",
    },
    image:{
      type:String,
      default:""
    }
  },
  { timestamps: true }
);

exports.userModel=mongoose.model("User",userSchema);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref:"User",
      required: true,
    }
  },
  { timestamps: true }
);

exports.postModel=mongoose.model("Post",postSchema);