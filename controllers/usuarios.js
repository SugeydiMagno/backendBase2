const { request, response } = require("express");

const getUsers = (req = request, res = response) => {
    console.log("Funcion getUsers")
    res.json({msg: "Funcion getUSers" })
}

module.exports = {getUsers}