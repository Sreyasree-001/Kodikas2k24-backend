const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");


router.route("/").get(authcontrollers.home);

router.route("/register").get(authcontrollers.registerGet);
router.post("/register",authcontrollers.registerPost);

router.route("/about").get(authcontrollers.about);

router.get("/admin",authcontrollers.admin);

module.exports = router;