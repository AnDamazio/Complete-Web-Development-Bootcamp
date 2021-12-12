const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("<h1>Funciona?</h1>")
}) 

app.get("/contact", (req, res) => {
    res.send("<h1>Contact me at: damazioandre@hotmail.com</h1>")
}) 

app.get("/about", (req, res) => {
    res.send("<h1>My name is André and i actually hate my life</h1>")
}) 

app.get("/hobbies", (req, res) => {
    res.send("<ul><li>Watch animes</li><li>Play chess</li></ul>")
}) 

app.listen(3000, function() {
    console.log("Servidor iniciado")
})