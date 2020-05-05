const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const restaurantList = require("./restaurant.json");
mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error");
});

db.once("open", () => {
  console.log("db connected");
  const list = restaurantList.results;
  for (i = 0; i < restaurantList.results.length; i++) {
    Restaurant.create({
      name: list[i].name,
      name_en: list[i].name_en,
      category: list[i].category,
      image: list[i].image,
      location: list[i].location,
      phone: list[i].phone,
      google_map: list[i].google_map,
      rating: list[i].rating,
      description: list[i].description,
    });
  }
});
