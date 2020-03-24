//Include express module and define server value

const express = require("express");
const app = express();
const port = 3000;

//Require express-handlebars here
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");

//Setting static files
app.use(express.static("public"));

//setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  );
  console.log(restaurant);
  res.render("show", { restaurant: restaurant });
});

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
