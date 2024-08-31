const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");


router.route("/").get(authcontrollers.home);

router.route("/register").get(authcontrollers.register).post(authcontrollers.register);

router.route("/about").get(authcontrollers.about);

module.exports = router;