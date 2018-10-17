const path = require("path");
const multer = require("multer");

let upload = destination => {
  var storage = multer.diskStorage({
    destination: !destination ? "/public/uploads" : destination,
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });

  return multer({ storage: storage });
};

module.exports = upload;
