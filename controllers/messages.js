const { request, response } = require ( "express" )

const rootMessage= (req= request, res =response ) => {
    const {texto1 , texto2} =req.query
    if (!texto1 || !texto2 ){
    res.status(400).json({msg:"No se han enviado los parametros necesarios"
})
    }
    res.status(400).json({msg: texto1 + ' ' + texto2})
    }

const hiMessage = (req= request, res =response ) => 
{res.status(401).json({msg: "Hola Mundo"})}

const byeMessage = (req= request, res =response  ) =>
 {res.status(410).json({msg: "Bye Mundo "})}

const postMessage = (req = request, res =response ) =>
 {res.status(417).json({msg: "Mensajes Post"})}

const putMessage = (req= request, res =response ) =>
 {res.status(405).json({msg: "Mensaje Put"})}

const deletMessage = (req= request, res =response ) =>
 {res.jstatus(400).json({msg: "Mensaje Delet"})}

module.exports = {
    rootMessage, 
    hiMessage, 
    byeMessage,
    postMessage,
    putMessage,
    deletMessage}