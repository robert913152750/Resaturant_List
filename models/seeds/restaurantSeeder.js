const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const User = require("../user");
const userList = require("./user.json");
const restaurantList = require("./restaurant.json");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error");
});

db.once("open", () => {
  console.log("db connected");
  //新增種子使用者
  const user1 = new User({
    name: userList.results[0].name,
    email: userList.results[0].email,
    password: userList.results[0].password,
  });

  const user2 = new User({
    name: userList.results[1].name,
    email: userList.results[1].email,
    password: userList.results[1].password,
  });

  const user = [user1, user2];
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user[0].password, salt, (err, hash) => {
      if (err) throw err;
      user[0].password = hash;

      user[0].save().catch((err) => console.log(err));
    });
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user[1].password, salt, (err, hash) => {
      if (err) throw err;
      user[1].password = hash;

      user[1].save().catch((err) => console.log(err));
    });
  });
  //新增種子餐廳
  const list = restaurantList.results;
  const user1Id = User.find({ name: user1 });
  const user2Id = User.find({ name: user2 });

  for (i = 0; i < restaurantList.results.length - 2; i++) {
    if (i < 3) {
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
        userId: user1Id._conditions.name._id,
      });
    } else {
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
        userId: user2Id._conditions.name._id,
      });
    }
  }
  console.log("Seeder had already finish");
});
