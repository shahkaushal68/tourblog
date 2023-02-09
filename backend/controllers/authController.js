import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json("Please fill up the require field");
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("This email is not register");
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json("Wrong Credentials");
    if (user && passwordMatch) {
      var token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.PRIVATE_KEY,
        { expiresIn: "1h" }
      );
      res.cookie("jwt", token, {
        path: "/",
        expiresIn: new Date(Date.now() + 1000 * 3600),
        httpOnly: true,
      });
      res.status(200).json({ user, token });
    }
  } catch (error) {
    console.log("login Error", error);
    res.status(400).json(error);
  }
};

export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json("Please fill up the require field");
    }
    const userName = await User.findOne({ username });
    if (userName)
      return res.status(400).json("This username is already present");
    var user = await User.findOne({ email });
    if (user) return res.status(400).json("Email already register");
    const hashPassword = await bcrypt.hash(password, 10);
    user = await new User({
      ...req.body,
      password: hashPassword,
    }).save();
    res.status(200).json(user);
  } catch (error) {
    //console.log("register Error", error);
    res.status(400).json(error);
  }
};

export const userLogout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("Logout Successfully");
};
