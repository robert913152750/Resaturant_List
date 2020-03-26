//Include express module and define server value

const express = require("express");
const app = express();
const port = 3000;

//Require express-handlebars here
const exphbs = require("express-handlebars");

//Setting static files
app.use(express.static("public"));

//setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting body-parser
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//setting mongoose database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
//index
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      //catch data from Restaurant Model
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurants });
    });
});
//show a page
app.get("/restaurants/:restaurant_id", (req, res) => {
  console.log(req.params);
  Restaurant.findById(req.params.restaurant_id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err);
      console.log(restaurant);
      return res.render("show", { restaurant: restaurant });
    });
});
//show edit-page
app.get("/restaurants/:restaurant_id/edit", (req, res) => {
  Restaurant.findById(req.params.restaurant_id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err);
      return res.render("edit", { restaurant: restaurant });
    });
});

//search
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter(restaurants => {
    return restaurants.name.toLowerCase().includes(keyword.toLowerCase());
  });
  console.log(restaurants);
  res.render("index", { restaurants: restaurants });
});
//Listen
app.listen(port, () => {
  console.log(`Express is listening on http;//localhost/${port}`);
});
