const { request, response } = require ( "express" )

const rootMessage= (req= request, res =response ) => {
    const {texto1 , texto2} =req.query
    if (!texto1 || !texto2 ){
    res.status(400).json({msg:"No se han enviado los parametros necesarios, este endPoint ocupa los parametros Texto1 y Texto2"
})
    }
    res.status(400).json({msg: texto1 + ' ' + texto2})
    }

const hiMessage = (req= request, res =response ) => {
    const {name} = req.params
    res.json({msg: " Hola "  +  name})
}

const byeMessage = (req= request, res =response  ) =>{
    res.status(410).json({msg: "Bye Mundo "})}

const postMessage = (req = request, res =response ) =>{
    const {no_control, nombre} = req.body
    //console.log({no_control, nombre})
    res.json({
        msg: `numero de control = ${no_control}, nombre= ${nombre}` 
    })}

const putMessage = (req= request, res =response ) =>{
    res.status(405).json({msg: "Mensaje Put"})}

const deletMessage = (req= request, res =response ) =>{
    res.jstatus(400).json({msg: "Mensaje Delet"})}

module.exports = {
    rootMessage, 
    hiMessage, 
    byeMessage,
    postMessage,
    putMessage,
    deletMessage}
