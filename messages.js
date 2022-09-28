const { solicitud, respuesta } = requirir ( "expresar" )

const rootMessage= (req= solicitud, res =respuesta ) => {res.json({mensaje: "Mensajes"})}

const hiMessage = (req= soicitud, res=respuesta ) => {res.json({mensaje: "Mensajes"})}

const byeMessage = (req, res) => {res.json({mensaje: "Mensajes"})}

const postMessage = (req, res) => {res.json({mensaje: "Mensajes"})}

const putMessage = (req, res) => {res.json({mensaje: "Mensajes"})}

const deletMessage = (req, res) => {res.json({mensaje: "Mensajes"})}

module.exports = {
    rootMessage, 
    hiMessage, 
    byeMessage,
    postMessage,
    putMessage,
    deletMessage}