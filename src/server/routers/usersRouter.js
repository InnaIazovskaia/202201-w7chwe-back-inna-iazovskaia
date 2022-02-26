const express = require("express");
const { userRegister } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/register", userRegister);

module.exports = router;
