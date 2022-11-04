const modeloUsuarios = {
    querygetUsers  "SELECT * FROM Usuarios",
    querygetUserByID  ` SELECT *FROM Usuarios WHERE ID = ${id}`,
    querydeleteUserByID ` UPDATE Usuarios SET activo = 'N' WHERE ID = ${id}` 

}

module.exports = modeloUsuarios