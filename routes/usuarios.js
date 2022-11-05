const {Router} = require("express")
const {getUsers, getUserByID, deleteUserByID, addUSer, updateUserByeUsuario, sigIn, newContraseña} = require ("../controllers/usuarios")
const router = Router()

//http://localhost:5001/api/v1/usuarios?id=6

//GET ///

router.get("/", getUsers)
router.get("/id/:id", getUserByID)

//POST//

router.post("/", addUSer)
router.post("/sigin",sigIn)

//PUT//
router.put("/", updateUserByeUsuario)
router.put("/newContraseña",newContraseña)

//DELETE//

router.delete("/" , deleteUserByID)

module.exports = router