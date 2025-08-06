var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connectDB = require("./config/db");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var customer = require("./routes/customer");
var filestorage = require("./routes/filestorage");
connectDB();

var app = express();
app.use(express.json({ limit: "50mb" })); // Adjust this as needed

app.use("/public", express.static("public")); // Serve files
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: [
      "https://filestorage.zyva-designs.com",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3002",
      "http://localhost:3001",
      "http://localhost:3000",
    ],
    method: ["PUT", "DELETE", "PUSH", "GET", "POST", "PATCH"],
    credential: true,
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/customer", customer);
app.use("/filestorage", filestorage);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
