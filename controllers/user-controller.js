const userModel = require("../models/models").userModel;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const salt = await bcrypt.genSalt(10);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Error hashing password" });
        } else {
          const data = { name: name, email: email, password: hash };
          try {
            await userModel.create(data);
            return res
              .status(201)
              .json({ success: true, message: "User created successfully" });
          } catch (err) {
            return res
              .status(500)
              .json({ success: false, message: "Internal server error" });
          }
        }
      });
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    jwt.sign(
      { userId: user._id },
      process.env.PRIVATE_KEY,
      { expiresIn: "30d" },
      function (err, token) {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Error generating token" });
        } else {
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res
            .status(200)
            .json({ success: true, message: "Login successful" });
        }
      }
    );
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;
    const file = req.file;
    const userId = req.userId;
    if (!name || !email || !password || !bio || !file || !userId) {
      return res
        .status(401)
        .json({ success: false, message: "All the fields are required" });
    }
    const salt = await bcrypt.genSalt(10);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Error hashing password" });
        } else {
          const data = {
            name: name,
            email: email,
            password: hash,
            image: req.file.path,
            bio: bio,
          };
          const options = { new: true };
          try {
            await userModel.findByIdAndUpdate(userId, data, options);
            return res
              .status(200)
              .json({ success: true, message: "Profile updated successfully" });
          } catch (err) {
            return res
              .status(401)
              .json({ success: false, message: "Error while updating profile" });
          }
        }
      });
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try{
        const userId=req.userId;
        if(!userId){
          return res.status(401).json({success:false,message:"User id not found"})
        }
        const result=await userModel.findById(userId).select('-password');
        return res.status(200).json({success:true,UserDetails:result});
  }catch(err){
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}