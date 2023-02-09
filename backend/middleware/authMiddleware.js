import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const authCheck = (req, res, next) => {
  if (req.headers.cookie) {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    //console.log("token", cookies);
    if (token) {
      jwt.verify(String(token), process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) res.status(403).json("Invalid Token");
        req.user = decoded;
        //console.log("decode", req.user);
      });
    } else {
      res.status(403).json("No Token Found");
    }
    next();
  } else {
    res.status(403).json("You are not authnitaced");
  }
};

export const authCheckAndUser = (req, res, next) => {
  authCheck(req, res, () => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      if (req.user.id === req.params.id) {
        next();
      } else {
        return res.status(401).json("You are not Valid User");
      }
    } else {
      return res.status(401).json("This id is not userId");
    }
  });
};
