const {Router} = require("express")
const { getPersonaje } = require("../controllers/personajes")
const {} = require ("../controllers/Personaje")
const router = Router()

//http://localhost:5001/api/v1/Personaje?id=7

//GET ///

router.get("/", getPersonaje)