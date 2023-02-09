import mongoose, { Mongoose } from "mongoose";
import Tour from "../models/tourModel.js";
import cloudinary from "../utils/cloudinary.js";

export const createTour = async (req, res) => {
  //console.log("file", req.file);
  //console.log("from middleware", req.user);
  try {
    if (!req.body.title) return res.status(500).json("Please Enter Tour title");
    if (req.file) {
      var imageResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "tours",
      });
      var imageData = {
        public_id: imageResult.public_id,
        url: imageResult.url,
      };
    }

    //console.log("creater", req.user);
    const tour = await new Tour({
      ...req.body,
      image: imageData,
      creator: req.user.id,
    }).save();
    res.status(200).json(tour);
  } catch (error) {
    console.log("Add Tour Error", error);
    res.status(500).json(error);
  }
};

export const getAllTours = async (req, res) => {
  try {
    const allTours = await Tour.find();
    res.status(200).json(allTours);
  } catch (error) {
    console.log("Get All Tour Error", error);
    res.status(500).json(error);
  }
};

//Get Single Tour

export const getSingleTour = async (req, res) => {
  //const { id } = req.params;
  //console.log("id", id);
  try {
    const getSingleTour = await Tour.findById(req.params.id);
    res.status(200).json(getSingleTour);
  } catch (error) {
    //console.log("Get single tour Error", error);
    res.status(500).json(error);
  }
};

//Get Tours based on User

export const getUserTours = async (req, res) => {
  try {
    const { id } = req?.user;
    //console.log("users", id);
    const userTours = await Tour.find({ creator: id });
    res.status(200).json(userTours);
  } catch (error) {
    //console.log("Get user tours Error", error);
    res.status(500).json(error);
  }
};

export const deleteTour = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      await Tour.findByIdAndRemove(req.params.id);
      res.status(200).json("Tour Deleted Successfully");
    } else {
      res.status(500).json("Not Tours exist with this id");
    }
  } catch (error) {
    console.log("delete tour Error", error);
    res.status(500).json(error);
  }
};

export const editTour = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      if (!req.body.title)
        return res.status(500).json("Please Enter Tour title");
      if (req.file) {
        var imageResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "tours",
        });
        var imageData = {
          public_id: imageResult.public_id,
          url: imageResult.url,
        };
      }

      //console.log("iamgeResult", imageResult);
      const updatedTour = await Tour.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          image: imageData,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updatedTour);
    } else {
      res.status(500).json("Not Tours exist with this id");
    }
  } catch (error) {
    console.log("Edit Tour Error", error);
    res.status(500).json(error);
  }
};

//Search Tour
export const searchTour = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const title = new RegExp(searchQuery, "i");
    //console.log("title", title);
    const tours = await Tour.find({ title });
    res.status(200).json(tours);
  } catch (error) {
    console.log("searchTour error", error);
    res.status(500).json(error);
  }
};

// Search Tour based on tags
export const SearchTourBasedOnTags = async (req, res) => {
  try {
    const { tag } = req.query;
    const term = new RegExp(tag, "i");
    //console.log(term);
    const tagTours = await Tour.find({ tags: { $in: [term] } });
    res.status(200).json(tagTours);
  } catch (error) {
    //console.log("Tags Tour error", error);
    res.status(500).json(error);
  }
};

//Related tours

export const relatedTours = async (req, res) => {
  try {
    const tags = req.body;
    //console.log("tags", tags);
    const tagsTours = await Tour.find({ tags: { $in: tags } });
    res.status(200).json(tagsTours);
  } catch (error) {
    //console.log("Tags Tour error", error);
    res.status(500).json(error);
  }
};

// Like count

export const likeTour = async (req, res) => {
  const tourId = req.params.id;
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(tourId))
    return res.status(400).json("No tour Exist with this Id");

  const tour = await Tour.findById(tourId);
  const index = tour.likes.findIndex((item) => item === String(userId));

  if (index === -1) {
    tour.likes.push(userId);
  } else {
    tour.likes = tour.likes.filter((i) => i.id === String(userId));
  }

  const updatedTour = await Tour.findByIdAndUpdate(tourId, tour, { new: true });
  //console.log(updatedTour);
  res.status(200).json(updatedTour);
  try {
  } catch (error) {
    console.log("Like Tour error", error);
    res.status(500).json(error);
  }
};
