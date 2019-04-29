require("dotenv").config({ path: ".env" });
const express = require("express");
const weatherFunc = require("../../controllers/index");

router = express.Router();

router.get("/index", weatherFunc.weatherGet);

router.get("/index/:id", weatherFunc.weatherGetId);

router.post("/weather", weatherFunc.weatherPost);

module.exports = router;
