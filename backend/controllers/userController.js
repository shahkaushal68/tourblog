import User from "../models/userModel.js";

export const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findById(req.params.id, "-password");
    res.status(200).json(singleUser);
  } catch (error) {
    console.log("user Error", error);
    res.status(400).json(error);
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log("user Error", error);
    res.status(400).json(error);
  }
};
