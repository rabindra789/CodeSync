const express = require("express");
const { signup, login, logout, liveblocksAuth } = require("../controllers/authController");
const router = express.Router();

router.post("/", liveblocksAuth)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
