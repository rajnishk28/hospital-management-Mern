const jwt=require("jsonwebtoken");

const isUser = (req, res, next) => {
    let token = req.headers.token;
  
    try {
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Token not provided",
        });
      }
  
      token = token.split(" ")[1];
  
      let user = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(user)
      if (user.role === "doctor") {
        req.user = user; 
        next();
      } else {
        res.status(403).json({
          success: false,
          message: "You are not authorized",
        });
      }
    } catch (error) {
      // console.error(error);
      if (error.name === "JsonWebTokenError") {
        res.status(401).json({
          success: false,
          message: "Invalid token format",
        });
      } else if (error.name === "TokenExpiredError") {
        res.status(401).json({
          success: false,
          message: "Token has expired",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  };


  const isAdmin = (req, res, next) => {
    let token = req.headers.token;
  
    try {
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Token not provided",
        });
      }
  
      token = token.split(" ")[1];
  
      let user = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(user)
      if (user.role === "admin") {
        req.user = user; 
        next();
      } else {
        res.status(403).json({
          success: false,
          message: "You are not authorized",
        });
      }
    } catch (error) {
      // console.error(error.name);
      if (error.name === "JsonWebTokenError") {
        res.status(401).json({
          success: false,
          message: "Invalid token format",
        });
      } else if (error.name === "TokenExpiredError") {
        res.status(401).json({
          success: false,
          message: "Token has expired",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  };


  module.exports ={
    isUser,
    isAdmin
  }