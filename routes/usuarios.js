const {Router} = require("express")
const {getUsers, getUserByID, deleteUserByID, addUSer, updateUserByeUsuario} = require ("../controllers/usuarios")
const router = Router()

//http://localhost:5001/api/v1/usuarios?id=6

//GET ///

router.get("/", getUsers)
router.get("/id/:id", getUserByID)

//POST//

router.post("/", addUSer)

//PUT//
router.put("/", updateUserByeUsuario)

//DELETE//

router.delete("/" , deleteUserByID)

module.exports = router