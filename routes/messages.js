const {Router, Route} = require("express")
const router = Router ()
const {rootMessage,
       hiMessage,
       byeMessage,
       postMessage,
       putMessage,
       deletMessage
    }= require('../controllers/messages')

router.get("/", rootMessage) //End Point
router.get("/hi/:name", hiMessage) //End Point
router.get("/bye", byeMessage) //End Point

router.post('/',putMessage)
router.post('/',postMessage)
router.post('/',deletMessage)

module.exports = router
