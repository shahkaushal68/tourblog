import multer from "multer";

const storage = multer.diskStorage({});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new error("File type is not supported!"), false);
    //cb({message:"File type is not supported!"}, false);
  }
}

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  //limits: { fileSize: 1024 * 1024 },
});
