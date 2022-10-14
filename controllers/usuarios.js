const { request, response , json } = require("express")
const pool = require("../db/conecction")

const getUsers = async (req = request, res = response) => {   
    let conn;

    try {
        conn = await pool.getConnection()
        const users = await conn.query("SELECT * FROM Usuarios", (error) => { throw new Error(error) })

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

module.exports = {getUsers}