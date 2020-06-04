const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const { authenticated } = require("../config/auth");
//search
router.post("/", authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id }, (err, restaurants) => {
    const keyword = req.body.keyword;
    const hasStr = (target, str) =>
      target.toLowerCase().includes(str.toLowerCase());
    if (err) console.log(err);
    const restaurant = restaurants.filter(({ name, name_en, category }) => {
      return [name, name_en, category].some((str) => hasStr(str, keyword));
    });
    return res.render("index", { restaurants: restaurant });
  });
});

//export
module.exports = router;
