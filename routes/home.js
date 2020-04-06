const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restauranrt");

//index
router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      //catch data from Restaurant Model
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurants });
    });
});

//export
module.exports = router;
