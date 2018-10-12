let upload = (destination)=>{
var storage = multer.diskStorage({
  destination: destination,
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

return multer({ storage: storage });
}

module.exports = upload;