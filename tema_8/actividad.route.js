const express = require("express")
const Actividad = require("../models/actividad.model")
const router = express.Router()

const {getActividades} = require("../controllers/actividad.controller")
const {getActividad} = require("../controllers/actividad.controller")
const {postActividad} = require("../controllers/actividad.controller")
const {putActividad} = require("../controllers/actividad.controller")
const {deleteActividad} = require("../controllers/actividad.controller")



router.get("/", getActividades) 
router.get("/:id", getActividad)
router.post("/", postActividad)
router.put("/:id", putActividad)
router.delete("/:id", deleteActividad)

module.exports = router