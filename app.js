require("dotenv").config({ path: ".env" });
const express = require("express");
const expressValidator = require("express-validator");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const db = require("./configDB/db");

//Routes require
const indexRoutes = require("./routes/api_back_end/index");

//set express to app
const app = express();

// Body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.set("useFindAndModify", false);
app.use(
  expressSession({
    secret: "verySecret",
    saveUninitialized: false,
    resave: false
  })
);
app.use(expressValidator());
app.use(morgan("tiny"));

// Use Routes
app.use(indexRoutes);

//DB connect
db.dbConnection();

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running: ${port}`));
