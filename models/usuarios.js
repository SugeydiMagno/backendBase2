const modeloUsuarios = {
    querygetUsers:  "SELECT * FROM Usuarios",
    querygetUserByID:  ` SELECT *FROM Usuarios WHERE ID = ?`,
    querydeleteUserByID: ` UPDATE Usuarios SET Activo = 'N' WHERE ID = ?` ,
    queryuserExists:    ` SELECT Usuario FROM Usuarios WHERE  Usuario = ?`, 
    queryaddUser: `
        INSERT INTO Usuarios (
            Nombre, 
            Apellidos,
            Edad,
            Genero,
            Usuario,
            Contraseña,
            Fecha_Nacimiento,
            Activo
        )VALUES(
        '?',
        '?',
        ?,
        '?',
        '?',
        '?',
        '?',    
        '?',
        )
    `,
    queryGetUSerInfo: `
            SELECT Usuario, Nombre, Apellidos, Edad, Genero, Fecha_Nacimiento
            FROM Usuarios 
            WHERE Usuarios = '?'
    `,
    
    queryupdateUserByeUsuario:` 
        UPDATE Usuarios SET
            Nombre = '?',
            Apellidos = '?',
            Edad = ? , 
            Genero = '?', 
            Fecha_Nacimiento = '?',
        WHERE Usuario = '?'
    `,
    querysigIn:`SELECT Usuario, Contraseña, Activo FROM Usuarios WHERE  Usuario = '?'`
}

module.exports = modeloUsuarios