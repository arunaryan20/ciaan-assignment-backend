const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
    jwt.verify(token,process.env.PRIVATE_KEY, function (err, decoded) {
        if(err){
            return res.status(401).json({success:false,message:"Invalid token"});
        }
        req.userId=decoded.userId;
        next();
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

