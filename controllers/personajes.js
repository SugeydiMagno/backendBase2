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

const getPersonajesByID = async (req = request, res = response) => {   
    const {id} = req.params
    let conn;

    try {
        conn = await pool.getConnection()
        const [personajes] = await conn.query( `SELECT * FROM Usuarios WHERE ID = ${id}`, (error) => { throw new Error(error) })

        if(!personajes){
            res.status(404).json({msg:`No se encontraron registro con el ${id}`})
            return
        }

        res.json({personajes})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }
    }
}

const deletePersonajesByID = async (req = request, res = response) => {   
    const {id} = req.query
    let conn;

    try {
        conn = await pool.getConnection()
        const {affecteRows} = await conn.query( `UPDATE Usuarios SET Activo = 'N' WHERE ID = ${id}`, (error) => { throw new Error(error) })
 
        console.log(personajeDelete) 
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

const addPersonaje = async (req = request, res = response) => {   
    const {
        NOmbre_Personaje,
        Region_Reino,
        Rol,
        Habilidades, 
        Dificultades,
        Aspectos,
        Efecto
    } = req.body

    if (
        !NOmbre_Personaje ||
        !Region_Reino || 
        !Rol ||
        !Habilidades ||
        !Dificultades ||
        !Aspectos ||
        !Efecto
    ){
        res.status(400).json({msg: "Falta informacion del personaje"})    
        return
    }

    let conn;

    try {
        conn = await pool.getConnection()

        const [personajes] = await conn.query(`SELECT NOmbre_Personaje FROM NOmbre_Personaje WHERE NOmbre_Personaje = '${NOmbre_Personaje}'`)

        if (personajes){
            res.status(403).json({msg:`El Personaje '${NOmbre_Personaje}' ya se encuentra registrado `})
            return
        }
          
        const salt = bcryptjs.genSaltSync()
        const ContraseñaCifrada = bcryptjs.hashSync(Contraseña,salt)

        const {affecteRows} = await conn.query(modeloPersonajes.queryaddPersonaje,[
            NOmbre_Personaje,
            Region_Reino,
            Rol,
            Habilidades, 
            Dificultades,
            Aspectos,
            Efecto || ''
            ], (error) => { throw new Error(error) })
 
        console.log(addPersonaje) 
        if(affecteRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro el registro del personaje ${NOmbre_Personaje}`})
            return
            }
            
        res.json({msg:`El Personaje ${NOmbre_Personaje} se agrego satisfactoriamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }
    }
}

const updatePersonajeByePersonaje = async (req = request, res = response) => {   
    const {
        NOmbre_Personaje,
        Region_Reino,
        Rol,
        Habilidades, 
        Dificultades,
        Aspectos,
        Efecto
    } = req.body

    if (
        !NOmbre_Personaje ||
        !Region_Reino || 
        !Rol ||
        !Habilidades ||
        !Dificultades ||
        !Aspectos ||
        !Efecto
    ) 
    {
        res.status(400).json({msg: "Falta informacion del Personaje "})    
        return
    }

    let conn;

    try {
        conn = await pool.getConnection()

        const [personajes] = await conn.query(modeloPersonajes.querygetPersonajeInfo, [NOmbre_Personaje])

        if (!personajes){
            res.status(403).json({msg:`El personaje '${NOmbre_Personaje}' no se encuentra registrado `})
            return
        }
        
        const {affecteRows} = await conn.query(modeloUsuarios.queryUpdateByUsuario,[
        !NOmbre_Personaje || user.NOmbre_Personaje ,
        !Region_Reino || user.Region_Reino ,
        !Rol || user.Rol ,
        !Habilidades || user.Habilidades ,
        !Dificultades || user.Dificultades ,
        !Aspectos || user.Aspectos ,
        !Efecto || user.Efecto
        ], (error) => { throw new Error(error) })
 
        console.log(addPersonaje) 
        if(affecteRows===0){
            res.status(404).json({msg:`No se pudo actualizar el registro del personaje ${NOmbre_Personaje}`})
            return
            }
            
        res.json({msg:`El personaje  ${NOmbre_Personaje} se actualizo satisfactoriamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }
    }
}


module.exports = {getPersonaje, getPersonajesByID, deletePersonajesByID, addPersonaje, updatePersonajeByePersonaje}

