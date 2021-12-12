const bodyParser = require("body-parser")
const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html")
}) 

app.use(express.urlencoded({
    extended: true
}))

// app.get("/contact", (req, res) => {
//     res.send("<h1>Contact me at: damazioandre@hotmail.com</h1>")
// }) 

// app.get("/about", (req, res) => {
//     res.send("<h1>My name is André and i actually hate my life</h1>")
// }) 

// app.get("/hobbies", (req, res) => {
//     res.send("<ul><li>Watch animes</li><li>Play chess</li></ul>")
// }) 


app.post("/bmicalculator", function(req, res) {
  
  let w = Number(req.body.n1)
  let h = Number(req.body.n2)
  let r = w/(h^2)
  
  res.send(`Your BCI is ${r}`)
})


app.listen(3000, function() {
    console.log("Servidor iniciado")
})