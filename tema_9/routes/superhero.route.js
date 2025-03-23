const express = require("express")
const Superhero = require("../models/superhero.model")
const router = express.Router()

const {getSuperheros} = require("../controllers/superhero.controller")
const {getSuperhero} = require("../controllers/superhero.controller")
const {postSuperheros} = require("../controllers/superhero.controller")
const {putSuperheros} = require("../controllers/superhero.controller")
const {deleteSuperheros} = require("../controllers/superhero.controller")

router.get("/", getSuperheros) 
router.get("/:id", getSuperhero)
router.post("/", postSuperheros)
router.put("/:id", putSuperheros)
router.delete("/:id", deleteSuperheros)

module.exports = router