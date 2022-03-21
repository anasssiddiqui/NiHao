const fs = require("fs");
const multer = require("multer");

var dealcategorystorage = multer.diskStorage({

  destination: function (req, file, cb) {
    const dir = "./public/deal_categories";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }, (err) => { });
    }
    cb(null, "public/deal_categories");
  },
  filename: function (req, file, cb) {
    // const newName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now() + file.originalname.replace(/\s/g, ""));
  },
});

var dealcategoryupload = multer({
  storage: dealcategorystorage,
  limits: {
    fieldSize: 1024 * 1024 * 10,
    fieldNameSize: 200,
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|gif|GIF|pdf|PDF|JPEG|png|PNG|webp|WEBP)$/)) {
      console.log("inside the errror invalid format", file);
      return cb(new multer.MulterError("Upload image,pdf only"));
    }
    cb(undefined, true);
  },
});

var dealsstorage = multer.diskStorage({

  destination: function (req, file, cb) {
    const dir = "./public/deals_files";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }, (err) => {});
    }
    cb(null, "public/deals_files");
  },
  filename: function (req, file, cb) {
    // const newName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now() + file.originalname.replace(/\s/g, ""));
  },
});

var dealsupload = multer({
  storage: dealsstorage,
  limits: {
    fieldSize: 1024 * 1024 * 10,
    fieldNameSize: 200,
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|gif|GIF|pdf|PDF|JPEG|png|PNG|webp|WEBP)$/)) {
      console.log("inside the errror invalid format", file);
      return cb(new multer.MulterError("Upload image,pdf only"));
    }
    cb(undefined, true);
  },
});

var bannerstorage = multer.diskStorage({

  destination: function (req, file, cb) {
    const dir = "./public/banner_images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }, (err) => {});
    }
    cb(null, "public/banner_images");
  },
  filename: function (req, file, cb) {
    // const newName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now() + file.originalname.replace(/\s/g, ""));
  },
});

var bannerupload = multer({
  storage: bannerstorage,
  limits: {
    fieldSize: 1024 * 1024 * 10,
    fieldNameSize: 200,
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|gif|GIF|JPEG|png|PNG|webp|WEBP)$/)) {
      console.log("inside the errror invalid format", file);
      return cb(new multer.MulterError("Upload image only"));
    }
    cb(undefined, true);
  },
});


module.exports = { dealsupload, bannerupload, dealcategoryupload}