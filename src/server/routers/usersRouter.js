const express = require("express");
const { userRegister, userLogin } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);

module.exports = router;
