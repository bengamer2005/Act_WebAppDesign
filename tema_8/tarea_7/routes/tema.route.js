const express = require("express")
const Tema = require("../models/temas.model")
const router = express.Router()

const {getTemas} = require("../controllers/temas.controller")
const {getTema} = require("../controllers/temas.controller")
const {postTema} = require("../controllers/temas.controller")
const {putTema} = require("../controllers/temas.controller")
const {deleteTema} = require("../controllers/temas.controller")




router.get("/", getTemas) 
router.get("/:id", getTema)
router.post("/", postTema)
router.put("/:id", putTema)
router.delete("/:id", deleteTema)

module.exports = router
