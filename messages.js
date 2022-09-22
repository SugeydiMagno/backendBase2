const rootMessage= (req, res) => {res.send("Mensajes")}

const hiMessage = (req, res) => {res.send("Hola Mundo!")}

const byeMessage = (req, res) => {res.send("Adios Mundo")}

module.exports = {rootMessage, hiMessage, byeMessage}