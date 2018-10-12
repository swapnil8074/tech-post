const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");

// logging url requests
app.use(morgan("dev"));

// adding middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up database
const { CONNECTION_URI } = require("./config/db");
mongoose
  .connect(CONNECTION_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log("MongoDB Connection failed!"));

// setting  up Static path
app.use(express.static(path.join(__dirname, "/public")));

// setting View engine
app.set("view engine", "ejs");

// setting up routes
const indexRoutes = require("./routes/index");
const manageRoutes = require("./routes/manage");
const apiCategoryRoutes = require("./routes/api/categories");

app.use("/", indexRoutes);
app.use("/manage", manageRoutes);
app.use("/api/category", apiCategoryRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
