const {Router} = require("express")
const { getPersonaje, getPersonajesByID, deletePersonajesByID, addPersonaje, updatePersonajeByePersonaje } = require("../controllers/personajes")
const {} = require ("../controllers/Personaje")
const router = Router()

//http://localhost:5001/api/v1/Personaje?id=7

//GET ///

router.get("/", getPersonaje)
router.get("/id/:id", getPersonajesByID)

//DELETE//

router.delete("/" , deletePersonajesByID)

//POST//

router.post("/", addPersonaje)

//PUT//
router.put("/", updatePersonajeByePersonaje)