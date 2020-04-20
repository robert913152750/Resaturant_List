const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restauranrt");

// setting /restaurants router
//show a page
router.get("/:restaurant_id", (req, res) => {
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
router.get("/:restaurant_id/edit", (req, res) => {
  Restaurant.findById(req.params.restaurant_id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err);
      return res.render("edit", { restaurant: restaurant });
    });
});

//edit
router.put("/:restaurant_id", (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, restaurant) => {
    if (err) return console.error(err);

    restaurant.name = req.body.name;
    restaurant.category = req.body.category;
    restaurant.location = req.body.location;
    restaurant.google_map = req.body.google_map;
    restaurant.phone = req.body.phone;
    restaurant.description = req.body.description;
    restaurant.image = req.body.image;
    // restaurant = req.body (this way can't work)
    console.log(restaurant);
    restaurant.save((err) => {
      if (err) return console.error(err);
      return res.redirect(`/restaurants/${req.params.restaurant_id}`);
    });
  });
});

//show create page
router.get("/create/new_page", (req, res) => {
  return res.render("create");
});

//create
router.post("/create/new_page", (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
  });
  restaurant.save((err) => {
    if (err) return console.error(err);
    return res.render("show", { restaurant: restaurant });
  });
});

//delete
router.delete("/:restaurant_id/delete", (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.remove((err) => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

//export
module.exports = router;
