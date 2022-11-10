const { request, response , json } = require("express")
const bcryptjs = require("bcryptjs")
const pool = require("../db/conecction");
const modeloPersonajes = require("../models/personajes");

const getPersonaje = async (req = request, res = response) => {   
    let conn;

    try {
        conn = await pool.getConnection()
        const users = await conn.query("SELECT * FROM Personajes", (error) => { throw new Error(error) })

        if(users){
            res.status(404).json({msg: "No se encontraron registros"})
            return
        }

        res.json({users})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }
    }
}
module.exports = {getPersonaje}

