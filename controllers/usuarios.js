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

const getUserByID = async (req = request, res = response) => {   
    const {id} = req.params
    let conn;

    try {
        conn = await pool.getConnection()
        const [user] = await conn.query( `SELECT * FROM Usuarios WHERE ID = ${id}`, (error) => { throw new Error(error) })

        if(!user){
            res.status(404).json({msg:`No se encontraron registro con el ${id}`})
            return
        }

        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }
    }
}

const deleteUserByID = async (req = request, res = response) => {   
    const {id} = req.query
    let conn;

    try {
        conn = await pool.getConnection()
        const {affecteRows} = await conn.query( `UPDATE Usuarios SET Activo = 'N' WHERE ID = ${id}`, (error) => { throw new Error(error) })
 
        console.log(userDelete) 
        if(affecteRows===0){
            res.status(404).json({msg:`No se pudo Eliminar el registro con el ${id}`})
            return
            }
            
        res.json({msg:`El usuario con ID ${id} se elimino satisfactoriamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getUsers, getUserByID, deleteUserByID}