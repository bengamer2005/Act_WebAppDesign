const express = require("express")
const User = require("../models/User.model")
const router = express.Router()

const {register, login, deleteUser} = require("../auth/auth")

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/deleteUser").delete(deleteUser)

module.exports = router