//Include express module and define server value
const express = require("express");
const app = express();

const port = 3000;

//Require express-handlebars here
const exphbs = require("express-handlebars");

//Require method-override
const methodOverride = require("method-override");

//Setting static files
app.use(express.static("public"));

//setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting body-parser
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//setting method-override
app.use(methodOverride("_method"));

//setting mongoose database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", () => {
  //connect error
  console.log("mongodb error");
});

db.once("open", () => {
  //connect success
  console.log("mongodb connected");
});

//require Restaurant model
const Restaurant = require("./models/restauranrt");

//Setting route
app.use("/", require("./routes/home"));
app.use("/restaurants", require("./routes/restaurants"));

//search
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter((restaurants) => {
    return restaurants.name.toLowerCase().includes(keyword.toLowerCase());
  });
  console.log(restaurants);
  res.render("index", { restaurants: restaurants });
});
//Listen
app.listen(port, () => {
  console.log(`Express is listening on http;//localhost/${port}`);
});
