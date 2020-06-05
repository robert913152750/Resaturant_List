//Include express module and define server value
const express = require("express");
const app = express();
const port = 3000;

//判別開發環境
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//require connect-flash
const flash = require("connect-flash");

//Require middleware
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
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

//setting session
app.use(
  session({
    secret: "im robert cai",
    resave: false,
    saveUninitialized: true,
  })
);

//setting passport
app.use(passport.initialize());
app.use(passport.session());

//require passport config
require("./config/passport")(passport);

//use connect flash
app.use(flash());

//登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();

  //新增兩個 flash message 變數
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

//require Restaurant model
const Restaurant = require("./models/restaurant");

//Setting route
app.use("/", require("./routes/home"));
app.use("/restaurants", require("./routes/restaurants"));
app.use("/users", require("./routes/user"));
app.use("/auth", require("./routes/auths"));
app.use("/search", require("./routes/search"));
//Listen
app.listen(process.env.PORT || port, () => {
  console.log("App is running");
});
