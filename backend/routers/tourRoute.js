import express from "express";
import {
  createTour,
  deleteTour,
  editTour,
  getAllTours,
  getSingleTour,
  getUserTours,
  likeTour,
  relatedTours,
  searchTour,
  SearchTourBasedOnTags,
} from "../controllers/tourController.js";
import { authCheck, authCheckAndUser } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
const router = express.Router();

router.get("/search", searchTour);
router.get("/tags", SearchTourBasedOnTags);
router.get("/user/:id", authCheck, authCheckAndUser, getUserTours);
router.get("/", getAllTours);
router.get("/:id", getSingleTour);
router.post("/relatedTours", relatedTours);
router.post("/add", authCheck, upload.single("image"), createTour);
router.put("/edit/:id", authCheck, upload.single("image"), editTour);
router.delete("/delete/:id", authCheck, deleteTour);
router.put("/like/:id", authCheck, likeTour);

export default router;
