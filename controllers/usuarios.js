const { request, response , json } = require("express")
const bcryptjs = require("bcryptjs")
const pool = require("../db/conecction");
const modeloUsuarios = require("../models/usuarios");

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

const addUSer = async (req = request, res = response) => {   
    const {
        Nombre,
        Apellidos,
        Edad,
        Genero, 
        Usuario,
        Contraseña,
        Fecha_Nacimiento = '1900-01-01',
        Activo
    } = req.body

    if (
        !Nombre ||
        !Apellidos ||
        !Edad  ||
        !Usuario ||
        !Contraseña ||
        !Activo 
    ){
        res.status(400).json({msg: "Falta informacion del usuario"})    
        return
    }

    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(`SELECT Usuario FROM Usuarios WHERE Usuario = '${Usuario}'`)

        if (user){
            res.status(403).json({msg:`El Usuario '${Usuario}' ya se encuentra registrado `})
            return
        }
          
        const salt = bcryptjs.genSaltSync()
        const ContraseñaCifrada = bcryptjs.hashSync(Contraseña,salt)

        const {affecteRows} = await conn.query(modeloUsuarios.queryAddUser,[
                Nombre,
                Apellidos,
                Edad,
                Genero || '', 
                Usuario,
                Contraseña,
                Fecha_Nacimiento,
                Activo
            ], (error) => { throw new Error(error) })
 
        console.log(addUSer) 
        if(affecteRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro el registro del usuario ${Usuario}`})
            return
            }
            
        res.json({msg:`El usuario ${Usuario} se agrego satisfactoriamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }
    }
}

const updateUserByeUsuario = async (req = request, res = response) => {   
    const {
        Nombre,
        Apellidos,
        Edad,
        Genero, 
        Usuario,
        Contraseña,
        Fecha_Nacimiento = "1900-01-01"
    } = req.body

    if (
        !Nombre ||
        !Apellidos ||
        !Edad  ||
        !Usuario ||
        !Contraseña  
    ) 
    {
        res.status(400).json({msg: "Falta informacion del usuario"})    
        return
    }

    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloUsuarios.queryGetUserInfo, [Usuario])

        if (!user){
            res.status(403).json({msg:`El Usuario '${Usuario}' no se encuentra registrado `})
            return
        }
        
        const {affecteRows} = await conn.query(modeloUsuarios.queryUpdateByUsuario,[
            Nombre || user.Nombre,
            Apellidos || user.Apellidos,
            Edad || user.Edad,
            Genero || user.Genero ,
            Fecha_Nacimiento,
            Usuario
        ], (error) => { throw new Error(error) })
 
        console.log(addUSer) 
        if(affecteRows===0){
            res.status(404).json({msg:`No se pudo actualizarr el registro el registro del usuario ${Usuario}`})
            return
            }
            
        res.json({msg:`El usuario ${Usuario} se actualizo satisfactoriamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }
    }
}

const sigIn = async (req = request, res = response) => {   
    const { 
        Usuario,
        Contraseña
    } = req.body

    if (
        !Usuario ||
        !Contraseña 
    ){
        res.status(400).json({msg: "Falta informacion del usuario"})    
        return
    }

    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(`SELECT Usuario, Contraseña , Activo FROM Usuarios WHERE Usuario = '${Usuario}'`)

        if (!user || user.Activo === 'N'){
            res.status(403).json({msg:`El Usuario o la Contraseña son incorrectos.`})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contraseña, user.Contraseña )

        if (!accesoValido){
            res.status(403).json({msg:`El Usuario o la Contraseña son incorrectos.`})
            return
        }

        res.json({msg:`El usuario ${Usuario} ha iniciado sesion satisfactoriamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }
    }
}
 
const newContraseña = async (req = request, res = response) => {   
    const { 
        Usuario,
        AntContraseña,
        NuevContraseña
    } = req.body

    if (
        !Usuario ||
        !AntContraseña ||
        !NuevContraseña
    ){
        res.status(400).json({msg: "Falta informacion "})    
        return
    }

    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(`SELECT Usuario, Contraseña , Activo FROM Usuarios WHERE Usuario = '${Usuario}'`)

        if (!user || user.Activo === 'N'){
            res.status(403).json({msg:`El Usuario o la Contraseña son incorrectos.`})
            return
        }

        const datosValidos = bcryptjs.compareSync(AntContraseña, user.Contraseña )

        if (!datosValidos){
            res.status(403).json({msg:`El Usuario o la Contraseña son incorrectos.`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const ContraseñaCifrada = bcryptjs.hashSync(NuevContraseña,salt)

        const {affecteRows} = await console.query (`
            UPDATE Usuarios SET
                Contraseña='${ContraseñaCifrada}'
            WHERE Usuario='${Usuario}'
            `,(error) => {throw new error })
        if(affecteRows===0){
            res.status(404).json({msg:`Error al actualizar la contraseña de ${Usuario}`})
            return
        }
        res.json({msg:`La contraseña de  ${Usuario} se actualizo satisfactoriamente .`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    } finally {
        if(conn){
            conn.end()
        }
    }
}
 

module.exports = {getUsers, getUserByID, deleteUserByID, addUSer, updateUserByeUsuario, sigIn, newContraseña}