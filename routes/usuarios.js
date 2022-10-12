const {Router} = require("express")
const {getUsers} = require ("../controllers/usuarios")
const router = Router()

//http://localhost:4000/api/v1/usuarios

router.get("/", getUsers)

module.exports = router